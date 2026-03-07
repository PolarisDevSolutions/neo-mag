import { useLocation, Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCmsPage } from "@site/hooks/useCmsPage";
import LandingPageRenderer from "@site/components/renderers/LandingPageRenderer";
import StandardPageRenderer from "@site/components/renderers/StandardPageRenderer";
import Layout from "@site/components/layout/Layout";
import Seo from "@site/components/Seo";
import { useEffect, useState } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

/**
 * Generic CMS-driven page component.
 * Reads the current pathname, fetches the matching page from Supabase,
 * and delegates rendering to LandingPageRenderer or StandardPageRenderer
 * based on page_type.
 *
 * When no page is found, checks the redirects table before showing 404.
 */
export default function CmsPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Normalize: ensure trailing slash matches how pages are stored
  const urlPath = pathname.endsWith("/") ? pathname : `${pathname}/`;

  const { page, isLoading, error } = useCmsPage(urlPath);

  const [redirectChecking, setRedirectChecking] = useState(false);
  const [redirectChecked, setRedirectChecked] = useState(false);

  // When page is not found, look up the redirects table
  useEffect(() => {
    if (isLoading || page || redirectChecked) return;

    setRedirectChecking(true);

    async function checkRedirect() {
      try {
        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

        // Normalize the path the same way pages are stored
        const fromPath = urlPath;

        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/redirects?from_path=eq.${encodeURIComponent(fromPath)}&enabled=eq.true&select=to_path,status_code&limit=1`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          },
        );

        if (!response.ok) return;

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const { to_path, status_code } = data[0];
          if (status_code === 301) {
            window.location.replace(to_path);
          } else {
            navigate(to_path, { replace: true });
          }
          return;
        }
      } catch {
        // Silently fail — will show 404 below
      } finally {
        setRedirectChecking(false);
        setRedirectChecked(true);
      }
    }

    checkRedirect();
  }, [isLoading, page, redirectChecked, urlPath, navigate]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isLoading || redirectChecking) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 text-neo-blue animate-spin" />
        </div>
      </Layout>
    );
  }

  // ── Not found / error ────────────────────────────────────────────────────
  if ((error || !page) && redirectChecked) {
    return (
      <Layout>
        <Seo title="Stranica nije pronađena" description="" noindex={true} />
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-lg mx-auto px-6">
            <p className="font-playfair text-[6rem] text-neo-blue font-light leading-none mb-4">404</p>
            <h1 className="font-playfair text-3xl text-gray-900 font-light mb-3">
              Stranica nije pronađena
            </h1>
            <p className="font-outfit text-gray-500 mb-8">
              Stranica koju tražite ne postoji ili još nije objavljena.
            </p>
            <Link
              to="/"
              className="inline-block bg-neo-blue text-white font-outfit px-8 py-3 rounded-lg hover:bg-neo-blue-dark transition-colors"
            >
              Povratak na početnu
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // While we haven't checked redirects yet but page is also not loaded, show nothing / spinner
  if (!page) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 text-neo-blue animate-spin" />
        </div>
      </Layout>
    );
  }

  // ── Render by page_type ──────────────────────────────────────────────────
  if (page.page_type === "landing") {
    return <LandingPageRenderer page={page} />;
  }

  // 'practice' pages (diagnostic services) and 'standard' pages both use
  // StandardPageRenderer — it provides breadcrumbs and block rendering.
  return <StandardPageRenderer page={page} />;
}
