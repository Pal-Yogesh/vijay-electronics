"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import Image from "next/image";
import { Plus, Star, ImageIcon, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const EnhancedTabComponent = () => {
  const { products, isLoading } = useProducts();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, left: 0 });

  const tabs = [
    { label: "TV", icon: "tv", category: "television" },
    { label: "Refrigerator", icon: "refrigerator", category: "refrigerator" },
    { label: "Washing Machine", icon: "washing-machine", category: "washingmachine" },
    { label: "AC", icon: "ac", category: "airconditioner" },
    { label: "Mixer Grinder", icon: "mixer-grinder", category: "mixerjuicer" },
    { label: "Ceiling Fan", icon: "ceiling-fan", category: "fan" },
  ];

  // Update indicator dimensions when active tab changes
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const el = tabRefs.current[activeTab];
      if (el) {
        setDimensions({ width: el.offsetWidth, left: el.offsetLeft });
      }
    }
  }, [activeTab, isLoading]);

  const filteredProducts = useMemo(() => {
    const activeCategory = tabs[activeTab].category;
    return products.filter(p => p.category === activeCategory).slice(0, 6);
  }, [products, activeTab]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-[#0C2730] mb-4" />
        <p className="text-gray-600 font-medium">Loading amazing products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-6 text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Our Products Highlights
      </motion.h1>

      <motion.p
        className="text-gray-600 text-center max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Discover our latest products and innovations designed to enhance your
        everyday life.
      </motion.p>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-16 overflow-x-auto pb-4 scrollbar-hide">
        <div className="relative flex space-x-1 md:space-x-3 bg-gray-100 p-1 rounded-full whitespace-nowrap">
          {/* Animated Background for Active Tab */}
          <motion.div
            className="absolute h-full top-0 rounded-full bg-[#0C2730] shadow-lg"
            animate={{
              width: dimensions.width,
              left: dimensions.left,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />

          {tabs.map((tab, index) => (
            <motion.button
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => setActiveTab(index)}
              onMouseEnter={() => setHoveredTab(index)}
              onMouseLeave={() => setHoveredTab(null)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className={`relative z-10 py-2 cursor-pointer px-4 md:px-6 rounded-full text-sm md:text-base font-medium transition-all duration-300 
                ${activeTab === index ? "text-white" : "text-gray-600"}
                `}
            >
              <div className="flex items-center justify-center space-x-2">
                <TabIcon name={tab.icon} active={activeTab === index} />
                <span>{tab.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="min-h-[400px]"
        >
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <EnhancedProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-xl font-medium">No products found in this category</p>
              <p className="text-sm mt-2 text-gray-500">Check back soon for new arrivals!</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      <div className="mt-16 text-center">
        <Link 
          href="/shop"
          className="inline-flex items-center justify-center px-8 py-4 bg-[#0C2730] text-white font-bold rounded-full hover:bg-[#14404B] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

// Enhanced Product Card Component
const EnhancedProductCard = ({ product }: { product: any }) => {
  const imageUrl = product.images?.[0] ?? "";
  const { addToCart } = useCart();
  
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
      }}
    >
      <Link href={`/products/${product._id || product.id}`} className="block relative overflow-hidden group">
        <div className="h-72 bg-gray-50 relative">
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={product.name} 
              fill 
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-110" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <ImageIcon className="w-16 h-16" />
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <motion.div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category tag */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#0C2730] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm border border-gray-100">
          {product.category}
        </div>
        
        {product.isFeatured && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm border border-yellow-300">
            Featured
          </div>
        )}
      </Link>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-2">
          <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-tighter">{product.brand}</p>
          <Link href={`/products/${product._id || product.id}`}>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 hover:text-[#0C2730] transition-colors">{product.name}</h3>
          </Link>
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-400 ml-1 font-medium">(4.9)</span>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <div className="flex flex-col">
            {product.discountPrice && product.discountPrice < product.price ? (
              <>
                <p className="text-sm text-gray-400 line-through">₹{product.price.toLocaleString()}</p>
                <p className="text-2xl font-black text-[#0C2730]">₹{product.discountPrice.toLocaleString()}</p>
              </>
            ) : (
              <p className="text-2xl font-black text-[#0C2730]">₹{product.price.toLocaleString()}</p>
            )}
          </div>
          <motion.button
            onClick={(e) => {
              e.preventDefault();
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
            className="bg-[#0C2730] text-white p-3 rounded-xl shadow-lg shadow-[#0C2730]/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Tab Icons Component
const TabIcon = ({ name, active }: { name: string; active: boolean }) => {
  const icons: Record<string, React.ReactNode> = {
    tv: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
        <polyline points="17 2 12 7 7 2" />
      </svg>
    ),
    refrigerator: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="5" y1="10" x2="19" y2="10" />
        <line x1="9" y1="13" x2="9" y2="13" />
      </svg>
    ),
    "washing-machine": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="2" width="18" height="20" rx="2" />
        <circle cx="12" cy="12" r="5" />
        <path d="M12 7v10M15 9.5l-6 6M9 9.5l6 6" />
      </svg>
    ),
    ac: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="12" rx="2" />
        <line x1="6" y1="10" x2="6" y2="10" />
        <line x1="18" y1="10" x2="18" y2="10" />
        <path d="M6 16l2 4m10-4l-2 4m-6-4l-1.5 4m8.5-4l1.5 4" />
      </svg>
    ),
    "mixer-grinder": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="3" width="12" height="8" rx="2" />
        <path d="M6 11h12v5a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3v-5z" />
        <line x1="10" y1="21" x2="14" y2="21" />
      </svg>
    ),
    "ceiling-fan": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="2" />
        <path d="M12 4V2m0 20v-2M4.93 6.93L3.52 5.52M20.48 5.52l-1.41 1.41M4 12H2m20 0h-2M6.93 19.07l-1.41 1.41M18.07 19.07l1.41 1.41" />
      </svg>
    ),
  };

  return icons[name] || null;
};

export default EnhancedTabComponent;

