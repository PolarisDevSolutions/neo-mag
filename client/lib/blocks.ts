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
  | LogoGridBlock;

export interface HeroBlock {
  type: "hero";
  title: string;
  subtitle?: string;
  backgroundImage?: string;
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
  variant?: "list" | "features";
}

export interface CTABlock {
  type: "cta";
  text: string;
  variant?: "primary" | "outline" | "solid";
  phoneType?: "primary" | "secondary";
  align?: "left" | "center" | "right";
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
  services: Array<{
    icon?: string;
    title: string;
    description: string;
    link?: string;
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
  image?: string;
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
