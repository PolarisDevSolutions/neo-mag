import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Phone, Activity, FileText, Waves, Layers, Stethoscope, Heart, MapPin, type LucideIcon } from "lucide-react";
import type { ContentBlock } from "@site/lib/blocks";

// ── Icon map (expandable) ──────────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Activity,
  FileText,
  Waves,
  Layers,
  Stethoscope,
  Heart,
  MapPin,
  Phone,
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

  return (
    <div>
      {content.map((block, i) => (
        <RenderBlock key={i} block={block} isPreview={isPreview} />
      ))}
    </div>
  );
}

function RenderBlock({ block, isPreview }: { block: ContentBlock; isPreview: boolean }) {
  switch (block.type) {
    case "hero":            return <HeroBlock block={block} isPreview={isPreview} />;
    case "heading":         return <HeadingBlock block={block} />;
    case "paragraph":       return <ParagraphBlock block={block} />;
    case "bullets":         return <BulletsBlock block={block} />;
    case "cta":             return <CTABlock block={block} />;
    case "image":           return <ImageBlock block={block} />;
    case "map":             return <MapBlock block={block} />;
    case "two-column":      return <TwoColumnBlock block={block} isPreview={isPreview} />;
    case "services-grid":   return <ServicesGridBlock block={block} />;
    case "testimonials":    return <TestimonialsBlock block={block} />;
    case "contact-form":    return <ContactFormBlock block={block} />;
    case "practice-areas-grid": return <PracticeAreasGridBlock block={block} />;
    case "google-reviews":  return <GoogleReviewsBlock block={block} />;
    case "attorney-bio":    return <AttorneyBioBlock block={block} />;
    case "stats":           return <StatsBlock block={block} />;
    default:
      if (isPreview) {
        return <div className="p-3 bg-gray-100 text-sm text-gray-500 rounded">Unknown block type</div>;
      }
      return null;
  }
}

