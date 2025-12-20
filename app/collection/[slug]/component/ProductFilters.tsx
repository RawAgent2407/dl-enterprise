/** @format */

"use client";

import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: 1,
    title: "T5 Tube Light",
    watt: "7 Watt",
    image: "/images/product3.png",
  },
  {
    id: 2,
    title: "T5 Tube Light",
    watt: "7 Watt",
    image: "/images/product1.png",
  },
  {
    id: 3,
    title: "T5 Tube Light",
    watt: "7 Watt",
    image: "/images/product2.png",
  },
  {
    id: 4,
    title: "T5 Tube Light",
    watt: "7 Watt",
    image: "/images/product2.png",
  },
  {
    id: 5,
    title: "T5 Tube Light",
    watt: "7 Watt",
    image: "/images/product3.png",
  },
  {
    id: 6,
    title: "T5 Tube Light",
    watt: "7 Watt",
    image: "/images/product1.png",
  },
  {
    id: 7,
    title: "T5 Tube Light",
    watt: "7 Watt",
    image: "/images/product2.png",
  },
  {
    id: 8,
    title: "T5 Tube Light",
    watt: "7 Watt",
    image: "/images/product2.png",
  },
  {
    id: 9,
    title: "T5 Tube Light",
    watt: "7 Watt",
    image: "/images/product1.png",
  },
  {
    id: 11,
    title: "T5 Tube Light",
    watt: "7 Watt",
    image: "/images/product2.png",
  },
];
export default function ProductFilters() {
  return (
    <section className='w-full bg-white'>
      <div className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-20'>
        {/* ================= CATEGORY BREADCRUMB ================= */}
        <div className='text-sm text-gray-600 mb-4 flex items-center gap-1'>
          <span className='font-medium text-gray-900'>Categories</span>
          <ChevronDown size={14} className='-rotate-90' />
        </div>

        {/* ================= TOP FILTER BAR ================= */}
        <div className='flex flex-col gap-4 mb-6'>
          {/* Buttons Row */}
          <div className='flex flex-col sm:flex-row gap-3'>
            <button className='flex items-center justify-center gap-2 border rounded-md px-4 h-11 text-sm font-medium w-full sm:w-auto'>
              <SlidersHorizontal size={16} />
              FILTER BY
            </button>

            <button className='flex items-center justify-between gap-2 border rounded-md px-4 h-11 text-sm font-medium w-full sm:w-56'>
              ALPHABETICALLY
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Search */}
          <div className='relative w-full'>
            <Search
              size={16}
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
            />
            <input
              placeholder='SEARCH PRODUCTS'
              className='w-full h-11 pl-11 pr-4 border rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500'
            />
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className='flex gap-8'>
          {/* ========== SIDEBAR (Desktop Only) ========== */}
          <aside className='hidden lg:block w-64 shrink-0'>
            <h3 className='text-sm font-medium mb-4 flex items-center gap-2'>
              SHOP BY
              <ChevronDown size={14} />
            </h3>

            <div className='border rounded-lg p-4 space-y-3 text-base'>
              <p className='font-medium'>Category</p>

              {[
                "Panel lights (10)",
                "Flare Long Nut (3)",
                "Flare Dead Nut",
                "Reducing Flare Nut",
                "Flare Union",
                "Reducing Flare Union (12)",
                "Seal Plug",
                "Cylinder Adapter",
                "Nitrogen Union",
              ].map((item) => (
                <label
                  key={item}
                  className='flex items-center gap-2 p-2 border-b text-base border-gray-200 text-gray-600 cursor-pointer'
                >
                  <input type='checkbox' className='rounded' />
                  {item}
                </label>
              ))}
            </div>
          </aside>

          {/* ========== PRODUCTS GRID PLACEHOLDER ========== */}
          <div className='flex-1'>
            {/* ================= CONTENT ================= */}
            <div className=''>
              <div className='flex gap-8'>
                {/* ================= PRODUCTS ================= */}
                <div className='flex-1'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
                    {products.map((item) => (
                      <div
                        key={item.id}
                        className='bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden'
                      >
                        {/* Image */}
                        <div className='relative w-full aspect-4/3 bg-gray-50'>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className='absolute object-cover p-6'
                            sizes='(max-width: 640px) 100vw,
                                       (max-width: 1024px) 50vw,
                                       33vw'
                          />
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
                        </div>

                        {/* Content */}
                        <div className='px-5 py-4 '>
                          <h3 className='text-sm font-medium text-red-600 uppercase'>
                            {item.title}
                          </h3>

                          <div className='mt-2 flex items-center justify-between text-red-600'>
                            <span className='text-xs sm:text-sm '>
                              {item.watt}
                            </span>

                            <button className='text-xs sm:text-sm font-medium  hover:underline'>
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
