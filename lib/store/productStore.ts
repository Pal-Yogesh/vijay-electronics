// lib/store/productStore.ts
// Simple in-memory store for products (for development)
// In production, replace with database (MongoDB, PostgreSQL, etc.)

import { Product } from "@/types/product";

class ProductStore {
  private products: Product[] = [];

  // Get all products
  getAllProducts(): Product[] {
    return this.products;
  }

  // Get product by ID
  getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  // Get products by category
  getProductsByCategory(category: string): Product[] {
    return this.products.filter((p) => p.category === category);
  }

  // Add product
  addProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const newProduct: Product = {
      ...product,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // Update product
  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date(),
    };
    return this.products[index];
  }

  // Delete product
  deleteProduct(id: string): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);
    return true;
  }

  // Search products
  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.modelNumber.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Get active products
  getActiveProducts(): Product[] {
    return this.products.filter((p) => p.isActive);
  }

  // Get featured products
  getFeaturedProducts(): Product[] {
    return this.products.filter((p) => p.isFeatured && p.isActive);
  }

  // Get low stock products
  getLowStockProducts(threshold: number = 5): Product[] {
    return this.products.filter((p) => p.stock > 0 && p.stock <= threshold);
  }

  // Get out of stock products
  getOutOfStockProducts(): Product[] {
    return this.products.filter((p) => p.stock === 0);
  }

  // Private helper to generate ID
  private generateId(): string {
    return `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const productStore = new ProductStore();

