"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  brand?: string;
  stock?: number;
  sale?: boolean;
  salePrice?: number;
  saved?: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  totalWishlistItems: number;
  addToWishlist: (item: WishlistItem) => void;
  removeItemFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  isMounted: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { user, isSignedIn, isLoaded } = useUser();

  // Load wishlist
  useEffect(() => {
    if (!isLoaded) return;
    setIsMounted(true);

    const loadWishlist = async () => {
      if (isSignedIn) {
        try {
          const response = await fetch("/api/wishlist");
          if (response.ok) {
            const data = await response.json();
            setWishlistItems(data.items);
          }
        } catch (e) {
          console.error("Failed to fetch wishlist from DB", e);
        }
      } else {
        const savedWishlist = localStorage.getItem("vijay_electronics_wishlist");
        if (savedWishlist) {
          try {
            setWishlistItems(JSON.parse(savedWishlist));
          } catch (e) {
            console.error("Failed to parse wishlist from localstorage", e);
          }
        }
      }
    };

    loadWishlist();
  }, [isSignedIn, isLoaded]);

  // Save wishlist
  const saveWishlist = useCallback(async (items: WishlistItem[]) => {
    if (isSignedIn) {
      try {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });
      } catch (e) {
        console.error("Failed to save wishlist to DB", e);
      }
    } else {
      localStorage.setItem("vijay_electronics_wishlist", JSON.stringify(items));
    }
  }, [isSignedIn]);

  const updateWishlistState = (newItems: WishlistItem[]) => {
    setWishlistItems(newItems);
    saveWishlist(newItems);
  };

  const totalWishlistItems = wishlistItems.length;

  const addToWishlist = (item: WishlistItem) => {
    if (wishlistItems.find((i) => i.id === item.id)) return;
    const newItems = [...wishlistItems, item];
    updateWishlistState(newItems);
  };

  const removeItemFromWishlist = (id: string) => {
    const newItems = wishlistItems.filter((item) => item.id !== id);
    updateWishlistState(newItems);
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{ 
        wishlistItems, 
        totalWishlistItems, 
        addToWishlist, 
        removeItemFromWishlist, 
        isInWishlist,
        isMounted 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

