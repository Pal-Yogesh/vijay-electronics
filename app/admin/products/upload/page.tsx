"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ExcelUploader from "@/components/admin/ExcelUploader";

export default function BulkUploadPage() {
  const router = useRouter();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bulk Product Upload</h1>
          <p className="text-gray-600 mt-1">
            Upload an Excel file to add multiple products at once
          </p>
        </div>
      </div>

      <ExcelUploader />
    </div>
  );
}
