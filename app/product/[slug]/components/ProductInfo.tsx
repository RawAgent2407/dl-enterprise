/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { ArrowUpRight, Star } from "lucide-react";
import React, { useState } from "react";
import { GiCardExchange } from "react-icons/gi";
import { GoArrowUpRight } from "react-icons/go";
import { IoDiamond } from "react-icons/io5";

interface ProductInfoProps {
  product: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState("12W");
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <>
      <div className='space-y-6 w-full max-h-screen overflow-y-scroll no-scrollbar'>
        {/* Product Title & Rating */}
        <div className='pb-6 border-b border-gray-300'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 max-w-[90%]'>
            {product.name}
          </h1>

          <div className='flex items-center space-x-2'>
            <div className='flex items-center'>
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

            <span className='font-medium'>{product.rating}</span>
            <span className='text-gray-500'>
              ({product.totalRatings} Ratings)
            </span>
          </div>
        </div>

        {/* Variant Selection */}
        <div className='pb-6 border-b border-gray-300'>
          <h3 className='font-medium text-gray-900 mb-2'>Select Variant</h3>

          <div className='flex flex-wrap gap-3'>
            {product.variants.map((variant: any, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(variant.power)}
                className={`px-4 py-2 border rounded-md text-sm sm:text-base transition inset-shadow-sm inset-shadow-gray-500/50 ${
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
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-gray-300'>
          <button
            className='bg-black text-white py-3 px-6 font-medium  hover:bg-gray-800 transition-colors'
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
            className='bg-[#a60006] text-white py-3 px-6 font-medium  transition-colors flex items-center justify-center'
            onClick={() => setIsInquiryOpen(true)}
          >
            Contact
            <ArrowUpRight className='ml-2 w-5 h-5' />
          </button>
        </div>

        <section className='w-full bg-white'>
          <div className=''>
            {/* ================= PRODUCT DETAILS ================= */}
            <div>
              <h2 className='text-xl sm:text-2xl font-medium text-gray-900 mb-6'>
                Product Details
              </h2>

              {/* Core Specifications */}
              <div className='mb-10'>
                <h3 className='text-base sm:text-lg font-medium border-b border-red-500 inline-block pb-1 mb-4'>
                  Core Specifications
                </h3>

                <div className='grid grid-cols-1  gap-y-2 gap-x-4 text-sm sm:text-base'>
                  <Spec label='Wattage' value='12W' />
                  <Spec
                    label='Cutout Size'
                    value='66 mm or 75 mm (depends on variant)'
                  />
                  <Spec label='Outer Diameter' value='77 mm or 85 mm' />
                  <Spec
                    label='Mounting Type'
                    value='Recessed, round ceiling cutout'
                  />
                  <Spec label='Shape' value='Deep cone, round' />
                  <Spec
                    label='Reflector Options'
                    value='White / Chrome / Gold / Black / Copper / Rose Gold'
                  />
                  <Spec
                    label='Material'
                    value='Aluminum, plastic, or combination (based on ring type)'
                  />
                </div>
              </div>

              {/* Electrical & Performance */}
              <div>
                <h3 className='text-base sm:text-lg font-medium border-b border-red-500 inline-block pb-1 mb-4'>
                  Electrical and Performance Data
                </h3>

                <div className='grid grid-cols-1  gap-y-2 gap-x-4 text-sm sm:text-base'>
                  <Spec label='Light Source' value='Chip-on-Board (COB) LED' />
                  <Spec
                    label='Recommended Application Voltage'
                    value='Standard AC (input per driver spec)'
                  />
                  <Spec
                    label='Driver Compatibility'
                    value='LPF / BLDC and other LED drivers (sold separately)'
                  />
                  <Spec
                    label='Energy Efficiency'
                    value='LED technology – lower power consumption vs halogen'
                  />
                  <Spec
                    label='Typical Lifespan'
                    value='20,000 – 50,000 hours'
                  />
                </div>
              </div>
            </div>

            {/* ================= PRODUCT DESCRIPTION ================= */}
            <div className='mt-12'>
              <h2 className='text-xl sm:text-2xl font-medium text-gray-900 mb-4'>
                Product Descriptions
              </h2>

              <div className='max-w-4xl text-sm sm:text-base text-gray-700 space-y-4'>
                <p>
                  Introducing the DL Enterprise R134a Can Tap Valve: redefining
                  refrigerant refills with superior quality and innovation.
                </p>

                <p>
                  Experience the pinnacle of refrigerant tools with the DL
                  Enterprise R134a Can Tap Valve, crafted from premium brass and
                  steel for unmatched durability and precision.
                </p>

                <p className='font-medium text-gray-900'>Key Features:</p>
                <ul className='list-disc pl-5 space-y-1'>
                  <li>High-quality brass body with CNC precision</li>
                  <li>Long-lasting durability</li>
                  <li>Reliable performance for professional use</li>
                  <li> performance for professional use</li>
                  <li>Reliable for professional use</li>
                  <li>Reliable performance for professional use</li>
                  <li>Reliable performance for use</li>
                  <li>Reliable performance for professional use</li>
                </ul>
              </div>
            </div>

            {/* ================= BENEFITS / CARDS ================= */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 border-b border-gray-300 pb-4'>
              <InfoCard
                title="Red Cable Club Members' Benefits"
                icon={<IoDiamond size={20} />}
              />
              <InfoCard
                title='Exchange Program'
                icon={<GiCardExchange size={20} />}
              />
            </div>
          </div>
        </section>
      </div>

      {isInquiryOpen && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn'>
          <div className='bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 md:p-8 relative animate-slideUp'>
            {/* Close Button */}
            <button
              onClick={() => setIsInquiryOpen(false)}
              className='absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-2xl'
            >
              &times;
            </button>

            {/* Title */}
            <h2 className='text-2xl md:text-3xl font-bold mb-6 text-gray-900 text-center md:text-left'>
              Product Inquiry
            </h2>

            {/* Product Details */}
            <div className='flex items-start space-x-4 border-b pb-5 mb-6'>
              <img
                src={product.images?.[0]}
                alt={product.name}
                className='w-20 h-20 object-cover rounded-md border shrink-0'
              />

              <div className='flex-1'>
                <h3 className='text-lg font-medium'>{product.name}</h3>

                <p className='text-sm text-gray-600 mt-1'>
                  Variant:{" "}
                  <span className='font-medium'>{selectedVariant}</span>
                </p>

                <div className='flex items-center mt-2 space-x-2'>
                  <span className='text-yellow-500 font-medium'>
                    ★ {product.rating}
                  </span>
                  <span className='text-gray-500 text-sm'>
                    ({product.totalRatings} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {/* Name */}
              <div className='flex flex-col'>
                <label className='text-sm font-medium mb-1 text-gray-700'>
                  Your Name
                </label>
                <input
                  type='text'
                  className='border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500'
                  placeholder='Enter your full name'
                />
              </div>

              {/* Email */}
              <div className='flex flex-col'>
                <label className='text-sm font-medium mb-1 text-gray-700'>
                  Email Address
                </label>
                <input
                  type='email'
                  className='border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500'
                  placeholder='example@email.com'
                />
              </div>

              {/* Phone */}
              <div className='flex flex-col md:col-span-2'>
                <label className='text-sm font-medium mb-1 text-gray-700'>
                  Phone Number
                </label>
                <input
                  type='text'
                  className='border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500'
                  placeholder='Your contact number'
                />
              </div>

              {/* Message */}
              <div className='flex flex-col md:col-span-2'>
                <label className='text-sm font-medium mb-1 text-gray-700'>
                  Your Message
                </label>
                <textarea
                  rows={5}
                  className='border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500'
                  placeholder='Tell us how we can help you...'
                ></textarea>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className='flex justify-end mt-8 space-x-4'>
              <button
                className='px-5 py-3 rounded-lg border border-gray-400 hover:bg-gray-100 transition'
                onClick={() => setIsInquiryOpen(false)}
              >
                Cancel
              </button>

              <button className='px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition'>
                Send Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const Spec = ({ label, value }: { label: string; value: string }) => (
  <div className='grid grid-cols-2 gap-2  pb-2'>
    <span className='text-gray-600'>{label}</span>
    <span className='text-gray-900 font-medium '>{value}</span>
  </div>
);

const InfoCard = ({ title, icon }: { title: string; icon: any }) => (
  <div className='border border-gray-400 rounded-md  p-6 flex flex-col gap-y-4 shodow-sm hover:shadow-lg transition'>
    <div className='flex items-center justify-between'>
      <span>{icon}</span>
      <span className='text-gray-900'>
        <GoArrowUpRight size={20} />
      </span>
    </div>
    <span className='text-base font-medium'>{title}</span>
  </div>
);
export default ProductInfo;
