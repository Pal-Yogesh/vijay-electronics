"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product, PRODUCT_CATEGORIES } from "@/types/product";
import { ArrowLeft, Edit, Trash2, Package, Loader2, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ViewProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/products/${productId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await response.json();
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to load product. Redirecting...");
      router.push("/admin/products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product deleted successfully!");
        router.push("/admin/products");
      } else {
        alert(data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Product Not Found
            </h3>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been deleted.
            </p>
            <Link
              href="/admin/products"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categoryLabel = PRODUCT_CATEGORIES.find(c => c.value === product.category)?.label || product.category;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600 mt-1">
              {product.brand} - {product.modelNumber}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link
            href={`/admin/products/${productId}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Product Gallery
            </h2>
            {product.images && product.images.length > 0 ? (
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                    {product.images.map((url, index) => (
                      <div key={url} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <Image
                          src={url}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video w-full rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-2">
                <ImageIcon className="w-12 h-12" />
                <p>No images uploaded for this product</p>
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Product Information
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Category</p>
                <span className="px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                  {categoryLabel}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Brand</p>
                <p className="text-gray-900 font-medium">{product.brand}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Model Number</p>
                <p className="text-gray-900 font-medium">{product.modelNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Stock</p>
                <p className="text-gray-900 font-medium">{product.stock} units</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => {
                  if (!value || value === "" || value === false) return null;
                  
                  return (
                    <div key={key} className="border-b border-gray-100 pb-3">
                      <p className="text-sm text-gray-600 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-gray-900 font-medium">
                        {typeof value === 'boolean' ? 'Yes' : value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Regular Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
              {product.discountPrice && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Discount Price</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{product.discountPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Save ₹{(product.price - product.discountPrice).toLocaleString()} (
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active</span>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    product.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.isActive ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Featured</span>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    product.isFeatured
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {product.isFeatured ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Stock Status</span>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    product.stock > 5
                      ? "bg-green-100 text-green-800"
                      : product.stock > 0
                      ? "bg-orange-100 text-orange-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.stock > 5 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>

          {/* Metadata */}
          {(product.createdAt || product.updatedAt) && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Metadata</h2>
              <div className="space-y-3 text-sm">
                {product.createdAt && (
                  <div>
                    <p className="text-gray-600">Created</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(product.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
                {product.updatedAt && (
                  <div>
                    <p className="text-gray-600">Last Updated</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(product.updatedAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

