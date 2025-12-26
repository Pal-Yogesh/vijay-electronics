import mongoose, { Schema, Document } from "mongoose";

export interface IWishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  brand?: string;
  stock?: number;
  sale?: boolean;
  salePrice?: number;
  saved?: string;
}

export interface IWishlist extends Document {
  userId: string;
  items: IWishlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistItemSchema = new Schema<IWishlistItem>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String },
  brand: { type: String },
  stock: { type: Number },
  sale: { type: Boolean },
  salePrice: { type: Number },
  saved: { type: String },
});

const WishlistSchema = new Schema<IWishlist>(
  {
    userId: { type: String, required: true, unique: true },
    items: [WishlistItemSchema],
  },
  { timestamps: true }
);

const WishlistModel =
  mongoose.models.Wishlist || mongoose.model<IWishlist>("Wishlist", WishlistSchema);

export default WishlistModel;

