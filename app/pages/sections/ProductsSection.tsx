/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { HiArrowRight, HiOutlineArrowRight } from "react-icons/hi";

interface Product {
  id: string;
  title: string;
  image: string;
}

export default function ProductsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products: Product[] = [
    {
      id: "1",
      title: "LED Tube Lights",
      image: "/images/product0.png",
    },
    {
      id: "2",
      title: "COB Lights",
      image: "/images/product1.png",
    },
    {
      id: "3",
      title: "Flood/Street Lights",
      image: "/images/product2.png",
    },
    {
      id: "4",
      title: "Hanging Lights",
      image: "/images/product3.png",
    },
    {
      id: "5",
      title: "LED Plastic Panels",
      image: "/images/product4.png",
    },
    {
      id: "6",
      title: "LED Driver & Controllers",
      image: "/images/product5.png",
    },
    {
      id: "7",
      title: "Reflectors and Glass",
      image: "/images/product6.png",
    },
  ];

  return (
     <section className="w-full bg-white py-12 sm:py-16 lg:py-12 ">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-14 lg:mb-20">
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-poppins font-medium uppercase tracking-wide text-[#697586]">
            OUR PRODUCTS
          </p>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-between items-start lg:items-center">
            <h2 className="text-[24px] sm:text-[36px] lg:text-[48px] font-plus-jakarta font-semibold leading-tight text-[#050b16] lg:w-[50%]">
              Pioneering LED Lighting Solutions Since 2005
            </h2>

            <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-poppins leading-relaxed text-[#364151] lg:w-[40%]">
              DL Enterprises is redefining illumination with innovative,
              energy-saving LED products crafted for homes, industries, and
              commercial spaces.
            </p>
          </div>
        </div>

        {/* Product Slider */}
        <div className="overflow-x-auto scroll-hidden px-2 sm:px-4 lg:px-0">
          <div className="flex gap-5 sm:gap-8 lg:gap-10 w-max mx-auto">
            {/* Product Cards */}
            {products.map((product) => (
              <div
                key={product.id}
                className="relative shrink-0 w-[260px] sm:w-[300px] lg:w-[632px] 
                           h-[220px] sm:h-[260px] lg:h-[387px] 
                           overflow-hidden shadow-md group cursor-pointer bg-white border"
              >
                {/* Background Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-white/70 via-white/20 to-transparent"></div>

                {/* Title */}
                <div className="absolute top-6 left-6 z-10">
                  <h2 className="text-lg sm:text-xl font-semibold text-red-600">
                    {product.title}
                  </h2>
                </div>

                {/* Arrow Icon */}
                <div className="absolute bottom-10 right-10 text-red-600 transition-transform duration-300 group-hover:translate-x-1">
                  <HiOutlineArrowRight   size={26} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
