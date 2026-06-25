/** @format */

"use client";

import { getImageUrl } from "@/lib/strapi";
import { LuSearch, LuStar } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ProductFilters({ categorySlug }: { categorySlug: string }) {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title:asc");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams({ category: categorySlug, page: String(page), pageSize: String(pageSize), sort });
    window.history.replaceState(null, "", `?${params.toString()}`);
    if (debouncedSearch) params.set("search", debouncedSearch);

    setLoading(true);
    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((res) => {
        if (page === 1) {
          setProducts(res?.data || []);
        } else {
          setProducts((prev) => [...prev, ...(res?.data || [])]);
        }
        setTotalPages(res?.meta?.pagination?.pageCount || 1);
        setTotalProducts(res?.meta?.pagination?.total || 0);
      })
      .finally(() => setLoading(false));
  }, [categorySlug, debouncedSearch, sort, page]);

  const sortOptions = useMemo(() => ({ asc: "title:asc", desc: "title:desc" }), []);

  return (
    <section className="semi-width w-full bg-white">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <LuSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="SEARCH PRODUCTS"
            value={search}
            onChange={(e) => { setPage(1); setSearch(e.target.value); }}
            className="w-full h-11 pl-11 pr-4 border rounded-xs text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>
        <select
          className="border rounded-xs px-4 h-11 text-sm font-medium w-full sm:w-56"
          value={sort}
          onChange={(e) => { setPage(1); setSort(e.target.value); }}
        >
          <option value={sortOptions.asc}>ALPHABETICALLY (A–Z)</option>
          <option value={sortOptions.desc}>ALPHABETICALLY (Z–A)</option>
        </select>
      </div>

      {/* Grid */}
      {loading && <p className="text-sm text-center py-10">Loading...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {products.length === 0 && !loading && (
          <div className="col-span-full text-center py-20 text-brand-primary font-medium">
            No products found matching your criteria.
          </div>
        )}
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-s product-card-box transition overflow-hidden cursor-pointer"
            onClick={() => router.push(`/product/${item.slug}`)}
            style={{ border: "1px solid", borderImageSource: "linear-gradient(180deg, rgba(102,102,102,0.12) 0%, rgba(0,0,0,0.12) 100%)", borderImageSlice: 1 }}
          >
            <div className="product-card w-full aspect-4/3 bg-gray-50 h-[280px]" style={{ background: "linear-gradient(180deg, #FCFCFC 0%, #F5F5F5 100%)" }}>
              <img
                src={getImageUrl(item.gallery?.[0]?.url) || "/placeholder.png"}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex px-5 py-4 flex-col gap-2">
              <h3 className="text-lg font-medium text-brand-primary uppercase line-clamp-2">{item.title}</h3>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <LuStar key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="font-medium">{item.rating}</span>
                <span className="text-gray-500">({item.totalRatings} Ratings)</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-10">
          <span className="text-sm font-dm">
            {page === totalPages ? "You've reached the end of the list." : `Showing ${products.length} of ${totalProducts} products`}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-primary hover:text-white transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
