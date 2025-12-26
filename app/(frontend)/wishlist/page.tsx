"use client";
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  X,
  Search,
  Grid,
  List,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCT_CATEGORIES } from "@/types/product";

export default function Wishlist() {
  const { wishlistItems, removeItemFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Items" },
    ...PRODUCT_CATEGORIES.map(cat => ({ id: cat.value, name: cat.label }))
  ];

 
  const getFilteredItems = () => {
    let items = [...wishlistItems];

    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.brand?.toLowerCase().includes(query)
      );
    }

    return items;
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="min-h-screen bg-[#F0ECE4] text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.h1
              className="text-2xl font-bold text-black"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Your Wishlist
            </motion.h1>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Search size={20} />
              </motion.button>

              <div className="flex items-center border rounded-lg overflow-hidden">
                <motion.button
                  whileHover={{
                    backgroundColor:
                      viewMode === "grid" ? "#f3f4f6" : "#f9fafb",
                  }}
                  
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : "bg-white"}`}
                >
                  <Grid size={20} />
                </motion.button>
                <motion.button
                  whileHover={{
                    backgroundColor:
                      viewMode === "list" ? "#f3f4f6" : "#f9fafb",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-gray-100" : "bg-white"}`}
                >
                  <List size={20} />
                </motion.button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 overflow-hidden"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search your wishlist..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14404B]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Categories */}
      <div className="container mx-auto pb-4 pt-6 ">
        <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-[#14404B] text-white"
                  : "bg-gray-100 text-black hover:text-white hover:bg-[#14404B]"
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20">
        <LayoutGroup>
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="bg-gray-100 p-6 rounded-full mb-6">
                <Heart size={40} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 max-w-md mb-8">
                Items you save will appear here. Start browsing and add items
                you love.
              </p>
              <Link
                href="/products"
                className="px-6 py-3 bg-[#14404B] text-white rounded-xl font-medium flex items-center space-x-2"
              >
                <ShoppingBag size={18} />
                <span>Start Shopping</span>
              </Link>
            </motion.div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  " >
              <AnimatePresence>
                {filteredItems.map((item, idx) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.05,
                    }}
                    className="group relative"
                  >
                    <div className=" rounded-2xl overflow-hidden  border-white h-[200px] border-2">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 w-full p-4">
                          <div className="flex justify-between items-center mb-1">
                            <motion.button
                            onClick={() => addToCart({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              quantity: 1,
                              image: item.image,
                              category: item.category,
                              brand: item.brand
                            })}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="py-2 px-4 bg-white text-black rounded-full text-sm font-medium cursor-pointer"
                            >
                              Add to Cart
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              
                              onClick={() => {
                                removeItemFromWishlist(item.id);
                              }}
                              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 cursor-pointer"
                            >
                              <X size={16} />
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {item.sale && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            SALE
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900 truncate max-w-[80%]">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {item.sale ? (
                            <>
                              <span className="text-red-600 font-bold">
                                ₹{item.salePrice?.toLocaleString()}
                              </span>
                              <span className="line-through text-gray-400 text-sm font-bold">
                                ₹{item.price.toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-[#14404B]">₹{item.price.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
                        <span>{item.brand ?? "N/A"}</span>
                        <span>Saved {item.saved ?? "recently"}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-4 md:grid md:grid-cols-2 md:space-x-3">
              <AnimatePresence>
                {filteredItems.map((item, idx) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.05,
                    }}
                    className="bg-white border border-gray-100 rounded-xl overflow-hidden flex shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.sale && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            SALE
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 justify-between p-4">
                      <div className="pr-4">
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.brand ?? "N/A"}
                        </div>
                        <div className="mt-2">
                          {item.sale ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-red-600 font-bold">
                                ₹{item.salePrice?.toLocaleString()}
                              </span>
                              <span className="line-through text-gray-400 text-sm font-bold">
                                ₹{item.price.toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-[#14404B]">₹{item.price.toLocaleString()}</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Saved {item.saved ?? "recently"}
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-end">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            removeItemFromWishlist(item.id);
                            // Force a state update
                            // setWishlistItems([...wishlistItems.filter(i => i.id !== item.id)]);
                          }}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={18} />
                        </motion.button>

                        <motion.button
                        onClick={() => addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          quantity: 1,
                          image: item.image,
                          category: item.category,
                          brand: item.brand
                        })}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="py-2 px-4 bg-[#14404B] cursor-pointer text-white rounded-lg text-sm font-medium mt-2"
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence> 
            </div>
          )}
        </LayoutGroup>
      </main>

      {/* <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style> */}
    </div>
  );
}
