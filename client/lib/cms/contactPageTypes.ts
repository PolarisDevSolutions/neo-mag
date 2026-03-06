// Type definitions for structured Contact page content
// Each section maps directly to a static component's data needs

export interface ContactHeroContent {
  sectionLabel: string; // "– Contact Us" (H1)
  tagline: string; // "Let's Talk About Your Case" (styled paragraph)
  description: string; // Description paragraph
}

export interface ContactMethodItem {
  icon: string; // Lucide icon name
  title: string; // "Phone", "Email", "Office"
  detail: string; // Primary detail (phone number, email, address line 1)
  subDetail: string; // Secondary detail (availability, response time, address line 2)
}

export interface ContactMethodsContent {
  methods: ContactMethodItem[];
}

export interface ContactFormContent {
  heading: string; // "Send Us a Message"
  subtext: string; // Description below heading
}

export interface OfficeHoursItem {
  day: string;
  hours: string;
}

export interface OfficeHoursContent {
  heading: string; // "Office Hours"
  items: OfficeHoursItem[];
  note: string; // Additional note
}

export interface ProcessStepItem {
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  sectionLabel: string; // "– The Process"
  heading: string; // "What to Expect When You Contact Us"
  subtitle: string; // Subtitle text
  steps: ProcessStepItem[];
}

export interface VisitOfficeContent {
  heading: string; // "Visit Our Office"
  subtext: string; // Description text
  mapEmbedUrl: string; // Google Maps embed URL
}

export interface CTAContent {
  heading: string; // "Ready to Discuss Your Case?"
  description: string; // Subtitle text
  primaryButton: {
    label: string; // "Call Us Now"
    phone: string; // Phone number
  };
  secondaryButton: {
    label: string; // "Schedule Consultation"
    sublabel: string; // "Free Case Review"
    link: string; // Link URL
  };
}

// Complete Contact page content structure
export interface ContactPageContent {
  hero: ContactHeroContent;
  contactMethods: ContactMethodsContent;
  form: ContactFormContent;
  officeHours: OfficeHoursContent;
  process: ProcessContent;
  visitOffice: VisitOfficeContent;
  cta: CTAContent;
}

// Default content - used as fallback when CMS content is not available
export const defaultContactContent: ContactPageContent = {
  hero: {
    sectionLabel: "– Kontakt",
    tagline: "Razgovarajmo o vašem pregledu",
    description:
      "Naš tim je spreman da sasluša, odgovori na vaša pitanja i pruži stručnu medicinsku pomoć. Kontaktirajte nas danas za zakazivanje termina.",
  },
  contactMethods: {
    methods: [
      {
        icon: "Phone",
        title: "Telefon",
        detail: "+381 18 123 456",
        subDetail: "Dostupni smo za pozive",
      },
      {
        icon: "Mail",
        title: "Email",
        detail: "info@neo-mag.rs",
        subDetail: "Odgovaramo u roku od 24 sata",
      },
      {
        icon: "MapPin",
        title: "Lokacija",
        detail: "Bulevar Nemanjića 14a",
        subDetail: "Niš, Srbija",
      },
    ],
  },
  form: {
    heading: "Pošaljite nam poruku",
    subtext:
      "Popunite formu ispod i javićemo vam se u najkraćem mogućem roku.",
  },
  officeHours: {
    heading: "Radno vreme",
    items: [
      { day: "Ponedeljak - Petak", hours: "07:00 - 21:00" },
      { day: "Subota", hours: "07:00 - 15:00" },
      { day: "Nedelja", hours: "Zatvoreno" },
    ],
    note: "Naš tim za prijem je dostupan tokom radnog vremena za sva vaša pitanja.",
  },
  process: {
    sectionLabel: "– Proces",
    heading: "Šta možete očekivati kada nas kontaktirate",
    subtitle: "",
    steps: [
      {
        number: "1",
        title: "Kontakt",
        description:
          "Pozovite nas ili popunite online formu. Naš tim će vas uputiti u dalju proceduru.",
      },
      {
        number: "2",
        title: "Konsultacije",
        description:
          "Zakazujemo termin koji vam najviše odgovara i odgovaramo na sva pitanja o pripremi za pregled.",
      },
      {
        number: "3",
        title: "Pregled",
        description:
          "Obavljamo precizan dijagnostički pregled uz pomoć najsavremenije medicinske opreme.",
      },
      {
        number: "4",
        title: "Rezultati",
        description:
          "Dobijate detaljan radiološki nalaz koji vam pomaže u daljem lečenju i dijagnostici.",
      },
    ],
  },
  visitOffice: {
    heading: "Posetite nas",
    subtext:
      "Nalazimo se u srcu Niša, lako dostupni svim pacijentima.",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.1234567890!2d21.9033!3d43.3209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE5JzE1LjIiTiAyMcKwNTQnMTIuMCJF!5e0!3m2!1sen!2srs!4v1234567890",
  },
  cta: {
    heading: "Spremni za pregled?",
    description: "Naš stručni medicinski tim je spreman da vam pomogne.",
    primaryButton: {
      label: "Pozovite nas",
      phone: "+381 18 123 456",
    },
    secondaryButton: {
      label: "Zakažite odmah",
      sublabel: "Online zakazivanje",
      link: "/kontakt",
    },
  },
};
