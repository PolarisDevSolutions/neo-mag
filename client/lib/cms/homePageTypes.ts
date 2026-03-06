// Type definitions for structured homepage content
// Each section maps directly to a static component's data needs

export interface HeroContent {
  h1Title: string; // H1 title text (all caps, ~20px) between headline and phone button
  headline: string;
  highlightedText: string;
  phone: string;
  phoneLabel: string;
}

export interface PartnerLogo {
  src: string;
  alt: string;
}

export interface AboutFeature {
  number: string;
  title: string;
  description: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutContent {
  sectionLabel: string;
  heading: string;
  description: string;
  phone: string;
  phoneLabel: string;
  contactLabel: string;
  contactText: string;
  staffImage: string;
  staffImageAlt: string;
  features: AboutFeature[];
  stats: AboutStat[];
}

export interface PracticeAreaItem {
  title: string;
  image: string;
  link: string;
}

export interface PracticeAreasIntroContent {
  sectionLabel: string;
  heading: string;
  description: string;
}

export interface AwardsContent {
  sectionLabel: string;
  heading: string;
  description: string;
  logos: Array<{ src: string; alt: string }>;
}

export interface TestimonialItem {
  text: string;
  author: string;
  ratingImage: string;
}

export interface TestimonialsContent {
  sectionLabel: string;
  heading: string;
  backgroundImage: string;
  items: TestimonialItem[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  steps: ProcessStep[];
}

export interface GoogleReviewItem {
  text: string;
  author: string;
  ratingImage: string;
}

export interface GoogleReviewsContent {
  sectionLabel: string;
  heading: string;
  description: string;
  reviews: GoogleReviewItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  heading: string;
  description: string;
  videoThumbnail: string;
  videoUrl: string;
  items: FaqItem[];
}

export interface ContactContent {
  sectionLabel: string;
  heading: string;
  description: string;
  phone: string;
  phoneLabel: string;
  address: string;
  formHeading: string;
}

// Complete homepage content structure
export interface HomePageContent {
  hero: HeroContent;
  partnerLogos: PartnerLogo[];
  about: AboutContent;
  practiceAreasIntro: PracticeAreasIntroContent;
  practiceAreas: PracticeAreaItem[];
  awards: AwardsContent;
  testimonials: TestimonialsContent;
  process: ProcessContent;
  googleReviews: GoogleReviewsContent;
  faq: FaqContent;
  contact: ContactContent;
}

// Default content - used as fallback when CMS content is not available
export const defaultHomeContent: HomePageContent = {
  hero: {
    h1Title: "MODERAN DIJAGNOSTIČKI CENTAR",
    headline: "Vrhunska dijagnostika i briga o vašem zdravlju.",
    highlightedText: "Poverenje i kvalitet",
    phone: "+381 18 123 456",
    phoneLabel: "Pozovite nas",
  },
  partnerLogos: [
    { src: "/images/logos/google-rating.png", alt: "Google Rating" },
  ],
  about: {
    sectionLabel: "– O nama",
    heading: "Vodeći dijagnostički centar u regionu",
    description:
      "NEO MAG je savremeni dijagnostički centar posvećen pružanju vrhunskih usluga magnetne rezonance i drugih dijagnostičkih procedura.",
    phone: "+381 18 123 456",
    phoneLabel: "Pozovite nas",
    contactLabel: "Kontakt",
    contactText: "Zakažite pregled",
    staffImage: "/images/team/doctor-1.png",
    staffImageAlt: "Doktor",
    features: [
      {
        number: "1",
        title: "Najsavremenija oprema",
        description:
          "Koristimo najnoviju tehnologiju za preciznu i brzu dijagnostiku.",
      },
      {
        number: "2",
        title: "Iskusan tim",
        description:
          "Naš tim čine vrhunski stručnjaci sa dugogodišnjim iskustvom.",
      },
      {
        number: "3",
        title: "Brzi rezultati",
        description:
          "Rezultati pregleda su dostupni u najkraćem mogućem roku.",
      },
    ],
    stats: [
      { value: "10000+", label: "Zadovoljnih pacijenata" },
      { value: "15+", label: "Godina iskustva" },
      { value: "99%", label: "Tačnost dijagnoze" },
      { value: "24/7", label: "Dostupnost informacija" },
    ],
  },
  practiceAreasIntro: {
    sectionLabel: "– Naše usluge",
    heading: "Dijagnostičke procedure",
    description:
      "Pružamo širok spektar dijagnostičkih usluga sa fokusom na preciznost i komfor pacijenata.",
  },
  practiceAreas: [
    {
      title: "Magnetna rezonanca",
      image: "/images/services/mri.jpg",
      link: "/usluge",
    },
    {
      title: "CT Skeniranje",
      image: "/images/services/ct.jpg",
      link: "/usluge",
    },
  ],
  awards: {
    sectionLabel: "– Dostignuća",
    heading: "Sertifikati i priznanja",
    description:
      "Ponosni smo na brojne sertifikate koji potvrđuju kvalitet našeg rada.",
    logos: [],
  },
  testimonials: {
    sectionLabel: "– Utisci",
    heading: "Šta kažu naši pacijenti",
    backgroundImage: "/images/backgrounds/testimonials-bg.jpg",
    items: [],
  },
  process: {
    sectionLabel: "– Proces",
    headingLine1: "Kako do pregleda?",
    headingLine2: "Jednostavni koraci",
    steps: [
      {
        number: "01",
        title: "Zakazivanje",
        description:
          "Pozovite nas ili popunite online formu za zakazivanje.",
      },
      {
        number: "02",
        title: "Pregled",
        description:
          "Obavite pregled u zakazanom terminu uz asistenciju našeg osoblja.",
      },
      {
        number: "03",
        title: "Rezultati",
        description:
          "Preuzmite nalaze i konsultujte se sa našim lekarima.",
      },
    ],
  },
  googleReviews: {
    sectionLabel: "– Google recenzije",
    heading: "Vaše mišljenje nam je važno",
    description:
      "Pogledajte šta naši pacijenti pišu o nama na Google-u.",
    reviews: [],
  },
  faq: {
    heading: "Često postavljana pitanja",
    description:
      "Pronađite odgovore na najčešća pitanja o našim uslugama.",
    videoThumbnail: "/images/backgrounds/faq-bg.jpg",
    videoUrl:
      "https://www.youtube.com/embed/placeholder",
    items: [],
  },
  contact: {
    sectionLabel: "– Kontakt",
    heading: "Kontaktirajte nas",
    description: "Tu smo za sva vaša pitanja i nedoumice.",
    phone: "+381 18 123 456",
    phoneLabel: "Pozovite nas",
    address: "Niš, Srbija",
    formHeading: "Pošaljite nam poruku",
  },
};
