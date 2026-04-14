import { useEffect, useState } from "react";
import {
  clearCmsPageCache as clearSharedCmsPageCache,
  fetchCmsPageByPath,
  getCachedCmsPage,
  normalizeCmsPath,
  type CmsPageData,
} from "@site/lib/cmsPageData";

interface UseCmsPageResult {
  page: CmsPageData | null;
  isLoading: boolean;
  error: Error | null;
}

export type { CmsPageData } from "@site/lib/cmsPageData";

export function useCmsPage(urlPath: string): UseCmsPageResult {
  const normalizedPath = normalizeCmsPath(urlPath);
  const [page, setPage] = useState<CmsPageData | null>(
    getCachedCmsPage(normalizedPath),
  );
  const [isLoading, setIsLoading] = useState(!getCachedCmsPage(normalizedPath));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const cachedPage = getCachedCmsPage(normalizedPath);

    if (cachedPage) {
      setPage(cachedPage);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    async function fetchPage() {
      try {
        const pageData = await fetchCmsPageByPath(normalizedPath);

        if (!pageData) {
          if (isMounted) {
            setPage(null);
            setError(new Error(`Page not found: ${normalizedPath}`));
          }
          return;
        }

        if (isMounted) {
          setPage(pageData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPage();

    return () => {
      isMounted = false;
    };
  }, [normalizedPath]);

  return { page, isLoading, error };
}

export function clearCmsPageCache(urlPath?: string) {
  clearSharedCmsPageCache(urlPath);
}
