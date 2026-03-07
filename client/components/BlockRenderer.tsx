import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star, Phone, Activity, FileText, Waves, Layers,
  Stethoscope, Heart, MapPin, Scan, CheckCircle2,
  Search, ChevronRight, Plus, Microscope, Dna, Syringe,
  Thermometer, type LucideIcon,
} from "lucide-react";
import type { ContentBlock } from "@site/lib/blocks";
import ReviewsSlider from "@site/components/ReviewsSlider";
import TestimonialsSlider from "@site/components/TestimonialsSlider";
import GoogleReviewsGrid from "@site/components/GoogleReviewsGrid";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";

// ── Icon map ───────────────────────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Activity, FileText, Waves, Layers, Stethoscope, Heart, MapPin, Phone, Scan,
  Search, Microscope, Dna, Syringe, Thermometer,
};
function getIcon(name?: string): LucideIcon {
  if (!name) return FileText;
  return iconMap[name] || FileText;
}

// ── Root renderer ──────────────────────────────────────────────────────────
interface BlockRendererProps {
  content: ContentBlock[];
  isPreview?: boolean;
  isRoot?: boolean;
  isHomepage?: boolean;
  isAboutPage?: boolean;
  isDiagnosticsPage?: boolean;
  isKontaktPage?: boolean;
  isCenovnikPage?: boolean;
  isPracticePage?: boolean;
}

export default function BlockRenderer({
  content,
  isPreview = false,
  isRoot = true,
  isHomepage = false,
  isAboutPage = false,
  isDiagnosticsPage = false,
  isKontaktPage = false,
  isCenovnikPage = false,
  isPracticePage = false
}: BlockRendererProps) {
  const { settings } = useSiteSettings();
  const globalPhone = settings.phoneDisplay || "018 520 640";

  if (!content || !Array.isArray(content)) {
    return (
      <div className="py-16 text-center text-gray-400">
        <p>Sadržaj nije dostupan.</p>
      </div>
    );
  }

  // Use content directly as the only true source of truth
  const blocks = [...content];

  const findTestimonials = (blocks: ContentBlock[]): ContentBlock | undefined => {
    for (const b of blocks) {
      if (b.type === "testimonials") return b;
      if (b.type === "two-column") {
        const found = findTestimonials(b.left) || findTestimonials(b.right);
        if (found) return found;
      }
    }
    return undefined;
  };

  const testimonialsBlock = findTestimonials(blocks);

  return (
    <div>
      {blocks.map((block, i) => (
        <div key={i}>
          <RenderBlock
            block={block}
            isPreview={isPreview}
            isRoot={isRoot}
            testimonialsBlock={testimonialsBlock}
            isHomepage={isHomepage}
            isAboutPage={isAboutPage}
            isDiagnosticsPage={isDiagnosticsPage}
            isKontaktPage={isKontaktPage}
            isCenovnikPage={isCenovnikPage}
            isPracticePage={isPracticePage}
            globalPhone={globalPhone}
          />
        </div>
      ))}
    </div>
  );
}

