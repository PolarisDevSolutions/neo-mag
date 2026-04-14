import "dotenv/config";
import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../client/lib/database.types";
import App from "../client/App";
import {
  clearCmsPageCache,
  mapCmsPageData,
  normalizeCmsPath,
  primeCmsPageCacheEntries,
  type CmsPageData,
} from "../client/lib/cmsPageData";
import {
  clearSiteSettingsCache,
  mapSiteSettingsRow,
  primeSiteSettingsCache,
  type SiteSettings,
} from "../client/lib/siteSettingsData";
import {
  PRERENDER_PAYLOAD_SCRIPT_ID,
  serializePrerenderPayload,
  type PrerenderPayload,
} from "../client/lib/prerenderState";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const siteUrl = process.env.VITE_SITE_URL || "https://neo-mag.rs";

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.log("Supabase credentials not configured. Skipping SSG generation.");
  console.log(
    "To enable SSG, set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.",
  );
  process.exit(0);
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey);

interface Redirect {
  from_path: string;
  to_path: string;
  status_code: number;
}

const MEDICAL_CLINIC_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": "https://neo-mag.rs/#medicalclinic",
  name: "Neo Mag Dijagnostički Centar",
  url: "https://neo-mag.rs",
  logo: "https://jphaxpojinhibagvsdmq.supabase.co/storage/v1/object/public/media/library/1771690586774-3gxybq.webp",
  image:
    "https://jphaxpojinhibagvsdmq.supabase.co/storage/v1/object/public/media/library/1771690586774-3gxybq.webp",
  telephone: "+38118520640",
  email: "neomagnis@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "9. Brigade 1",
    addressLocality: "Niš",
    postalCode: "18000",
    addressCountry: "RS",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.3171717,
    longitude: 21.9035082,
  },
  sameAs: [
    "https://www.google.com/maps/place/Neo+Mag/@43.3171717,21.9035082,17z",
  ],
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Niš",
  },
  medicalSpecialty: [
    "Radiology",
    "DiagnosticImaging",
    "Neurology",
    "Neurosurgery",
    "Orthopedics",
    "Cardiology",
  ],
  availableService: [
    { "@type": "MedicalProcedure", name: "Magnetna rezonanca" },
    { "@type": "MedicalProcedure", name: "Rendgen dijagnostika" },
    { "@type": "MedicalProcedure", name: "Ultrazvučna dijagnostika" },
    { "@type": "MedicalProcedure", name: "Multislajsni CT skener" },
    { "@type": "MedicalProcedure", name: "Specijalistički pregledi" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "15:00",
    },
  ],
  founder: [
    {
      "@type": "Physician",
      name: "Prof Dr Vesna Nikolov",
      medicalSpecialty: "Neurosurgery",
    },
    {
      "@type": "Physician",
      name: "Dr Luka Berilažić",
      medicalSpecialty: "Neurosurgery",
    },
  ],
};

async function generateSSG() {
  console.log("Starting SSG generation...");

  const siteSettings = await fetchSiteSettings();
  const pages = await fetchPublishedPages();
  const pageMap = new Map<string, CmsPageData>(
    pages.map((page) => [normalizeCmsPath(page.url_path), page]),
  );
  const homepage = pageMap.get("/") || null;

  console.log("Site settings loaded:", {
    siteNoindex: siteSettings.siteNoindex,
    hasGA4: !!siteSettings.ga4MeasurementId,
    hasGoogleAds: !!siteSettings.googleAdsId,
    hasHeadScripts: !!siteSettings.headScripts,
    hasFooterScripts: !!siteSettings.footerScripts,
  });
  console.log(`Found ${pages.length} published pages`);

  const templatePath = path.join(process.cwd(), "dist/spa/index.html");
  if (!fs.existsSync(templatePath)) {
    console.error(
      "Template not found at dist/spa/index.html. Run build:client first.",
    );
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf-8");

  for (const page of pages) {
    const normalizedPath = normalizeCmsPath(page.url_path);
    const prerenderPages = buildPrerenderPages(page, homepage);
    const html = renderPageHtml({
      template,
      normalizedPath,
      prerenderPages,
      siteSettings,
    });

    const outputPath = getOutputPath(normalizedPath);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html);
    console.log(`Generated: ${normalizedPath}`);
  }

  await generateRedirects();
  generateSitemap(pages, siteSettings.siteNoindex);
  generateRobots(siteSettings.siteNoindex);

  console.log("SSG generation complete!");
}

