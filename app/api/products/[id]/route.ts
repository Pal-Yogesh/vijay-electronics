import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import mongoose from "mongoose";

// GET: Fetch single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await ProductModel.findById(id).lean().exec();

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const formattedProduct = {
      ...product,
      id: product._id.toString(),
      _id: product._id.toString(),
    };

    return NextResponse.json({ product: formattedProduct });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Find the product first
    const product = await ProductModel.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Handle each field properly by updating the product document
    if (body.name !== undefined) product.name = body.name;
    if (body.brand !== undefined) product.brand = body.brand;
    if (body.category !== undefined) product.category = body.category;
    if (body.modelNumber !== undefined) product.modelNumber = body.modelNumber;
    if (body.description !== undefined) product.description = body.description;
    if (body.specifications !== undefined) product.specifications = body.specifications;
    if (body.images !== undefined) {
      console.log("Updating images array:", body.images);
      product.images = body.images;
    }
    if (body.isActive !== undefined) product.isActive = body.isActive;
    if (body.isFeatured !== undefined) product.isFeatured = body.isFeatured;

    // Handle price
    if (body.price !== undefined && body.price !== "") {
      product.price = parseFloat(body.price);
    }

    // Handle discountPrice - explicitly set to undefined or null to remove it
    if (body.discountPrice !== undefined) {
      if (body.discountPrice === "" || body.discountPrice === null) {
        product.discountPrice = undefined; // This will remove the field if it's optional
      } else {
        product.discountPrice = parseFloat(body.discountPrice);
      }
    }

    // Handle stock
    if (body.stock !== undefined && body.stock !== "") {
      product.stock = parseInt(body.stock);
    }

    // Save the document - this will run validators with access to the full document
    await product.save();

    const formattedProduct = {
      ...product.toObject(),
      id: product._id.toString(),
      _id: product._id.toString(),
    };

    return NextResponse.json({
      message: "Product updated successfully",
      product: formattedProduct,
    });
  } catch (error: any) {
    console.error("Error updating product:", error);

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

// DELETE: Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await ProductModel.findByIdAndDelete(id).exec();

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
