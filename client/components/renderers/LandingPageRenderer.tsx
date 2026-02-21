import Layout from "@site/components/layout/Layout";
import Seo from "@site/components/Seo";
import BlockRenderer from "@site/components/BlockRenderer";
import type { CmsPageData } from "@site/hooks/useCmsPage";

interface Props {
  page: CmsPageData;
}

/**
 * Renders a CMS page with page_type="landing".
 * Full-width sections, no inner container wrapper — each block manages its own spacing.
 */
export default function LandingPageRenderer({ page }: Props) {
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

      {hasContent ? (
        <BlockRenderer content={page.content} />
      ) : (
        <EmptyState title={page.title} />
      )}
    </Layout>
  );
}

function EmptyState({ title }: { title: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-law-dark">
      <div className="text-center max-w-lg mx-auto px-6">
        <h1 className="font-playfair text-4xl text-white font-light mb-4">{title}</h1>
        <p className="font-outfit text-white/60">Sadržaj stranice je u pripremi.</p>
      </div>
    </div>
  );
}
