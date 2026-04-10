import { ChevronRight } from "lucide-react";
import Layout from "@site/components/layout/Layout";
import Seo from "@site/components/Seo";
import BlockRenderer from "@site/components/BlockRenderer";
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
  const isHomepage = page.url_path === "/";
  const isAboutPage = page.url_path === "/o-nama/";
  const isDiagnosticsPage = page.url_path === "/dijagnostika/";
  const isKontaktPage = page.url_path === "/kontakt/";
  const isCenovnikPage = page.url_path === "/cenovnik/";
  const isPracticePage = page.page_type === "practice";

  if (firstBlockIsHero) {
    // Hero-first: render full content
    // For practice pages, split hero + breadcrumb + rest
    if (isPracticePage) {
      const isDijagnostika = page.url_path?.startsWith("/dijagnostika/");
      return (
        <Layout>
          <Seo
            title={page.meta_title || page.title}
            description={page.meta_description || page.og_description || page.title}
            canonical={page.canonical_url || undefined}
            image={page.og_image || undefined}
            noindex={page.noindex}
            page={page}
          />
          {/* Hero block only */}
          <BlockRenderer
            content={[content[0]]}
            isHomepage={false}
            isAboutPage={false}
            isDiagnosticsPage={false}
            isKontaktPage={false}
            isCenovnikPage={false}
            isPracticePage={true}
          />
          {/* Breadcrumb strip — visually attached to bottom of hero */}
          <div className="bg-[#013fbd] border-t border-white/10 py-2.5">
            <div className="max-w-[1200px] mx-auto w-[90%] flex justify-center">
              <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-[13px] text-white/70 flex-wrap justify-center">
                <a href="/" className="hover:text-white transition-colors whitespace-nowrap">Početna</a>
                {isDijagnostika && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                    <a href="/dijagnostika/" className="hover:text-white transition-colors whitespace-nowrap">Dijagnostika</a>
                  </>
                )}
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-white font-medium whitespace-nowrap">{page.title}</span>
              </nav>
            </div>
          </div>
          {/* Remaining content blocks */}
          {content.length > 1 && (
            <BlockRenderer
              content={content.slice(1)}
              isHomepage={false}
              isAboutPage={false}
              isDiagnosticsPage={false}
              isKontaktPage={false}
              isCenovnikPage={false}
              isPracticePage={true}
            />
          )}
        </Layout>
      );
    }

    return (
      <Layout>
        <Seo
        title={page.meta_title || page.title}
        description={page.meta_description || page.og_description || page.title}
        canonical={page.canonical_url || undefined}
        image={page.og_image || undefined}
        noindex={page.noindex}
        page={page}
      />

        <BlockRenderer
          content={content}
          isHomepage={isHomepage}
          isAboutPage={isAboutPage}
          isDiagnosticsPage={isDiagnosticsPage}
          isKontaktPage={isKontaktPage}
          isCenovnikPage={isCenovnikPage}
          isPracticePage={isPracticePage}
        />
      </Layout>
    );
  }

  // No hero block — use the generic blue title header
  return (
    <Layout>
      <Seo
        title={page.meta_title || page.title}
        description={page.meta_description || page.og_description || page.title}
        canonical={page.canonical_url || undefined}
        image={page.og_image || undefined}
        noindex={page.noindex}
        page={page}
      />

      {/* Generic page header sourced from CMS page.title */}
      <div className="bg-neo-blue pt-10 pb-10">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <h1 className="font-playfair text-[clamp(2rem,5vw,3.2rem)] font-light text-white leading-tight">
            {page.title}
          </h1>
        </div>
      </div>
      {isPracticePage && (
        <div className="bg-[#013fbd] border-t border-white/10 py-2.5">
          <div className="max-w-[1200px] mx-auto w-[90%] flex justify-center">
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-[13px] text-white/70 flex-wrap justify-center">
              <a href="/" className="hover:text-white transition-colors whitespace-nowrap">Početna</a>
              {page.url_path?.startsWith("/dijagnostika/") && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                  <a href="/dijagnostika/" className="hover:text-white transition-colors whitespace-nowrap">Dijagnostika</a>
                </>
              )}
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-white font-medium whitespace-nowrap">{page.title}</span>
            </nav>
          </div>
        </div>
      )}

      {/* Page content blocks */}
      {content.length > 0 ? (
        <BlockRenderer
          content={content}
          isHomepage={isHomepage}
          isAboutPage={isAboutPage}
          isDiagnosticsPage={isDiagnosticsPage}
          isKontaktPage={isKontaktPage}
          isCenovnikPage={isCenovnikPage}
          isPracticePage={isPracticePage}
        />
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
