import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import CartModel from "@/models/Cart";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ items: [] });
    }

    await connectDB();
    const cart = await CartModel.findOne({ userId });

    return NextResponse.json({ items: cart?.items || [] });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items } = await request.json();

    await connectDB();
    
    const cart = await CartModel.findOneAndUpdate(
      { userId },
      { items },
      { upsert: true, new: true }
    );

    return NextResponse.json({ items: cart.items });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

