"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";
import { useProducts } from "@/context/ProductContext";
import { PRODUCT_CATEGORIES } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, Star, ImageIcon, Loader2, Plus, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CategoryProductsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { products, isLoading } = useProducts();

  // Map slug back to category value
  const categoryInfo = useMemo(() => {
    return PRODUCT_CATEGORIES.find(c => 
      c.value.toLowerCase().replace(/\s/g, "-") === slug || 
      c.label.toLowerCase().replace(/\s/g, "-") === slug
    );
  }, [slug]);

  const filteredProducts = useMemo(() => {
    if (!categoryInfo) return [];
    return products.filter((product) => product.category === categoryInfo.value);
  }, [products, categoryInfo]);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#0C2730] mb-8 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl font-black text-[#0C2730] mb-4 tracking-tight capitalize">
            {categoryInfo?.label ?? slug.replace(/-/g, " ")}
          </h1>
          <p className="text-gray-500 max-w-2xl text-lg font-medium">
            Discover our premium selection of {categoryInfo?.label.toLowerCase() ?? "products"} designed for performance and reliability.
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
            <ImageIcon className="w-16 h-16 text-gray-200 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">We haven't added any products to this category yet.</p>
            <Link href="/products" className="mt-8 bg-[#0C2730] text-white px-8 py-4 rounded-full font-bold">
              Explore Other Categories
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Reusing the ProductCard for consistency
const ProductCard = ({ product }: { product: any }) => {
  const imageUrl = product.images?.[0] ?? "";
  const { addToCart } = useCart();
  
  return (
    <motion.div
      layout
      className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col group hover:shadow-2xl hover:shadow-[#0C2730]/5 transition-all duration-500"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ y: -12 }}
    >
      <Link href={`/products/${product._id || product.id}`} className="block relative overflow-hidden">
        <div className="h-64 bg-gray-50 relative">
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={product.name} 
              fill 
              className="object-contain p-8 transition-transform duration-700 group-hover:scale-110" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-200">
              <ImageIcon className="w-12 h-12" />
            </div>
          )}
        </div>
      </Link>

      <div className="p-8 flex-1 flex flex-col">
        <div className="mb-4">
          <p className="text-[10px] text-gray-400 font-black mb-1 uppercase tracking-[0.2em]">{product.brand}</p>
          <Link href={`/products/${product._id || product.id}`}>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#0C2730] transition-colors">{product.name}</h3>
          </Link>
        </div>

        <div className="mt-auto flex justify-between items-center gap-4">
          <div className="flex flex-col">
            {product.discountPrice && product.discountPrice < product.price ? (
              <>
                <p className="text-xs text-gray-400 line-through font-bold">₹{product.price.toLocaleString()}</p>
                <p className="text-2xl font-black text-[#0C2730]">₹{product.discountPrice.toLocaleString()}</p>
              </>
            ) : (
              <p className="text-2xl font-black text-[#0C2730]">₹{product.price.toLocaleString()}</p>
            )}
          </div>
          <motion.button
            onClick={() => {
              addToCart({
                id: product._id || product.id,
                name: product.name,
                price: product.discountPrice || product.price,
                quantity: 1,
                image: imageUrl,
                brand: product.brand,
                category: product.category
              });
              alert("Added to cart!");
            }}
            className="bg-[#0C2730] text-white p-4 rounded-2xl shadow-xl shadow-[#0C2730]/20 active:scale-95 transition-transform"
            whileHover={{ scale: 1.1 }}
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

