/**
 * eslint-disable react-hooks/rules-of-hooks
 *
 * @format
 */

/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { useInView } from "../hooks/useInView";

const items = [
  {
    title: "Trusted Industry Experience",
    description:
      "With over 22 years of expertise, DL Enterprises delivers reliable lighting components trusted by 1600+ customers and 200+ distributors across India.",
    image:
      "https://images.pexels.com/photos/35189671/pexels-photo-35189671.jpeg",
    align: "left",
  },
  {
    title: "Innovative LED Lighting Solutions",
    description:
      "Providing advanced, energy-efficient LED lighting and plastic housing solutions that empower small and medium-scale manufacturers.",
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    align: "right",
  },
  {
    title: "Customer-Centric Approach",
    description:
      "From design to delivery, our focus remains on innovation, quality, and exceptional service to meet evolving industry needs.",
    image: "https://images.pexels.com/photos/8297443/pexels-photo-8297443.jpeg",
    align: "left",
  },
  {
    title: "Affordable Quality Manufacturing",
    description:
      "We design and produce high-quality plastic housings with optimal composition, functionality, and long-lasting performance.",
    image: "https://images.pexels.com/photos/8837810/pexels-photo-8837810.jpeg",
    align: "right",
  },
];

export default function AboutTimeline() {
  return (
    <section className='w-full py-16 sm:py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900'>
            Where Quality Meets Innovation
          </h2>
          <p className='mt-4 text-gray-600 text-sm sm:text-base'>
            We've been a trusted name in LED lighting and plastic housings for
            over 22 years, serving manufacturers with excellence and precision.
          </p>
        </div>

        {/* Timeline */}
        <div className='relative'>
          <div className='absolute sm:left-1/2 left-0 top-0 h-full w-1 bg-red-500/30 -translate-x-1/2' />

          <div className='space-y-16 ml-5 sm:ml-0'>
            {items.map((item, index) => {
              const { ref, isVisible } = useInView({
                threshold: 0.1,
              });

              return (
                <div
                  key={index}
                  ref={ref}
                  className={`
                    transition-all duration-700 ease-out
                    ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }
                  `}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className='flex items-start sm:block'>
                    {/* Mobile dot */}
                    <div className='flex sm:hidden relative -left-6.5 pt-2'>
                      <span className='w-3 h-3 bg-red-600 rounded-full z-10' />
                    </div>

                    <div
                      className={`flex flex-col sm:flex-row sm:items-center gap-8 ${
                        item.align === "right" ? "sm:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Content */}
                      <div
                        className={`
                          sm:w-1/2 transition-all duration-700
                          ${
                            isVisible
                              ? "opacity-100 translate-x-0"
                              : item.align === "right"
                              ? "opacity-0 translate-x-10"
                              : "opacity-0 -translate-x-10"
                          }
                        `}
                      >
                        <h3 className='text-lg sm:text-xl font-medium text-gray-900'>
                          {item.title}
                        </h3>
                        <p className='mt-3 text-gray-600 text-sm sm:text-base'>
                          {item.description}
                        </p>
                      </div>

                      {/* Dot (Desktop) */}
                      <div className='hidden sm:flex relative'>
                        <span className='w-3 h-3 bg-red-600 rounded-full z-10' />
                      </div>

                      {/* Image */}
                      <div
                        className={`
                          sm:w-1/2 transition-all duration-700
                          ${
                            isVisible
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-95"
                          }
                        `}
                      >
                        <div className='relative w-full h-[200px] sm:h-[260px] lg:h-[280px] rounded-lg overflow-hidden'>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className='object-cover'
                            sizes='(max-width: 768px) 100vw, 50vw'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
