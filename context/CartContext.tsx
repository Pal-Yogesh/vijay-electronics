"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  brand?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  subtotal: number;
  totalItems: number;
  addToCart: (item: CartItem) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItemFromCart: (id: string) => void;
  clearCart: () => void;
  isMounted: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { user, isSignedIn, isLoaded } = useUser();

  // Load cart
  useEffect(() => {
    if (!isLoaded) return;
    setIsMounted(true);

    const loadCart = async () => {
      if (isSignedIn) {
        try {
          const response = await fetch("/api/cart");
          if (response.ok) {
            const data = await response.json();
            setCartItems(data.items);
          }
        } catch (e) {
          console.error("Failed to fetch cart from DB", e);
        }
      } else {
        const savedCart = localStorage.getItem("vijay_electronics_cart");
        if (savedCart) {
          try {
            setCartItems(JSON.parse(savedCart));
          } catch (e) {
            console.error("Failed to parse cart from localstorage", e);
          }
        }
      }
    };

    loadCart();
  }, [isSignedIn, isLoaded]);

  // Save cart
  const saveCart = useCallback(async (items: CartItem[]) => {
    if (isSignedIn) {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });
      } catch (e) {
        console.error("Failed to save cart to DB", e);
      }
    } else {
      localStorage.setItem("vijay_electronics_cart", JSON.stringify(items));
    }
  }, [isSignedIn]);

  // Wrap state updates to also save
  const updateCartState = (newItems: CartItem[]) => {
    setCartItems(newItems);
    saveCart(newItems);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const addToCart = (item: CartItem) => {
    const existing = cartItems.find((i) => i.id === item.id);
    let newItems;
    if (existing) {
      newItems = cartItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
      );
    } else {
      newItems = [...cartItems, { ...item, quantity: item.quantity || 1 }];
    }
    updateCartState(newItems);
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItemFromCart(id);
      return;
    }
    const newItems = cartItems.map((item) => (item.id === id ? { ...item, quantity } : item));
    updateCartState(newItems);
  };

  const removeItemFromCart = (id: string) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    updateCartState(newItems);
  };

  const clearCart = () => updateCartState([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        subtotal,
        totalItems,
        addToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCart,
        isMounted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

