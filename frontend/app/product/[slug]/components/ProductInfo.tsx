/**
 * eslint-disable @next/next/no-img-element
 * @format
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { LuArrowUpRight, LuStar } from "react-icons/lu";
import { getImageUrl } from "@/lib/strapi";

interface ProductInfoProps {
  product: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
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
    setInquiryFormData((prev) => ({ ...prev, [name]: value }));
    if (inquiryErrors[name]) setInquiryErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInquirySubmitMessage(null);
    const newErrors: Record<string, string> = {};
    if (!inquiryFormData.name.trim()) newErrors.name = 'Name is required';
    if (!inquiryFormData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryFormData.email)) newErrors.email = 'Please enter a valid email';
    if (!inquiryFormData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!inquiryFormData.message.trim()) newErrors.message = 'Message is required';
    if (Object.keys(newErrors).length > 0) { setInquiryErrors(newErrors); return; }

    setInquiryIsLoading(true);
    try {
      setInquirySubmitMessage({ type: 'success', text: 'Inquiry sent successfully! We will contact you soon.' });
      setInquiryFormData({ name: '', email: '', phone: '', message: '' });
      setInquiryErrors({});
      setTimeout(() => { setIsInquiryOpen(false); setInquirySubmitMessage(null); }, 2000);
    } catch {
      setInquirySubmitMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setInquiryIsLoading(false);
    }
  };

  const desc: string = product.description ?? '';
  const shortDesc = !isDescriptionExpanded && desc.length > 160 ? desc.slice(0, 160) + '…' : desc;
  const hasInfoCards = product.dimension || product.installationSteps || product.accessories;

  return (
    <>
      <div className="flex flex-col gap-6 w-full no-scrollbar">

        {/* Title & Rating */}
        <div className="flex flex-col gap-4 border-b border-[#D0D1D3] pb-6">
          <h1 className="font-handing text-2xl sm:text-3xl lg:text-4xl font-bold text-[#050B16] max-w-[90%] line-clamp-2">
            {product.title}
          </h1>
          <div className="font-nav flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <LuStar key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-[#535862]">({product.totalRatings} Ratings)</span>
          </div>
        </div>

        {/* Short description */}
        {desc && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {shortDesc}
            {desc.length > 160 && (
              <button onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} className="ml-1 text-brand-primary font-medium underline text-xs">
                {isDescriptionExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </p>
        )}

        {/* Info cards: Dimension / Installation Steps / Accessory */}
        {hasInfoCards && (
          <div className="grid grid-cols-3 border border-gray-200 rounded divide-x divide-gray-200">
            {product.dimension && (
              <div className="p-3 flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-700">Dimension :</span>
                {product.dimension.text && <span className="text-xs text-gray-600">{product.dimension.text}</span>}
                {product.dimension.image?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={getImageUrl(product.dimension.image.url)} alt="Dimension" className="w-12 h-12 object-contain self-end mt-auto" />
                )}
              </div>
            )}
            {product.installationSteps && (
              <div className="p-3 flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-700">Installation Steps :</span>
                {product.installationSteps.image?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={getImageUrl(product.installationSteps.image.url)} alt="Installation Steps" className="w-12 h-12 object-contain self-end mt-auto" />
                )}
              </div>
            )}
            {product.accessories && (
              <div className="p-3 flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-700">Accessory :</span>
                {product.accessories.image?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={getImageUrl(product.accessories.image.url)} alt="Accessory" className="w-12 h-12 object-contain self-end mt-auto" />
                )}
              </div>
            )}
          </div>
        )}

        {/* Sketch card */}
        {product.sketch && (product.sketch.image1?.url || product.sketch.title || product.sketch.image2?.url) && (
          <div className="border border-gray-200 rounded p-3 flex gap-4 items-start">
            {product.sketch.image1?.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={getImageUrl(product.sketch.image1.url)} alt="Sketch" className="w-20 h-20 object-contain shrink-0 border border-gray-100" />
            )}
            <div className="flex-1 text-sm text-gray-700 space-y-1">
              {product.sketch.title && (
                <p><span className="font-semibold">Product : </span>{product.sketch.title}</p>
              )}
              {product.sketch.image2?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={getImageUrl(product.sketch.image2.url)} alt="Sketch detail" className="w-full max-h-32 object-contain mt-2" />
              )}
            </div>
          </div>
        )}

        {/* Descriptions (type : value pairs) */}
        {product.descriptions?.length > 0 && (
          <div className="space-y-2">
            {product.descriptions.map((d: any, i: number) => (
              <p key={i} className="text-sm text-gray-700">
                <span className="font-semibold">{d.type} : </span>
                <span className="text-gray-600">{d.value}</span>
              </p>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row gap-4 pb-6 border-b border-gray-300">
          <button
            className="basis-2/3 bg-black text-white py-3 px-6 font-medium hover:bg-gray-800 transition-colors"
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
            className="basis-1/3 w-full group bg-brand-primary hover:bg-brand-primaryHover text-white font-medium transition-colors"
            onClick={() => setIsInquiryOpen(true)}
          >
            <div className="flex items-stretch">
              <span className="flex-1 py-3 px-6 flex items-center justify-center">Contact</span>
              <span className="w-12 flex items-center justify-center button-sidearrow">
                <LuArrowUpRight className="text-brand-primary w-5 h-5" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Inquiry Modal */}
      {isInquiryOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 md:p-8 relative animate-slideUp">
            <button onClick={() => setIsInquiryOpen(false)} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Product Inquiry</h2>
            <div className="flex items-start gap-4 border-b border-[#D0D1D3] pb-6 mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {product.images?.[0] && <img src={product.images[0]} alt={product.title} className="w-20 h-20 object-cover rounded-sm border shrink-0" />}
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-lg font-medium">{product.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 font-medium">★ {product.rating}</span>
                  <span className="text-gray-500 text-sm">({product.totalRatings} reviews)</span>
                </div>
              </div>
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleInquirySubmit}>
              <div>
                <label className="text-base font-medium">Name</label>
                <input type="text" name="name" placeholder="Your Name" value={inquiryFormData.name} onChange={handleInquiryInputChange}
                  className={`w-full border-b-2 py-3 text-sm text-gray-800 focus:outline-hidden transition ${inquiryErrors.name ? 'border-red-500' : 'border-[#E5E5E5]'}`} />
                {inquiryErrors.name && <p className="text-red-500 text-sm mt-1">{inquiryErrors.name}</p>}
              </div>
              <div>
                <label className="text-base font-medium">Email</label>
                <input type="email" name="email" placeholder="Your Email" value={inquiryFormData.email} onChange={handleInquiryInputChange}
                  className={`w-full border-b-2 py-3 text-sm text-gray-800 focus:outline-hidden transition ${inquiryErrors.email ? 'border-red-500' : 'border-[#E5E5E5]'}`} />
                {inquiryErrors.email && <p className="text-red-500 text-sm mt-1">{inquiryErrors.email}</p>}
              </div>
              <div>
                <label className="text-base font-medium">Phone Number</label>
                <input type="tel" name="phone" placeholder="Your Number" value={inquiryFormData.phone} onChange={handleInquiryInputChange}
                  className={`w-full border-b-2 py-3 text-sm text-gray-800 focus:outline-hidden transition ${inquiryErrors.phone ? 'border-red-500' : 'border-[#E5E5E5]'}`} />
                {inquiryErrors.phone && <p className="text-red-500 text-sm mt-1">{inquiryErrors.phone}</p>}
              </div>
              <div>
                <label className="text-base font-medium">Message</label>
                <textarea name="message" placeholder="Add Your Message Here" rows={2} value={inquiryFormData.message} onChange={handleInquiryInputChange}
                  className={`w-full border-b-2 py-3 text-sm text-gray-800 focus:outline-hidden transition ${inquiryErrors.message ? 'border-red-500' : 'border-[#E5E5E5]'}`} />
                {inquiryErrors.message && <p className="text-red-500 text-sm mt-1">{inquiryErrors.message}</p>}
              </div>
              {inquirySubmitMessage && (
                <div className={`p-3 rounded-md text-sm font-medium ${inquirySubmitMessage.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
                  {inquirySubmitMessage.text}
                </div>
              )}
              <div className="flex justify-end max-sm:flex-col max-sm:justify-center gap-4 mt-8">
                <button type="button" onClick={() => setIsInquiryOpen(false)} className="px-6 py-2.5 border border-gray-300 text-brand-primary font-medium hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" disabled={inquiryIsLoading} className="px-8 py-2.5 bg-brand-primary hover:bg-brand-primaryHover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition">
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

export default ProductInfo;
