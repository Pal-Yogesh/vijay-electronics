"use client";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/types/product';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Eye, Loader2, ImageIcon } from 'lucide-react';

const HeroRecommendedProducts = () => {
  const { products, isLoading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [activeCategory, setActiveCategory] = useState('featured');
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const categories = [
    { id: 'featured', label: 'Featured' },
    { id: 'television', label: 'TVs' },
    { id: 'refrigerator', label: 'Refrigerators' },
    { id: 'washingmachine', label: 'Washing Machines' }
  ];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'featured') {
      return products.filter(p => p.isFeatured).slice(0, 4);
    }
    return products.filter(p => p.category === activeCategory).slice(0, 4);
  }, [products, activeCategory]);

  if (isLoading) {
    return (
      <div className="py-16 flex justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#14404B]" />
      </div>
    );
  }

  if (filteredProducts.length === 0 && activeCategory !== 'featured') {
    return null; // Don't show empty categories
  }

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Handpicked for you
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0C2730] mb-6 tracking-tight">
            Recommended Products
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Discover our top-rated electronics selected specifically for your modern lifestyle.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => {
            const hasProducts = category.id === 'featured' || products.some(p => p.category === category.id);
            if (!hasProducts) return null;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#14404B] text-white shadow-xl shadow-[#14404B]/20 scale-105'
                    : 'bg-white text-gray-400 hover:text-[#14404B] hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product: Product) => {
              const productId = (product._id || product.id) as string;
              
              return (
                <motion.div
                  key={productId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  onMouseEnter={() => setIsHovering(productId)}
                  onMouseLeave={() => setIsHovering(null)}
                  className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#0C2730]/10 transition-all duration-500 border border-gray-100 flex flex-col h-full"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    {product.images?.[0] ? (
                      <Image 
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}
                    
                    {product.isFeatured && (
                      <span className="absolute top-6 left-6 bg-[#14404B] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                        Featured
                      </span>
                    )}

                    {/* Quick Actions Overlay */}
                    <div 
                      className={`absolute inset-0 bg-[#0C2730]/60 backdrop-blur-sm flex items-center justify-center gap-4 transition-all duration-500 ${
                        isHovering === productId ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <Link 
                        href={`/products/${productId}`}
                        className="bg-white text-[#0C2730] p-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <button 
                        onClick={() => {
                          addToWishlist({
                            id: productId,
                            name: product.name,
                            price: product.discountPrice || product.price,
                            image: product.images?.[0],
                            brand: product.brand,
                            category: product.category
                          });
                          alert("Added to wishlist!");
                        }}
                        className="bg-white text-[#0C2730] p-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => {
                          addToCart({
                            id: productId,
                            name: product.name,
                            price: product.discountPrice || product.price,
                            quantity: 1,
                            image: product.images?.[0],
                            brand: product.brand,
                            category: product.category
                          });
                          alert("Added to cart!");
                        }}
                        className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all duration-300 hover:scale-110 active:scale-95"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-4">
                      <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mb-1">{product.brand}</p>
                      <Link href={`/products/${productId}`}>
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight hover:text-[#14404B] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-[10px] text-gray-400 ml-2 font-bold tracking-widest">4.9/5</span>
                      </div>
                      
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-[#0C2730]">₹{(product.discountPrice || product.price).toLocaleString()}</span>
                        {product.discountPrice && (
                          <span className="text-sm text-gray-400 line-through font-bold mb-1">₹{product.price.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
        
        <div className="text-center mt-20">
          <Link 
            href="/shop"
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-[#14404B] font-black rounded-[24px] shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-xs"
          >
            Explore Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroRecommendedProducts;
