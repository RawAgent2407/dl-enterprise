/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

"use client";

import { Category } from "@/lib/constant";
import { useEffect, useRef, useState } from "react";
import CategoryCard from "./CategoryCard";

export default function CategorySection({ categories = [] }: { categories: Category[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0.05);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteracting = useRef(false);

  if (categories.length === 0) {
    return null;
  }


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

    isUserInteracting.current = true;

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    const progress = scrollLeft / (scrollWidth - clientWidth);

    setScrollProgress(Math.min(Math.max(progress, 0), 1));

    const cardWidth = getCardWidth();
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(index);

    // Resume auto-scroll after user stops scrolling
    clearTimeout((handleScroll as any).timeout);
    (handleScroll as any).timeout = setTimeout(() => {
      isUserInteracting.current = false;
    }, 1500);
  };


  useEffect(() => {
    if (categories.length === 0) return;

    autoScrollRef.current = setInterval(() => {
      if (isUserInteracting.current) return;

      setCurrentIndex((prev) => {
        const nextIndex = prev + 1 >= categories.length ? 0 : prev + 1;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 3000); // ⏱️ 3 seconds

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [categories.length]);

  return (
    <section className="
      w-full
      bg-white
      flex flex-col
      section-gap
      px-0 lg:px-0 xl:px-0
      section-gap-removeal
    ">
      {/* ================= HEADER ================= */}
      <div className='flex flex-col gap-4 section-padding-x'>
        <p className='uppercase text-text-heading subheadline'>
          OUR PRODUCTS
        </p>

        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-12'>
          <h2 className=''>
            Pioneering LED Lighting
            <br className='hidden sm:block' />
            Solutions Since 2005
          </h2>

          <p className='subheadline text-left lg:text-left max-w-full md:max-w-[480px]'>
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
        className='overflow-x-auto no-scrollbar'
      >
        <div className='flex gap-4 sm:gap-4 lg:gap-6 w-max snap-x snap-mandatory'>
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} length={categories.length} />
          ))}
        </div>
      </div>

      {/* ================= CONTROLS ================= */}
      <div className='flex items-center justify-end gap-4 section-padding-x'>
        {/* Left Arrow */}
        <button
          onClick={() => {
            const prev = Math.max(currentIndex - 1, 0);
            setCurrentIndex(prev);
            scrollToIndex(prev);
          }}
          className='text-brand-primary text-2xl font-bold hover:scale-110 transition disabled:opacity-40'
          disabled={currentIndex === 0}
        >
          ‹
        </button>

        {/* Progress Bar */}
        <div className='relative w-40 h-2 bg-gray-200 rounded-full overflow-hidden'>
          <div
            className='absolute top-0 left-0 h-full bg-brand-primary rounded-full transition-[width] duration-200'
            style={{
              width: `${scrollProgress * 100}%`,
            }}
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => {
            const next = Math.min(currentIndex + 1, categories.length - 1);
            setCurrentIndex(next);
            scrollToIndex(next);
          }}
          className='text-brand-primary text-2xl font-bold hover:scale-110 transition disabled:opacity-40'
          disabled={currentIndex === categories.length - 1}
        >
          ›
        </button>
      </div>
    </section>
  );
}
