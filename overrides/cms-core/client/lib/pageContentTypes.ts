// TypeScript interfaces for CMS-driven page content
// Each page type has a specific structure that maps to the static page design

// ============================================
// HOME PAGE CONTENT
// ============================================
export interface HomePageContent {
  hero: {
    h1Title: string;
    headline: string;
    highlightedText: string;
    phone: string;
    phoneLabel: string;
  };
  partnerLogos: Array<{
    src: string;
    alt: string;
  }>;
  about: {
    sectionLabel: string;
    heading: string;
    description: string;
    phone: string;
    phoneLabel: string;
    contactLabel: string;
    contactText: string;
    attorneyImage: string;
    attorneyImageAlt: string;
    features: Array<{
      number: string;
      title: string;
      description: string;
    }>;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  practiceAreasIntro: {
    sectionLabel: string;
    heading: string;
    description: string;
  };
  practiceAreas: Array<{
    title: string;
    image: string;
    link: string;
    description?: string;
    icon?: string;
  }>;
  awards: {
    sectionLabel: string;
    heading: string;
    description: string;
    logos: Array<{ src: string; alt: string }>;
  };
  testimonials: {
    sectionLabel: string;
    heading: string;
    backgroundImage: string;
    items: Array<{
      text: string;
      author: string;
      ratingImage: string;
    }>;
  };
  process: {
    sectionLabel: string;
    headingLine1: string;
    headingLine2: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  googleReviews: {
    sectionLabel: string;
    heading: string;
    description: string;
    reviews: Array<{
      text: string;
      author: string;
      ratingImage: string;
    }>;
  };
  faq: {
    heading: string;
    description: string;
    videoThumbnail: string;
    videoUrl: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  contact: {
    sectionLabel: string;
    heading: string;
    description: string;
    phone: string;
    phoneLabel: string;
    address: string;
    formHeading: string;
  };
}

// ============================================
// ABOUT PAGE CONTENT
// ============================================
export interface AboutPageContent {
  hero: {
    sectionLabel: string;
    tagline: string;
    description: string;
    phone: string;
    phoneLabel: string;
  };
  story: {
    sectionLabel: string;
    heading: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  };
  missionVision: {
    mission: {
      heading: string;
      text: string;
    };
    vision: {
      heading: string;
      text: string;
    };
  };
  team: {
    sectionLabel: string;
    heading: string;
    members: Array<{
      name: string;
      title: string;
      bio: string;
      image: string;
      specialties: string[];
    }>;
  };
  values: {
    sectionLabel: string;
    heading: string;
    subtitle: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  stats: {
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  whyChooseUs: {
    sectionLabel: string;
    heading: string;
    description: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  cta: {
    heading: string;
    description: string;
    primaryButton: {
      label: string;
      phone: string;
    };
    secondaryButton: {
      label: string;
      sublabel: string;
      link: string;
    };
  };
}

// ============================================
// CONTACT PAGE CONTENT
// ============================================
export interface ContactPageContent {
  hero: {
    sectionLabel: string;
    tagline: string;
    description: string;
  };
  contactMethods: {
    methods: Array<{
      icon: string;
      title: string;
      detail: string;
      subDetail: string;
    }>;
  };
  form: {
    heading: string;
    subtext: string;
  };
  officeHours: {
    heading: string;
    items: Array<{
      day: string;
      hours: string;
    }>;
    note: string;
  };
  process: {
    sectionLabel: string;
    heading: string;
    subtitle: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  visitOffice: {
    heading: string;
    subtext: string;
    mapEmbedUrl: string;
  };
  cta: {
    heading: string;
    description: string;
    primaryButton: {
      label: string;
      phone: string;
    };
    secondaryButton: {
      label: string;
      sublabel: string;
      link: string;
    };
  };
}

// ============================================
// PRACTICE AREAS PAGE CONTENT
// ============================================
export interface PracticeAreasPageContent {
  hero: {
    sectionLabel: string;
    tagline: string;
    description: string;
    phone: string;
    phoneLabel: string;
  };
  grid: {
    heading: string;
    description: string;
    areas: Array<{
      icon: string;
      title: string;
      description: string;
      image: string;
      link: string;
    }>;
  };
  whyChoose: {
    sectionLabel: string;
    heading: string;
    subtitle: string;
    description: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  cta: {
    heading: string;
    description: string;
    primaryButton: {
      label: string;
      phone: string;
    };
    secondaryButton: {
      label: string;
      sublabel: string;
      link: string;
    };
  };
}

// ============================================
// UNION TYPE FOR ALL PAGE CONTENT
// ============================================
export type PageContent =
  | HomePageContent
  | AboutPageContent
  | ContactPageContent
  | PracticeAreasPageContent;

// Page key to content type mapping
export type PageKeyToContent = {
  home: HomePageContent;
  about: AboutPageContent;
  contact: ContactPageContent;
  "practice-areas": PracticeAreasPageContent;
};

export type PageKey = keyof PageKeyToContent;

// Database row structure from Supabase pages table
export interface PageRow {
  id: string;
  title: string;
  url_path: string;
  content: PageContent;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  status: "draft" | "published" | "archived";
  template_id: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  page_type: "standard" | "practice" | "landing";
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  noindex: boolean;
  schema_type: string | null;
  schema_data: Record<string, unknown> | null;
}
