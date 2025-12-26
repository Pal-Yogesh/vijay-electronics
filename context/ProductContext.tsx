"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/products");
      const data = await response.json();
      
      if (response.ok) {
        setProducts(data.products);
      } else {
        setError(data.error || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("An unexpected error occurred while fetching products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getProductById = (id: string) => {
    return products.find((p) => (p._id || p.id) === id);
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  return (
    <ProductContext.Provider value={{ products, isLoading, error, refreshProducts, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

