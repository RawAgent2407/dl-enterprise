"use client";

import { useState } from "react";
import Image from "next/image";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const slides = [
//   "/images/slider1.jpg",
//   "/images/slider2.jpg",
  "/images/slider3.jpg",
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
    <div className="relative w-full   overflow-hidden">
      {/* Image */}
      <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] relative">
        <Image
          src={slides[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          className="object-fill"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-1 left-1 flex gap-1">
        <button
          onClick={prevSlide}
          className="bg-white text-gray-800 p-2 shadow hover:bg-gray-200 transition rounded border border-red-500"
        >
          <HiArrowLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="bg-red-500 text-white p-2  shadow hover:bg-red-200 transition rounded border border-white"
        >
          <HiArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
