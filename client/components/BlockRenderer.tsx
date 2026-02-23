import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star, Phone, Activity, FileText, Waves, Layers,
  Stethoscope, Heart, MapPin, Scan, CheckCircle2, type LucideIcon,
} from "lucide-react";
import type { ContentBlock } from "@site/lib/blocks";
import ReviewsSlider from "@site/components/ReviewsSlider";

// ── Icon map ───────────────────────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Activity, FileText, Waves, Layers, Stethoscope, Heart, MapPin, Phone, Scan,
};
function getIcon(name?: string): LucideIcon {
  return (name && iconMap[name]) || FileText;
}

// ── Root renderer ──────────────────────────────────────────────────────────
interface BlockRendererProps {
  content: ContentBlock[];
  isPreview?: boolean;
}

export default function BlockRenderer({ content, isPreview = false }: BlockRendererProps) {
  if (!content || !Array.isArray(content)) {
    return (
      <div className="py-16 text-center text-gray-400">
        <p>Sadržaj nije dostupan.</p>
      </div>
    );
  }

  // Fallback for homepage: ensure reviews-slider is present
  let blocks = content;
  const isHomepage = !isPreview && (window.location.pathname === "/" || window.location.pathname === "");
  const hasSlider = content.some(b => b.type === "reviews-slider");

  if (isHomepage && !hasSlider) {
    const heroIdx = content.findIndex(b => b.type === "hero");
    const insertIdx = heroIdx >= 0 ? heroIdx + 1 : 0;
    blocks = [...content];
    blocks.splice(insertIdx, 0, { type: "reviews-slider", heading: "Šta kažu naši pacijenti" } as any);
  }

  return (
    <div>
      {blocks.map((block, i) => (
        <RenderBlock key={i} block={block} isPreview={isPreview} />
      ))}
    </div>
  );
}

function RenderBlock({ block, isPreview }: { block: ContentBlock; isPreview: boolean }) {
  switch (block.type) {
    case "hero":                return <HeroBlock block={block} isPreview={isPreview} />;
    case "heading":             return <HeadingBlock block={block} />;
    case "paragraph":           return <ParagraphBlock block={block} />;
    case "bullets":             return <BulletsBlock block={block} />;
    case "cta":                 return <CTABlock block={block} />;
    case "image":               return <ImageBlock block={block} />;
    case "map":                 return <MapBlock block={block} />;
    case "two-column":          return <TwoColumnBlock block={block} isPreview={isPreview} />;
    case "services-grid":       return <ServicesGridBlock block={block} />;
    case "testimonials":        return <TestimonialsBlock block={block} />;
    case "contact-form":        return <ContactFormBlock block={block} />;
    case "practice-areas-grid": return <PracticeAreasGridBlock block={block} />;
    case "google-reviews":      return <GoogleReviewsBlock block={block} />;
    case "attorney-bio":        return <AttorneyBioBlock block={block} />;
    case "stats":               return <StatsBlock block={block} />;
    case "reviews-slider":      return <ReviewsSlider heading={block.heading} />;
    default:
      if (isPreview) {
        return <div className="p-3 bg-gray-100 text-sm text-gray-500 rounded">Unknown block type</div>;
      }
      return null;
  }
}

