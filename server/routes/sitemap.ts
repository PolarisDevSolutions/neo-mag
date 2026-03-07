import { RequestHandler } from "express";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY!;

export const handleSitemap: RequestHandler = async (req, res) => {
  try {
    const siteUrl = `${req.protocol}://${req.get("host")}`;

    // Check site-wide noindex setting
    const settingsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/site_settings?select=site_noindex&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (settingsRes.ok) {
      const settingsData = await settingsRes.json();
      const [settings] = settingsData;
      if (settings?.site_noindex) {
        return res.status(404).send("Sitemap disabled (site noindex is set)");
      }
    }

    // Fetch all published, indexable pages
    const pagesRes = await fetch(
      `${SUPABASE_URL}/rest/v1/pages?status=eq.published&noindex=eq.false&select=url_path,updated_at`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!pagesRes.ok) {
      console.error("Sitemap: failed to fetch pages from Supabase", pagesRes.status);
      return res.status(500).send("Failed to generate sitemap");
    }

    const pages: { url_path: string; updated_at: string }[] =
      await pagesRes.json();

    const urls = pages
      .map((p) => {
        const lastmod = p.updated_at
          ? new Date(p.updated_at).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0];
        const priority = p.url_path === "/" ? "1.0" : "0.8";
        return `  <url>
    <loc>${siteUrl}${p.url_path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(xml);
  } catch (err) {
    console.error("Sitemap generation error:", err);
    res.status(500).send("Internal server error generating sitemap");
  }
};
