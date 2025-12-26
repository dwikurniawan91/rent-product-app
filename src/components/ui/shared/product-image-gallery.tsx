"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types/product";

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg bg-gray-100">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  const selectedImage = images[selectedImageIndex];
  const imageSrc = `/images/products/${selectedImage.image}`;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 border-2">
        <Image
          src={imageSrc}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2">
          {images.map((image, index) => {
            const thumbSrc = `/images/products/${image.image}`;
            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                aria-label={`View image ${index + 1}`}
                className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                  selectedImageIndex === index
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Image
                  src={thumbSrc}
                  alt={`${productName} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