async function fetchSiteSettings(): Promise<SiteSettings> {
  const { data } = await supabase
    .from("site_settings")
    .select(
      "site_name, logo_url, logo_alt, phone_number, phone_display, phone_availability, phone_2_number, phone_2_display, phone_2_availability, apply_phone_globally, header_cta_text, header_cta_url, navigation_items, footer_about_links, footer_practice_links, footer_tagline_html, address_line1, address_line2, map_embed_url, social_links, copyright_text, site_noindex, ga4_measurement_id, google_ads_id, google_ads_conversion_label, head_scripts, footer_scripts",
    )
    .eq("settings_key", "global")
    .single();

  return mapSiteSettingsRow(data || {});
}

async function fetchPublishedPages(): Promise<CmsPageData[]> {
  const { data, error } = await supabase
    .from("pages")
    .select(
      "id, title, url_path, page_type, content, meta_title, meta_description, canonical_url, og_title, og_description, og_image, noindex, status, updated_at, schema_type, schema_data",
    )
    .eq("status", "published");

  if (error) {
    console.error("Error fetching pages:", error);
    process.exit(1);
  }

  return (data || []).map((row) => mapCmsPageData(row));
}

function buildPrerenderPages(
  currentPage: CmsPageData,
  homepage: CmsPageData | null,
): Record<string, CmsPageData> {
  const pages: Record<string, CmsPageData> = {
    [normalizeCmsPath(currentPage.url_path)]: currentPage,
  };

  if (homepage) {
    pages["/"] = homepage;
  }

  return pages;
}

function renderPageHtml({
  template,
  normalizedPath,
  prerenderPages,
  siteSettings,
}: {
  template: string;
  normalizedPath: string;
  prerenderPages: Record<string, CmsPageData>;
  siteSettings: SiteSettings;
}) {
  clearCmsPageCache();
  clearSiteSettingsCache();
  primeCmsPageCacheEntries(prerenderPages);
  primeSiteSettingsCache(siteSettings);

  const helmetContext: { helmet?: any } = {};
  const bodyHtml = renderToString(
    React.createElement(App, {
      router: "memory",
      initialEntries: [normalizedPath],
      initialSiteSettings: siteSettings,
      helmetContext,
    }),
  );

  const helmet = helmetContext.helmet;
  const helmetTags = [
    helmet?.title?.toString?.() || "",
    helmet?.priority?.toString?.() || "",
    helmet?.meta?.toString?.() || "",
    helmet?.link?.toString?.() || "",
    helmet?.script?.toString?.() || "",
    helmet?.style?.toString?.() || "",
    helmet?.noscript?.toString?.() || "",
  ]
    .filter(Boolean)
    .join("\n");

  const payload: PrerenderPayload = {
    normalizedPath,
    pages: prerenderPages,
    siteSettings,
  };

  const payloadScript = `<script id="${PRERENDER_PAYLOAD_SCRIPT_ID}" type="application/json">${serializePrerenderPayload(
    payload,
  )}</script>`;

  let html = template.replace(/<title>.*?<\/title>/s, "");
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${bodyHtml}</div>${payloadScript}`,
  );

  const headInjection = [
    helmetTags,
    `<script type="application/ld+json">${JSON.stringify(MEDICAL_CLINIC_SCHEMA)}</script>`,
    buildAnalyticsScripts(siteSettings),
    siteSettings.headScripts || "",
  ]
    .filter(Boolean)
    .join("\n");

  html = html.replace("</head>", `${headInjection}</head>`);

  if (siteSettings.footerScripts) {
    html = html.replace("</body>", `${siteSettings.footerScripts}\n</body>`);
  }

  return html;
}

function buildAnalyticsScripts(siteSettings: SiteSettings): string {
  let analyticsScripts = "";

  if (siteSettings.ga4MeasurementId) {
    analyticsScripts += `
<script async src="https://www.googletagmanager.com/gtag/js?id=${escapeHtml(
      siteSettings.ga4MeasurementId,
    )}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${escapeHtml(siteSettings.ga4MeasurementId)}');
