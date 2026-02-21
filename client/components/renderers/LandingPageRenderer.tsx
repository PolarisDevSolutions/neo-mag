import Layout from "@site/components/layout/Layout";
import Seo from "@site/components/Seo";
import BlockRenderer from "@site/components/BlockRenderer";
import ReviewsSlider from "@site/components/ReviewsSlider";
import type { CmsPageData } from "@site/hooks/useCmsPage";
import type { ContentBlock } from "@site/lib/blocks";

interface Props {
  page: CmsPageData;
}

/**
 * Renders a CMS page with page_type="landing".
 * Full-width sections — each block manages its own spacing.
 * ReviewsSlider is injected globally below the first hero block.
 */
export default function LandingPageRenderer({ page }: Props) {
  const content: ContentBlock[] = Array.isArray(page.content) ? page.content : [];
  const hasContent = content.length > 0;

  // Determine where to split: after the first hero block (index 0 is most common)
  const firstHeroIdx = content.findIndex((b) => b.type === "hero");
  const splitAfter = firstHeroIdx >= 0 ? firstHeroIdx + 1 : 0;

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
        <>
          {/* Blocks up to and including the first hero */}
          {splitAfter > 0 && <BlockRenderer content={content.slice(0, splitAfter)} />}
          {/* Reviews slider — injected directly after the hero */}
          <ReviewsSlider />
          {/* Remaining content blocks */}
          {content.slice(splitAfter).length > 0 && (
            <BlockRenderer content={content.slice(splitAfter)} />
          )}
        </>
      ) : (
        <>
          <ReviewsSlider />
          <EmptyState title={page.title} />
        </>
      )}
    </Layout>
  );
}

function EmptyState({ title }: { title: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-lg mx-auto px-6">
        <h1 className="font-playfair text-4xl text-gray-900 font-light mb-4">{title}</h1>
        <p className="font-outfit text-gray-400">Sadržaj stranice je u pripremi.</p>
      </div>
    </div>
  );
}
