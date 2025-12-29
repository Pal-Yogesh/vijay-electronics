import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import mongoose from "mongoose";

// GET: Compare products by IDs
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const idsParam = searchParams.get("ids");

    if (!idsParam) {
      return NextResponse.json(
        { error: "Product IDs are required" },
        { status: 400 }
      );
    }

    // Parse and validate product IDs
    const ids = idsParam.split(",").filter((id) => id.trim());

    if (ids.length < 2) {
      return NextResponse.json(
        { error: "At least 2 products are required for comparison" },
        { status: 400 }
      );
    }

    if (ids.length > 3) {
      return NextResponse.json(
        { error: "Maximum 3 products can be compared at once" },
        { status: 400 }
      );
    }

    // Validate all IDs are valid MongoDB ObjectIds
    const invalidIds = ids.filter((id) => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return NextResponse.json(
        { error: `Invalid product IDs: ${invalidIds.join(", ")}` },
        { status: 400 }
      );
    }

    // Fetch products from database
    const products = await ProductModel.find({
      _id: { $in: ids },
    })
      .lean()
      .exec();

    if (products.length === 0) {
      return NextResponse.json(
        { error: "No products found with the provided IDs" },
        { status: 404 }
      );
    }

    if (products.length < ids.length) {
      return NextResponse.json(
        {
          error: "Some products were not found",
          foundCount: products.length,
          requestedCount: ids.length,
        },
        { status: 404 }
      );
    }

    // Format products for comparison
    const formattedProducts = products.map((product) => ({
      ...product,
      id: product._id.toString(),
      _id: product._id.toString(),
    }));

    // Extract common specification keys for comparison
    const allSpecKeys = new Set<string>();
    formattedProducts.forEach((product) => {
      if (product.specifications) {
        Object.keys(product.specifications).forEach((key) =>
          allSpecKeys.add(key)
        );
      }
    });

    return NextResponse.json({
      products: formattedProducts,
      specificationKeys: Array.from(allSpecKeys),
      comparisonDate: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error comparing products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