// ── Hero ───────────────────────────────────────────────────────────────────
function HeroBlock({ block, isPreview }: { block: Extract<ContentBlock, { type: "hero" }>; isPreview: boolean }) {
  return (
    <section
      className="relative bg-law-dark py-20 px-6 text-center"
      style={block.backgroundImage ? { backgroundImage: `url(${block.backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      {block.backgroundImage && <div className="absolute inset-0 bg-law-dark/70" />}
      <div className="relative max-w-4xl mx-auto">
        <h1 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-light text-white leading-tight mb-4">
          {block.title}
        </h1>
        {block.subtitle && (
          <p className="font-outfit text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {block.subtitle}
          </p>
        )}
        {block.showCTA && (
          <a
            href={`tel:${(block.ctaPhone || "018520640").replace(/\D/g, "")}`}
            className="inline-flex items-center gap-2 bg-law-accent text-black font-outfit font-semibold px-8 py-4 hover:bg-law-accent/80 transition-colors text-lg"
          >
            <Phone className="h-5 w-5" />
            {block.ctaText || "Zakažite pregled"}
          </a>
        )}
      </div>
    </section>
  );
}

// ── Heading ────────────────────────────────────────────────────────────────
function HeadingBlock({ block }: { block: Extract<ContentBlock, { type: "heading" }> }) {
  const Tag = `h${block.level}` as "h1" | "h2" | "h3";
  const sizes = { 1: "text-4xl md:text-5xl", 2: "text-3xl md:text-4xl", 3: "text-xl md:text-2xl" };
  return (
    <div className="max-w-[1200px] mx-auto w-[90%] py-4">
      <Tag className={`font-playfair font-light ${sizes[block.level]} text-white`}>
        {block.text}
      </Tag>
    </div>
  );
}

// ── Paragraph ─────────────────────────────────────────────────────────────
function ParagraphBlock({ block }: { block: Extract<ContentBlock, { type: "paragraph" }> }) {
  return (
    <div className="max-w-[1200px] mx-auto w-[90%] py-2">
      <div
        className="font-outfit text-base md:text-lg text-white/85 leading-relaxed [&_strong]:text-white [&_strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </div>
  );
}

// ── Bullets ────────────────────────────────────────────────────────────────
function BulletsBlock({ block }: { block: Extract<ContentBlock, { type: "bullets" }> }) {
  return (
    <div className="max-w-[1200px] mx-auto w-[90%] py-2">
      <ul className="space-y-2">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 font-outfit text-base md:text-lg text-white/85">
            <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-law-accent" />
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
    <div className="max-w-[1200px] mx-auto w-[90%] py-4">
      <a
        href={`tel:${block.phone.replace(/\D/g, "")}`}
        className={`inline-flex items-center gap-2 px-8 py-4 font-outfit font-semibold text-lg transition-colors ${
          isOutline
            ? "border-2 border-law-accent text-law-accent hover:bg-law-accent hover:text-black"
            : "bg-law-accent text-black hover:bg-law-accent/80"
        }`}
      >
        <Phone className="h-5 w-5" />
        {block.text} — {block.phone}
      </a>
    </div>
  );
}

// ── Image ──────────────────────────────────────────────────────────────────
function ImageBlock({ block }: { block: Extract<ContentBlock, { type: "image" }> }) {
  return (
    <figure className="max-w-[1200px] mx-auto w-[90%] py-4">
      <img src={block.src} alt={block.alt || ""} className="w-full h-auto" loading="lazy" />
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
    <div className="bg-law-card border border-law-border py-10 text-center">
      <MapPin className="h-10 w-10 text-law-accent mx-auto mb-3" />
      <p className="font-outfit text-white mb-4">{block.address}</p>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-law-accent text-black font-outfit px-6 py-3 hover:bg-law-accent/80 transition-colors"
      >
        Otvori na Google Mapama
      </a>
    </div>
  );
}

// ── Two-column ─────────────────────────────────────────────────────────────
function TwoColumnBlock({ block, isPreview }: { block: Extract<ContentBlock, { type: "two-column" }>; isPreview: boolean }) {
  return (
    <div className="bg-law-dark py-12">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <BlockRenderer content={block.left} isPreview={isPreview} />
          </div>
          <div>
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
    <section className="bg-law-dark py-12">
      {block.heading && (
        <div className="max-w-[1200px] mx-auto w-[90%] mb-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-light text-white">{block.heading}</h2>
        </div>
      )}
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {block.services.map((service, i) => {
            const Icon = getIcon(service.icon);
            const inner = (
              <div className="bg-law-card border border-law-border p-6 h-full group hover:border-law-accent transition-colors duration-300">
                <div className="bg-law-dark inline-flex p-3 mb-4 group-hover:bg-law-accent transition-colors duration-300">
                  <Icon className="h-8 w-8 text-law-accent group-hover:text-black transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-playfair text-xl text-white mb-2">{service.title}</h3>
                <p className="font-outfit text-sm md:text-base text-white/70 leading-relaxed">{service.description}</p>
              </div>
            );
            return service.link ? (
              <Link key={i} to={service.link} className="block">
                {inner}
              </Link>
            ) : (
              <div key={i}>{inner}</div>
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
    <section className="bg-law-dark py-12">
      {block.heading && (
        <div className="max-w-[1200px] mx-auto w-[90%] mb-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-light text-white">{block.heading}</h2>
        </div>
      )}
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {block.testimonials.map((t, i) => (
            <div key={i} className="bg-law-card border border-law-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-law-accent text-black font-playfair font-bold flex items-center justify-center text-lg">
                  {t.initials}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-law-accent text-law-accent" />
                  ))}
                </div>
              </div>
              <p className="font-outfit text-white/80 italic mb-3">"{t.text}"</p>
              {t.author && <p className="font-outfit text-white font-semibold text-sm">— {t.author}</p>}
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
    // TODO: wire to a backend endpoint or email service
    setSubmitted(true);
  }

  return (
    <section className="bg-law-card border-t border-law-border py-12">
      <div className="max-w-[700px] mx-auto w-[90%]">
        <h2 className="font-playfair text-2xl md:text-3xl text-white mb-6">{block.heading}</h2>
        {submitted ? (
          <div className="bg-law-dark border border-law-accent p-8 text-center">
            <p className="font-outfit text-law-accent text-xl mb-2">Hvala!</p>
            <p className="font-outfit text-white/80">Vaš zahtev je primljen. Kontaktiraćemo Vas u najkraćem roku.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-outfit text-sm text-white/70 mb-1">Ime i prezime *</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Vaše ime"
                className="w-full bg-law-dark border border-law-border text-white font-outfit px-4 py-3 focus:outline-none focus:border-law-accent placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="block font-outfit text-sm text-white/70 mb-1">Telefon *</label>
              <input
                required
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="npr. 060 1234567"
                className="w-full bg-law-dark border border-law-border text-white font-outfit px-4 py-3 focus:outline-none focus:border-law-accent placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="block font-outfit text-sm text-white/70 mb-1">Vrsta pregleda</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-law-dark border border-law-border text-white font-outfit px-4 py-3 focus:outline-none focus:border-law-accent"
              >
                <option value="">— Izaberite pregled —</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-outfit text-sm text-white/70 mb-1">Napomena</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Dodatne napomene..."
                className="w-full bg-law-dark border border-law-border text-white font-outfit px-4 py-3 focus:outline-none focus:border-law-accent placeholder:text-white/30 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-law-accent text-black font-outfit font-semibold py-4 hover:bg-law-accent/80 transition-colors"
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
            className="relative min-h-[350px] overflow-hidden group"
            style={area.image ? { backgroundImage: `url(${area.image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 group-hover:to-law-accent-dark/80 transition-all duration-500" />
            <div className="relative h-full flex items-end p-5">
              <h3 className="font-playfair text-3xl text-white font-light group-hover:text-law-accent transition-colors duration-300">
                {area.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <section className="bg-law-dark py-12">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {block.areas.map((area, i) => {
            const Icon = getIcon(area.icon);
            return (
              <a key={i} href={area.link || "#"} className="block bg-law-card border border-law-border p-6 hover:border-law-accent transition-colors group">
                <Icon className="h-10 w-10 text-law-accent mb-3" strokeWidth={1.5} />
                <h3 className="font-playfair text-xl text-white mb-2">{area.title}</h3>
                {area.description && <p className="font-outfit text-sm text-white/70">{area.description}</p>}
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
    <section className="bg-law-dark py-12">
      {block.heading && (
        <div className="max-w-[1200px] mx-auto w-[90%] mb-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-light text-white">{block.heading}</h2>
        </div>
      )}
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {block.reviews.map((r, i) => (
            <div key={i} className="bg-law-card border border-law-border p-5">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-law-accent text-law-accent" />
                ))}
              </div>
              <p className="font-outfit text-white/80 text-base mb-4">"{r.text}"</p>
              <strong className="font-outfit text-white text-sm">{r.author}</strong>
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
          <img src={block.image} alt={block.name} className="w-full h-auto object-cover" loading="lazy" />
        </div>
        <div className="md:w-2/3">
          <h3 className="font-playfair text-2xl text-white mb-1">{block.name}</h3>
          <p className="font-outfit text-law-accent mb-4">{block.title}</p>
          <p className="font-outfit text-white/80 mb-4 leading-relaxed">{block.bio}</p>
          <a href={`tel:${block.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 text-law-accent font-outfit hover:underline">
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
    <section className="bg-law-accent py-10">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {block.stats.map((stat, i) => (
            <div key={i}>
              <p className="font-playfair text-4xl md:text-5xl font-light text-black mb-1">{stat.value}</p>
              <p className="font-outfit text-sm md:text-base text-black/70 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
