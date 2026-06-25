"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pointerTop, setPointerTop] = useState(0);

  /* ---------------- ACTIVE DOT DETECTION ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      const center = window.innerHeight / 2;

      let closestDot: HTMLDivElement | null = null;
      let minDistance = Infinity;

      dotRefs.current.forEach((dot) => {
        if (!dot) return;

        const rect = dot.getBoundingClientRect();
        const dotCenter = rect.top + rect.height / 2;
        const distance = Math.abs(center - dotCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestDot = dot;
        }
      });

      if (closestDot && trackRef.current) {
        const trackRect = trackRef.current.getBoundingClientRect();
        const dotRect = (closestDot as HTMLDivElement).getBoundingClientRect();

        const position =
          dotRect.top +
          dotRect.height / 2 -
          trackRect.top;

        setPointerTop(position);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2>
            Where Quality Meets Innovation
          </h2>
          <p className="subheadline mt-4 text-center max-w-full md:max-w-[60%] mx-auto">We’ve been a trusted name in LED lighting and plastic housings for over 22 years, serving manufacturers with excellence and precision.</p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">

          {/* TRACK */}
          <div
            ref={trackRef}
            className="absolute left-5 sm:left-1/2 -translate-x-1/2 top-0 w-[6px] h-full bg-gray-100"
          >

            {/* POINTER */}
            <div
              className="absolute left-1/2 -translate-x-1/2 transition-all duration-500"
              style={{
                top: pointerTop,
                transform: "translate(-50%, -2%)",
              }}
            >
              <div className="w-2 h-36 bg-brand-primary border-4 border-brand-primary rounded-full" />
            </div>

          </div>

          {/* CARDS */}
          <div className="flex flex-col gap-20 md:gap-30 pl-10 sm:pl-0">

            {items.map((item, index) => (
              <div key={index} className="relative">

                <div
                  className={`flex flex-col sm:flex-row gap-8 md:gap-20 items-center ${
                    item.align === "left"
                      ? "sm:flex-row-reverse"
                      : ""
                  }`}
                >
                  {/* TEXT */}
                  <div className="sm:w-1/2">
                    <h3 className="text-xl md:text-3xl font-medium">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-dm text-gray-600">
                      {item.description}
                    </p>
                  </div>

                  {/* DOT */}
                  <div
                    ref={(el) => { dotRefs.current[index] = el; }}
                    className="absolute top-[2%] lg:top-1/2 sm:left-1/2 left-[-20px] -translate-x-1/2 w-4 h-4 bg-brand-primary rounded-full z-10"
                  />

                  {/* IMAGE */}
                  <div className="sm:w-1/2">
                    <div className="relative lg:aspect-[484/280] aspect-[280/160] rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}