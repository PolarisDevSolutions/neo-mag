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
  | StatsBlock;

export interface HeroBlock {
  type: "hero";
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaPhone?: string;
}

export interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3;
  text: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  content: string;
}

export interface BulletsBlock {
  type: "bullets";
  items: string[];
}

export interface CTABlock {
  type: "cta";
  text: string;
  phone: string;
  variant?: "primary" | "outline" | "solid";
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
  phone: string;
}

export interface StatsBlock {
  type: "stats";
  stats: Array<{
    value: string;
    label: string;
  }>;
}
