/** @format */

"use client";

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
];

export default function BrightestLineup() {
  return (
    <section className='w-full bg-white pb-12 sm:pb-16 lg:pb-20'>
      <div className=' px-4 sm:px-6 lg:px-12'>
        {/* Heading */}
        <div className='text-center max-w-3xl mx-auto mb-10 sm:mb-14'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900'>
            The Brightest In Our Line-Up
          </h2>
          <p className='mt-3 text-sm sm:text-base text-gray-600'>
            Perfect for warehouses and factories, delivering bright, uniform
            lighting across high-ceiling environments.
          </p>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8'>
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
                  <span className='text-xs sm:text-sm '>{item.watt}</span>

                  <button className='text-xs sm:text-sm font-medium  hover:underline'>
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
