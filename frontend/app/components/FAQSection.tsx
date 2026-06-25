/** @format */

"use client";

import { LuChevronDown } from "react-icons/lu";
import { useState } from "react";

const faqs = [
  {
    question: "What is the average life of an LED light?",
    answer:
      "LED lights typically last between 25,000 to 50,000 hours, depending on usage, quality, and operating conditions.",
  },
  {
    question: "What causes LED lights to fail?",
    answer:
      "Common causes include overheating, power surges, poor-quality drivers, and improper installation.",
  },
  {
    question: "What are some problems with LED lights?",
    answer:
      "Issues may include flickering, color inconsistency, dimming failure, or premature degradation.Issues may include flickering, color inconsistency, dimming failure, or premature degradation.",
  },
  {
    question: "Do LED lights eventually burn out?",
    answer:
      "LEDs don’t burn out like traditional bulbs but gradually dim over time until they are no longer effective.",
  },
  {
    question: "Why do LED bulbs burn out so fast?",
    answer:
      "Fast failure is often due to excessive heat, voltage fluctuations, or low-quality components.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className='w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-20'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20'>
          {/* LEFT CONTENT */}
          <div className='space-y-4'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-medium text-black'>
              Frequently <br className='hidden sm:block' /> Asked Question
            </h2>
            <p className='text-sm sm:text-base text-gray-500 max-w-md'>
              Find answers to common questions about LED lighting, performance,
              lifespan, and reliability.
            </p>
          </div>

          {/* RIGHT ACCORDION */}
          <div className='divide-y divide-gray-200'>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className='py-6'>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className='flex w-full items-center justify-between text-left'
                  >
                    <span className='text-base sm:text-lg font-medium text-black'>
                      {faq.question}
                    </span>
                    <LuChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-3"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className='overflow-hidden'>
                      <p className='text-sm sm:text-base text-gray-500 leading-relaxed'>
                        {faq.answer}
                        {faq.answer}
                      </p>
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
