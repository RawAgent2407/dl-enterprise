import { NextRequest, NextResponse } from "next/server";
import { strapiFetch } from "@/lib/strapi";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const category = searchParams.get("category");
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "title:asc";
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 9);

  if (!category) {
    return NextResponse.json({ data: [], meta: {} });
  }

  const filters: string[] = [
    `filters[category][slug][$eq]=${category}`,
  ];

  if (search) {
    filters.push(`filters[title][$containsi]=${search}`);
  }

  const query = [
    ...filters,
    `pagination[page]=${page}`,
    `pagination[pageSize]=${pageSize}`,
    `sort=${sort}`,
    `populate=gallery`,
  ].join("&");

  const data = await strapiFetch(`/products?${query}`, { cache: "no-store" });
  return NextResponse.json(data);
}
