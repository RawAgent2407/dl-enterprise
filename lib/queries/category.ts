import { strapiFetch } from "@/lib/strapi";

export async function getCategories() {
  const res = await strapiFetch<{ data: any[] }>(
    "/categories?populate[image][fields]=url&sort=title:asc"
  );
  return res?.data;
}

export async function getCategoryBySlug(slug: string) {
  if (!slug) throw new Error("Category slug missing");
  const res = await strapiFetch<{ data: any[] }>(
    `/categories?filters[slug][$eq]=${slug}&populate=*`
  );
  return res?.data?.[0] ?? null;
}

export async function getMegaMenuCategories() {
  const res = await strapiFetch<{ data: any[] }>(
    "/categories?populate[products][populate][gallery][fields]=url&sort=title:asc"
  );
  return res?.data || [];
}
