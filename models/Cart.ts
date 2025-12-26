import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  brand?: string;
}

export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String },
  category: { type: String },
  brand: { type: String },
});

const CartSchema = new Schema<ICart>(
  {
    userId: { type: String, required: true, unique: true },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

const CartModel = mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);

export default CartModel;

