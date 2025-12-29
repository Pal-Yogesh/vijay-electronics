"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";
import { 
  Filter, 
  Search, 
  ChevronDown, 
  X, 
  Loader2, 
  SlidersHorizontal,
  LayoutGrid,
  List,
  ChevronRight,
  Star,
  Plus,
  Scale,
  ShoppingCart
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";

interface Product {
  _id: string;
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: string[];
  stock: number;
}

interface FilterMetadata {
  brands: string[];
  categories: string[];
  minPrice: number;
  maxPrice: number;
  count: number;
}

function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const { addToCart } = useCart();
  const { addToCompare, isInCompare } = useCompare();

  // State for filters
  const [products, setProducts] = useState<Product[]>([]);
  const [metadata, setMetadata] = useState<FilterMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  // Get current filter values from URL
  const currentQuery = searchParams.get("q") || "";
  const currentCategory = searchParams.get("category") || "all";
  const currentBrands = searchParams.get("brands")?.split(",") || [];
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentSort = searchParams.get("sort") || "newest";

  // Function to update URL params
  const createQueryString = useCallback(
    (params: Record<string, string | string[] | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
          newParams.delete(key);
        } else {
          newParams.set(key, Array.isArray(value) ? value.join(",") : value);
        }
      });
      
      return newParams.toString();
    },
    [searchParams]
  );

  const updateFilters = (newParams: Record<string, string | string[] | null>) => {
    const queryString = createQueryString(newParams);
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  // Fetch products based on filters
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/products/filter?${searchParams.toString()}`);
        const data = await response.json();
        if (response.ok) {
          setProducts(data.products);
          setMetadata(data.metadata);
        }
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [searchParams]);

  const toggleBrand = (brand: string) => {
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter(b => b !== brand)
      : [...currentBrands, brand];
    updateFilters({ brands: newBrands });
  };

  const clearAllFilters = () => {
    router.push(pathname);
  };

  return (
    <main className="grow container mx-auto px-4 py-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#0C2730] tracking-tight">Shop Our Collection</h1>
          <p className="text-gray-500">
            {isLoading ? "Finding products..." : `Showing ${products.length} products`}
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm font-bold text-[#0C2730]"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
          
          <div className="grow md:grow-0 relative">
            <select 
              value={currentSort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="w-full md:w-48 appearance-none bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm font-bold text-[#0C2730] focus:ring-2 focus:ring-[#0C2730]/10 outline-none"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="hidden md:flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
            <button 
              onClick={() => setViewType("grid")}
              className={`p-2 rounded-lg transition-all ${viewType === "grid" ? "bg-gray-100 text-[#0C2730]" : "text-gray-400"}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewType("list")}
              className={`p-2 rounded-lg transition-all ${viewType === "list" ? "bg-gray-100 text-[#0C2730]" : "text-gray-400"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8 relative">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-8 sticky top-24 self-start">
          <FilterSection 
            title="Categories" 
            options={metadata?.categories || []} 
            selected={currentCategory}
            onSelect={(val: string) => updateFilters({ category: val })}
            isCategory
          />
          
          <FilterSection 
            title="Brands" 
            options={metadata?.brands || []} 
            selected={currentBrands}
            onSelect={toggleBrand}
          />

          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <h3 className="font-black text-[#0C2730] uppercase tracking-widest text-xs mb-6">Price Range</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input 
                  type="number" 
                  placeholder="Min"
                  value={currentMinPrice}
                  onChange={(e) => updateFilters({ minPrice: e.target.value })}
                  className="w-1/2 bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#0C2730]/10"
                />
                <input 
                  type="number" 
                  placeholder="Max"
                  value={currentMaxPrice}
                  onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                  className="w-1/2 bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#0C2730]/10"
                />
              </div>
            </div>
          </div>

          {(currentCategory !== "all" || currentBrands.length > 0 || currentMinPrice || currentMaxPrice) && (
            <button 
              onClick={clearAllFilters}
              className="w-full py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all"
            >
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Product Grid */}
        <div className="grow">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-[#0C2730] mb-4" />
              <p className="text-gray-500 font-medium">Updating results...</p>
            </div>
          ) : products.length > 0 ? (
            <div className={viewType === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  viewType={viewType} 
                  addToCart={addToCart}
                  addToCompare={addToCompare}
                  isInCompare={isInCompare}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-[#0C2730] mb-2">No matching products</h2>
              <p className="text-gray-500 mb-8">Try adjusting your filters or search terms to find what you're looking for.</p>
              <button 
                onClick={clearAllFilters}
                className="bg-[#0C2730] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#14404B] transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-[#F0ECE4] z-50 lg:hidden p-6 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-[#0C2730]">Filters</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-white rounded-xl shadow-sm">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                <FilterSection 
                  title="Categories" 
                  options={metadata?.categories || []} 
                  selected={currentCategory}
                  onSelect={(val: string) => updateFilters({ category: val })}
                  isCategory
                />
                
                <FilterSection 
                  title="Brands" 
                  options={metadata?.brands || []} 
                  selected={currentBrands}
                  onSelect={toggleBrand}
                />

                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                  <h3 className="font-black text-[#0C2730] uppercase tracking-widest text-xs mb-6">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="Min"
                        value={currentMinPrice}
                        onChange={(e) => updateFilters({ minPrice: e.target.value })}
                        className="w-1/2 bg-gray-50 border-none rounded-xl p-3 text-sm"
                      />
                      <input 
                        type="number" 
                        placeholder="Max"
                        value={currentMaxPrice}
                        onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                        className="w-1/2 bg-gray-50 border-none rounded-xl p-3 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full bg-[#0C2730] text-white py-4 rounded-2xl font-bold shadow-xl shadow-[#0C2730]/20 mt-4"
                >
                  Show {products.length} Products
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#F0ECE4] flex flex-col">
      <Navbar />
      <Suspense fallback={
        <div className="grow flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#0C2730]" />
        </div>
      }>
        <ShopContent />
      </Suspense>
      <Footer />
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string | string[];
  onSelect: (val: string) => void;
  isCategory?: boolean;
}

const FilterSection = ({ title, options, selected, onSelect, isCategory = false }: FilterSectionProps) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
    <h3 className="font-black text-[#0C2730] uppercase tracking-widest text-xs mb-6">{title}</h3>
    <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
      {isCategory && (
        <button 
          onClick={() => onSelect("all")}
          className={`w-full text-left px-4 py-2 rounded-xl text-sm font-bold transition-all ${selected === "all" ? "bg-[#0C2730] text-white" : "text-gray-500 hover:bg-gray-50"}`}
        >
          All {title}
        </button>
      )}
      {options.map((opt: string) => {
        const isActive = Array.isArray(selected) ? selected.includes(opt) : selected === opt;
        return (
          <button 
            key={opt}
            onClick={() => onSelect(opt)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${isActive ? "bg-[#0C2730] text-white shadow-lg shadow-[#0C2730]/10" : "text-gray-500 hover:bg-gray-50"}`}
          >
            <span className="capitalize">{opt}</span>
            {isActive ? <CheckIcon /> : <Plus className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />}
          </button>
        );
      })}
    </div>
  </div>
);

