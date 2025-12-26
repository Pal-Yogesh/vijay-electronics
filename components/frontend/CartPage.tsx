"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Cart() {
  const { cartItems, subtotal, updateItemQuantity, removeItemFromCart } =
    useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const itemVariants = {
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.3 },
    },
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      alert("Checkout completed! (This is just a demo)");
    }, 2000);
  };

  return (
    <div className="min-h-screen ">
      {cartItems.length > 0 && (
        <header className="bg-gray-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-medium text-black">Shopping Cart</h1>
            <Link
              href="/"
              className="text-[#14404B] hover:text-black transition-colors text-lg hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6"
            >
              <ShoppingCart />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-light text-gray-900 mb-2"
            >
              Your cart is empty
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 mb-8 text-center max-w-md"
            >
              Looks like you haven't added anything to your cart yet. Explore
              our collection to find something you'll love.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/"
                className="inline-block px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 rounded-md text-sm"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Items (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                  </h2>
                </div>

                <ul className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        exit={itemVariants.exit}
                        className="p-6 flex flex-col sm:flex-row items-center sm:items-start"
                      >
                        <div className="shrink-0 bg-gray-100 rounded-md w-24 h-24 flex items-center justify-center overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="sm:ml-6 flex-1 flex flex-col mt-4 sm:mt-0">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">
                                {item.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Category: {item.category}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                Brand: {item.brand}
                              </p>
                            </div>
                            <p className="text-base font-medium text-gray-900">
                              ₹{item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex-1 flex items-end justify-between mt-4">
                            <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                              <button
                                onClick={() =>
                                  updateItemQuantity(item.id, item.quantity - 1)
                                }
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                              >
                                -
                              </button>
                              <span className="px-4 py-1 text-gray-900 border-l border-r border-gray-200">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateItemQuantity(item.id, item.quantity + 1)
                                }
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItemFromCart(item.id)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="text-gray-900 font-bold">₹{subtotal.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Shipping</p>
                    <p className="text-green-600 font-bold">Free</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Tax (GST)</p>
                    <p className="text-gray-900 font-bold">
                      ₹{(subtotal * 0.18).toLocaleString()}
                    </p>
                  </div>

                  {/* Discount code input */}
                  <div className="pt-4">
                    <div className="flex space-x-2 mt-2">
                      <input
                        type="text"
                        placeholder="Discount code"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14404B] focus:border-transparent"
                      />
                      <button className="bg-[#14404B] text-white text-sm px-4 py-2 rounded-xl transition-colors font-bold">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between">
                      <p className="text-lg font-bold text-gray-900">Total</p>
                      <p className="text-2xl font-black text-[#14404B]">
                        ₹{(subtotal + subtotal * 0.18).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isCheckingOut ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Checkout"
                    )}
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    We Accept
                  </h3>
                  <div className="flex space-x-2">
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="bg-white rounded p-2 w-12 h-8 flex items-center justify-center"
                    >
                      <span className="text-xs font-medium">VISA</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="bg-white rounded p-2 w-12 h-8 flex items-center justify-center"
                    >
                      <span className="text-xs font-medium">MC</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="bg-white rounded p-2 w-12 h-8 flex items-center justify-center"
                    >
                      <span className="text-xs font-medium">AMEX</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="bg-white rounded p-2 w-12 h-8 flex items-center justify-center"
                    >
                      <span className="text-xs font-medium">PayPal</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
