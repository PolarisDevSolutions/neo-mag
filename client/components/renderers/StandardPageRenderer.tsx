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
 * Renders a CMS page with page_type="standard".
 *
 * If the first content block is a "hero" type, we skip the generic blue
 * title header and instead render exactly like LandingPageRenderer:
 *   hero block → ReviewsSlider → remaining blocks.
 *
 * If there is no hero block as first element, we show the generic blue
 * title header, then ReviewsSlider, then all content blocks.
 */
export default function StandardPageRenderer({ page }: Props) {
  const content: ContentBlock[] = Array.isArray(page.content) ? page.content : [];
  const firstBlockIsHero = content.length > 0 && content[0].type === "hero";

  if (firstBlockIsHero) {
    // Hero-first: render identically to LandingPageRenderer
    const splitAfter = 1;
    return (
      <Layout>
        <Seo
          title={page.meta_title || page.title}
          description={page.meta_description || ""}
          canonical={page.canonical_url || undefined}
          image={page.og_image || undefined}
          noindex={page.noindex}
        />

        {/* Hero block from CMS */}
        <BlockRenderer content={content.slice(0, splitAfter)} />

        {/* Reviews slider — injected globally below the hero */}
        <ReviewsSlider />

        {/* Remaining content blocks */}
        {content.slice(splitAfter).length > 0 && (
          <BlockRenderer content={content.slice(splitAfter)} />
        )}
      </Layout>
    );
  }

  // No hero block — use the generic blue title header
  return (
    <Layout>
      <Seo
        title={page.meta_title || page.title}
        description={page.meta_description || ""}
        canonical={page.canonical_url || undefined}
        image={page.og_image || undefined}
        noindex={page.noindex}
      />

      {/* Generic page header sourced from CMS page.title */}
      <div className="bg-neo-blue pt-10 pb-10">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <h1 className="font-playfair text-[clamp(2rem,5vw,3.2rem)] font-light text-white leading-tight">
            {page.title}
          </h1>
        </div>
      </div>

      {/* Reviews slider — injected globally below the header */}
      <ReviewsSlider />

      {/* Page content blocks */}
      {content.length > 0 ? (
        <BlockRenderer content={content} />
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