interface ProductCardProps {
  product: Product;
  viewType: "grid" | "list";
  addToCart: (item: any) => void;
  addToCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
}

const ProductCard = ({ product, viewType, addToCart, addToCompare, isInCompare }: ProductCardProps) => {
  const imageUrl = product.images?.[0] || "";
  
  if (viewType === "list") {
    return (
      <motion.div layout className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex gap-8 group hover:shadow-xl transition-all duration-500">
        <Link href={`/products/${product.id}`} className="w-48 h-48 bg-gray-50 rounded-2xl overflow-hidden shrink-0 relative">
          {imageUrl ? (
            <Image src={imageUrl} alt={product.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300"><LayoutGrid className="w-12 h-12" /></div>
          )}
        </Link>
        <div className="grow flex flex-col py-2">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{product.brand}</p>
              <Link href={`/products/${product.id}`}>
                <h3 className="text-2xl font-bold text-[#0C2730] group-hover:underline underline-offset-4">{product.name}</h3>
              </Link>
            </div>
            <div className="text-right">
              {product.discountPrice ? (
                <>
                  <p className="text-sm text-gray-400 line-through font-bold">₹{product.price.toLocaleString()}</p>
                  <p className="text-2xl font-black text-[#0C2730]">₹{product.discountPrice.toLocaleString()}</p>
                </>
              ) : (
                <p className="text-2xl font-black text-[#0C2730]">₹{product.price.toLocaleString()}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            <span className="text-xs text-gray-400 ml-2 font-bold uppercase tracking-widest">Premium Choice</span>
          </div>
          <p className="text-gray-500 text-sm line-clamp-2 mb-6 max-w-xl">High performance electronics with state-of-the-art features and durable build quality. Perfect for your modern home.</p>
          <div className="mt-auto flex gap-3">
            <button 
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.discountPrice || product.price,
                  quantity: 1,
                  image: imageUrl,
                  brand: product.brand,
                  category: product.category
                });
                alert("Added to cart!");
              }}
              className="bg-[#0C2730] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#14404B] transition-all flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button 
              onClick={() => addToCompare(product.id)}
              className={`p-3 rounded-2xl border transition-all ${isInCompare(product.id) ? "bg-purple-100 border-purple-200 text-purple-600" : "bg-white border-gray-100 text-gray-400 hover:border-purple-200 hover:text-purple-600"}`}
            >
              <Scale className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div layout className="bg-white rounded-[40px] p-6 shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
      <Link href={`/products/${product.id}`} className="block h-64 bg-gray-50 rounded-3xl overflow-hidden mb-6 relative">
        {imageUrl ? (
          <Image src={imageUrl} alt={product.name} fill className="object-contain p-8 group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300"><LayoutGrid className="w-16 h-16" /></div>
        )}
      </Link>
      <div className="flex-1 flex flex-col">
        <div className="mb-4">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">{product.brand}</p>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-bold text-[#0C2730] group-hover:text-[#14404B] transition-colors line-clamp-2 leading-tight">{product.name}</h3>
          </Link>
        </div>
        <div className="flex items-center gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
        </div>
        <div className="mt-auto flex justify-between items-center">
          <div>
            {product.discountPrice ? (
              <>
                <p className="text-xs text-gray-400 line-through font-bold">₹{product.price.toLocaleString()}</p>
                <p className="text-xl font-black text-[#0C2730]">₹{product.discountPrice.toLocaleString()}</p>
              </>
            ) : (
              <p className="text-xl font-black text-[#0C2730]">₹{product.price.toLocaleString()}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => addToCompare(product.id)}
              className={`p-3 rounded-xl border transition-all ${isInCompare(product.id) ? "bg-purple-100 border-purple-200 text-purple-600" : "bg-white border-gray-100 text-gray-400 hover:border-purple-200 hover:text-purple-600"}`}
            >
              <Scale className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.discountPrice || product.price,
                  quantity: 1,
                  image: imageUrl,
                  brand: product.brand,
                  category: product.category
                });
                alert("Added to cart!");
              }}
              className="bg-[#0C2730] text-white p-3 rounded-xl shadow-lg shadow-[#0C2730]/10 hover:bg-[#14404B] transition-all active:scale-95"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

