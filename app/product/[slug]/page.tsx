/** @format */

import BrightestLineup from "@/app/components/BrightestLineup";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import { getProduct } from "@/lib/queries/product";
import { getImageUrl } from "@/lib/strapi";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const raw = await getProduct(slug);

  if (!raw) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  const product = {
    id: raw.documentId,
    name: raw.title,
    description: raw.description ?? "",
    rating: raw.rating ?? 0,
    totalRatings: raw.totalRatings ?? 0,
    images: (raw.gallery ?? []).map((g: any) => getImageUrl(g.url)),
    dimension: raw.dimension
      ? {
          text: raw.dimension.text ?? "",
          imageUrl: raw.dimension.image ? getImageUrl(raw.dimension.image.url) : null,
        }
      : null,
    installationSteps: raw.installationSteps?.image
      ? { imageUrl: getImageUrl(raw.installationSteps.image.url) }
      : null,
    accessories: raw.accessories?.image
      ? { imageUrl: getImageUrl(raw.accessories.image.url) }
      : null,
    sketch: raw.sketch
      ? {
          image1Url: raw.sketch.image1 ? getImageUrl(raw.sketch.image1.url) : null,
          title: raw.sketch.title ?? "",
          image2Url: raw.sketch.image2 ? getImageUrl(raw.sketch.image2.url) : null,
        }
      : null,
    descriptions: raw.descriptions ?? [],
    category: raw.category ?? null,
  };

  return (
    <>
      <div className="w-full bg-[#f3f3f3]">
        <div className="mx-auto px-3 sm:px-6 lg:px-12 xl:px-20 py-2">
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base">
            <span className="text-gray-500 font-medium whitespace-nowrap">Products</span>
            <span className="text-gray-400 font-medium">›</span>
            {product.category && (
              <>
                <span className="text-gray-500 font-medium whitespace-nowrap">{product.category.title}</span>
                <span className="text-gray-400 font-medium">›</span>
              </>
            )}
            <span className="text-black font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="bg-white text-black">
        <div className="py-12 sm:py-10 lg:py-15 px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 max-h-screen overflow-hidden">
            <ProductGallery images={product.images} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <BrightestLineup />
      </section>
    </>
  );
};

export default ProductPage;
