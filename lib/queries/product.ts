import { strapiFetch } from "@/lib/strapi";

export async function getProduct(slug: string) {
    const res = await strapiFetch<any>(
        `/products?filters[slug][$eq]=${slug}&populate=*`, {}
    );

    return res?.data?.[0] ?? null;
}

export async function getRecommendedProducts({ categorySlug, productid }: { categorySlug?: string; productid?: string }) {
    try {
        if (!categorySlug) return { data: [], meta: {} };

        const filters: string[] = [
            `filters[category][slug][$eq]=${categorySlug}`,
        ];

        if (productid) {
            filters.push(`filters[documentId][$ne]=${productid}`);
        }

        const query = [
            ...filters,
            `pagination[pageSize]=3`,
            `populate=gallery`,
        ].join("&");

        return await strapiFetch(`/products?${query}`, { cache: "no-store" });
    } catch {
        return { data: [], meta: {} };
    }
}
