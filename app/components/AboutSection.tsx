/** @format */

"use client";

import { LuArrowRight } from "react-icons/lu";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      className="
    w-full
    bg-white
    bg-[url('/images/about_us_container.png')]
    bg-cover bg-center
    flex flex-col
    section-gap
    section-gap-removeal
  "
    >
      {/* Main Content */}
      <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-12'>
        {/* Text Heading */}
        <h2>
          Beyond Lighting,
          <br className='hidden sm:block' />
          Inspiring Every Space
        </h2>

        {/* Text + Button */}
        <div className='flex flex-col grow-1 gap-3 pr-1 sm:gap-4 lg:gap-5 justify-start lg:justify-end items-start lg:items-end max-w-full lg:max-w-[480px]'>
          <p className='subheadline text-left lg:text-left'>
            Looking for a better future for small and medium-scale of
            Electronic products we decided to enter into the field of the
          </p>

          <button className="btn-tertiary flex items-center justify-center">
            <div>Explore More Options</div>
            <LuArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className='w-full'>
        <div className='relative w-full h-[360px] sm:h-[300px] md:h-[380px] lg:h-[420px] overflow-hidden rounded-xs'>
          <Image
            src='/images/kitchen_led_lighting.png'
            alt='Modern kitchen with LED lighting'
            fill
            priority={false}
            className=''
            sizes='
      (max-width: 640px) 100vw,
      (max-width: 768px) 100vw,
      (max-width: 1024px) 100vw,
      100vw
    '
          />
        </div>
      </div>

      {/* Highlight / Small Feature */}

      <div className='flex items-start gap-2 sm:gap-3 lg:gap-4'>
        <div className='w-3 xs:w-7 lg:w-3 h-3 bg-[#A60006] mt-1 px-1' />
        <p className='subheadline text-left lg:text-left'>
          Looking for a better future for small and medium-scale electronic
          products, we decided to enter into the field of the lighting
          industry.
        </p>
      </div>
    </section>
  );
}
