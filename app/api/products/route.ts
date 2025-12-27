import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import { isAdmin } from "@/lib/admin";

// GET: Fetch all products or search
export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const active = searchParams.get("active");
    const featured = searchParams.get("featured");

    // Build query
    let filter: any = {};

    if (query) {
      filter.$text = { $search: query };
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    if (active === "true") {
      filter.isActive = true;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    // Fetch products from MongoDB
    const products = await ProductModel.find(filter)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Convert MongoDB _id to id for frontend compatibility
    const formattedProducts = products.map((product) => ({
      ...product,
      id: product._id.toString(),
      _id: product._id.toString(),
    }));

    return NextResponse.json({
      products: formattedProducts,
      count: formattedProducts.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Create new product
export async function POST(request: NextRequest) {
  try {
    const isUserAdmin = await isAdmin();

    if (!isUserAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "name",
      "brand",
      "category",
      "modelNumber",
      "price",
      "stock",
      "description",
    ];

    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Convert string prices to numbers, handle empty strings
    const productData = {
      ...body,
      price: parseFloat(body.price),
      discountPrice: body.discountPrice && body.discountPrice !== "" 
        ? parseFloat(body.discountPrice) 
        : undefined,
      stock: parseInt(body.stock),
    };

    // Remove undefined values
    const cleanedData = Object.fromEntries(
      Object.entries(productData).filter(([_, value]) => value !== undefined)
    );

    // Create product in MongoDB
    const product = await ProductModel.create(cleanedData);

    // Format response
    const productObject = product.toObject();
    const formattedProduct = {
      ...productObject,
      id: product._id.toString(),
      _id: product._id.toString(),
    };

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: formattedProduct,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: "Validation error", details: errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
