/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef, useEffect } from "react";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState<number | null>(null);
  
  // Sync thumbnail container height with main image
  useEffect(() => {
    const updateHeight = () => {
      if (mainImageRef.current) {
        setThumbHeight(mainImageRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="flex flex-col-reverse h-full md:flex-row gap-7 items-stretch">
      {/* Thumbnail List */}
      <div className="flex flex-row md:flex-col gap-2 shrink-0"
        style={{ '--block-height': `${thumbHeight}px` } as React.CSSProperties}
      >
        <div
          className={`
            flex md:flex-col gap-2
            overflow-x-auto md:overflow-y-auto no-scrollbar
             h-full md:h-[var(--block-height)]
          `}
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`
                shrink-0 border-2 transition
                ${selectedImage === index
                  ? "border-brand-primary"
                  : "border-gray-200 hover:border-gray-400"
                }
              `}
            >
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-14 h-14 md:w-16 md:h-16 cursor-pointer object-cover"
              />
            </button>
          ))}

        </div>
        {/* <button
          className="w-14 h-full md:w-full md:h-8 flex items-center justify-center border-2 border-gray-200 hover:border-gray-400  text-gray-400"
          onClick={() => {
            if (images.length - 1 === selectedImage) {
              setSelectedImage(0);
            } else {
              setSelectedImage(selectedImage + 1);
            }
          }}
        >
          <ChevronDown className="w-6 h-6 hover:text-gray-600 -rotate-90 md:rotate-0" />
        </button> */}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <div
          ref={mainImageRef}
          className="w-full aspect-square bg-gray-50 overflow-hidden"
        >
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
