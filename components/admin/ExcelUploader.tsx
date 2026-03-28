"use client";

import { useState, useRef, useCallback } from "react";
import * as XLSX from "xlsx";
import {
  Upload, FileSpreadsheet, CheckCircle2, XCircle, AlertTriangle,
  Loader2, Download, Trash2,
} from "lucide-react";
import { PRODUCT_CATEGORIES, ProductCategory } from "@/types/product";

interface UploadResult {
  total: number;
  success: number;
  failed: number;
  errors: { row: number; name: string; error: string }[];
}

export default function ExcelUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<Record<string, any>[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("fan");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseFile = useCallback((f: File) => {
    setUploadResult(null);
    setParseError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<Record<string, any>>(ws, { defval: "" });

        // Filter out empty rows — a row must have at least "name" filled
        const validRows = json.filter((row) => {
          const name = row.name || row.Name || "";
          return String(name).trim().length > 0;
        });

        if (validRows.length === 0) {
          setParseError("No products found. Make sure the 'name' column is filled.");
          return;
        }
        setFile(f);
        setParsedData(validRows);
      } catch {
        setParseError("Failed to parse file. Make sure it's a valid .xlsx or .xls file.");
      }
    };
    reader.readAsArrayBuffer(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && (f.name.endsWith(".xlsx") || f.name.endsWith(".xls") || f.name.endsWith(".csv"))) {
      parseFile(f);
    } else {
      setParseError("Please upload a .xlsx, .xls, or .csv file");
    }
  }, [parseFile]);

  const handleUpload = async () => {
    if (parsedData.length === 0) return;
    setIsUploading(true);
    setUploadResult(null);

    try {
      const res = await fetch("/api/products/bulk-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: parsedData, category: selectedCategory }),
      });
      const data = await res.json();
      if (!res.ok) {
        setUploadResult({ total: parsedData.length, success: 0, failed: parsedData.length, errors: [{ row: 0, name: "Server", error: data.error }] });
      } else {
        setUploadResult(data.result);
        // Reset file state on success
        if (data.result && data.result.failed === 0) {
          setFile(null);
          setParsedData([]);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      }
    } catch {
      setUploadResult({ total: parsedData.length, success: 0, failed: parsedData.length, errors: [{ row: 0, name: "Network", error: "Failed to connect" }] });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setParsedData([]);
    setUploadResult(null);
    setParseError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const downloadTemplate = () => {
    const row: Record<string, string> = {
      modelName: "", name: "", modelNumber: "", price: "", discountPrice: "",
      stock: "", description: "", images: "", isActive: "", tags: "",
      keyFeatures: "", color: "", brandName: "", availableColors: "",
      electricFanDesign: "", powerSource: "", roomType: "", bladeLength: "",
      numberOfBlades: "", bladeMaterial: "", controlType: "", airFlowCapacity: "",
      speedRPM: "", wattage: "", "unitCount or itemsPerInnerPage": "",
      includedComponents: "", energyEfficiencyRating: "", productDimensions: "",
      numberOfBoxes: "", remoteSupport: "", inverterCompatible: "", voltage: "",
      areBatteriesRequired: "", indoorOutdoorUsage: "", warranty: "",
      manufaturer: "", countryOfOrigin: "", productURL: "", thumbnail: "",
    };
    const ws = XLSX.utils.json_to_sheet([row]);
    ws["!cols"] = Object.keys(row).map((k) => ({ wch: Math.max(k.length + 4, 20) }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Fan Products");
    XLSX.writeFile(wb, "fan_products_template.xlsx");
  };

  const columns = parsedData.length > 0 ? Object.keys(parsedData[0]) : [];

  return (
    <div className="space-y-6">
      {/* Category + Template Download */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col sm:flex-row sm:items-end gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ProductCategory)}
            className="w-full max-w-xs px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            aria-label="Select product category"
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={downloadTemplate} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium inline-flex items-center gap-2 shrink-0">
          <Download className="w-4 h-4" /> Download Template
        </button>
      </div>

      {/* Success Message */}
      {uploadResult && uploadResult.failed === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center gap-4">
          <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0" />
          <div>
            <p className="text-lg font-semibold text-green-800">Uploaded successfully</p>
            <p className="text-sm text-green-700">{uploadResult.success} products added to database.</p>
          </div>
        </div>
      )}

      {/* Error Result */}
      {uploadResult && uploadResult.failed > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{uploadResult.total}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{uploadResult.success}</p>
              <p className="text-sm text-green-700">Success</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{uploadResult.failed}</p>
              <p className="text-sm text-red-700">Failed</p>
            </div>
          </div>
          {uploadResult.errors.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Errors
              </h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {uploadResult.errors.map((err, i) => (
                  <div key={i} className="bg-red-50 border border-red-100 rounded-lg px-4 py-2 text-sm">
                    <span className="font-medium text-red-800">Row {err.row}</span>
                    {err.name !== "Unknown" && <span className="text-red-600"> ({err.name})</span>}
                    <span className="text-red-700">: {err.error}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Area */}
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-gray-50 transition-all"
        >
          <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-500 mb-4">Drop your filled Excel here or click to browse</p>
          <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" onChange={(e) => { const f = e.target.files?.[0]; if (f) parseFile(f); }} className="hidden" aria-label="Upload Excel file" />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2">
            <Upload className="w-5 h-5" /> Browse Files
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-10 h-10 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{parsedData.length} product{parsedData.length > 1 ? "s" : ""} found</p>
              </div>
            </div>
            <button type="button" onClick={handleClear} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>

          {/* Preview */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  {columns.slice(0, 6).map((col) => (
                    <th key={col} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">{col}</th>
                  ))}
                  {columns.length > 6 && <th className="px-3 py-2 text-xs text-gray-400">+{columns.length - 6} more</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {parsedData.slice(0, 5).map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-500">{i + 1}</td>
                    {columns.slice(0, 6).map((col) => (
                      <td key={col} className="px-3 py-2 text-gray-700 max-w-[180px] truncate">{String(row[col] ?? "")}</td>
                    ))}
                    {columns.length > 6 && <td className="px-3 py-2 text-gray-400">...</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</> : <><Upload className="w-5 h-5" /> Upload {parsedData.length} Product{parsedData.length > 1 ? "s" : ""}</>}
            </button>
          </div>
        </div>
      )}

      {parseError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-red-700 text-sm">{parseError}</p>
        </div>
      )}
    </div>
  );
}
