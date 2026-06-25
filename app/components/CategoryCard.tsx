
"use client";
import { getImageUrl } from "@/lib/strapi";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { LuArrowRightToLine } from "react-icons/lu";

export default function CategoryCard({ category, index, length = 1, noMargin = true }: any) {
    const router = useRouter();
    const cardRef = useRef<HTMLDivElement>(null);

    const handleCardClick = (slug: string) => {
        // Redirects to the /category page
        router.push(`/category/${slug}`);
    };
    return (
        <div
            key={category?.id}
            ref={index === 0 ? cardRef : null}
            className={`category-card-bg relative shrink-0 snap-start
                      max-md:w-[327px] md:w-[628px]
                      max-md:h-[220px] sm:h-60 md:h-[387px]
                      overflow-hidden bg-white group cursor-pointer 
                      ${(index === length - 1 && length > 1) && "section-mr"}
                      ${index === 0 && "section-ml"}
                    }`
            }
            onClick={() => { handleCardClick(category.slug) }}
        >
            {/* Gradient overlay */}
            <div className='absolute inset-0 w-full h-full category-card-bg z-10' />
            {/* Image */}
            <img
                src={getImageUrl(category?.image?.url || "/upload/defualt_product.png")}
                alt={category?.title}
                className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />

            {/* Title */}
            <div className='absolute h-fit w-fit top-6 left-6 z-10'>
                <h4 className=''>
                    {category?.title}
                </h4>
            </div>

            {/* Arrow */}
            <div className='absolute bottom-8 right-8 z-10 text-[#A60006] transition-transform duration-300 group-hover:translate-x-1'>
                <LuArrowRightToLine size={26} />
            </div>
        </div>
    );
}

{/* Gradient overlay (only for image cards) */ }