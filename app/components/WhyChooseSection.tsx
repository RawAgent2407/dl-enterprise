/** @format */

"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

export default function WhyChooseSection() {
  const features = [
    "In-house R&D and Manufacturing",
    "Energy-Efficient & Long-lasting Products",
  ];

  const productImages = [
    "/images/choose_2.png",
    "/images/choose_3.png",
    "/images/choose_4.png",
    "/images/choose_5.png",
  ];

  // State to track the currently displayed main image
  const [mainImage, setMainImage] = useState("/images/choose6.png");

  return (
    <div className='w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-20'>
      <div className='w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12'>
        <div className='flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16'>
          {/* Left Side - Image Container */}
          <div className='relative w-full lg:w-1/2 flex justify-center lg:justify-start'>
            {/* Background container image */}
            <div className='relative w-[280px] sm:w-[375px] md:w-[400px] lg:w-[520px] xl:w-[560px] h-[327px] sm:h-[327px] md:h-[400px] lg:h-[520px] xl:h-[560px] bg-red-500'>
              <div className='absolute bottom-[-5%] right-[-5%] w-[280px] sm:w-[375px] md:w-[400px] lg:w-[520px] xl:w-[560px] h-[327px] sm:h-[327px] md:h-[400px] lg:h-[520px] xl:h-[560px] overflow-hidden'>
                {/* Create overlapping images for smooth crossfade */}
                <Image
                  src='/images/choose6.png'
                  alt='LED lighting product showcase'
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    mainImage === "/images/choose6.png"
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
                {productImages.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt='LED lighting product'
                    fill
                    className={`object-cover transition-opacity duration-500 ${
                      mainImage === src ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className='w-full lg:w-[45%] flex flex-col gap-6 sm:gap-8 lg:gap-10 text-left'>
            {/* Section Header */}
            <div className='flex flex-col gap-2 sm:gap-3'>
              <p className="text-[12px] sm:text-[14px] font-['Poppins'] tracking-[1px] uppercase text-[#697586]">
                Why Choose Us
              </p>
              <h2 className='text-[20px] sm:text-[28px] md:text-[34px] lg:text-[46px]   font-medium leading-snug text-[#161515] max-w-full md:max-w-[80%]'>
                Built To Deliver. Designed To Last.
              </h2>
              <p className="text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-['Poppins'] leading-relaxed text-[#364151] max-w-full md:max-w-[80%]">
                We control every step from concept to production ensuring
                unmatched precision, faster iterations, and better value.
              </p>
            </div>

            {/* Feature List */}
            <div className='flex flex-col gap-2 sm:gap-3'>
              {features.map((feature, i) => (
                <div key={i} className='flex items-center'>
                  <FaCircleCheck className='text-[#A60006] text-[16px] sm:text-[18px]' />
                  <p className="ml-2 text-[14px] sm:text-[16px] lg:text-[18px] font-['Poppins'] text-[#364151]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider Line */}
            <div className='w-full h-px bg-[#c1c9d4] my-4' />

            {/* Product Images */}
            <div className='flex justify-start gap-2 sm:gap-3 md:gap-4 lg:gap-6'>
              {productImages.map((src, index) => (
                <div
                  key={index}
                  className='w-[22%] min-w-[70px] max-w-[130px] aspect-square relative cursor-pointer transition-transform hover:scale-105 hover:border-4 hover:border-[#A60006] rounded-md'
                  onMouseEnter={() => setMainImage(src)}
                  onMouseLeave={() => setMainImage("/images/choose6.png")}
                >
                  <Image
                    src={src}
                    alt={`product ${index + 1}`}
                    fill
                    className='object-cover rounded-md'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
