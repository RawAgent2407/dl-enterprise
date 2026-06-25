/** @format */

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuCircleCheck } from "react-icons/lu";

export default function WhyChooseSection() {
  const features = [
    "In-house R&D and Manufacturing",
    "Energy-Efficient & Long-lasting Products",
  ];

  const productImages = [
    "/images/why_choose_2.png",
    "/images/why_choose_3.png",
    "/images/why_choose_4.png",
    "/images/why_choose_5.png",
  ];

  // State to track the currently displayed main image
  const defaultImage = "/images/why_choose_1.png";

  const [activeIndex, setActiveIndex] = useState(-1); // -1 = default image
  const [isHovering, setIsHovering] = useState(false);
  let intervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = [defaultImage, ...productImages];

  useEffect(() => {
    if (isHovering) return; // pause when hovering

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering]);

  const mainImage = activeIndex === -1 ? defaultImage : images[activeIndex];

  return (
    <section className='w-full bg-white flex lg:px-0 px-0 section-gap-removeal'>
      <div className='flex flex-1 flex-col md:flex-row  items-center md:items-start gap-8 lg:gap-16'>
        {/* Left Side - Image Container */}
        <div className='w-[100%] mb-[12%] md:mb-0  justify-start order-2 md:order-1'>
          {/* Background container image */}
          <div className='relative w-[80%] md:w-[100%] h-[327px] sm:h-[427px] md:h-[550px] lg:h-[658px] xl:h-[698px] bg-brand-primary sm:rounded-sm'>
            <div className='relative translate-x-[12%] translate-y-[12%] w-full h-full overflow-hidden'>
              {/* Create overlapping images for smooth crossfade */}

              <Image
                key={mainImage}
                src={mainImage}
                alt='LED lighting product'
                fill
                className={`object-cover transition-opacity duration-500 ease-in-out `}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className='w-full flex-auto section-padding md:max-lg:px-[48px] flex flex-col justify-center section-gap text-left order-1 lg:order-2'>
          {/* Section Header */}
          <div className='flex flex-col gap-2 sm:gap-3'>
            <h5 className="uppercase">
              Why Choose Us
            </h5>
            <h2 className='max-w-full md:max-w-[80%] md:text-[36px] lg:text-[40px]'>
              Built To Deliver.
              <br />
              Designed To Last.
            </h2>
            <p className="subheadline max-w-full md:max-w-[80%]">
              We control every step from concept to production ensuring
              unmatched precision, faster iterations, and better value.
            </p>
          </div>

          {/* Feature List */}
          <div className='flex flex-col gap-2 sm:gap-3'>
            {features.map((feature, i) => (
              <div key={i} className='flex items-center'>
                <LuCircleCheck className='text-brand-primary text-[16px] sm:text-[18px]' />
                <p className="ml-2 subheadline text-text-list">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Divider Line */}
          <div className='w-full md:max-w-[80%] h-px bg-[#C2CAD4]' />

          {/* Product Images */}
          <div className="relative w-full">
            <div className="
                flex justify-start gap-2 sm:gap-3 md:gap-4 lg:gap-6
                overflow-x-auto md:overflow-visible
                no-scrollbar
                max-w-full
                snap-x snap-mandatory
              ">
              {productImages.map((src, index) => (
                <div
                  key={index}
                  className="
                        snap-start
                        shrink-0
                        w-[70px] sm:w-[80px] md:w-[100px] lg:w-[120px]
                        aspect-square
                        relative
                        cursor-pointer
                        transition-transform
                        hover:scale-105
                        rounded-sm
                        overflow-hidden"
                  onMouseEnter={() => {
                    setIsHovering(true);
                    setActiveIndex(index + 1);
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false);
                  }}
                >
                  <Image
                    src={src}
                    alt={`product ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
