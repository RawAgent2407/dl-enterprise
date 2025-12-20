/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable @next/next/no-img-element */
import { ArrowRight } from "lucide-react";
import ContactSection from "../components/ContactSection";
import StatsSection from "../components/StatsSection";

const ProductCategoriesGrid = () => {
  const categories = [
    {
      id: "1",
      title: "LED Tube Lights",
      image: "/images/product_1.png",
      url: "collection/led-tube-lights",
    },
    {
      id: "2",
      title: "COB Lights",
      image: "/images/product_2.png",
      url: "collection/cob-lights",
    },
    {
      id: "3",
      title: "Flood / Street Lights",
      image: "/images/product_3.png",
      url: "collection/flood-lights",
    },
    {
      id: "4",
      title: "Hanging Lights",
      image: "/images/product_4.png",
      url: "collection/hanging-lights",
    },
    {
      id: "5",
      title: "LED Plastic Panels",
      image: "/images/product_5.png",
      url: "collection/led-plastic-panels",
    },
    {
      id: "6",
      title: "Flood / Street Lights",
      image: "/images/product_6.png",
      url: "collection/flood-lights",
    },
    {
      id: "8",
      title: "LED Plastic Panels",
      image: "/images/product_3.png",
      url: "collection/led-plastic-panels",
    },
    {
      id: "9",
      title: "LED Driver & Controllers",
      image: "/images/product_7.png",
    },
    { id: "10", title: "Reflectors and Glass", image: "/images/product_8.png" },
  ];
  const firstSix = categories.slice(0, categories.length - 3);
  const lastThree = categories.slice(-3);
  return (
    <>
      <section className='py-8 bg-gray-50'>
        <div className='w-full '>
          <div className='px-4 sm:px-6 lg:px-12 xl:px-20 flex items-center gap-2 text-base'>
            <span className='text-gray-500 font-medium'>Products</span>
            <span className='text-gray-400 font-medium text-xl'>›</span>
            <span className='text-black font-medium'>Categories</span>
          </div>
        </div>
        <div className='w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-20'>
          {/* FIRST 6 ITEMS - 2 Columns */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {firstSix.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>

          {/* ONLY LAST 3 ITEMS - 3 Columns */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {lastThree.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>
      <StatsSection />
      <ContactSection />
    </>
  );
};

/* --------------------------------------
   CATEGORY CARD COMPONENT
-------------------------------------- */
const CategoryCard = ({ category }: any) => (
  <a
    href={category.url}
    className='relative  overflow-hidden h-[342px] group shadow-sm hover:shadow-xl transition-all duration-300'
  >
    {/* Background image */}

    <img
      src={category.image}
      alt={category.title}
      className='absolute inset-0 w-full max-w-[748px] object-fill  h-full  transition-transform duration-700 scale-105 group-hover:scale-110'
    />

    {/* Gradient overlay (only for image cards) */}

    <div
      className='absolute inset-0 
  bg-linear-to-br from-white/70 via-white/20 to-transparent
'
    />

    <div
      className='absolute inset-0 
  bg-linear-to-t from-gray-500/40 via-gray-500/10 to-transparent
'
    />
    {/* Content */}
    <div className='absolute inset-0 flex flex-col justify-between p-6 z-10'>
      <h3 className={`text-md xl:text-xl font-bold text-[#A60006]`}>
        {category.title}
      </h3>

      <div
        className={`self-end w-10 h-10 flex items-center justify-center  transition-all  text-[#A60006] group-hover:bg-white/80`}
      >
        <ArrowRight className='w-5 h-5' />
      </div>
    </div>
  </a>
);

export default ProductCategoriesGrid;
