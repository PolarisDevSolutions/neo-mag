import { Link } from "react-router-dom";
import Layout from "@site/components/layout/Layout";
import Seo from "@site/components/Seo";
import BlockRenderer from "@site/components/BlockRenderer";
import type { CmsPageData } from "@site/hooks/useCmsPage";

interface Props {
  page: CmsPageData;
}

/**
 * Renders a CMS page with page_type="standard".
 * Includes a neo-blue hero header with the page title and breadcrumb.
 */
export default function StandardPageRenderer({ page }: Props) {
  const hasContent = Array.isArray(page.content) && page.content.length > 0;

  return (
    <Layout>
      <Seo
        title={page.meta_title || page.title}
        description={page.meta_description || ""}
        canonical={page.canonical_url || undefined}
        image={page.og_image || undefined}
        noindex={page.noindex}
      />

      {/* Page hero header */}
      <div className="bg-neo-blue pt-10 pb-10">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <Breadcrumb urlPath={page.url_path} title={page.title} />
          <h1 className="font-playfair text-[clamp(2rem,5vw,3.2rem)] font-light text-white mt-3 leading-tight">
            {page.title}
          </h1>
        </div>
      </div>

      {/* Page content */}
      {hasContent ? (
        <BlockRenderer content={page.content} />
      ) : (
        <EmptyState />
      )}
    </Layout>
  );
}

// ── Breadcrumb ─────────────────────────────────────────────────────────────
function Breadcrumb({ urlPath, title }: { urlPath: string; title: string }) {
  const segments = urlPath.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs: { label: string; href: string }[] = [{ label: "Početna", href: "/" }];
  let built = "";
  for (let i = 0; i < segments.length - 1; i++) {
    built += `/${segments[i]}/`;
    crumbs.push({ label: formatSegment(segments[i]), href: built });
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm font-outfit text-white/60">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <Link to={crumb.href} className="hover:text-white transition-colors">
              {crumb.label}
            </Link>
            <span>/</span>
          </li>
        ))}
        <li className="text-white">{title}</li>
      </ol>
    </nav>
  );
}

function formatSegment(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function EmptyState() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-gray-50">
      <p className="font-outfit text-gray-400">Sadržaj stranice je u pripremi.</p>
    </div>
  );
}