function RenderBlock({
  block,
  isPreview,
  isRoot,
  testimonialsBlock,
  isHomepage,
  isAboutPage,
  isDiagnosticsPage,
  isKontaktPage,
  isCenovnikPage,
  isPracticePage,
  globalPhone
}: {
  block: ContentBlock;
  isPreview: boolean;
  isRoot: boolean;
  testimonialsBlock?: ContentBlock;
  isHomepage: boolean;
  isAboutPage: boolean;
  isDiagnosticsPage: boolean;
  isKontaktPage: boolean;
  isCenovnikPage: boolean;
  isPracticePage: boolean;
  globalPhone: string;
}) {
  switch (block.type) {
    case "hero":                return <HeroBlock block={block} isPreview={isPreview} globalPhone={globalPhone} />;
    case "heading":             return <HeadingBlock block={block} isDiagnosticsPage={isDiagnosticsPage || isCenovnikPage || isPracticePage} />;
    case "paragraph":           return <ParagraphBlock block={block} isDiagnosticsPage={isDiagnosticsPage || isCenovnikPage || isPracticePage} />;
    case "bullets":             return <BulletsBlock block={block} isDiagnosticsPage={isDiagnosticsPage || isCenovnikPage || isPracticePage} />;
    case "cta":                 return <CTABlock block={block} globalPhone={globalPhone} isDiagnosticsPage={isDiagnosticsPage} isKontaktPage={isKontaktPage} isCenovnikPage={isCenovnikPage} isPracticePage={isPracticePage} />;
    case "image":               return <ImageBlock block={block} isRoot={isRoot} />;
    case "two-column":          return <TwoColumnBlock block={block} isPreview={isPreview} globalPhone={globalPhone} isAboutPage={isAboutPage} isDiagnosticsPage={isDiagnosticsPage} isKontaktPage={isKontaktPage} isCenovnikPage={isCenovnikPage} isPracticePage={isPracticePage} />;
    case "services-grid":       return <ServicesGridBlock block={block} isDiagnosticsPage={isDiagnosticsPage} />;
    case "testimonials":        return <TestimonialsBlock block={block} isHomepage={isHomepage} />;
    case "contact-form":
      return <ContactFormBlock block={block} />;
    case "practice-areas-grid": return <PracticeAreasGridBlock block={block} />;
    case "tabs-section":       return <TabsSectionBlock block={block} />;
    case "seo-text":            return <SEOTextBlock block={block} />;
    case "faq":                 return <FAQBlock block={block} />;
    case "google-reviews":      return <GoogleReviewsBlock block={block} />;
    case "attorney-bio":        return <AttorneyBioBlock block={block} globalPhone={globalPhone} />;
    case "stats":               return <StatsBlock block={block} />;
    case "reviews-slider":      return <ReviewsSlider heading={block.heading} />;
    case "logo-grid":           return <LogoGridBlock block={block} />;
    case "map":                 return <MapBlock block={block} />;
    case "info-section":        return <InfoSectionBlock block={block} />;
    default:
      if (isPreview) {
        return <div className="p-3 bg-gray-100 text-sm text-gray-500 rounded">Unknown block type</div>;
      }
      return null;
  }
}

