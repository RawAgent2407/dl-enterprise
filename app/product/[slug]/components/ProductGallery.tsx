/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row space-x-4 space-y-2">
      {/* Thumbnail List */}
      <div className="flex md:flex-col space-y-0 md:space-y-2 space-x-2 md:space-x-0 mt-1 ">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`${
              index >= 4 && "hidden"
            } w-20 h-20  overflow-hidden border-2 ${
              selectedImage === index ? "border-red-500" : "border-gray-200"
            }`}
          >
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
       {images.length > 4 && (
           <button
          className="w-20 h-20 flex items-center justify-center border-2 border-gray-200 hover:border-gray-400  text-gray-400"
          onClick={() => {
            if (images.length - 1 === selectedImage) {
              setSelectedImage(0);
            } else {
              setSelectedImage(selectedImage + 1);
            }
          }}
        >
          <ChevronDown className="w-6 h-6 hover:text-gray-600" />
        </button>
        )}
      </div>

      {/* Main Image */}
      <div className="">
        <div className="aspect-square bg-gray-50  overflow-hidden">
          <img
            src={images[selectedImage]}
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
