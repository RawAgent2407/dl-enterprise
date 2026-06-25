/** @format */

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const slides = [
  "/images/slider2.png",
  "/images/slider1.png",
  "/images/slider3.png",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative w-full   overflow-hidden'>
      {/* Image */}
      {/* @todo: change height for different screen sizes */}
      <div className="w-full h-[90vh] overflow-hidden relative">
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full h-full relative">
              <Image
                src={slide}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='absolute bottom-0 left-0 flex '>
        <button
          onClick={prevSlide}
          className='bg-white text-gray-800 p-2 shadow hover:bg-gray-200 transition '
        >
          <HiArrowLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className='bg-brand-primary text-white p-2  shadow hover:bg-brand-primaryHover transition '
        >
          <HiArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
