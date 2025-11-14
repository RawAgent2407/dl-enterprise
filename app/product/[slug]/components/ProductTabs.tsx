/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import SpecificationsTab from "./tabs/SpecificationsTab";
import ReviewsTab from "./tabs/ReviewsTab";
import QATab from "./tabs/QATab";

interface ProductTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: "specifications", label: "Specifications" },
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews" },
    { id: "related", label: "Related Items" },
    { id: "qa", label: "Q & A" },
  ];

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {/* Specifications */}
        {activeTab === "specifications" && <SpecificationsTab />}

        {/* Reviews */}
        {activeTab === "reviews" && <ReviewsTab />}

        {/* Q&A */}
        {activeTab === "qa" && <QATab />}

        {/* Description */}
        {activeTab === "description" && (
          <div className="space-y-6 text-gray-800 leading-relaxed">
            <h2 className="text-3xl font-semibold text-gray-900">
              Product Description
            </h2>

            <p>
              Introducing the{" "}
              <span className="font-semibold text-red-600">
                BrassBlitz R134a Can Tap Valve
              </span>{" "}
              — engineered to redefine the way refrigerant refills are
              performed. Built with precision and innovation, this tool ensures
              reliable performance in all HVAC servicing tasks.
            </p>

            <p>
              Crafted from <strong>premium-grade Brass and Steel</strong>, it
              delivers superior durability, corrosion resistance, and
              long-lasting service life compared to standard taps.
            </p>

            <h3 className="text-xl font-semibold mt-6">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>High-quality brass body for maximum durability</li>
              <li>Compatible with most standard R134a refrigerant cans</li>
              <li>Precision machining ensures a leak-free experience</li>
              <li>Ergonomic design for easy and efficient operation</li>
              <li>Corrosion-resistant finish ensures long-term reliability</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6">
              Why Choose BrassBlitz?
            </h3>
            <p>
              Each BrassBlitz product is designed with <strong>accuracy</strong>
              ,<strong> durability</strong>, and <strong>performance</strong> in
              mind. Whether you're a technician or a DIY user, this valve helps
              you achieve professional-grade results with ease.
            </p>
          </div>
        )}
        {/* Related Items */}
        {activeTab === "related" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-all bg-white"
                >
                  <img
                    src="https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Product"
                    className="aspect-square bg-gray-100 rounded-lg mb-4 object-cover"
                  />

                  <h3 className="font-semibold text-gray-900 leading-tight">
                    COB Deep Cone LED Spotlight – 12W Model
                  </h3>

                  <button className="mt-3 text-sm text-red-600 font-medium hover:underline">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
