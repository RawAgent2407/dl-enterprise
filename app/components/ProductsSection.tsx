/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

"use client";

import { useRef, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";

interface Product {
  id: string;
  title: string;
  image: string;
}

export default function ProductsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.05);

  const products: Product[] = [
    { id: "1", title: "LED Tube Lights", image: "/images/product_1.png" },
    { id: "2", title: "COB Lights", image: "/images/product_2.png" },
    { id: "3", title: "Flood / Street Lights", image: "/images/product_3.png" },
    { id: "4", title: "Hanging Lights", image: "/images/product_4.png" },
    { id: "5", title: "LED Plastic Panels", image: "/images/product_5.png" },
    {
      id: "6",
      title: "LED Driver & Controllers",
      image: "/images/product_6.png",
    },
    { id: "7", title: "Reflectors and Glass", image: "/images/product_7.png" },
  ];
  const getCardWidth = () => {
    if (window.innerWidth >= 1024) return 564 + 40;
    if (window.innerWidth >= 640) return 400 + 32;
    return 327 + 20;
  };

  const scrollToIndex = (index: number) => {
    const cardWidth = getCardWidth();
    sliderRef.current?.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    // progress from 0 → 1
    const progress = scrollLeft / (scrollWidth - clientWidth);

    setScrollProgress(Math.min(Math.max(progress, 0), 1));

    // keep index in sync (optional)
    const cardWidth = getCardWidth();
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(index);
  };
  return (
    <div className="w-full bg-white border-t border-b border-black/5 bg-[url('/images/about-bg-mobile.png')]/10 lg:bg-[url('/images/about-bg-desktop_2.png')] py-12 sm:py-16 bg-cover">
      <div className='w-full max-w-[1920px] mx-auto'>
        {/* ================= HEADER ================= */}
        <div className='flex flex-col gap-4 sm:gap-6 lg:gap-8 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-20'>
          <p className='text-[14px] sm:text-[15px] lg:text-[16px] font-poppins font-medium uppercase tracking-wide text-[#697586]'>
            OUR PRODUCTS
          </p>

          <div className='flex flex-col lg:flex-row gap-6 lg:gap-10 justify-between items-start lg:items-center'>
            <h2 className='text-[24px] sm:text-[36px] lg:text-[48px] font-plus-jakarta font-medium leading-tight text-[#050b16] lg:w-[50%]'>
              Pioneering LED Lighting Solutions Since 2005
            </h2>

            <p className='text-[14px] sm:text-[15px] lg:text-[16px] font-poppins leading-relaxed text-[#364151] lg:w-[40%]'>
              DL Enterprises is redefining illumination with innovative,
              energy-saving LED products crafted for homes, industries, and
              commercial spaces.
            </p>
          </div>
        </div>

        {/* ================= SLIDER ================= */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className='overflow-x-auto scroll-hidden'
        >
          <div className='flex gap-5 sm:gap-8 lg:gap-10 w-max snap-x snap-mandatory'>
            {products.map((product, index) => (
              <div
                key={product.id}
                ref={index === 0 ? cardRef : null}
                className={`relative shrink-0 snap-start
                  w-[327px] sm:w-[400px] lg:w-[564px]
                  h-[220px] sm:h-60 lg:h-[343px]
                  overflow-hidden bg-white border border-gray-100 shadow-lg group cursor-pointer ${
                    index === products?.length - 1
                      ? "mr-4 sm:mr-6 lg:mr-12 xl:mr-20"
                      : ""
                  }`}
              >
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                />

                {/* Overlay */}
                <div
                  className='absolute inset-0 
  bg-linear-to-br from-white/70 via-white/20 to-transparent
'
                />

                <div
                  className='absolute inset-0 
  bg-linear-to-t from-gray-500/40 via-gray-500/10 to-transparent
'
                />
                {/* Title */}
                <div className='absolute top-6 left-6 z-10'>
                  <h3 className='text-lg sm:text-xl font-medium text-[#A60006]'>
                    {product.title}
                  </h3>
                </div>

                {/* Arrow */}
                <div className='absolute bottom-8 right-8 text-[#A60006] transition-transform duration-300 group-hover:translate-x-1'>
                  <HiOutlineArrowRight size={26} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CONTROLS ================= */}
        <div className='mt-10 flex items-center justify-end gap-6 px-4 sm:px-6 lg:px-12 xl:px-20'>
          {/* Left Arrow */}
          <button
            onClick={() => {
              const prev = Math.max(currentIndex - 1, 0);
              setCurrentIndex(prev);
              scrollToIndex(prev);
            }}
            className='text-red-600 text-xl font-bold hover:scale-110 transition disabled:opacity-40'
            disabled={currentIndex === 0}
          >
            ‹
          </button>

          {/* Progress Bar */}
          <div className='relative w-40 h-2 bg-gray-200 rounded-full overflow-hidden'>
            <div
              className='absolute top-0 left-0 h-full bg-red-600 rounded-full transition-[width] duration-200'
              style={{
                width: `${scrollProgress * 100}%`,
              }}
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => {
              const next = Math.min(currentIndex + 1, products.length - 1);
              setCurrentIndex(next);
              scrollToIndex(next);
            }}
            className='text-red-600 text-xl font-bold hover:scale-110 transition disabled:opacity-40'
            disabled={currentIndex === products.length - 1}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
