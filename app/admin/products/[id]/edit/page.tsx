"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductCategory, PRODUCT_CATEGORIES, ProductFormData } from "@/types/product";
import {
  tvSpecs,
  refrigeratorSpecs,
  washingmachineSpecs,
  airconditionerSpecs,
  bluetoothSpeakerSpecs,
  sewingMachineSpecs,
  fanSpecs,
  coolerSpecs,
  ironSpecs,
  mixerJuicerSpecs,
  microwaveSpecs,
  inductionSpecs,
  waterHeaterSpecs,
} from "@/data/Specifications";
import { ArrowLeft, Save, Loader2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

const getSpecifications = (category: ProductCategory) => {
  switch (category) {
    case "television":
      return tvSpecs;
    case "refrigerator":
      return refrigeratorSpecs;
    case "washingmachine":
      return washingmachineSpecs;
    case "airconditioner":
      return airconditionerSpecs;
    case "bluetoothspeaker":
      return bluetoothSpeakerSpecs;
    case "sewingmachine":
      return sewingMachineSpecs;
    case "fan":
      return fanSpecs;
    case "cooler":
      return coolerSpecs;
    case "iron":
      return ironSpecs;
    case "mixerjuicer":
      return mixerJuicerSpecs;
    case "microwave":
      return microwaveSpecs;
    case "induction":
      return inductionSpecs;
    case "waterheater":
      return waterHeaterSpecs;
    default:
      return [];
  }
};

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    category: "television",
    modelNumber: "",
    price: "",
    discountPrice: "",
    stock: "",
    description: "",
    specifications: {},
    images: [],
    isActive: true,
    isFeatured: false,
  });

  const [currentSpecs, setCurrentSpecs] = useState(getSpecifications("television"));

  // Fetch product data on mount
  useEffect(() => {
    fetchProduct();
  }, [productId]);

  // Update specs when category changes
  useEffect(() => {
    setCurrentSpecs(getSpecifications(formData.category));
  }, [formData.category]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/products/${productId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await response.json();
      const product = data.product;

      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        category: product.category || "television",
        modelNumber: product.modelNumber || "",
        price: product.price?.toString() || "",
        discountPrice: product.discountPrice?.toString() || "",
        stock: product.stock?.toString() || "",
        description: product.description || "",
        specifications: product.specifications || {},
        images: product.images || [],
        isActive: product.isActive ?? true,
        isFeatured: product.isFeatured ?? false,
      });

      setCurrentSpecs(getSpecifications(product.category));
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to load product. Redirecting...");
      router.push("/admin/products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSpecChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Clean up the form data before sending
      const submitData = {
        ...formData,
        // Remove discountPrice if it's empty
        discountPrice: formData.discountPrice && formData.discountPrice.trim() !== "" 
          ? formData.discountPrice 
          : undefined,
      };

      // Remove undefined values
      const cleanedData = Object.fromEntries(
        Object.entries(submitData).filter(([_, value]) => value !== undefined)
      );

      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors with details
        if (data.details && Array.isArray(data.details)) {
          const errorMessages = data.details.join("\n");
          throw new Error(`Validation Error:\n${errorMessages}`);
        }
        throw new Error(data.error || "Failed to update product");
      }

      alert("Product updated successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to update product. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
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
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600 mt-1">
              Update product information and specifications
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Samsung 55 inch 4K Smart TV"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Samsung, LG, Sony"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model Number *
              </label>
              <input
                type="text"
                name="modelNumber"
                value={formData.modelNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., UA55AU7700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 45000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Price (₹)
              </label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 42000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 10"
              />
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product description..."
            />
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Technical Specifications
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Update specifications for {PRODUCT_CATEGORIES.find(c => c.value === formData.category)?.label}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentSpecs.map((spec) => {
              const fieldType = (spec as any).type || "text";
              return (
              <div key={spec.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {spec.label}
                </label>
                {fieldType === "checkbox" ? (
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={spec.name}
                      checked={formData.specifications[spec.name] || false}
                      onChange={handleSpecChange}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Yes</span>
                  </label>
                ) : fieldType === "textarea" ? (
                  <textarea
                    name={spec.name}
                    value={formData.specifications[spec.name] || ""}
                    onChange={handleSpecChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Enter ${spec.label.toLowerCase()}`}
                  />
                ) : (
                  <input
                    type={fieldType === "number" ? "number" : "text"}
                    name={spec.name}
                    value={formData.specifications[spec.name] || ""}
                    onChange={handleSpecChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Enter ${spec.label.toLowerCase()}`}
                  />
                )}
              </div>
            );
            })}
          </div>
        </div>

        {/* Product Images */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Product Images
          </h2>
          
          <ImageUpload 
            value={formData.images}
            disabled={isSubmitting}
            onChange={(url) => setFormData(prev => ({
              ...prev,
              images: [...(prev.images || []), url]
            }))}
            onRemove={(url) => setFormData(prev => ({
              ...prev,
              images: prev.images.filter((image) => image !== url)
            }))}
          />
          <p className="text-xs text-gray-500 mt-2 text-center">
            Upload up to 5 high-quality images. Recommended size: 800x800px.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Update Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

