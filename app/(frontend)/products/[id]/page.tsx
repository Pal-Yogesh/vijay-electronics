"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product, PRODUCT_CATEGORIES } from "@/types/product";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Star, 
  ImageIcon, 
  Loader2, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  RefreshCcw 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function PublicProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data.product);
        if (data.product?.images?.length > 0) {
          setActiveImage(data.product.images[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#0C2730]" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col ">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <ImageIcon className="w-10 h-10 text-gray-300" />
          </div>
          <h1 className="text-3xl font-black text-[#0C2730] mb-4">Oops! Product Not Found</h1>
          <p className="text-gray-500 mb-8 max-w-md">The electronics you're looking for might have moved or been discontinued.</p>
          <Link href="/products" className="bg-[#0C2730] text-white px-8 py-4 rounded-full font-bold">
            Browse All Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id || product.id || "",
        name: product.name,
        price: product.discountPrice || product.price,
        quantity: quantity,
        image: product.images?.[0]
      });
      alert("Added to cart!");
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist({
        id: product._id || product.id || "",
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.images?.[0]
      });
      alert("Added to wishlist!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#0C2730]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-[#0C2730]">Catalog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#0C2730]">{product.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Left: Images */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100 group shadow-inner">
              {activeImage ? (
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-contain p-8 md:p-16 transition-transform duration-700 hover:scale-110"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-200">
                  <ImageIcon className="w-20 h-20" />
                </div>
              )}
              
              {product.isFeatured && (
                <div className="absolute top-8 left-8 bg-yellow-400 text-yellow-950 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Featured Choice
                </div>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-4">
                {product.images.map((url) => (
                  <button
                    key={url}
                    onClick={() => setActiveImage(url)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all p-2 bg-gray-50 ${
                      activeImage === url
                        ? "border-[#0C2730] ring-4 ring-[#0C2730]/5 scale-95"
                        : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    <Image src={url} alt="Thumbnail" fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-2">{product.brand}</p>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm font-bold text-gray-900 ml-2">4.9</span>
                  <span className="text-sm text-gray-400 ml-1 font-medium">(128 Reviews)</span>
                </div>
                <div className="h-4 w-px bg-gray-200" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-bold text-gray-600">In Stock ({product.stock})</span>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                <div className="flex items-end gap-4 mb-2">
                  {product.discountPrice ? (
                    <>
                      <span className="text-5xl font-black text-[#0C2730]">₹{product.discountPrice.toLocaleString()}</span>
                      <span className="text-xl text-gray-400 line-through font-bold mb-1">₹{product.price.toLocaleString()}</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                        Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                      </span>
                    </>
                  ) : (
                    <span className="text-5xl font-black text-[#0C2730]">₹{product.price.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-gray-500 text-sm font-medium">Inclusive of all taxes</p>
              </div>
            </div>

            <div className="space-y-8 mb-10">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-white rounded-xl transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-black">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-white rounded-xl transition-colors"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#0C2730] text-white py-4 px-8 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#14404B] transition-all shadow-xl shadow-[#0C2730]/20 active:scale-95"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Shopping Bag
                </button>
                <button 
                  onClick={handleAddToWishlist}
                  className="w-14 h-14 border-2 border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all active:scale-95"
                >
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Truck, text: "Fast Delivery" },
                  { icon: ShieldCheck, text: "1 Year Warranty" },
                  { icon: RefreshCcw, text: "7 Day Return" },
                  { icon: CheckCircle2, text: "Quality Guranteed" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50/50 border border-gray-50">
                    <item.icon className="w-5 h-5 text-gray-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Product Description</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {product.description ?? "No description available for this product."}
              </p>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-black text-[#0C2730] mb-12">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
              {Object.entries(product.specifications).map(([key, value]) => {
                if (!value || value === "" || value === false) return null;
                return (
                  <div key={key} className="flex items-center justify-between py-4 border-b border-gray-50 group hover:bg-gray-50 px-4 rounded-xl transition-colors">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-bold text-gray-900 text-right">
                      {typeof value === 'boolean' ? 'Yes' : value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

