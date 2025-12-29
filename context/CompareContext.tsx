"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CompareContextType {
  compareIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load compare list from localStorage on mount
  useEffect(() => {
    if (!isMounted) return;

    const savedCompare = localStorage.getItem("vijay_electronics_compare");
    if (savedCompare) {
      try {
        setCompareIds(JSON.parse(savedCompare));
      } catch (e) {
        console.error("Failed to parse compare list from localStorage", e);
        setCompareIds([]);
      }
    }
  }, [isMounted]);

  // Save compare list to localStorage whenever it changes
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem(
      "vijay_electronics_compare",
      JSON.stringify(compareIds)
    );
  }, [compareIds, isMounted]);

  const addToCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 3) {
        alert("You can compare maximum 3 products at a time");
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareIds((prev) => prev.filter((compareId) => compareId !== id));
  };

  const clearCompare = () => {
    setCompareIds([]);
  };

  const isInCompare = (id: string) => {
    return compareIds.includes(id);
  };

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};

