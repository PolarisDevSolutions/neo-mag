import { useLocation, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCmsPage } from "@site/hooks/useCmsPage";
import LandingPageRenderer from "@site/components/renderers/LandingPageRenderer";
import StandardPageRenderer from "@site/components/renderers/StandardPageRenderer";
import Layout from "@site/components/layout/Layout";
import Seo from "@site/components/Seo";

/**
 * Generic CMS-driven page component.
 * Reads the current pathname, fetches the matching page from Supabase,
 * and delegates rendering to LandingPageRenderer or StandardPageRenderer
 * based on page_type.
 */
export default function CmsPage() {
  const { pathname } = useLocation();

  // Normalize: ensure trailing slash matches how pages are stored
  const urlPath = pathname.endsWith("/") ? pathname : `${pathname}/`;

  const { page, isLoading, error } = useCmsPage(urlPath);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-law-dark">
          <Loader2 className="h-8 w-8 text-law-accent animate-spin" />
        </div>
      </Layout>
    );
  }

  // ── Not found / error ────────────────────────────────────────────────────
  if (error || !page) {
    return (
      <Layout>
        <Seo title="Stranica nije pronađena" description="" noindex={true} />
        <div className="min-h-[60vh] flex items-center justify-center bg-law-dark">
          <div className="text-center max-w-lg mx-auto px-6">
            <p className="font-playfair text-[6rem] text-law-accent font-light leading-none mb-4">404</p>
            <h1 className="font-playfair text-3xl text-white font-light mb-3">
              Stranica nije pronađena
            </h1>
            <p className="font-outfit text-white/60 mb-8">
              Stranica koju tražite ne postoji ili još nije objavljena.
            </p>
            <Link
              to="/"
              className="inline-block bg-law-accent text-black font-outfit px-8 py-3 hover:bg-law-accent/80 transition-colors"
            >
              Povratak na početnu
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Render by page_type ──────────────────────────────────────────────────
  if (page.page_type === "landing") {
    return <LandingPageRenderer page={page} />;
  }

  return <StandardPageRenderer page={page} />;
}
