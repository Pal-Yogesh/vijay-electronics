import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import WishlistModel from "@/models/Wishlist";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ items: [] });
    }

    await connectDB();
    const wishlist = await WishlistModel.findOne({ userId });

    return NextResponse.json({ items: wishlist?.items || [] });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
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
    
    const wishlist = await WishlistModel.findOneAndUpdate(
      { userId },
      { items },
      { upsert: true, new: true }
    );

    return NextResponse.json({ items: wishlist.items });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

