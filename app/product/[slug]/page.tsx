"use client";

import React, { useState, use } from "react";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { slug } = use(params); // ✅ unwrap the promise

  const [activeTab, setActiveTab] = useState("specifications");

  const product = {
    id: "cob-deep-cone-spotlight",
    name: "COB Deep Cone LED Spotlight – 12W Model",
    rating: 4.6,
    totalRatings: 41,
    variants: [
      { power: "7W", selected: false },
      { power: "12W", selected: true },
      { power: "18W", selected: false },
      { power: "20W", selected: false },
    ],
    images: [
      "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2312999/pexels-photo-2312999.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1067465/pexels-photo-1067465.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/276617/pexels-photo-276617.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/269294/pexels-photo-269294.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/276617/pexels-photo-276617.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7317336/pexels-photo-7317336.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/5337502/pexels-photo-5337502.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    breadcrumb: "Category / Led Profiles Lights / Condenser Union",
  };

  return (
    <>
      <section className="bg-[#f3f3f3] text-black">
        {/* <h1>Product: {slug}</h1> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[">
          <nav className="text-sm text-gray-500 mb-8">{product.breadcrumb}</nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <ProductGallery images={product.images} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>
      <section className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[">
          <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </section>
    </>
  );
};

export default ProductPage;
