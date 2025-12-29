"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";
import { CheckCircle2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("id");

  if (!orderId) {
    return (
      <div className="grow flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Invalid Request</h1>
        <Link href="/" className="text-blue-600 hover:underline mt-4">Go Home</Link>
      </div>
    );
  }

  return (
    <main className="grow flex items-center justify-center p-4 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[40px] p-12 shadow-xl border border-gray-100 max-w-2xl w-full text-center"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-green-50 p-6 rounded-full">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-[#0C2730] mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-500 text-lg mb-8 font-medium">
          Thank you for shopping with Vijay Electronics. Your order has been received and is being processed.
        </p>

        <div className="bg-gray-50 rounded-3xl p-6 mb-10 inline-block border border-gray-100">
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1">Order Reference</p>
          <p className="text-xl font-black text-[#0C2730] font-mono">{orderId}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            href="/products"
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-4 px-8 rounded-2xl font-black hover:bg-gray-200 transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 bg-[#0C2730] text-white py-4 px-8 rounded-2xl font-black hover:bg-[#14404B] transition-all shadow-xl shadow-[#0C2730]/20"
          >
            Back to Home
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Suspense fallback={
        <div className="grow flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#0C2730]" />
        </div>
      }>
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}

