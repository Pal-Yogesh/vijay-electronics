"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  Loader2,
  X,
  ShoppingCart,
  Heart,
  Check,
  Minus,
  ArrowLeft,
  Scale,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CompareProduct {
  _id: string;
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: string[];
  description: string;
  specifications?: Record<string, string>;
  stock: number;
  isFeatured: boolean;
}

interface CompareResponse {
  products: CompareProduct[];
  specificationKeys: string[];
  comparisonDate: string;
}

export default function CompareProductsPage() {
  const router = useRouter();
  const { compareIds, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const [compareData, setCompareData] = useState<CompareResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (compareIds.length < 2) {
      setIsLoading(false);
      return;
    }

    const fetchCompareData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/products/compare?ids=${compareIds.join(",")}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch comparison data");
        }

        setCompareData(data);
      } catch (err: any) {
        console.error("Error fetching compare data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompareData();
  }, [compareIds]);

  const handleRemoveProduct = (id: string) => {
    removeFromCompare(id);
  };

  const handleAddToCart = (product: CompareProduct) => {
    addToCart({
      id: product._id || product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      quantity: 1,
      image: product.images?.[0],
      brand: product.brand,
      category: product.category,
    });
  };

  const handleAddToWishlist = (product: CompareProduct) => {
    addToWishlist({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      category: product.category,
      brand: product.brand,
      stock: product.stock,
      sale: !!product.discountPrice,
      salePrice: product.discountPrice,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F0ECE4]">
        <Navbar />
        <div className="grow flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#0C2730] mb-4" />
          <p className="text-gray-600 font-medium text-lg">
            Loading comparison...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (compareIds.length < 2) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F0ECE4]">
        <Navbar />
        <main className="grow flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-12 max-w-2xl w-full text-center shadow-xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-3xl font-black text-[#0C2730] mb-4">
              No Products to Compare
            </h1>
            <p className="text-gray-500 mb-8 text-lg">
              Add at least 2 products to start comparing their features and
              specifications.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#0C2730] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#14404B] transition-all shadow-xl shadow-[#0C2730]/20"
            >
              <ArrowLeft className="w-5 h-5" />
              Browse Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F0ECE4]">
        <Navbar />
        <main className="grow flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-12 max-w-2xl w-full text-center shadow-xl border border-red-100">
            <h1 className="text-3xl font-black text-red-600 mb-4">
              Error Loading Comparison
            </h1>
            <p className="text-gray-500 mb-8">{error}</p>
            <button
              onClick={() => router.push("/products")}
              className="bg-[#0C2730] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#14404B] transition-all"
            >
              Back to Products
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const products = compareData?.products || [];
  const specKeys = compareData?.specificationKeys || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#F0ECE4]">
      <Navbar />
      <main className="grow container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[#0C2730] mb-2 tracking-tight">
                Product Comparison
              </h1>
              <p className="text-gray-500 text-lg">
                Compare up to 3 products side by side
              </p>
            </div>
            <button
              onClick={clearCompare}
              className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold hover:bg-red-100 transition-all flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Clear All
            </button>
          </div>
        </div>

        {/* Comparison Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="p-8 text-left bg-gray-50 w-1/4 sticky left-0 z-10">
                    <span className="text-sm font-black uppercase tracking-widest text-gray-400">
                      Features
                    </span>
                  </th>
                  {products.map((product) => (
                    <th key={product.id} className="p-8 bg-gray-50 relative">
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="absolute top-4 right-4 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-50 rounded-2xl mb-4 relative overflow-hidden border border-gray-100">
                          {product.images?.[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-contain p-4"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <ShoppingCart className="w-12 h-12" />
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/products/${product.id}`}
                          className="font-bold text-gray-900 text-center hover:text-[#0C2730] transition-colors mb-1"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                          {product.brand}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price Row */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-bold text-gray-900 sticky left-0 bg-white">
                    Price
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-6 text-center">
                      <div className="flex flex-col items-center">
                        {product.discountPrice &&
                        product.discountPrice < product.price ? (
                          <>
                            <p className="text-sm text-gray-400 line-through font-bold">
                              ₹{product.price.toLocaleString()}
                            </p>
                            <p className="text-2xl font-black text-[#0C2730]">
                              ₹{product.discountPrice.toLocaleString()}
                            </p>
                          </>
                        ) : (
                          <p className="text-2xl font-black text-[#0C2730]">
                            ₹{product.price.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Category Row */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-bold text-gray-900 sticky left-0 bg-white">
                    Category
                  </td>
                  {products.map((product) => (
                    <td
                      key={product.id}
                      className="p-6 text-center text-gray-700"
                    >
                      <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
                        {product.category}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Stock Row */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-bold text-gray-900 sticky left-0 bg-white">
                    Availability
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-6 text-center">
                      {product.stock > 0 ? (
                        <span className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-bold">
                          <Check className="w-4 h-4" />
                          In Stock ({product.stock})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-bold">
                          <Minus className="w-4 h-4" />
                          Out of Stock
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Specifications */}
                {specKeys.map((key) => (
                  <tr
                    key={key}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-6 font-bold text-gray-900 sticky left-0 bg-white capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </td>
                    {products.map((product) => (
                      <td
                        key={product.id}
                        className="p-6 text-center text-gray-700"
                      >
                        {product.specifications?.[key] || (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Actions Row */}
                <tr className="bg-gray-50">
                  <td className="p-6 font-bold text-gray-900 sticky left-0 bg-gray-50">
                    Actions
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-6">
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-[#0C2730] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#14404B] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0C2730]/20"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleAddToWishlist(product)}
                          disabled={isInWishlist(product.id)}
                          className={`${
                            isInWishlist(product.id)
                              ? "bg-pink-100 text-pink-600"
                              : "bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                          } px-6 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isInWishlist(product.id) ? "fill-current" : ""
                            }`}
                          />
                          {isInWishlist(product.id) ? "In Wishlist" : "Wishlist"}
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison Cards - Mobile */}
        <div className="lg:hidden space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-gray-100"
            >
              <div className="relative">
                <button
                  onClick={() => handleRemoveProduct(product.id)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="h-64 bg-gray-50 relative">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-contain p-8"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ShoppingCart className="w-16 h-16" />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">
                    {product.brand}
                  </p>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 hover:text-[#0C2730] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                </div>

                <div className="flex items-center justify-between py-4 border-y border-gray-100">
                  <span className="text-sm font-bold text-gray-500">Price</span>
                  <div className="text-right">
                    {product.discountPrice &&
                    product.discountPrice < product.price ? (
                      <>
                        <p className="text-xs text-gray-400 line-through">
                          ₹{product.price.toLocaleString()}
                        </p>
                        <p className="text-2xl font-black text-[#0C2730]">
                          ₹{product.discountPrice.toLocaleString()}
                        </p>
                      </>
                    ) : (
                      <p className="text-2xl font-black text-[#0C2730]">
                        ₹{product.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-gray-500">
                      Category
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-500">
                      Availability
                    </span>
                    {product.stock > 0 ? (
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                        <Check className="w-3 h-3" />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                        <Minus className="w-3 h-3" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {product.specifications &&
                  Object.keys(product.specifications).length > 0 && (
                    <div className="pt-4 border-t border-gray-100 space-y-2">
                      <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3">
                        Specifications
                      </h4>
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-500 font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="text-gray-900 font-bold">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}

                <div className="flex flex-col gap-3 pt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#0C2730] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#14404B] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0C2730]/20"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    disabled={isInWishlist(product.id)}
                    className={`${
                      isInWishlist(product.id)
                        ? "bg-pink-100 text-pink-600"
                        : "bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    } px-6 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist(product.id) ? "fill-current" : ""
                      }`}
                    />
                    {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