// ── Hero ───────────────────────────────────────────────────────────────────
function HeroBlock({ block, globalPhone }: { block: Extract<ContentBlock, { type: "hero" }>; isPreview: boolean; globalPhone: string }) {
  const ctaUrl = `tel:${globalPhone.replace(/\D/g, "")}`;

  return (
    <section
      className="relative bg-neo-blue py-20 px-6 text-center overflow-hidden"
      style={
        block.backgroundImage
          ? { backgroundImage: `url(${block.backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      {/* Blue overlay — semi-transparent over image, fully opaque when no image */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: block.backgroundImage ? 'rgba(2, 91, 250, 0.72)' : 'rgba(2, 91, 250, 1)' }}
      />
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="font-outfit font-semibold text-[14px] md:text-[16px] lg:text-[18px] uppercase tracking-wider text-white/80 mb-6 order-1">
          {block.title}
        </h1>
        {block.subtitle && (
          <div
            className="font-outfit text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-10 max-w-3xl mx-auto leading-tight [&_strong]:font-bold [&_em]:italic [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 order-2"
            dangerouslySetInnerHTML={{ __html: block.subtitle }}
          />
        )}
        {block.showCTA && (
          <a
            href={ctaUrl}
            className="inline-flex items-center gap-2 bg-white text-neo-blue font-outfit font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-base order-3"
          >
            <Phone className="h-5 w-5" />
            {block.ctaText}
          </a>
        )}
      </div>
    </section>
  );
}

// ── Heading ────────────────────────────────────────────────────────────────
function HeadingBlock({ block, isDiagnosticsPage }: { block: Extract<ContentBlock, { type: "heading" }>; isDiagnosticsPage?: boolean }) {
  const Tag = `h${block.level}` as "h1" | "h2" | "h3";
  const cls = {
    1: "text-3xl md:text-4xl font-bold text-gray-900",
    2: "text-2xl md:text-3xl font-bold text-gray-900",
    3: "text-lg md:text-xl font-semibold text-gray-800",
  }[block.level];

  const alignmentClass = block.align === "center" ? "text-center mx-auto" :
                         block.align === "right" ? "text-right ml-auto" : "";
  const centerClass = (block.level === 2 || block.align === "center") ? "text-center mx-auto" : "";
  const subtext = (block as any).subtext;
  const containerClass = `max-w-[1200px] mx-auto w-[90%] pt-8 pb-2 ${alignmentClass} ${isDiagnosticsPage ? 'max-w-[900px]' : ''}`;

  return (
    <div className={containerClass}>
      <Tag className={`font-outfit ${cls} leading-snug ${centerClass}`}>{block.text}</Tag>
      {subtext && (
        <p className={`font-outfit text-base md:text-lg text-gray-600 mt-2 ${centerClass} max-w-2xl`}>
          {subtext}
        </p>
      )}
    </div>
  );
}

// ── Paragraph ─────────────────────────────────────────────────────────────
function ParagraphBlock({ block, isDiagnosticsPage }: { block: Extract<ContentBlock, { type: "paragraph" }>; isDiagnosticsPage?: boolean }) {
  const alignmentClass = block.align === "center" ? "text-center mx-auto" :
                         block.align === "right" ? "text-right ml-auto" : "";
  const containerClass = `max-w-[1200px] mx-auto w-[90%] py-2 ${alignmentClass} ${isDiagnosticsPage ? 'max-w-[900px]' : ''}`;
  return (
    <div className={containerClass}>
      <div
        className="font-outfit text-base md:text-lg text-gray-700 leading-relaxed [&_strong]:text-gray-900 [&_strong]:font-semibold [&_p]:mb-4 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </div>
  );
}

// ── Bullets ────────────────────────────────────────────────────────────────
function BulletsBlock({ block, isDiagnosticsPage }: { block: Extract<ContentBlock, { type: "bullets" }>; isDiagnosticsPage?: boolean }) {
  const containerClass = `max-w-[1200px] mx-auto w-[90%] py-2 ${isDiagnosticsPage ? 'max-w-[900px]' : ''}`;

  if (block.variant === "features") {
    return (
      <div className={containerClass}>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
          {block.items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-blue-100 shadow-sm hover:border-neo-blue/30 hover:shadow-md transition-all">
              <CheckCircle2 className="h-6 w-6 text-neo-blue flex-shrink-0 mt-0.5" />
              <span className="font-outfit text-gray-800 font-medium leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isPricing = block.variant === "pricing" || (block.prices && block.prices.length > 0);

  return (
    <div className={containerClass}>
      <ul className="space-y-3">
        {block.items.map((item, i) => {
          const price = block.prices?.[i];
          if (isPricing) {
            return (
              <li key={i} className="flex items-baseline gap-2 font-outfit text-base md:text-lg text-gray-700">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neo-blue self-center translate-y-[-2px]" />
                <span className="flex-shrink-0 max-w-[70%]">{item}</span>
                <div className="flex-grow border-b border-dotted border-gray-300 min-w-[10px]" />
                {price && (
                  <span className="font-bold text-neo-blue flex-shrink-0 whitespace-nowrap">{price}</span>
                )}
              </li>
            );
          }
          return (
            <li key={i} className="flex items-start gap-3 font-outfit text-base md:text-lg text-gray-700">
              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-neo-blue" />
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── CTA ────────────────────────────────────────────────────────────────────
function CTABlock({ block, globalPhone, isDiagnosticsPage, isKontaktPage, isCenovnikPage, isPracticePage }: { block: Extract<ContentBlock, { type: "cta" }>; globalPhone: string; isDiagnosticsPage?: boolean; isKontaktPage?: boolean; isCenovnikPage?: boolean; isPracticePage?: boolean; }) {
  const { settings } = useSiteSettings();
  const isOutline = block.variant === "outline";
  const phone = block.phoneType === "secondary" ? (settings.phone2Display || "065/3520-640") : globalPhone;
  const secondaryPhone = block.secondaryPhoneType === "primary" ? globalPhone : (settings.phone2Display || "065/3520-640");
  const alignmentClass = block.align === "center" ? "text-center mx-auto" :
                         block.align === "right" ? "text-right ml-auto" : "";

  const isBoxed = isDiagnosticsPage || isKontaktPage || isCenovnikPage || isPracticePage;

  return (
    <div className={`max-w-[1200px] mx-auto w-[90%] py-10 ${alignmentClass}`}>
      <div className={`${isBoxed ? 'bg-neo-blue/5 border border-neo-blue/10 p-10 rounded-3xl shadow-sm text-center' : ''}`}>
        {(block.heading || ((isDiagnosticsPage || isCenovnikPage || isPracticePage) && !block.heading)) && (
          <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900 mb-6">
            {block.heading || "Zakažite Vaš pregled"}
          </h2>
        )}
        {block.description && (
          <div
            className="font-outfit text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto [&_p]:mb-4 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: block.description }}
          />
        )}
        <div className={`flex flex-col sm:flex-row gap-4 ${isBoxed || block.align === 'center' ? 'justify-center' : block.align === 'right' ? 'justify-end' : 'justify-start'}`}>
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-outfit font-bold text-base transition-all hover:scale-105 active:scale-95 ${
              isOutline
                ? "border-2 border-neo-blue text-neo-blue hover:bg-neo-blue hover:text-white"
                : "bg-neo-blue text-white hover:bg-neo-blue-dark shadow-lg shadow-neo-blue/20"
            }`}
          >
            <Phone className="h-5 w-5" />
            {block.text} · {phone}
          </a>

          {block.secondaryText && (
             <a
              href={`tel:${secondaryPhone.replace(/\D/g, "")}`}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-outfit font-bold text-base transition-all hover:scale-105 active:scale-95 ${
                block.secondaryVariant === "outline"
                  ? "border-2 border-neo-blue text-neo-blue hover:bg-neo-blue hover:text-white"
                  : block.secondaryVariant === "solid"
                    ? "bg-neo-blue text-white hover:bg-neo-blue-dark"
                    : "border-2 border-neo-blue text-neo-blue hover:bg-neo-blue hover:text-white shadow-lg shadow-neo-blue/5"
              }`}
            >
              <Phone className="h-5 w-5" />
              {block.secondaryText} · {secondaryPhone}
            </a>
          )}

          {(isDiagnosticsPage || isKontaktPage || isCenovnikPage || isPracticePage) && !block.secondaryText && block.phoneType !== "secondary" && (
            <a
              href={`tel:${(settings.phone2Display || "065/3520-640").replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-outfit font-bold text-base transition-all hover:scale-105 active:scale-95 border-2 border-neo-blue text-neo-blue hover:bg-neo-blue hover:text-white shadow-lg shadow-neo-blue/5"
            >
              <Phone className="h-5 w-5" />
              {settings.phone2Display || "065/3520-640"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Image ──────────────────────────────────────────────────────────────────
function ImageBlock({ block, isRoot }: { block: Extract<ContentBlock, { type: "image" }>; isRoot?: boolean }) {
  const containerClass = isRoot ? "max-w-[1200px] mx-auto w-[90%] py-4" : "w-full py-2";
  return (
    <figure className={containerClass}>
      <img src={block.src} alt={block.alt || ""} className="w-full h-auto rounded-2xl" loading="lazy" width={800} height={500} />
    </figure>
  );
}

// ── Two-column ─────────────────────────────────────────────────────────────
function TwoColumnBlock({ block, isPreview, globalPhone, isAboutPage, isDiagnosticsPage, isKontaktPage, isCenovnikPage, isPracticePage }: { block: Extract<ContentBlock, { type: "two-column" }>; isPreview: boolean; globalPhone: string; isAboutPage?: boolean; isDiagnosticsPage?: boolean; isKontaktPage?: boolean; isCenovnikPage?: boolean; isPracticePage?: boolean; }) {
  const isImageOnly = (blocks: ContentBlock[]) => blocks.length === 1 && blocks[0].type === 'image';

  return (
    <div className="py-14" style={{ background: 'linear-gradient(135deg, #eef5ff 0%, #e3eeff 60%, #f0f7ff 100%)' }}>
      <div className={`${isDiagnosticsPage || isCenovnikPage || isPracticePage ? 'max-w-[1100px]' : 'max-w-[1200px]'} mx-auto w-[90%]`}>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 ${isAboutPage || isDiagnosticsPage || isKontaktPage || isCenovnikPage || isPracticePage ? 'items-center' : 'items-start'}`}>
          <div>
            <BlockRenderer content={block.left} isPreview={isPreview} isRoot={false} isAboutPage={isAboutPage} isDiagnosticsPage={isDiagnosticsPage} isKontaktPage={isKontaktPage} isCenovnikPage={isCenovnikPage} isPracticePage={isPracticePage} />
          </div>
          <div className={
            ((isAboutPage || isDiagnosticsPage || isKontaktPage || isCenovnikPage || isPracticePage) && isImageOnly(block.right))
              ? ""
              : "bg-white rounded-2xl shadow-sm border border-blue-100 p-8 lg:p-10"
          }>
            <BlockRenderer content={block.right} isPreview={isPreview} isRoot={false} isAboutPage={isAboutPage} isDiagnosticsPage={isDiagnosticsPage} isKontaktPage={isKontaktPage} isCenovnikPage={isCenovnikPage} isPracticePage={isPracticePage} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Services grid ──────────────────────────────────────────────────────────
function ServicesGridBlock({ block, isDiagnosticsPage }: { block: Extract<ContentBlock, { type: "services-grid" }>; isDiagnosticsPage?: boolean }) {
  const showHeading = block.heading && block.heading !== "Naše dijagnostičke usluge";
  const subtext = (block as any).subtext;

  return (
    <section className="py-12 bg-white">
      {showHeading && (
        <div className="max-w-[1200px] mx-auto w-[90%] mb-8 text-center">
          <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900">{block.heading}</h2>
          {subtext && (
            <p className="font-outfit text-base md:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
              {subtext}
            </p>
          )}
        </div>
      )}
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="flex flex-wrap justify-center gap-6">
          {block.services.map((service, i) => {
            const Icon = getIcon(service.icon);
            const cardClass = "w-full sm:w-[calc(50%_-_12px)] lg:w-[calc(33.333%_-_16px)]";
            const link = service.url || service.link || service.ctaLink;

            const cardContent = (
              <div className="bg-white border border-gray-200 rounded-xl p-6 h-full flex flex-col group hover:border-neo-blue hover:shadow-md transition-all duration-300">
                <div className="bg-neo-blue-light inline-flex p-3 rounded-lg mb-4 self-start group-hover:bg-neo-blue transition-colors duration-300">
                  <Icon className="h-7 w-7 text-neo-blue group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-outfit font-bold text-lg text-gray-900 mb-2">{service.title}</h3>
                {service.description && (
                  <div className="font-outfit text-sm text-gray-600 leading-relaxed mb-4 flex-grow [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1" dangerouslySetInnerHTML={{ __html: service.description }} />
                )}
                {(service.ctaText || service.ctaLink) && (
                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-1.5 text-neo-blue font-outfit font-bold text-sm group-hover:translate-x-1 transition-transform">
                      {service.ctaText || 'Saznajte više'}
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                )}
              </div>
            );

            return link ? (
              <Link key={i} to={link} className={`block ${cardClass}`}>{cardContent}</Link>
            ) : (
              <div key={i} className={cardClass}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ───────────────────────────────────────────────────────────
function TestimonialsBlock({ block }: { block: Extract<ContentBlock, { type: "testimonials" }>; isHomepage: boolean }) {
  const showSlider = block.variant === "slider" || block.variant === "both" || !block.variant;
  const showGrid = block.variant === "grid" || block.variant === "both";

  return (
    <>
      {showSlider && (
        <TestimonialsSlider heading={block.heading} testimonials={block.testimonials} />
      )}
      {showGrid && (
        <GoogleReviewsGrid testimonials={block.testimonials} />
      )}
    </>
  );
}

// ── Contact form ───────────────────────────────────────────────────────────
function ContactFormBlock({ block }: { block: Extract<ContentBlock, { type: "contact-form" }> }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "" });

  const services = block.services ?? [
    "Magnetna rezonanca (MRI)",
    "Rendgen",
    "Ultrazvuk",
    "Multislajsni skener (MSCT)",
    "Ostali pregledi",
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const myForm = e.target as HTMLFormElement;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert(error));
  }

  return (
    <section className="bg-gray-50 border-y border-gray-200 py-16">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className={`grid grid-cols-1 ${block.image ? 'lg:grid-cols-2' : ''} gap-12 items-center`}>
          {/* Left/Main Column: Form */}
          <div className={block.image ? 'max-w-[600px]' : 'max-w-[700px] mx-auto w-full'}>
            <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900 mb-4">{block.heading}</h2>
            {block.description && (
              <div
                className="font-outfit text-base md:text-lg text-gray-600 mb-8 [&_p]:mb-4 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: block.description }}
              />
            )}
            {submitted ? (
              <div className="bg-neo-blue-light border border-neo-blue/30 rounded-xl p-8 text-center">
                <p className="font-outfit text-neo-blue font-bold text-xl mb-2">Hvala!</p>
                <p className="font-outfit text-gray-700">Vaš zahtev je primljen. Kontaktiraćemo Vas u najkraćem roku.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                name="contact-form"
                data-netlify="true"
                netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="contact-form" />
                <p className="hidden">
                  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </p>
                {[
                  { label: "Ime i prezime *", name: "name", type: "text", placeholder: "Vaše ime", required: true },
                  { label: "Telefon *", name: "phone", type: "tel", placeholder: "npr. 060 1234567", required: true },
                ].map(({ label, name, type, placeholder, required }) => (
                  <div key={name}>
                    <label className="block font-outfit text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      required={required}
                      name={name}
                      type={type}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full bg-white border border-gray-300 text-gray-900 font-outfit px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-neo-blue focus:border-transparent placeholder:text-gray-400"
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-outfit text-sm font-medium text-gray-700 mb-1">Vrsta pregleda</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 text-gray-900 font-outfit px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-neo-blue"
                  >
                    <option value="">— Izaberite pregled —</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-outfit text-sm font-medium text-gray-700 mb-1">Napomena</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Dodatne napomene..."
                    className="w-full bg-white border border-gray-300 text-gray-900 font-outfit px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-neo-blue resize-none placeholder:text-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-neo-blue text-white font-outfit font-bold py-3.5 rounded-lg hover:bg-neo-blue-dark transition-colors"
                >
                  Pošalji zahtev
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Image */}
          {block.image && (
            <div className="hidden lg:block relative group">
              <div className="absolute -inset-4 bg-neo-blue/5 rounded-2xl group-hover:bg-neo-blue/10 transition-colors" />
              <img
                src={block.image}
                alt={block.heading}
                className="relative w-full h-[500px] object-cover rounded-xl shadow-lg"
                width={600}
                height={500}
              />
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-neo-blue/10 rounded-full blur-2xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-neo-blue/10 rounded-full blur-2xl" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Practice areas grid ────────────────────────────────────────────────────
function PracticeAreasGridBlock({ block }: { block: Extract<ContentBlock, { type: "practice-areas-grid" }> }) {
  const hasImages = block.areas.some((a) => a.image);

  if (hasImages) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {block.areas.map((area, i) => (
          <a
            key={i}
            href={area.link || "#"}
            className="relative min-h-[300px] overflow-hidden group"
            style={area.image ? { backgroundImage: `url(${area.image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 group-hover:to-neo-blue/80 transition-all duration-500" />
            <div className="relative h-full flex items-end p-5">
              <h3 className="font-outfit font-bold text-2xl text-white">{area.title}</h3>
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <section className="bg-white py-12">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {block.areas.map((area, i) => {
            const Icon = getIcon(area.icon);
            return (
              <a key={i} href={area.link || "#"} className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-neo-blue hover:shadow-md transition-all group">
                <div className="bg-neo-blue-light inline-flex p-3 rounded-lg mb-4 group-hover:bg-neo-blue transition-colors duration-300">
                  <Icon className="h-7 w-7 text-neo-blue group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-outfit font-bold text-lg text-gray-900 mb-2">{area.title}</h3>
                {area.description && <p className="font-outfit text-sm text-gray-600">{area.description}</p>}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Google reviews ─────────────────────────────────────────────────────────
function GoogleReviewsBlock({ block }: { block: Extract<ContentBlock, { type: "google-reviews" }> }) {
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-12">
      {block.heading && (
        <div className="max-w-[1200px] mx-auto w-[90%] mb-8">
          <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900">{block.heading}</h2>
        </div>
      )}
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {block.reviews.map((r, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-neo-blue text-neo-blue" />
                ))}
              </div>
              <div
                className="font-outfit text-gray-700 text-sm mb-4 italic [&_p]:inline"
                dangerouslySetInnerHTML={{ __html: `"${r.text}"` }}
              />
              <strong className="font-outfit text-gray-900 text-sm">{r.author}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Attorney bio ───────────────────────────────────────────────────────────
function AttorneyBioBlock({ block, globalPhone }: { block: Extract<ContentBlock, { type: "attorney-bio" }>; globalPhone: string }) {
  const phone = globalPhone;
  return (
    <div className="max-w-[1200px] mx-auto w-[90%] py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img src={block.image} alt={block.name} className="w-full h-auto rounded-xl object-cover" loading="lazy" width={400} height={400} />
        </div>
        <div className="md:w-2/3">
          <h3 className="font-outfit font-bold text-2xl text-gray-900 mb-1">{block.name}</h3>
          <p className="font-outfit text-neo-blue font-semibold mb-4">{block.title}</p>
          <div className="font-outfit text-gray-700 mb-4 leading-relaxed [&_strong]:font-semibold [&_em]:italic [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5" dangerouslySetInnerHTML={{ __html: block.bio }} />
          <a href={`tel:${phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 text-neo-blue font-outfit font-semibold hover:underline">
            <Phone className="h-4 w-4" />
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Tabs Section ──────────────────────────────────────────────────────────
function TabsSectionBlock({ block }: { block: any }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = block.tabs || [];
  const currentTab = tabs[activeTab];

  if (tabs.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        {block.heading && (
          <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900 mb-10 text-center">
            {block.heading}
          </h2>
        )}

        {/* Tab Buttons */}
        <div className="flex flex-wrap md:flex-nowrap pb-2 mb-8 border-b border-gray-100 gap-2 sm:gap-4 justify-center">
          {tabs.map((tab: any, i: number) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 sm:px-6 py-3 font-outfit font-bold text-sm md:text-base transition-all relative ${
                activeTab === i
                  ? "text-neo-blue"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              {activeTab === i && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neo-blue" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {currentTab && (
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="font-outfit font-bold text-xl md:text-2xl text-gray-900 mb-6">
                  {currentTab.contentHeading}
                </h3>
                <div className="space-y-4">
                  {typeof currentTab.paragraphs === 'string' ? (
                    <div
                      className="font-outfit text-base md:text-lg text-gray-700 leading-relaxed [&_p]:mb-4 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                      dangerouslySetInnerHTML={{ __html: currentTab.paragraphs }}
                    />
                  ) : (
                    (currentTab.paragraphs || []).map((p: string, i: number) => (
                      <p key={i} className="font-outfit text-base md:text-lg text-gray-700 leading-relaxed">
                        {p}
                      </p>
                    ))
                  )}
                </div>
              </div>

              <div>
                {(currentTab.bullets || []).length > 0 && (
                  <ul className="space-y-4 mb-8">
                    {currentTab.bullets.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 font-outfit text-base md:text-lg text-gray-700">
                        <CheckCircle2 className="h-6 w-6 text-neo-blue flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {currentTab.ctaText && currentTab.ctaUrl && (
                  <Link
                    to={currentTab.ctaUrl}
                    className="inline-flex items-center gap-2 bg-neo-blue text-white font-outfit font-bold px-8 py-3.5 rounded-lg hover:bg-neo-blue-dark transition-colors"
                  >
                    {currentTab.ctaText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── SEO Text ────────────────────────────────────────────────────────────────
function SEOTextBlock({ block }: { block: any }) {
  const { heading, paragraphs = [], bullets = [], imageUrl, imageAlt, imagePosition = "right" } = block;

  const textContent = (
    <div className="flex-1">
      {heading && (
        <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900 mb-6">{heading}</h2>
      )}
      <div className="space-y-4">
        {typeof paragraphs === 'string' ? (
          <div
            className="font-outfit text-base md:text-lg text-gray-700 leading-relaxed [&_p]:mb-4 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: paragraphs }}
          />
        ) : (
          (paragraphs || []).map((p: string, i: number) => (
            <p key={i} className="font-outfit text-base md:text-lg text-gray-700 leading-relaxed">
              {p}
            </p>
          ))
        )}
      </div>
      {bullets.length > 0 && (
        <ul className="mt-6 space-y-2.5">
          {bullets.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3 font-outfit text-base md:text-lg text-gray-700">
              <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neo-blue" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const imageContent = imageUrl ? (
    <div className="flex-1">
      <img
        src={imageUrl}
        alt={imageAlt || ""}
        className="w-full h-auto rounded-xl shadow-sm object-cover max-h-[500px]"
        loading="lazy"
        width={600}
        height={450}
      />
    </div>
  ) : null;

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        {imageUrl ? (
          <div className={`flex flex-col md:flex-row gap-12 lg:gap-20 items-center ${imagePosition === "left" ? "md:flex-row-reverse" : ""}`}>
            {textContent}
            {imageContent}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {textContent}
          </div>
        )}
      </div>
    </section>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────
function FAQBlock({ block }: { block: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-[800px] mx-auto w-[90%]">
        {block.heading && (
          <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900 mb-10 text-center">
            {block.heading}
          </h2>
        )}
        <div className="space-y-4">
          {block.items.map((item: { question: string; answer: string }, i: number) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:border-neo-blue/30">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-outfit font-bold text-gray-900 text-lg leading-tight">
                  {item.question}
                </span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-neo-blue-light text-neo-blue flex items-center justify-center transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 pt-0">
                  <div className="h-px bg-gray-100 mb-4" />
                  <div
                    className="font-outfit text-gray-700 leading-relaxed [&_p]:mb-4 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Map ────────────────────────────────────────────────────────────────────
function MapBlock({ block }: { block: Extract<ContentBlock, { type: "map" }> }) {
  return (
    <section className="w-full h-[450px] relative">
      {block.embedUrl ? (
        <iframe
          src={block.embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokacija"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 font-outfit">
          <div className="text-center">
            <MapPin className="h-10 w-10 mx-auto mb-2 opacity-20" />
            <p>Mapa nije konfigurisana (nedostaje Embed URL)</p>
            <p className="text-sm">{block.address}</p>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Stats ──────────────────────────────────────────────────────────────────
function StatsBlock({ block }: { block: Extract<ContentBlock, { type: "stats" }> }) {
  return (
    <section className="bg-neo-blue py-10">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {block.stats.map((stat, i) => (
            <div key={i}>
              <p className="font-outfit font-bold text-4xl md:text-5xl text-white mb-1">{stat.value}</p>
              <p className="font-outfit text-sm md:text-base text-white/70 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Info Section ──────────────────────────────────────────────────────────
function InfoSectionBlock({ block }: { block: Extract<ContentBlock, { type: "info-section" }> }) {
  const { settings } = useSiteSettings();
  const {
    heading, text, image, imagePosition = "right",
    ctaText, ctaVariant = "primary", ctaPhoneType = "primary",
    secondaryCtaText, secondaryCtaVariant = "outline", secondaryCtaPhoneType = "secondary"
  } = block;

  const phone = ctaPhoneType === "secondary" ? (settings.phone2Display || "065/3520-640") : (settings.phoneDisplay || "018 520 640");
  const secondaryPhone = secondaryCtaPhoneType === "primary" ? (settings.phoneDisplay || "018 520 640") : (settings.phone2Display || "065/3520-640");

  const textContent = (
    <div className="flex-1">
      {heading && (
        <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900 mb-6">{heading}</h2>
      )}
      {text && (
        <div
          className="font-outfit text-base md:text-lg text-gray-700 leading-relaxed [&_p]:mb-4 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
      <div className="flex flex-wrap gap-4 mt-8">
        {ctaText && (
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-outfit font-bold transition-all hover:scale-105 active:scale-95 ${
              ctaVariant === "outline"
                ? "border-2 border-neo-blue text-neo-blue hover:bg-neo-blue hover:text-white"
                : ctaVariant === "solid"
                  ? "bg-neo-blue text-white hover:bg-neo-blue-dark"
                  : "bg-neo-blue text-white hover:bg-neo-blue-dark shadow-lg shadow-neo-blue/20"
            }`}
          >
            <Phone className="h-4 w-4" />
            {ctaText} · {phone}
          </a>
        )}
        {secondaryCtaText && (
          <a
            href={`tel:${secondaryPhone.replace(/\D/g, "")}`}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-outfit font-bold transition-all hover:scale-105 active:scale-95 ${
              secondaryCtaVariant === "outline"
                ? "border-2 border-neo-blue text-neo-blue hover:bg-neo-blue hover:text-white"
                : secondaryCtaVariant === "solid"
                  ? "bg-neo-blue text-white hover:bg-neo-blue-dark"
                  : "bg-neo-blue text-white hover:bg-neo-blue-dark shadow-lg shadow-neo-blue/20"
            }`}
          >
            <Phone className="h-4 w-4" />
            {secondaryCtaText} · {secondaryPhone}
          </a>
        )}
      </div>
    </div>
  );

  const imageContent = image ? (
    <div className="flex-1">
      <div className="relative group">
        <div className="absolute -inset-4 bg-neo-blue/5 rounded-2xl group-hover:bg-neo-blue/10 transition-colors" />
        <img
          src={image}
          alt={heading || ""}
          className="relative w-full h-auto rounded-xl shadow-lg object-cover max-h-[600px]"
          loading="lazy"
          width={600}
          height={450}
        />
      </div>
    </div>
  ) : null;

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        {image ? (
          <div className={`flex flex-col md:flex-row gap-12 lg:gap-20 items-center ${imagePosition === "left" ? "md:flex-row-reverse" : ""}`}>
            {textContent}
            {imageContent}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {textContent}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Logo Grid ──────────────────────────────────────────────────────────────
function LogoGridBlock({ block }: { block: any }) {
  return (
    <section className="bg-gray-50 border-b border-gray-200 py-10">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        {block.heading && (
          <h2 className="font-outfit font-bold text-2xl text-center mb-8 text-gray-900">{block.heading}</h2>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {block.logos.map((logo: any, index: number) => (
            <div key={index} className="flex items-center justify-center px-4 grayscale hover:grayscale-0 transition-all duration-300">
              <img
                src={logo.src}
                alt={logo.alt || ""}
                className="max-h-12 w-auto object-contain"
                loading="lazy"
                width={150}
                height={48}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
