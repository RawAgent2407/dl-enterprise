/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { LuArrowUpRight,LuStar } from "react-icons/lu";

interface ProductInfoProps {
  product: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const defualtSelectedVariant: { [key: string]: string } = product.variants?.reduce((acc: any, variant: any) => {
    acc[variant.type] = variant.values?.[0]?.value;
    return acc;
  },
    {}
  );
  const [selectedVariant, setSelectedVariant] = useState(
    defualtSelectedVariant || {}
  );
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [inquiryFormData, setInquiryFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [inquiryErrors, setInquiryErrors] = useState<Record<string, string>>({});
  const [inquiryIsLoading, setInquiryIsLoading] = useState(false);
  const [inquirySubmitMessage, setInquirySubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInquiryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInquiryFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (inquiryErrors[name]) {
      setInquiryErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInquirySubmitMessage(null);

    // Validate form
    const newErrors: Record<string, string> = {};

    if (!inquiryFormData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!inquiryFormData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryFormData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!inquiryFormData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!inquiryFormData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setInquiryErrors(newErrors);
      return;
    }

    setInquiryIsLoading(true);

    try {
      // Replace with your actual API call
      // const result = await submitProductInquiry(inquiryFormData);
      
      // Simulating API call
      setInquirySubmitMessage({ type: 'success', text: 'Inquiry sent successfully! We will contact you soon.' });
      setInquiryFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setInquiryErrors({});
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setIsInquiryOpen(false);
        setInquirySubmitMessage(null);
      }, 2000);
    } catch (error) {
      setInquirySubmitMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setInquiryIsLoading(false);
    }
  };

