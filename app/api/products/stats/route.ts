import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import ProductModel from "@/models/Product";

// GET: Fetch product statistics
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Use MongoDB aggregation for efficient stats
    const [statsResult] = await ProductModel.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
          active: [{ $match: { isActive: true } }, { $count: "count" }],
          inactive: [{ $match: { isActive: false } }, { $count: "count" }],
          lowStock: [
            { $match: { stock: { $gt: 0, $lte: 5 } } },
            { $count: "count" },
          ],
          outOfStock: [{ $match: { stock: 0 } }, { $count: "count" }],
          featured: [{ $match: { isFeatured: true } }, { $count: "count" }],
        },
      },
    ]);

    const stats = {
      total: statsResult.total[0]?.count || 0,
      active: statsResult.active[0]?.count || 0,
      inactive: statsResult.inactive[0]?.count || 0,
      lowStock: statsResult.lowStock[0]?.count || 0,
      outOfStock: statsResult.outOfStock[0]?.count || 0,
      featured: statsResult.featured[0]?.count || 0,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Error fetching product stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
