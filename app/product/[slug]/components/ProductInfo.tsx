/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { Star, Heart, ArrowUpRight, RotateCcw } from "lucide-react";
import { RiExchange2Line } from "react-icons/ri";

interface ProductInfoProps {
  product: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState("12W");
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <>
      <div className="space-y-6 w-full">
        {/* Product Title & Rating */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            {product.name}
          </h1>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-500">
              ({product.totalRatings} Ratings)
            </span>
          </div>
        </div>

        {/* Variant Selection */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Select Variant</h3>

          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant: any, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(variant.power)}
                className={`px-4 py-2 border rounded-md text-sm sm:text-base transition ${
                  selectedVariant === variant.power
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {variant.power}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            className="bg-black text-white py-3 px-6 font-semibold rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => {
              const pdfUrl = "/brochures/sample.pdf";
              const link = document.createElement("a");
              link.href = pdfUrl;
              link.download = "Product-Brochure.pdf";
              link.click();
            }}
          >
            Download Our Brochure
          </button>

          <button
            className="bg-red-600 text-white py-3 px-6 font-semibold rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
            onClick={() => setIsInquiryOpen(true)}
          >
            Contact
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Additional Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <button className="flex flex-col space-y-3 py-4 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition">
            <div className="flex items-center justify-between">
              <Heart className="w-5 h-5" />
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <span className="text-sm sm:text-base">
              Red Cable Club Members' Benefits
            </span>
          </button>

          <button className="flex flex-col space-y-3 py-4 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition">
            <div className="flex items-center justify-between">
              <RiExchange2Line className="w-5 h-5" />
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <span className="text-sm sm:text-base">Exchange Program</span>
          </button>
        </div>
      </div>

     {isInquiryOpen && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 md:p-8 relative animate-slideUp">
      
      {/* Close Button */}
      <button
        onClick={() => setIsInquiryOpen(false)}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-2xl"
      >
        &times;
      </button>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 text-center md:text-left">
        Product Inquiry
      </h2>

      {/* Product Details */}
      <div className="flex items-start space-x-4 border-b pb-5 mb-6">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-md border shrink-0"
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold">{product.name}</h3>

          <p className="text-sm text-gray-600 mt-1">
            Variant: <span className="font-medium">{selectedVariant}</span>
          </p>

          <div className="flex items-center mt-2 space-x-2">
            <span className="text-yellow-500 font-semibold">
              ★ {product.rating}
            </span>
            <span className="text-gray-500 text-sm">
              ({product.totalRatings} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">Your Name</label>
          <input
            type="text"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">Email Address</label>
          <input
            type="email"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="example@email.com"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1 text-gray-700">Phone Number</label>
          <input
            type="text"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Your contact number"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1 text-gray-700">Your Message</label>
          <textarea
            rows={5}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Tell us how we can help you..."
          ></textarea>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end mt-8 space-x-4">
        <button
          className="px-5 py-3 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
          onClick={() => setIsInquiryOpen(false)}
        >
          Cancel
        </button>

        <button className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition">
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
