"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full bg-[#f3f3f3] py-10 sm:py-16 lg:py-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-12">
          {/* Text Heading */}
          <h2 className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[48px] font-plus-jakarta font-semibold leading-snug text-left text-[#050b16] max-w-full lg:max-w-[743px]">
            Beyond Lighting,
            <br className="hidden sm:block" />
            Inspiring Every Space
          </h2>

          {/* Text + Button */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 justify-start lg:justify-end items-start lg:items-end max-w-full lg:max-w-[484px]">
            <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] font-poppins leading-relaxed text-[#364151]">
              Looking for a better future for small and medium-scale electronic
              products, we decided to enter into the field of lighting industry.
            </p>

            <div className="flex justify-start lg:justify-end items-center border-b-2 border-[#c50209] hover:border-[#e01d25] transition-all duration-300 cursor-pointer">
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] font-poppins text-[#050b16] mr-2 sm:mr-3">
                Explore More Options
              </p>
              <Image
                src="/images/img_arrowright.svg"
                alt="Arrow right icon"
                width={20}
                height={20}
                className="w-[15px] sm:w-[18px] lg:w-5 h-[15px] sm:h-[18px] lg:h-5"
              />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-6 sm:mt-8 lg:mt-10 w-full">
          <div className="w-full relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[420px]">
            <Image
              src="/images/img_kitchen_2_jpg.png"
              alt="Modern kitchen with LED lighting"
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 640px) 100vw, 
           (max-width: 768px) 100vw, 
           (max-width: 1024px) 100vw, 
           100vw"
            />
          </div>
        </div>

        {/* Highlight / Small Feature */}
        <div className="flex flex-col justify-center items-start w-full mt-4">
          <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
            <div className="w-2 sm:w-3 lg:w-4 h-2 sm:h-3 lg:h-4 bg-[#e01d25] mt-1" />
            <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] font-poppins leading-6 text-[#364151]">
              Looking for a better future for small and medium-scale electronic
              products, we decided to enter into the field of the lighting
              industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
