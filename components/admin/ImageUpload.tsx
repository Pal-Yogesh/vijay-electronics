"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  const onSuccess = (result: any) => {
    console.log("Cloudinary Upload Result:", result);
    if (result.info && result.info.secure_url) {
      onChange(result.info.secure_url);
    }
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {value.map((url) => (
          <div key={url} className="relative aspect-square rounded-md overflow-hidden border border-gray-200 group">
            <div className="z-10 absolute top-2 right-2">
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition shadow-sm opacity-0 group-hover:opacity-100"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Product image"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget 
        onSuccess={onSuccess} 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "vijay_electronics"}
        options={{
          maxFiles: 5,
          resourceType: "image",
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <button
              type="button"
              disabled={disabled || value.length >= 5}
              className="relative cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-12 w-full flex flex-col items-center justify-center gap-2 hover:border-blue-500 transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onClick}
            >
              <ImagePlus className="h-10 w-10 text-gray-400" />
              <div className="text-sm font-semibold text-gray-600">
                {value.length >= 5 ? "Upload limit reached" : "Click to upload images"}
              </div>
              <p className="text-xs text-gray-500">
                Support JPG, PNG, WEBP (Max 5 images)
              </p>
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;

