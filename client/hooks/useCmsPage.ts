import { useState, useEffect } from "react";
import type { ContentBlock } from "@site/lib/blocks";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

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
}

interface UseCmsPageResult {
  page: CmsPageData | null;
  isLoading: boolean;
  error: Error | null;
}

const pageCache = new Map<string, CmsPageData>();

export function useCmsPage(urlPath: string): UseCmsPageResult {
  const [page, setPage] = useState<CmsPageData | null>(
    pageCache.get(urlPath) ?? null,
  );
  const [isLoading, setIsLoading] = useState(!pageCache.has(urlPath));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (pageCache.has(urlPath)) {
      setPage(pageCache.get(urlPath)!);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    async function fetchPage() {
      try {
        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
          throw new Error("Supabase env vars not configured");
        }

        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/pages?url_path=eq.${encodeURIComponent(urlPath)}&select=*&limit=1`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          if (isMounted) {
            setPage(null);
            setError(new Error(`Page not found: ${urlPath}`));
          }
          return;
        }

        const pageData = data[0] as CmsPageData;
        pageCache.set(urlPath, pageData);

        if (isMounted) {
          setPage(pageData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchPage();

    return () => {
      isMounted = false;
    };
  }, [urlPath]);

  return { page, isLoading, error };
}

export function clearCmsPageCache(urlPath?: string) {
  if (urlPath) {
    pageCache.delete(urlPath);
  } else {
    pageCache.clear();
  }
}
