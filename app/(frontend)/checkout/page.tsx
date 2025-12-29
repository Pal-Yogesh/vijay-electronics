"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";
import { Loader2, CreditCard, Truck, MapPin } from "lucide-react";
import Image from "next/image";

// Add Razorpay type to window
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart, isMounted } = useCart();
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in?redirect_url=/checkout");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isMounted && cartItems.length === 0) {
      router.push("/cart");
    }
  }, [isMounted, cartItems, router]);

  // Load Razorpay Script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await loadRazorpay();

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // Create Order in DB & Razorpay
      const orderRes = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          shippingAddress,
          amount: subtotal + (subtotal * 0.18), // Including 18% GST as per CartPage logic
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) throw new Error(orderData.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Vijay Electronics",
        description: "Electronics Purchase",
        image: "/vijayelectronicslogo.png",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                dbOrderId: orderData.dbOrderId,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              clearCart();
              const successId = orderData.dbOrderId;
              if (successId) {
                window.location.href = `/order-success?id=${successId}`;
              } else {
                router.push("/products"); // Fallback
              }
            } else {
              alert("Payment verification failed: " + (verifyData.error || "Unknown error"));
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("An error occurred during payment verification.");
          }
        },
        prefill: {
          name: shippingAddress.fullName,
          email: shippingAddress.email,
          contact: shippingAddress.phone,
        },
        theme: {
          color: "#0C2730",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error: any) {
      console.error("Payment error:", error);
      alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted || !isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#0C2730]" />
      </div>
    );
  }

  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold">Shipping Address</h2>
              </div>

              <form id="checkout-form" onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0C2730] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={shippingAddress.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0C2730] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0C2730] outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={shippingAddress.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0C2730] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0C2730] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0C2730] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0C2730] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    disabled
                    value={shippingAddress.country}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50"
                  />
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-50 p-2 rounded-xl text-purple-600">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>
              <p className="text-gray-500 mb-4">Secure payment via Razorpay. Supports Credit/Debit Cards, UPI, Net Banking, and Wallets.</p>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-[#0C2730]/10">
                <CreditCard className="text-[#0C2730]" />
                <span className="font-bold text-[#0C2730]">Razorpay</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <CreditCard className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100 mb-8">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-black text-[#0C2730] pt-3">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isLoading}
                className="w-full bg-[#0C2730] text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#14404B] transition-all shadow-xl shadow-[#0C2730]/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>Pay ₹{total.toLocaleString()}</>
                )}
              </button>
              
              <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-widest font-bold">
                Secure SSL Encrypted Payment
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

