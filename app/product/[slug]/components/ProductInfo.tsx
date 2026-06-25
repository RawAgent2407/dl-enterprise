/**
 * @format
 * eslint-disable @next/next/no-img-element
 */
"use client";
import { ArrowUpRight } from "lucide-react";
import React, { useState } from "react";

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    description: string;
    rating: number;
    totalRatings: number;
    images: string[];
    dimension: { text: string; imageUrl: string | null } | null;
    installationSteps: { imageUrl: string } | null;
    accessories: { imageUrl: string } | null;
    sketch: { image1Url: string | null; title: string; image2Url: string | null } | null;
    descriptions: { type: string; value: string }[];
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [descExpanded, setDescExpanded] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const shortDesc = product.description.length > 120 && !descExpanded
    ? product.description.slice(0, 120) + "..."
    : product.description;

  const hasInfoCards = product.dimension || product.installationSteps || product.accessories;

  return (
    <>
      <div className="space-y-5 w-full max-h-screen overflow-y-scroll no-scrollbar">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          {product.name}
        </h1>

        {/* Short description */}
        {product.description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {shortDesc}
            {product.description.length > 120 && (
              <button
                onClick={() => setDescExpanded(!descExpanded)}
                className="ml-1 text-gray-900 font-medium underline text-xs"
              >
                {descExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </p>
        )}

        {/* Info cards: Dimension / Installation Steps / Accessory */}
        {hasInfoCards && (
          <div className="grid grid-cols-3 gap-3 border border-gray-200 rounded">
            {product.dimension && (
              <div className="p-3 border-r border-gray-200 flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-700">Dimension :</span>
                <span className="text-xs text-gray-600">{product.dimension.text}</span>
                {product.dimension.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.dimension.imageUrl}
                    alt="Dimension"
                    className="w-12 h-12 object-contain self-end"
                  />
                )}
              </div>
            )}
            {product.installationSteps && (
              <div className="p-3 border-r border-gray-200 flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-700">Installation Steps :</span>
                {product.installationSteps.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.installationSteps.imageUrl}
                    alt="Installation Steps"
                    className="w-12 h-12 object-contain self-end"
                  />
                )}
              </div>
            )}
            {product.accessories && (
              <div className="p-3 flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-700">Accessory :</span>
                {product.accessories.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.accessories.imageUrl}
                    alt="Accessory"
                    className="w-12 h-12 object-contain self-end"
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Sketch card */}
        {product.sketch && (product.sketch.image1Url || product.sketch.title || product.sketch.image2Url) && (
          <div className="border border-gray-200 rounded p-3 flex gap-4 items-start">
            {product.sketch.image1Url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.sketch.image1Url}
                alt="Sketch"
                className="w-20 h-20 object-contain shrink-0 border border-gray-100"
              />
            )}
            <div className="flex-1 text-sm text-gray-700 space-y-1">
              {product.sketch.title && (
                <p>
                  <span className="font-semibold">Product : </span>
                  {product.sketch.title}
                </p>
              )}
              {product.sketch.image2Url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.sketch.image2Url}
                  alt="Sketch detail"
                  className="w-full max-h-32 object-contain mt-2"
                />
              )}
            </div>
          </div>
        )}

        {/* Descriptions (type : value pairs) */}
        {product.descriptions.length > 0 && (
          <div className="space-y-2">
            {product.descriptions.map((d, i) => (
              <p key={i} className="text-sm text-gray-700">
                <span className="font-semibold">{d.type} : </span>
                <span className="text-gray-600">{d.value}</span>
              </p>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button
            className="bg-black text-white py-3 px-6 font-medium hover:bg-gray-800 transition-colors text-sm"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/brochures/sample.pdf";
              link.download = "Product-Brochure.pdf";
              link.click();
            }}
          >
            Download Our Brochure
          </button>
          <button
            className="bg-[#a60006] text-white py-3 px-6 font-medium transition-colors flex items-center justify-center text-sm"
            onClick={() => setIsInquiryOpen(true)}
          >
            Contact
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Inquiry modal */}
      {isInquiryOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 md:p-8 relative">
            <button
              onClick={() => setIsInquiryOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Product Inquiry</h2>
            <div className="flex items-start space-x-4 border-b pb-5 mb-6">
              {product.images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md border shrink-0"
                />
              )}
              <div>
                <h3 className="text-lg font-medium">{product.name}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">Your Name</label>
                <input type="text" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Enter your full name" />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">Email Address</label>
                <input type="email" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="example@email.com" />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium mb-1 text-gray-700">Phone Number</label>
                <input type="text" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Your contact number" />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium mb-1 text-gray-700">Your Message</label>
                <textarea rows={5} className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Tell us how we can help you..." />
              </div>
            </div>
            <div className="flex justify-end mt-8 space-x-4">
              <button className="px-5 py-3 rounded-lg border border-gray-400 hover:bg-gray-100 transition" onClick={() => setIsInquiryOpen(false)}>
                Cancel
              </button>
              <button className="px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition">
                Send Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
