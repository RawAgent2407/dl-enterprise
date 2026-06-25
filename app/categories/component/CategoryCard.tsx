
"use client";
import { getImageUrl } from "@/lib/strapi";
import { useRouter } from "next/navigation";
import { LuCircleArrowRight } from "react-icons/lu";

export default function CategoryCard({ key, category, aspect }: any,) {
    const router = useRouter();

    const handleCardClick = (slug: string) => {
        // Redirects to the /category page
        if(category?.isStatic) return;
        router.push(`/category/${slug}`);
    };

    return (
        <div
            key={key}
            className={`relative shrink-0 snap-start
                     ${aspect} group cursor-pointer
                    ${category?.isStatic ? "bg-brand-primary text-white" : "category-card-bg"  }
                     `}
            onClick={() => { handleCardClick(category?.slug) }}
        >
            {/* Image */}
            {!category?.isStatic && (<img
                src={getImageUrl(category?.image?.url || "/upload/defualt_product.png")}
                alt={category?.title}
                className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:shadow-lg'
            />)}

            {/* Title */}
            <div className='absolute h-fit w-fit inset-0 top-[10%] left-[7%] z-10'>
                <h4 className={`${category?.isStatic ? "text-white" : ""}`}>
                    {category?.title}
                </h4>
            </div>

            {/* Arrow */}
            <div className={`absolute bottom-8 right-8  ${category?.isStatic ? "text-white" : "text-[#A60006]"} transition-transform duration-300 group-hover:translate-x-1`}>
                <LuCircleArrowRight size={26} />
            </div>
        </div>
    );
}

{/* Gradient overlay (only for image cards) */ }