  return (
    <>
      <div className='flex flex-col gap-8 w-full  no-scrollbar'>
        {/* Product Title & Rating */}
        <div className='flex flex-col gap-4 border-b border-[#D0D1D3] pb-6'>
          <h1 className='font-handing text-2xl sm:text-3xl lg:text-4xl font-bold text-[#050B16] mb-3 max-w-[90%] line-clamp-2 text-ellipsis'>
            {product.title}
          </h1>

          <div className='font-nav flex items-center space-x-2'>
            <div className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <LuStar
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>

            <span className='font-medium'>{product.rating}</span>
            <span className='text-[#535862]'>
              ({product.totalRatings} Ratings)
            </span>
          </div>
        </div>

        {/* Variant Selection */}
        <div className='flex flex-col gap-4 border-b border-[#D0D1D3] pb-6'>
          <h5 className='font-nav'>Select Variant</h5>

          {product.variants.map((variant: any, index: number) => (
            <div key={variant.id} className="flex flex-col gap-4">
              <p>{variant.type}</p>
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {variant.values?.map((v: any) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVariant({ ...selectedVariant, [variant.type]: v.value })}
                    className={`flex-shrink-0 cursor-pointer ${selectedVariant[variant.type] === v.value
                      ? "selcted-variant"
                      : "variant"
                      }`}
                  >
                    {v.value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col lg:flex-row gap-4 pb-6 border-b border-gray-300'>
          <button
            className='basis-2/3 bg-black text-white py-3 px-6 font-medium hover:bg-gray-800 transition-colors'
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
            className="basis-1/3 w-full group bg-brand-primary hover:bg-brand-primaryHover text-white font-medium transition-colors"
            onClick={() => setIsInquiryOpen(true)}
          >
            <div className="flex items-stretch">

              {/* Text Section */}
              <span className="flex-1 py-3 px-6 flex items-center justify-center">
                Contact
              </span>

              {/* Arrow Section */}
              <span className="w-12 flex items-center justify-center button-sidearrow">
                <LuArrowUpRight className="text-brand-primary w-5 h-5" />
              </span>

            </div>
          </button>
        </div>

        <div className='w-full bg-white'>
          <div className='flex flex-col gap-8'>
            {/* ================= PRODUCT DETAILS ================= */}
            <h2 className='text-xl sm:text-2xl font-medium '>
              Product Details
            </h2>

            {/* Core Specifications */}
            <div className=''>
              <h3 className='text-base sm:text-lg font-medium border-b border-red-500 inline-block pb-1 mb-4'>
                Core Specifications
              </h3>

              <div className='grid grid-cols-1  gap-y-2 gap-x-4 text-sm sm:text-base'>
                {product.coreSpecifications.map((spec: any) => (
                  <Spec key={spec.label} label={spec.label} value={spec.value} />
                ))}
              </div>
            </div>

            {/* Electrical & Performance */}
            <div>
              <h3 className='text-base sm:text-lg font-medium border-b border-red-500 inline-block pb-1 mb-4'>
                Electrical and Performance Data
              </h3>

              <div className='grid grid-cols-1  gap-y-2 gap-x-4 text-sm sm:text-base'>
                {product.electricalSpecifications.map((spec: any) => (
                  <Spec key={spec.label} label={spec.label} value={spec.value} />
                ))}
              </div>
            </div>

            {/* ================= PRODUCT DESCRIPTION ================= */}
            <div className=''>
              <h2 className='text-xl sm:text-2xl font-medium mb-4'>
                Product Descriptions
              </h2>

              <div className='text-sm sm:text-base text-gray-700 space-y-4'>
                {/* Description with Read More */}
                <div className='relative '>
                  <div className={`transition-all duration-600 ${!isDescriptionExpanded ? 'line-clamp-6' : ''}`}>

                    <p className="">
                      {product?.description}
                    </p>

                    <p className='font-medium text-gray-900'>Key Features:</p>
                    <ul className='list-disc pl-5 space-y-1'>
                      {product.keyFeatures.map((f: any, i: number) => (
                        <li key={i}>{f.value}</li>
                      ))}
                    </ul>
                  </div>

                  {!isDescriptionExpanded && (
                    <>
                      <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white flex items-end justify-center pointer-events-none'>
                        <button
                          onClick={() => setIsDescriptionExpanded(true)}
                          className='relative pointer-events-auto text-red-600 font-medium hover:text-red-700 transition-colors'
                        >
                          Read More
                        </button>
                      </div>
                    </>
                  )}

                  {isDescriptionExpanded && (
                    <button
                      onClick={() => setIsDescriptionExpanded(false)}
                      className='text-red-600 font-medium hover:text-red-700 transition-colors mt-2 block'
                    >
                      Read Less
                    </button>
                  )}
                </div>


              </div>
            </div>
          </div>
        </div>
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
            <h2 className='text-2xl md:text-3xl font-bold mb-6 text-gray-900'>
              Product Inquiry
            </h2>

            {/* Product Details */}
            <div className='flex items-start gap-4 border-b border-[#D0D1D3] pb-6 mb-8'>
              <img
                src={product.images?.[0]}
                alt={product.title}
                className='w-20 h-20 object-cover rounded-sm border shrink-0'
              />

              <div className='flex-1 flex flex-col gap-2'>
                <h3 className='text-lg font-medium'>{product.title}</h3>

                <p className='text-sm text-gray-600'>
                  Variant:{" "}
                  {Object.entries(selectedVariant).map(([key, value]) => (
                    <span className='font-medium mr-2' key={key}>{key}: {value}</span>
                  ))}
                </p>

                <div className='flex items-center gap-2'>
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
            <form className=' flex flex-col gap-5' onSubmit={handleInquirySubmit}>
              {/* Name */}
              <div>
                <label className='text-base font-medium'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  placeholder='Your Name'
                  value={inquiryFormData.name}
                  onChange={handleInquiryInputChange}
                  className={`w-full border-b-2 py-3 text-sm text-gray-800 focus:outline-hidden transition ${
                    inquiryErrors.name ? 'border-red-500' : 'border-[#E5E5E5]'
                  }`}
                />
                {inquiryErrors.name && <p className='text-red-500 text-sm mt-1'>{inquiryErrors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className='text-base font-medium'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  placeholder='Your Email'
                  value={inquiryFormData.email}
                  onChange={handleInquiryInputChange}
                  className={`w-full border-b-2 py-3 text-sm text-gray-800 focus:outline-hidden transition ${
                    inquiryErrors.email ? 'border-red-500' : 'border-[#E5E5E5]'
                  }`}
                />
                {inquiryErrors.email && <p className='text-red-500 text-sm mt-1'>{inquiryErrors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className='text-base font-medium'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  name='phone'
                  placeholder='Your Number'
                  value={inquiryFormData.phone}
                  onChange={handleInquiryInputChange}
                  className={`w-full border-b-2 py-3 text-sm text-gray-800 focus:outline-hidden transition ${
                    inquiryErrors.phone ? 'border-red-500' : 'border-[#E5E5E5]'
                  }`}
                />
                {inquiryErrors.phone && <p className='text-red-500 text-sm mt-1'>{inquiryErrors.phone}</p>}
              </div>

              {/* Message */}
              <div>
                <label className='text-base font-medium'>
                  Message
                </label>
                <textarea
                  name='message'
                  placeholder='Add Your Message Here'
                  rows={2}
                  value={inquiryFormData.message}
                  onChange={handleInquiryInputChange}
                  className={`w-full border-b-2 py-3 text-sm text-gray-800 focus:outline-hidden transition ${
                    inquiryErrors.message ? 'border-red-500' : 'border-[#E5E5E5]'
                  }`}
                />
                {inquiryErrors.message && <p className='text-red-500 text-sm mt-1'>{inquiryErrors.message}</p>}
              </div>

              {inquirySubmitMessage && (
                <div
                  className={`p-3 rounded-md text-sm font-medium ${
                    inquirySubmitMessage.type === 'success'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                >
                  {inquirySubmitMessage.text}
                </div>
              )}

              {/* Buttons */}
              <div className='flex justify-end max-sm:flex-col max-sm:justify-center  max-sm:item-stretch gap-4 mt-8'>
                <button
                  type='button'
                  onClick={() => setIsInquiryOpen(false)}
                  className='px-6 py-2.5 border border-gray-300 text-brand-primary font-medium hover:bg-gray-50 transition'
                >
                  Cancel
                </button>

                <button
                  type='submit'
                  disabled={inquiryIsLoading}
                  className='px-8 py-2.5 bg-brand-primary hover:bg-brand-primaryHover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition'
                >
                  {inquiryIsLoading ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
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
        <LuArrowUpRight size={20} />
      </span>
    </div>
    <span className='text-base font-medium'>{title}</span>
  </div>
);
export default ProductInfo;
