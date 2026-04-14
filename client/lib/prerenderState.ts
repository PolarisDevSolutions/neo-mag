import type { CmsPageData } from "@site/lib/cmsPageData";
import type { SiteSettings } from "@site/lib/siteSettingsData";

export const PRERENDER_PAYLOAD_SCRIPT_ID = "__CMS_PRELOADED_STATE__";

export interface PrerenderPayload {
  normalizedPath: string;
  pages: Record<string, CmsPageData>;
  siteSettings: SiteSettings | null;
}

export function serializePrerenderPayload(payload: PrerenderPayload): string {
  return JSON.stringify(payload)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function readPrerenderPayload(): PrerenderPayload | null {
  if (typeof document === "undefined") {
    return null;
  }

  const script = document.getElementById(PRERENDER_PAYLOAD_SCRIPT_ID);
  const json = script?.textContent?.trim();

  if (!json) {
    return null;
  }

  try {
    return JSON.parse(json) as PrerenderPayload;
  } catch {
    return null;
  }
}
