/** @format */

"use client";

import Image from "next/image";
import { useState } from "react";
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

  return (
    <div className='relative w-full   overflow-hidden'>
      {/* Image */}
      <div className='w-full h-[90vh]  relative'>
        <Image
          src={slides[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          className=' object-cover'
        />
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
          className='bg-red-500 text-white p-2  shadow hover:bg-red-400 transition '
        >
          <HiArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
