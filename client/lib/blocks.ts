// client/lib/blocks.ts — content block type definitions used by BlockRenderer and the CMS

export type ContentBlock =
  | HeroBlock
  | HeadingBlock
  | ParagraphBlock
  | BulletsBlock
  | CTABlock
  | ImageBlock
  | MapBlock
  | TwoColumnBlock
  | ServicesGridBlock
  | TestimonialsBlock
  | ContactFormBlock
  | PracticeAreasGridBlock
  | GoogleReviewsBlock
  | AttorneyBioBlock
  | StatsBlock
  | ReviewsSliderBlock
  | TabsSectionBlock
  | SEOTextBlock
  | FAQBlock
  | LogoGridBlock
  | InfoSectionBlock
  | LogoStripBlock
  | SharedLogoStripBlock
  | GalleryBlock
  | RelatedPagesBlock;

export interface HeroBlock {
  type: "hero";
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  showCTA?: boolean;
  ctaText?: string;
}

export interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3;
  text: string;
  align?: "left" | "center" | "right";
}

export interface ParagraphBlock {
  type: "paragraph";
  content: string;
  align?: "left" | "center" | "right";
}

export interface BulletsBlock {
  type: "bullets";
  items: string[];
  prices?: string[];
  variant?: "list" | "features" | "pricing";
}

export interface CTABlock {
  type: "cta";
  text: string;
  variant?: "primary" | "outline" | "solid";
  phoneType?: "primary" | "secondary";
  align?: "left" | "center" | "right";
  heading?: string;
  description?: string;
  secondaryText?: string;
  secondaryVariant?: "primary" | "outline" | "solid";
  secondaryPhoneType?: "primary" | "secondary";
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt?: string;
}

export interface MapBlock {
  type: "map";
  address: string;
  embedUrl?: string;
}

export interface TwoColumnBlock {
  type: "two-column";
  left: ContentBlock[];
  right: ContentBlock[];
}

export interface ServicesGridBlock {
  type: "services-grid";
  heading?: string;
  subtext?: string;
  services: Array<{
    icon?: string;
    title: string;
    description: string;
    link?: string;
    ctaText?: string;
    ctaLink?: string;
  }>;
}

export interface TestimonialsBlock {
  type: "testimonials";
  heading?: string;
  variant?: "grid" | "slider";
  testimonials: Array<{
    initials: string;
    rating: number;
    text: string;
    author?: string;
  }>;
}

export interface ContactFormBlock {
  type: "contact-form";
  heading: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  services?: string[];
}

export interface PracticeAreasGridBlock {
  type: "practice-areas-grid";
  areas: Array<{
    icon?: string;
    title: string;
    description?: string;
    image?: string;
    link?: string;
  }>;
}

export interface GoogleReviewsBlock {
  type: "google-reviews";
  heading?: string;
  reviews: Array<{
    rating: number;
    text: string;
    author: string;
  }>;
}

export interface AttorneyBioBlock {
  type: "attorney-bio";
  name: string;
  title: string;
  image: string;
  imageAlt?: string;
  bio: string;
}

export interface StatsBlock {
  type: "stats";
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export interface ReviewsSliderBlock {
  type: "reviews-slider";
  heading?: string;
}

export interface TabsSectionBlock {
  type: "tabs-section";
  heading?: string;
  tabs: Array<{
    label: string;
    contentHeading: string;
    paragraphs: string;
    bullets?: string[];
    ctaText?: string;
    ctaUrl?: string;
  }>;
}

export interface SEOTextBlock {
  type: "seo-text";
  heading?: string;
  paragraphs: string;
  bullets?: string[];
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
}

export interface FAQBlock {
  type: "faq";
  heading?: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export interface LogoGridBlock {
  type: "logo-grid";
  heading?: string;
  logos: Array<{
    src: string;
    alt?: string;
  }>;
}

export interface InfoSectionBlock {
  type: "info-section";
  heading?: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  ctaText?: string;
  ctaVariant?: "primary" | "outline" | "solid";
  ctaPhoneType?: "primary" | "secondary";
  secondaryCtaText?: string;
  secondaryCtaVariant?: "primary" | "outline" | "solid";
  secondaryCtaPhoneType?: "primary" | "secondary";
}

export interface LogoStripBlock {
  type: "logo-strip";
  heading?: string;
  text?: string;
  logos: Array<{ src: string; alt?: string }>;
}

export interface SharedLogoStripBlock {
  type: "shared-logo-strip";
}

export interface GalleryBlock {
  type: "gallery";
  heading?: string;
  subtext?: string;
  items: Array<{
    mediaType: "image" | "video";
    src: string;
    thumbnail?: string;
    alt?: string;
    caption?: string;
  }>;
}

export interface RelatedPagesBlock {
  type: "related-pages";
  heading?: string;
  items: Array<{
    title: string;
    description?: string;
    href: string;
  }>;
}