// ── Hero ───────────────────────────────────────────────────────────────────
function HeroBlock({ block, isPreview: _isPreview }: { block: Extract<ContentBlock, { type: "hero" }>; isPreview: boolean }) {
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

      <div className="relative max-w-4xl mx-auto">
        <h1 className="font-outfit font-bold text-[clamp(2rem,5vw,3.2rem)] text-white leading-tight mb-4">
          {block.title}
        </h1>
        {block.subtitle && (
          <div
            className="font-outfit text-base md:text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed [&_strong]:font-bold [&_em]:italic [&_p]:mb-2"
            dangerouslySetInnerHTML={{ __html: block.subtitle }}
          />
        )}
        {block.showCTA && block.ctaPhone && (
          <a
            href={`tel:${block.ctaPhone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-2 bg-white text-neo-blue font-outfit font-bold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors text-base"
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
function HeadingBlock({ block }: { block: Extract<ContentBlock, { type: "heading" }> }) {
  const Tag = `h${block.level}` as "h1" | "h2" | "h3";
  const cls = {
    1: "text-3xl md:text-4xl font-bold text-gray-900",
    2: "text-2xl md:text-3xl font-bold text-gray-900",
    3: "text-lg md:text-xl font-semibold text-gray-800",
  }[block.level];

  const centerClass = block.level === 2 ? "text-center" : "";

  return (
    <div className="max-w-[1200px] mx-auto w-[90%] pt-8 pb-2">
      <Tag className={`font-outfit ${cls} leading-snug ${centerClass}`}>{block.text}</Tag>
    </div>
  );
}

// ── Paragraph ─────────────────────────────────────────────────────────────
function ParagraphBlock({ block }: { block: Extract<ContentBlock, { type: "paragraph" }> }) {
  return (
    <div className="max-w-[1200px] mx-auto w-[90%] py-2">
      <div
        className="font-outfit text-base md:text-lg text-gray-700 leading-relaxed [&_strong]:text-gray-900 [&_strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </div>
  );
}

// ── Bullets ────────────────────────────────────────────────────────────────
function BulletsBlock({ block }: { block: Extract<ContentBlock, { type: "bullets" }> }) {
  if ((block as any).variant === "features") {
    return (
      <div className="py-2 space-y-3">
        {block.items.map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:border-neo-blue/30 hover:shadow-md transition-all">
            <CheckCircle2 className="h-6 w-6 text-neo-blue flex-shrink-0 mt-0.5" />
            <span className="font-outfit text-gray-800 font-medium leading-snug">{item}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="max-w-[1200px] mx-auto w-[90%] py-2">
      <ul className="space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 font-outfit text-base md:text-lg text-gray-700">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-neo-blue" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── CTA ────────────────────────────────────────────────────────────────────
function CTABlock({ block }: { block: Extract<ContentBlock, { type: "cta" }> }) {
  const isOutline = block.variant === "outline";
  return (
    <div className="max-w-[1200px] mx-auto w-[90%] py-6">
      <a
        href={`tel:${block.phone.replace(/\D/g, "")}`}
        className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-outfit font-bold text-base transition-colors ${
          isOutline
            ? "border-2 border-neo-blue text-neo-blue hover:bg-neo-blue hover:text-white"
            : "bg-neo-blue text-white hover:bg-neo-blue-dark"
        }`}
      >
        <Phone className="h-5 w-5" />
        {block.text} · {block.phone}
      </a>
    </div>
  );
}

// ── Image ──────────────────────────────────────────────────────────────────
function ImageBlock({ block }: { block: Extract<ContentBlock, { type: "image" }> }) {
  return (
    <figure className="max-w-[1200px] mx-auto w-[90%] py-4">
      <img src={block.src} alt={block.alt || ""} className="w-full h-auto rounded-lg" loading="lazy" />
    </figure>
  );
}

// ── Map ────────────────────────────────────────────────────────────────────
function MapBlock({ block }: { block: Extract<ContentBlock, { type: "map" }> }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(block.address)}`;
  if (block.embedUrl) {
    return (
      <div className="w-full">
        <iframe
          src={block.embedUrl}
          width="100%"
          height="400"
          allowFullScreen
          loading="lazy"
          className="w-full h-[350px] md:h-[400px]"
          title="Mapa lokacije"
        />
      </div>
    );
  }
  return (
    <div className="bg-gray-50 border border-gray-200 py-10 text-center rounded-lg mx-auto max-w-[1200px] w-[90%] my-4">
      <MapPin className="h-10 w-10 text-neo-blue mx-auto mb-3" />
      <p className="font-outfit text-gray-800 mb-4">{block.address}</p>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-neo-blue text-white font-outfit font-semibold px-6 py-3 rounded-lg hover:bg-neo-blue-dark transition-colors"
      >
        Otvori na Google Mapama
      </a>
    </div>
  );
}

// ── Two-column ─────────────────────────────────────────────────────────────
function TwoColumnBlock({ block, isPreview }: { block: Extract<ContentBlock, { type: "two-column" }>; isPreview: boolean }) {
  return (
    <div className="py-14" style={{ background: 'linear-gradient(135deg, #eef5ff 0%, #e3eeff 60%, #f0f7ff 100%)' }}>
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <BlockRenderer content={block.left} isPreview={isPreview} />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8 lg:p-10">
            <BlockRenderer content={block.right} isPreview={isPreview} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Services grid ──────────────────────────────────────────────────────────
function ServicesGridBlock({ block }: { block: Extract<ContentBlock, { type: "services-grid" }> }) {
  return (
    <section className="py-12 bg-white">
      {block.heading && (
        <div className="max-w-[1200px] mx-auto w-[90%] mb-8 text-center">
          <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900">{block.heading}</h2>
        </div>
      )}
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="flex flex-wrap justify-center gap-6">
          {block.services.map((service, i) => {
            const Icon = getIcon(service.icon);
            const cardClass = "w-full sm:w-[calc(50%_-_12px)] lg:w-[calc(33.333%_-_16px)]";
            const inner = (
              <div className="bg-white border border-gray-200 rounded-xl p-6 h-full group hover:border-neo-blue hover:shadow-md transition-all duration-300">
                <div className="bg-neo-blue-light inline-flex p-3 rounded-lg mb-4 group-hover:bg-neo-blue transition-colors duration-300">
                  <Icon className="h-7 w-7 text-neo-blue group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-outfit font-bold text-lg text-gray-900 mb-2">{service.title}</h3>
                {service.description && (
                  <p className="font-outfit text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: service.description }} />
                )}
              </div>
            );
            return service.link ? (
              <Link key={i} to={service.link} className={`block ${cardClass}`}>{inner}</Link>
            ) : (
              <div key={i} className={cardClass}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ───────────────────────────────────────────────────────────
function TestimonialsBlock({ block }: { block: Extract<ContentBlock, { type: "testimonials" }> }) {
  return (
    <section className="bg-gray-50 py-12 border-y border-gray-200">
      {block.heading && (
        <div className="max-w-[1200px] mx-auto w-[90%] mb-8">
          <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900">{block.heading}</h2>
        </div>
      )}
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {block.testimonials.map((t, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-neo-blue text-white font-outfit font-bold flex items-center justify-center text-sm">
                  {t.initials}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-neo-blue text-neo-blue" />
                  ))}
                </div>
              </div>
              <p className="font-outfit text-gray-700 italic text-sm mb-3">"{t.text}"</p>
              {t.author && <p className="font-outfit text-gray-900 font-semibold text-sm">— {t.author}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
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
    setSubmitted(true);
  }

  return (
    <section className="bg-gray-50 border-y border-gray-200 py-12">
      <div className="max-w-[700px] mx-auto w-[90%]">
        <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900 mb-6 text-center">{block.heading}</h2>
        {submitted ? (
          <div className="bg-neo-blue-light border border-neo-blue/30 rounded-xl p-8 text-center">
            <p className="font-outfit text-neo-blue font-bold text-xl mb-2">Hvala!</p>
            <p className="font-outfit text-gray-700">Vaš zahtev je primljen. Kontaktiraćemo Vas u najkraćem roku.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <p className="font-outfit text-gray-700 text-sm mb-4 italic">"{r.text}"</p>
              <strong className="font-outfit text-gray-900 text-sm">{r.author}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Attorney bio ───────────────────────────────────────────────────────────
function AttorneyBioBlock({ block }: { block: Extract<ContentBlock, { type: "attorney-bio" }> }) {
  return (
    <div className="max-w-[1200px] mx-auto w-[90%] py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img src={block.image} alt={block.name} className="w-full h-auto rounded-xl object-cover" loading="lazy" />
        </div>
        <div className="md:w-2/3">
          <h3 className="font-outfit font-bold text-2xl text-gray-900 mb-1">{block.name}</h3>
          <p className="font-outfit text-neo-blue font-semibold mb-4">{block.title}</p>
          <div className="font-outfit text-gray-700 mb-4 leading-relaxed [&_strong]:font-semibold [&_em]:italic [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5" dangerouslySetInnerHTML={{ __html: block.bio }} />
          <a href={`tel:${block.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 text-neo-blue font-outfit font-semibold hover:underline">
            <Phone className="h-4 w-4" />
            {block.phone}
          </a>
        </div>
      </div>
    </div>
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
