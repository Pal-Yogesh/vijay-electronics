import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import OrderModel from "@/models/Order";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      dbOrderId,
    } = await request.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await connectDB();

    // Update order status in DB
    const order = await OrderModel.findByIdAndUpdate(
      dbOrderId,
      {
        paymentStatus: "paid",
        status: "processing",
        razorpayPaymentId: razorpay_payment_id,
      },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found in database" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Payment verified successfully",
      order,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

