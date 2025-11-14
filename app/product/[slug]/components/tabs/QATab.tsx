"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const QATab = () => {
  const allQuestions = [
    {
      question: "Is this compatible with both R22 and R134a systems?",
      answer:
        "Yes, the Condenser Union is designed for compatibility with both R22 and R134a refrigerants.",
    },
    {
      question: "Does this require any additional sealing or O-rings?",
      answer:
        "No, it provides a secure connection, but thread sealant or Teflon tape is recommended for extra leak protection.",
    },
    {
      question: "Is this made of brass or another material?",
      answer:
        "This Condenser Union is made from high-quality brass for durability and corrosion resistance.",
    },
    {
      question: "Can this be used for outdoor condenser installations?",
      answer:
        "Yes, its brass construction ensures long-lasting durability even in outdoor or harsh environmental conditions.",
    },
    {
      question: "What is the expected life of this condenser union?",
      answer:
        "With proper installation, it can last many years thanks to its corrosion-resistant brass body.",
    },
  ];

  // Number of items visible initially
  const [visibleCount, setVisibleCount] = useState(3);

  // Which accordion is open
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  const qaItems = allQuestions.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-gray-900">Questions & Answers</h2>

      <div className="space-y-4">
        {qaItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
          >
            {/* Question Accordion Header */}
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-4 text-left"
            >
              <span className="font-medium text-gray-900 text-lg">
                {item.question}
              </span>

              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Answer Section */}
            <div
              className={`px-4 overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 pb-4" : "max-h-0"
              }`}
            >
              <p className="text-gray-700 text-[15px] leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < allQuestions.length && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="px-6 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
};

export default QATab;
