import type { ContentBlock } from "@site/lib/blocks";

export interface CmsPageData {
  id: string;
  title: string;
  url_path: string;
  page_type: "standard" | "practice" | "landing";
  content: ContentBlock[];
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  noindex: boolean;
  status: "draft" | "published";
  schema_type?: string | string[] | null;
  schema_data?: Record<string, unknown> | null;
  updated_at?: string | null;
}

const pageCache = new Map<string, CmsPageData>();

function getClientEnv(name: string): string {
  if (typeof import.meta !== "undefined" && (import.meta as ImportMeta & { env?: Record<string, string> }).env) {
    return (import.meta as ImportMeta & { env?: Record<string, string> }).env?.[name] || "";
  }

  return "";
}

export function normalizeCmsPath(pathname: string): string {
  const trimmed = (pathname || "/").trim();
  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const collapsed = withLeadingSlash.replace(/\/+/g, "/");

  if (collapsed === "/") {
    return "/";
  }

  return collapsed.endsWith("/") ? collapsed : `${collapsed}/`;
}

export function mapCmsPageData(row: any): CmsPageData {
  return {
    ...row,
    url_path: normalizeCmsPath(row?.url_path || "/"),
    content: Array.isArray(row?.content) ? row.content : [],
  } as CmsPageData;
}

export function getCachedCmsPage(urlPath: string): CmsPageData | null {
  return pageCache.get(normalizeCmsPath(urlPath)) ?? null;
}

export function primeCmsPageCache(page: CmsPageData, urlPath?: string) {
  const normalizedPath = normalizeCmsPath(urlPath || page.url_path);
  pageCache.set(normalizedPath, mapCmsPageData({ ...page, url_path: normalizedPath }));
}

export function primeCmsPageCacheEntries(entries: Record<string, CmsPageData>) {
  Object.entries(entries).forEach(([urlPath, page]) => {
    if (page) {
      primeCmsPageCache(page, urlPath);
    }
  });
}

export function clearCmsPageCache(urlPath?: string) {
  if (urlPath) {
    pageCache.delete(normalizeCmsPath(urlPath));
    return;
  }

  pageCache.clear();
}

export async function fetchCmsPageByPath(
  urlPath: string,
  fetchImpl: typeof fetch = fetch,
): Promise<CmsPageData | null> {
  const supabaseUrl = getClientEnv("VITE_SUPABASE_URL");
  const supabaseAnonKey = getClientEnv("VITE_SUPABASE_ANON_KEY");
  const normalizedPath = normalizeCmsPath(urlPath);

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase env vars not configured");
  }

  const response = await fetchImpl(
    `${supabaseUrl}/rest/v1/pages?url_path=eq.${encodeURIComponent(normalizedPath)}&select=*&limit=1`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const page = mapCmsPageData(data[0]);
  primeCmsPageCache(page, normalizedPath);
  return page;
}
