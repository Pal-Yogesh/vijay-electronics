import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ProductModel from "@/models/Product";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "all";
    const brands = searchParams.get("brands") ? searchParams.get("brands")?.split(",") : [];
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "1000000");
    const sort = searchParams.get("sort") || "newest"; // newest, price-low, price-high, rating

    // Build the query object
    let mongoQuery: any = {
      isActive: true,
    };

    // Text search if query exists
    if (query) {
      mongoQuery.$or = [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    // Category filter
    if (category && category !== "all") {
      mongoQuery.category = category;
    }

    // Brand filter
    if (brands && brands.length > 0) {
      mongoQuery.brand = { $in: brands };
    }

    // Price filter (on discountPrice if it exists, otherwise on price)
    // For simplicity and efficiency, we'll check both
    mongoQuery.$or = [
      {
        $and: [
          { discountPrice: { $exists: true } },
          { discountPrice: { $gte: minPrice, $lte: maxPrice } }
        ]
      },
      {
        $and: [
          { discountPrice: { $exists: false } },
          { price: { $gte: minPrice, $lte: maxPrice } }
        ]
      }
    ];

    // Sorting logic
    let sortOptions: any = {};
    if (sort === "newest") sortOptions = { createdAt: -1 };
    else if (sort === "price-low") sortOptions = { price: 1 };
    else if (sort === "price-high") sortOptions = { price: -1 };
    // Note: Rating would need a field in the model, for now we default to newest

    // Execute query
    const products = await ProductModel.find(mongoQuery)
      .sort(sortOptions)
      .lean()
      .exec();

    // Get metadata for filters (for the UI)
    const allProducts = await ProductModel.find({ isActive: true }).select("brand price discountPrice category").lean();
    
    const uniqueBrands = Array.from(new Set(allProducts.map(p => p.brand))).filter(Boolean).sort();
    const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category))).filter(Boolean).sort();
    
    const prices = allProducts.map(p => p.discountPrice || p.price);
    const absoluteMinPrice = Math.min(...prices, 0);
    const absoluteMaxPrice = Math.max(...prices, 0);

    const formattedProducts = products.map((product) => ({
      ...product,
      id: product._id.toString(),
      _id: product._id.toString(),
    }));

    return NextResponse.json({
      products: formattedProducts,
      metadata: {
        brands: uniqueBrands,
        categories: uniqueCategories,
        minPrice: absoluteMinPrice,
        maxPrice: absoluteMaxPrice,
        count: formattedProducts.length,
      },
    });
  } catch (error) {
    console.error("Error in product filter API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

