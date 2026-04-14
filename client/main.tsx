import "./global.css";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import {
  normalizeCmsPath,
  primeCmsPageCacheEntries,
} from "./lib/cmsPageData";
import { readPrerenderPayload } from "./lib/prerenderState";
import { primeSiteSettingsCache } from "./lib/siteSettingsData";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found");
}

const prerenderPayload = readPrerenderPayload();
const currentPath = normalizeCmsPath(window.location.pathname);
const hasRootMarkup = rootElement.innerHTML.trim().length > 0;
const hasMatchingPrerenderData = !!(
  prerenderPayload &&
  prerenderPayload.normalizedPath === currentPath &&
  prerenderPayload.pages?.[currentPath] &&
  prerenderPayload.siteSettings
);

if (prerenderPayload?.pages) {
  primeCmsPageCacheEntries(prerenderPayload.pages);
}

if (prerenderPayload?.siteSettings) {
  primeSiteSettingsCache(prerenderPayload.siteSettings);
}

const app = (
  <App
    initialSiteSettings={hasMatchingPrerenderData ? prerenderPayload?.siteSettings ?? null : null}
  />
);

if (hasRootMarkup && hasMatchingPrerenderData) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
