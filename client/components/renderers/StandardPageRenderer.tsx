import Layout from "@site/components/layout/Layout";
import Seo from "@site/components/Seo";
import BlockRenderer from "@site/components/BlockRenderer";
import ReviewsSlider from "@site/components/ReviewsSlider";
import type { CmsPageData } from "@site/hooks/useCmsPage";

interface Props {
  page: CmsPageData;
}

/**
 * Renders a CMS page with page_type="standard".
 * Shows a neo-blue hero header with the page title (no hardcoded breadcrumb).
 * ReviewsSlider is injected globally below the hero.
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

      {/* Page hero header — title sourced from CMS page.title, no hardcoded links */}
      <div className="bg-neo-blue pt-10 pb-10">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <h1 className="font-playfair text-[clamp(2rem,5vw,3.2rem)] font-light text-white leading-tight">
            {page.title}
          </h1>
        </div>
      </div>

      {/* Reviews slider — injected globally below the hero on every standard page */}
      <ReviewsSlider />

      {/* Page content blocks */}
      {hasContent ? (
        <BlockRenderer content={page.content} />
      ) : (
        <EmptyState />
      )}
    </Layout>
  );
}

function EmptyState() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-gray-50">
      <p className="font-outfit text-gray-400">Sadržaj stranice je u pripremi.</p>
    </div>
  );
}
