/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ArrowRight } from "lucide-react";

const ProductCategoriesGrid = () => {
  const categories = [
    {
      title: "LED Tube Lights",
      image:
        "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/led-tube-lights",
    },
    {
      title: "COB Lights",
      image:
        "https://images.pexels.com/photos/2312999/pexels-photo-2312999.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/cob-lights",
    },
    {
      title: "LED Profiles Lights",
      image:
        "https://images.pexels.com/photos/1067465/pexels-photo-1067465.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/led-profiles",
    },
    {
      title: "Flood/Street Lights",
      image:
        "https://images.pexels.com/photos/276617/pexels-photo-276617.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/flood-street-lights",
    },
    {
      title: "Hanging Lights",
      image:
        "https://images.pexels.com/photos/5337502/pexels-photo-5337502.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/hanging-lights",
    },
    {
      title: "LED Plastic Panels",
      image:
        "https://images.pexels.com/photos/12405341/pexels-photo-12405341.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/led-plastic-panels",
    },
    {
      title: "LED Tube Lights",
      image:
        "https://images.pexels.com/photos/7317336/pexels-photo-7317336.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/led-tube-lights",
    },
    {
      title: "COB Lights",
      image:
        "https://images.pexels.com/photos/17527766/pexels-photo-17527766.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/cob-lights",
    },
    {
      title: "LED Profiles Lights",
      image:
        "https://images.pexels.com/photos/7317287/pexels-photo-7317287.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/led-profiles",
    },
    {
      title: "Flood/Street Lights",
      image:
        "https://images.pexels.com/photos/14072322/pexels-photo-14072322.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/flood-street-lights",
    },
    {
      title: "Hanging Lights",
      image:
        "https://images.pexels.com/photos/269294/pexels-photo-269294.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/hanging-lights",
    },
    {
      title: "LED Plastic Panels",
      image:
        "https://images.pexels.com/photos/12405341/pexels-photo-12405341.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/led-plastic-panels",
    },
    {
      title: "LED Drivers & Controllers",
      image:
        "https://images.pexels.com/photos/10528767/pexels-photo-10528767.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/led-drivers",
    },
    {
      title: "Reflectors and Glass",
      image:
        "https://images.pexels.com/photos/5820098/pexels-photo-5820098.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/reflectors-glass",
    },
    {
      title: "Reflectors and COB Lights",
      image:
        "https://images.pexels.com/photos/12650851/pexels-photo-12650851.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/product/reflectors-glass",
    },
  ];
  const firstSix = categories.slice(0, categories.length - 3);
  const lastThree = categories.slice(-3);
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[12px] sm:text-[14px] font-['Poppins'] tracking-[1px] uppercase text-[#697586]">
            OUR PRODUCTS
          </p>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pioneering LED Lighting <br /> Solutions Since 2005
            </h2>
            <p className="text-gray-600  w-[40%]">
              DL Enterprises is redefining illumination with innovative,
              energy-saving LED products crafted for homes, industries, and
              commercial spaces.
            </p>
          </div>
        </div>

        {/* FIRST 6 ITEMS - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {firstSix.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>

        {/* ONLY LAST 3 ITEMS - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lastThree.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* --------------------------------------
   CATEGORY CARD COMPONENT
-------------------------------------- */
const CategoryCard = ({ category }: any) => (
  <a
    href={category.link}
    className="relative  overflow-hidden h-64 group shadow-sm hover:shadow-xl transition-all duration-300"
  >
    {/* Background image */}

    <img
      src={category.image}
      alt={category.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />

    {/* Gradient overlay (only for image cards) */}
    {!category.isRed && (
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
    )}

    {/* Content */}
    <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
      <h3 className={`text-xl font-bold text-white`}>{category.title}</h3>

      <div
        className={`self-end w-10 h-10 flex items-center justify-center  transition-all bg-white/20 text-red-500 group-hover:bg-white/80`}
      >
        <ArrowRight className="w-5 h-5" />
      </div>
    </div>
  </a>
);

export default ProductCategoriesGrid;
