/** @format */

"use client";

import ContactSection from "@/app/components/ContactSection";
import CustomSolutionsSection from "@/app/components/CustomSolutionsSection";
import Image from "next/image";
import { use } from "react";
import ProductFilters from "./component/ProductFilters";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const CollectionPage = ({ params }: ProductPageProps) => {
  const { slug } = use(params); // ✅ unwrap the promise

  return (
    <>
      <section className='w-full bg-white text-black'>
        {/* ================= HERO ================= */}
        <div className='relative h-80 sm:h-80 xl:h-[366px] w-full'>
          <Image
            src='/images/product2.png'
            alt='Tube Light'
            fill
            className='object-fill brightness-75'
          />
          <h1 className='absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-4xl font-medium'>
            TUBE LIGHT
          </h1>
        </div>
        <ProductFilters />
      </section>
      <CustomSolutionsSection />
      <ContactSection />
    </>
  );
};

export default CollectionPage;
