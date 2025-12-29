"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";
import { useProducts } from "@/context/ProductContext";
import { PRODUCT_CATEGORIES } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Star, ImageIcon, Loader2, Plus, Scale } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";

function AllProductsContent() {
  const { products, isLoading } = useProducts();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  if (isLoading) {
    return (
      <div className="grow flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#0C2730] mb-4" />
        <p className="text-gray-600 font-medium text-lg">Loading our catalog...</p>
      </div>
    );
  }

  return (
    <main className="grow container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-[#0C2730] mb-4 tracking-tight">Our Full Catalog</h1>
        <p className="text-gray-500 max-w-2xl text-lg">
          Explore our entire range of high-quality electronics, from state-of-the-art TVs to essential home appliances.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-sm border border-gray-100 mb-12 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0C2730] transition-colors" />
          <input
            type="text"
            placeholder="Search by name, brand, or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0C2730]/10 focus:bg-white transition-all text-gray-900 font-medium"
          />
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          <Filter className="text-gray-400 shrink-0 hidden md:block" />
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-[#0C2730] text-white shadow-lg shadow-[#0C2730]/20"
                : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`}
          >
            All Categories
          </button>
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? "bg-[#0C2730] text-white shadow-lg shadow-[#0C2730]/20"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-8 flex items-center justify-between">
        <p className="text-gray-500 font-medium">
          Showing <span className="text-[#0C2730] font-bold">{filteredProducts.length}</span> products
        </p>
      </div>

      {/* Product Grid */}
      <AnimatePresence mode="wait">
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200"
          >
            <div className="w-24 h-24 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {setSearchQuery(""); setSelectedCategory("all");}}
              className="mt-8 text-[#0C2730] font-bold hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function AllProductsPage() {
  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      <Navbar />
      <Suspense fallback={
        <div className="grow flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#0C2730] mb-4" />
          <p className="text-gray-600 font-medium text-lg">Loading our catalog...</p>
        </div>
      }>
        <AllProductsContent />
      </Suspense>
      <Footer />
    </div>
  );
}

const ProductCard = ({ product }: { product: any }) => {
  const imageUrl = product.images?.[0] ?? "";
  const { addToCart } = useCart();
  const { addToCompare, isInCompare } = useCompare();
  
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
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <ImageIcon className="w-12 h-12" />
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur-md text-[#0C2730] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
            {product.category}
          </div>
          {product.isFeatured && (
            <div className="bg-yellow-400 text-yellow-950 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
              Featured
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

        <div className="flex items-center gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-[10px] text-gray-400 ml-2 font-black tracking-widest">4.9/5</span>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex justify-between items-center">
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
          <button
            onClick={() => {
              addToCompare(product._id || product.id);
              if (!isInCompare(product._id || product.id)) {
                alert("Added to compare!");
              }
            }}
            disabled={isInCompare(product._id || product.id)}
            className={`w-full py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              isInCompare(product._id || product.id)
                ? "bg-purple-100 text-purple-600 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            }`}
          >
            <Scale className="w-4 h-4" />
            {isInCompare(product._id || product.id) ? "In Compare" : "Compare"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

