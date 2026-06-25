/** @format */

import BrightestLineup from "@/app/components/BrightestLineup";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import { getProduct, getRecommendedProducts } from "@/lib/queries/product";
import PageNotFound from "@/app/components/PageNotFound";
import { getImageUrl } from "@/lib/strapi";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return <PageNotFound />;
  }

  const recommendedProducts = await getRecommendedProducts({
    categorySlug: product?.category?.slug,
    productid: product.documentId,
  });

  const images = product.gallery?.map((img: any) => getImageUrl(img.url)) ?? [];

  const breadcrumb = [
    "Products",
    product?.category?.title,
    product?.title,
  ].filter(Boolean);

  const uiProduct = {
    id: product.documentId,
    title: product.title,
    description: product.description ?? '',
    rating: product.rating,
    totalRatings: product.totalRatings,
    images,
    dimension: product.dimension ?? null,
    installationSteps: product.installationSteps ?? null,
    accessories: product.accessories ?? null,
    sketch: product.sketch ?? null,
    descriptions: product.descriptions ?? [],
    breadcrumb,
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="w-full bg-[#f3f3f3]">
        <div className="mx-auto px-3 sm:px-6 lg:px-12 xl:px-20 py-2">
          <nav className="flex flex-nowrap text-sm overflow-hidden text-ellipsis">
            {breadcrumb.map((item, i) => (
              <h5 key={i} className="flex-none text-[#5C5F6A] font-medium">
                {item}
                {i < breadcrumb.length - 1 && <span className="mx-2">›</span>}
              </h5>
            ))}
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="bg-white text-black py-10 px-4 md:px-24 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="lg:sticky lg:top-24 self-start">
            <ProductGallery images={images} />
          </div>
          <ProductInfo product={uiProduct} />
        </div>
      </section>

      <BrightestLineup recommendedProducts={recommendedProducts} />
    </>
  );
};

export default ProductPage;
