/** @format */

"use client";

import { getImageUrl } from "@/lib/strapi";
import { LuStar } from "react-icons/lu";

export default function BrightestLineup({ recommendedProducts }: any) {
  recommendedProducts = recommendedProducts?.data || [];
  return (
    <section className='w-full bg-white'>
      <div className=''>
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6 lg:gap-8'>
          {recommendedProducts?.map((item:any) => (
            <div
              key={item.id}
              className='bg-white rounded-s product-card-box transition overflow-hidden'
              style={{
                border: "1px solid",
                borderImageSource: "linear-gradient(180deg, rgba(102, 102, 102, 0.12) 0%, rgba(0, 0, 0, 0.12) 100%)",
                borderImageSlice: 1,
              }}
            >

              <div className='product-card w-full aspect-4/3 bg-gray-50 h-[280px] ld:h-[360px]'
                style={{
                  background: "linear-gradient(180deg, #FCFCFC 0%, #F5F5F5 100%)"
                }}
              >
                <img
                  src={getImageUrl(item?.gallery?.[0]?.url || "/uploads/placeholder.png")}
                  alt={item.title}
                  className='object-cover w-full h-full'
                  style={{
                    background: "linear-gradient(180deg, #FCFCFC 0%, #F5F5F5 100%)"
                  }}
                />
              </div>

              <div className='flex px-5 py-4 flex-col gap-2'>
                <h3 className='text-lg font-medium text-brand-primary uppercase line-clamp-2 overflow-hidden text-ellipsis'>
                  {item.title}
                </h3>
                <div className='flex-1 text-sm flex flex-wrap items-center gap-2'>
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center'>
                      {[...Array(5)].map((_, i) => (
                        <LuStar
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(item.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>

                    <span className='font-medium'>{item.rating}</span>
                  </div>
                  <span className='text-gray-500'>
                    ({item.totalRatings} Ratings)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
