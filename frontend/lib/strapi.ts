type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  revalidate?: number;
  cache?: RequestCache;
};

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";
const API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function strapiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (API_TOKEN) {
      headers.Authorization = `Bearer ${API_TOKEN}`;
    }

    const res = await fetch(url, {
      method: options.method || "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: options?.cache || "no-store",
    });

    if (!res.ok) {
      console.error("API Error:", url, res.status);
    }

    return res.json();
  } catch (error) {
    console.error("strapiFetch error:", error);
    return null as unknown as T;
  }
}

export function getImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BASE_URL.replace("/api", "")}${path}`;
}
