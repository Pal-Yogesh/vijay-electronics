import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import OrderModel from "@/models/Order";
import { razorpay } from "@/lib/razorpay";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { items, shippingAddress, amount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    await connectDB();

    // Create Razorpay Order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Amount in paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    });

    // Create internal order in DB
    const order = await OrderModel.create({
      userId,
      items: items.map((item: any) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      amount,
      currency: "INR",
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "razorpay",
      razorpayOrderId: razorpayOrder.id,
      shippingAddress,
    });

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      dbOrderId: order._id.toString(),
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

