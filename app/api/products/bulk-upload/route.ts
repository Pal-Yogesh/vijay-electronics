import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import { isAdmin } from "@/lib/admin";

// Fields that map directly to Product schema (not specifications)
const BASE_FIELDS = new Set([
  "name", "brand", "brandName", "category", "modelNumber", "price",
  "discountPrice", "stock", "description", "images", "thumbnail",
  "isActive", "isFeatured",
]);

interface UploadResult {
  total: number;
  success: number;
  failed: number;
  errors: { row: number; name: string; error: string }[];
}

export async function POST(request: NextRequest) {
  try {
    const isUserAdmin = await isAdmin();
    if (!isUserAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { products, category } = body;

    if (!category) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }
    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: "No products found in the uploaded file." }, { status: 400 });
    }
    if (products.length > 500) {
      return NextResponse.json({ error: "Maximum 500 products per upload." }, { status: 400 });
    }

    const result: UploadResult = { total: products.length, success: 0, failed: 0, errors: [] };
    const validProducts = [];

    for (let i = 0; i < products.length; i++) {
      const row = products[i];
      const rowNum = i + 2;

      try {
        // Support both "brand" and "brandName" columns
        const brand = row.brand || row.brandName;
        const name = row.name;
        const modelNumber = row.modelNumber;
        const price = row.price;
        const description = row.description;

        if (!name || !brand || !modelNumber || !price || !description) {
          throw new Error("Missing required fields (name, brand/brandName, modelNumber, price, description)");
        }

        // Build images array from "images" and "thumbnail" columns
        // Support comma-separated, newline-separated, or mixed
        let images: string[] = [];
        if (row.images) {
          images = String(row.images)
            .split(/[\n\r,]+/)
            .map((u: string) => u.trim())
            .filter((u: string) => u.length > 0 && u.startsWith("http"));
        }
        if (row.thumbnail) {
          const thumb = String(row.thumbnail).trim();
          if (thumb && thumb.startsWith("http") && !images.includes(thumb)) {
            images.unshift(thumb); // thumbnail as first image
          }
        }

        // Everything not in BASE_FIELDS goes into specifications
        const specifications: Record<string, any> = {};
        for (const [key, value] of Object.entries(row)) {
          if (!BASE_FIELDS.has(key) && value !== "" && value !== null && value !== undefined) {
            const strVal = String(value).toLowerCase();
            if (strVal === "true" || strVal === "yes") {
              specifications[key] = true;
            } else if (strVal === "false" || strVal === "no") {
              specifications[key] = false;
            } else {
              specifications[key] = value;
            }
          }
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice < 0) {
          throw new Error(`Invalid price: ${price}`);
        }

        const discountPrice = row.discountPrice ? parseFloat(row.discountPrice) : undefined;
        if (discountPrice !== undefined && (isNaN(discountPrice) || discountPrice > parsedPrice)) {
          throw new Error(`Discount price (${row.discountPrice}) must be less than price (${price})`);
        }

        // Handle isActive — support "yes"/"no" and true/false
        let isActive = true;
        if (row.isActive !== undefined && row.isActive !== "") {
          const val = String(row.isActive).toLowerCase();
          isActive = val === "true" || val === "yes" || val === "1";
        }

        const productData: Record<string, any> = {
          name: String(name).trim(),
          brand: String(brand).trim(),
          category,
          modelNumber: String(modelNumber).trim(),
          price: parsedPrice,
          stock: row.stock ? parseInt(row.stock) : 0,
          description: String(description).trim(),
          images,
          specifications,
          isActive,
          isFeatured: row.isFeatured ? String(row.isFeatured).toLowerCase() === "true" : false,
        };

        if (discountPrice !== undefined) {
          productData.discountPrice = discountPrice;
        }

        validProducts.push({ data: productData, rowNum, name: productData.name });
      } catch (err: any) {
        result.failed++;
        result.errors.push({ row: rowNum, name: row.name || "Unknown", error: err.message });
      }
    }

    // Bulk insert
    if (validProducts.length > 0) {
      try {
        await ProductModel.insertMany(validProducts.map((p) => p.data), { ordered: false });
        result.success = validProducts.length;
      } catch (err: any) {
        if (err.insertedDocs) {
          result.success = err.insertedDocs.length;
          result.failed += validProducts.length - err.insertedDocs.length;
        } else {
          result.failed += validProducts.length;
          result.errors.push({ row: 0, name: "Bulk Insert", error: err.message });
        }
      }
    }

    return NextResponse.json({
      message: `Upload complete: ${result.success} added, ${result.failed} failed out of ${result.total}`,
      result,
    });
  } catch (error: any) {
    console.error("Bulk upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
