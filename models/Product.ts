import mongoose, { Schema, Model, models } from "mongoose";
import { Product } from "@/types/product";

// Define the Product Schema
const ProductSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "television",
        "refrigerator",
        "washingmachine",
        "airconditioner",
        "bluetoothspeaker",
        "sewingmachine",
        "fan",
        "cooler",
        "iron",
        "mixerjuicer",
        "microwave",
        "induction",
        "waterheater",
      ],
    },
    modelNumber: {
      type: String,
      required: [true, "Model number is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
      validate: {
        validator: function (this: any, value: number) {
          return !value || value <= this.price;
        },
        message: "Discount price must be less than or equal to the regular price",
      },
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    specifications: {
      type: Schema.Types.Mixed,
      default: {},
    },
    images: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create indexes for better query performance
ProductSchema.index({ name: "text", brand: "text", description: "text" });
ProductSchema.index({ category: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ createdAt: -1 });

// Prevent model recompilation during development
const ProductModel: Model<Product> =
  models.Product || mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;

