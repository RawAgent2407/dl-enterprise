"use client";

import React, { useState, use } from "react";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import BrightestLineup from "@/app/components/BrightestLineup";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { slug } = use(params); // ✅ unwrap the promise


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
    breadcrumb: "Category > Led Profiles Lights > Condenser Union",
  };

  return (
    <>
      <div className="w-full bg-[#f3f3f3]">
        <div
          className="
      mx-auto
      px-3 sm:px-6 lg:px-12 xl:px-20
      py-2
    "
        >
          <nav
            className="
        flex flex-wrap items-center
        gap-x-2 gap-y-1
        text-sm sm:text-base
      "
          >
            <span className="text-gray-500 font-medium whitespace-nowrap">
              Products
            </span>

            <span className="text-gray-400 font-medium">›</span>

            <span className="text-gray-500 font-medium whitespace-nowrap">
              LED Profile Lights
            </span>

            <span className="text-gray-400 font-medium">›</span>

            <span className="text-black font-semibold truncate max-w-[200px] sm:max-w-none">
              Condenser Union
            </span>
          </nav>
        </div>
      </div>

      <section className="bg-white text-black">
        {/* <h1>Product: {slug}</h1> */}

        <div className=" py-12 sm:py-10 lg:py-15 px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <ProductGallery images={product.images} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>
      <section className="bg-white text-black">
       <BrightestLineup/>
      </section>
    </>
  );
};

export default ProductPage;
