"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import PromoSection from "../pages/sections/PromoSection";

const faqs = [
  {
    question: "What products does DL Enterprise offer?",
    answer:
      "DL Enterprise manufactures LED Tube Lights, COB Lights, Spotlights, Panel Lights, Street Lights, LED Drivers, and Lighting Accessories.",
  },
  {
    question: "How can I make a warranty claim?",
    answer:
      "To make a warranty claim, contact our customer service team with proof of purchase and a description of the issue. Our technical team will assess and respond accordingly.",
  },
  {
    question: "Do you provide international shipping?",
    answer:
      "Yes, we work with authorized distributors to deliver our products internationally. Please contact your local distributor for more details.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards, bank transfers, and payments through authorized online payment providers.",
  },
  {
    question: "Can I request a customized lighting solution?",
    answer:
      "Yes! Our team can work with you to design and implement customized LED lighting solutions for your specific requirements.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl">
              Find answers to common questions about DL Enterprise products and
              services.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className="text-lg font-medium text-gray-800">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <FaChevronUp className="text-red-600 ml-2" />
                    ) : (
                      <FaChevronDown className="text-red-600 ml-2" />
                    )}
                  </button>
                  {openIndex === index && (
                    <p className="mt-4 text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <PromoSection />
    </>
  );
};

export default FAQPage;
