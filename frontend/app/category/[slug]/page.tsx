/** @format */

import ContactSection from "@/app/components/ContactSection";
import CustomSolutionsSection from "@/app/components/CustomSolutionsSection";
import Image from "next/image";
import ProductFilters from "./component/ProductFilters";
import { getCategoryBySlug } from "@/lib/queries/category";
import PageNotFound from "@/app/components/PageNotFound";
import { getImageUrl } from "@/lib/strapi";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);
  if (!category) {
    return <PageNotFound />;
  }

  return (
    <>
      <div className="relative h-80 sm:h-80 xl:h-[366px] w-full">
        <Image
          src={getImageUrl(category?.banner_image?.url || "/uploads/default.png")}
          alt={category?.title || "Category Banner"}
          fill
          className="object-fill brightness-75"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-4xl font-medium">
          {category?.title}
        </h1>
        <p>{category?.description}</p>
      </div>

      <ProductFilters categorySlug={slug} />
      <CustomSolutionsSection />
      <ContactSection />
    </>
  );
}