</script>`;
  }

  if (siteSettings.googleAdsId) {
    if (!siteSettings.ga4MeasurementId) {
      analyticsScripts += `
<script async src="https://www.googletagmanager.com/gtag/js?id=${escapeHtml(
        siteSettings.googleAdsId,
      )}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>`;
    }

    analyticsScripts += `
<script>
  gtag('config', '${escapeHtml(siteSettings.googleAdsId)}');
</script>`;
  }

  return analyticsScripts.trim();
}

function getOutputPath(normalizedPath: string): string {
  if (normalizedPath === "/") {
    return path.join(process.cwd(), "dist/spa/index.html");
  }

  const relativePath = normalizedPath.replace(/^\//, "").replace(/\/$/, "");
  return path.join(process.cwd(), "dist/spa", relativePath, "index.html");
}

async function generateRedirects() {
  const { data: redirects, error } = await supabase
    .from("redirects")
    .select("from_path, to_path, status_code")
    .eq("enabled", true);

  if (error) {
    console.error("Error fetching redirects:", error);
    return;
  }

  if (redirects && redirects.length > 0) {
    const redirectsContent = redirects
      .map(
        (redirect: Redirect) =>
          `${normalizeRedirectPath(redirect.from_path)} ${normalizeRedirectPath(redirect.to_path)} ${redirect.status_code}`,
      )
      .join("\n");

    fs.writeFileSync(
      path.join(process.cwd(), "dist/spa/_redirects"),
      `${redirectsContent}\n/* /index.html 200`,
    );
    console.log(`Generated _redirects with ${redirects.length} redirects`);
    return;
  }

  fs.writeFileSync(path.join(process.cwd(), "dist/spa/_redirects"), "/* /index.html 200");
  console.log("Generated _redirects with SPA fallback");
}

function normalizeRedirectPath(value: string): string {
  return value.startsWith("/") ? normalizeCmsPath(value) : value;
}

function generateSitemap(pages: CmsPageData[], siteNoindex: boolean) {
  if (siteNoindex) {
    const sitemapPath = path.join(process.cwd(), "dist/spa/sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      fs.unlinkSync(sitemapPath);
    }
    console.log("Skipped sitemap.xml (site is noindex)");
    return;
  }

  const urls = pages
    .filter((page) => !page.noindex)
    .map((page) => {
      const normalizedPath = normalizeCmsPath(page.url_path);
      const lastModified = page.updated_at
        ? new Date(page.updated_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      return `  <url>
    <loc>${siteUrl}${normalizedPath}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${normalizedPath === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), "dist/spa/sitemap.xml"), sitemap);
  console.log("Generated sitemap.xml");
}

function generateRobots(siteNoindex: boolean) {
  const robotsTxt = siteNoindex
    ? `User-agent: *
Disallow: /`
    : `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`;

  fs.writeFileSync(path.join(process.cwd(), "dist/spa/robots.txt"), robotsTxt);
  console.log(
    siteNoindex
      ? "Generated robots.txt with Disallow (site is noindex)"
      : "Generated robots.txt with Allow",
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

generateSSG().catch((err) => {
  console.error("SSG generation failed:", err);
  process.exit(1);
});
