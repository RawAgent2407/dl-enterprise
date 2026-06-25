import { getImageUrl } from "@/lib/strapi";
import { LuChevronsRight } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DesktopMegaMenu({ isProductsOpen, setIsProductsOpen, megaMenuData = [] }: any) {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<any | null>(megaMenuData?.[0] ?? null);

    const handleRedirect = (url: string) => () => {
        setIsProductsOpen(false);
        router.push(url);
    };

    return (
        <div
            className={`flex flex-row items-stretch gap-4 absolute left-[calc(90dvw/9)] top-[140%] mt-6 w-dvw max-w-[1000px] -translate-x-1/2 bg-white transition-all duration-200 ease-in-out z-50
                ${isProductsOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            style={{
                boxShadow: "0px 228px 91px rgba(0,0,0,0.01), 0px 128px 77px rgba(0,0,0,0.05), 0px 57px 57px rgba(0,0,0,0.09), 0px 14px 31px rgba(0,0,0,0.1)",
                padding: "0px 16px 0px 0px",
                border: "1px solid #06367f1a",
            }}
        >
            {/* LEFT – CATEGORIES */}
            <div className="flex flex-col w-48 py-4 bg-[#F9F9FA] border-r border-[#06367f33]">
                <p className="font-dm text-xs text-[#18324999] uppercase px-5 mb-4">Product Categories</p>
                <div className="font-heading overflow-y-auto scrollbar-hide max-h-[416px]">
                    {megaMenuData.map((cat: any) => (
                        <div
                            key={cat.title}
                            className={`flex flex-row justify-between items-center py-2 pr-3 cursor-pointer text-[12px] font-medium hover:bg-white hover:text-brand-primary ${selectedCategory?.title === cat.title ? 'bg-white text-brand-primary' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            <span className="pl-5">{cat.title}</span>
                            <LuChevronsRight className="w-4 h-4 ml-2" />
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT – PRODUCTS */}
            <div className="flex flex-col flex-1 py-4 gap-4 bg-white overflow-y-auto scrollbar-hide max-h-[500px]">
                {selectedCategory && (
                    <div className="flex items-center justify-between px-4">
                        <p className="font-dm text-xs text-[#18324999] uppercase">{selectedCategory.title} Products</p>
                        <span
                            onClick={handleRedirect(`/category/${selectedCategory.slug}`)}
                            className="text-[12px] font-medium text-brand-primary hover:underline cursor-pointer flex items-center"
                        >
                            View All <LuChevronsRight className="w-4 h-4 ml-1" />
                        </span>
                    </div>
                )}

                {selectedCategory?.products?.length > 0 ? (
                    selectedCategory.products.slice(0, 5).map((prod: any) => (
                        <div
                            key={prod.slug}
                            className="font-dm flex gap-3 p-3 mx-2 border border-[#E6E7EA] hover:shadow-md cursor-pointer"
                            onClick={handleRedirect(`/product/${prod?.slug || 404}`)}
                        >
                            <div className="flex-shrink-0 w-16 h-16 border border-[#00000014]">
                                <img
                                    src={prod?.gallery ? getImageUrl(prod?.gallery[0]?.url) : '/placeholder-image.png'}
                                    alt={prod?.title}
                                    width={76}
                                    height={76}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <p className="max-w-80 truncate text-[12px] leading-[150%] font-bold">
                                    Product: <span className="font-normal">{prod.title}</span>
                                </p>
                                {prod?.description && (
                                    <p className="text-[12px] leading-[150%] max-w-80 line-clamp-2 text-gray-500">
                                        {prod.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="px-5 text-[12px] text-gray-500">No products available.</p>
                )}
            </div>
        </div>
    );
}
