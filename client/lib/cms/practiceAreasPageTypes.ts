// Type definitions for structured Practice Areas page content
// Each section maps directly to a static component's data needs

export interface PracticeAreasHeroContent {
  sectionLabel: string; // "– Practice Areas" (H1)
  tagline: string; // "Comprehensive Legal Expertise" (styled text)
  description: string; // Description paragraph
  phone: string;
  phoneLabel: string;
}

export interface PracticeAreaGridItem {
  icon: string; // Lucide icon name
  title: string; // "Personal Injury"
  description: string; // Description text
  image: string; // Background image URL
  link: string; // Link to detail page
}

export interface PracticeAreasGridContent {
  heading: string; // "Our Areas of Practice"
  description: string; // Intro paragraph
  areas: PracticeAreaGridItem[];
}

export interface WhyChooseItem {
  number: string;
  title: string;
  description: string;
}

export interface WhyChooseContent {
  sectionLabel: string; // "– Why Choose Us"
  heading: string; // "Experience Across All Practice Areas"
  subtitle: string; // Subtitle text
  description: string; // Description paragraph
  items: WhyChooseItem[];
}

export interface CTAContent {
  heading: string; // "Ready to Discuss Your Case?"
  description: string; // Subtitle text
  primaryButton: {
    label: string; // "Call Us 24/7"
    phone: string; // Phone number
  };
  secondaryButton: {
    label: string; // "Schedule Now"
    sublabel: string; // "Free Consultation"
    link: string; // Link URL
  };
}

// Complete Practice Areas page content structure
export interface PracticeAreasPageContent {
  hero: PracticeAreasHeroContent;
  grid: PracticeAreasGridContent;
  whyChoose: WhyChooseContent;
  cta: CTAContent;
}

// Default content - used as fallback when CMS content is not available
export const defaultPracticeAreasContent: PracticeAreasPageContent = {
  hero: {
    sectionLabel: "– Naše usluge",
    tagline: "Vrhunska dijagnostička ekspertiza",
    description:
      "Naš tim stručnjaka specijalizovan je za širok spektar dijagnostičkih procedura. Bez obzira na vaše zdravstvene potrebe, posedujemo znanje i najsavremeniju tehnologiju da pružimo precizne rezultate.",
    phone: "+381 18 123 456",
    phoneLabel: "Pozovite nas",
  },
  grid: {
    heading: "Oblasti naše prakse",
    description:
      "Odaberite uslugu da saznate više o tome kako naša dijagnostika može pomoći vašem zdravlju.",
    areas: [
      {
        icon: "Stethoscope",
        title: "Magnetna rezonanca",
        description:
          "Precizna dijagnostika mekih tkiva, zglobova i unutrašnjih organa pomoću najsavremenije MR tehnologije.",
        image: "/images/practice-areas/mri.jpg",
        link: "/usluge/magnetna-rezonanca",
      },
      {
        icon: "Shield",
        title: "CT Skeniranje",
        description:
          "Brza i detaljna kompjuterizovana tomografija za precizan uvid u stanje vašeg organizma.",
        image: "/images/practice-areas/ct.jpg",
        link: "/usluge/ct-skeniranje",
      },
    ],
  },
  whyChoose: {
    sectionLabel: "– Zašto mi?",
    heading: "Iskustvo u svim oblastima dijagnostike",
    subtitle: "",
    description:
      "Bez obzira na vaš zdravstveni izazov, naš tim donosi specijalizovano znanje, resurse i posvećenost potrebnu za postizanje najboljeg mogućeg ishoda.",
    items: [
      {
        number: "1",
        title: "Specijalizovana stručnost",
        description:
          "Svaki radiolog u našem timu donosi duboko znanje u svojoj specifičnoj oblasti, osiguravajući stručno tumačenje nalaza.",
      },
      {
        number: "2",
        title: "Dokazan kvalitet",
        description:
          "Decenije uspešnog rada i hiljade zadovoljnih pacijenata govore o našoj posvećenosti kvalitetu.",
      },
      {
        number: "3",
        title: "Sveobuhvatni resursi",
        description:
          "Investiramo u najnoviju tehnologiju i kontinuiranu edukaciju kadra kako bismo ostali lideri u dijagnostici.",
      },
      {
        number: "4",
        title: "Fokus na pacijenta",
        description:
          "Vaše potrebe vode našu strategiju. Održavamo otvorenu komunikaciju i informišemo vas u svakom koraku.",
      },
    ],
  },
  cta: {
    heading: "Spremni za pregled?",
    description:
      "Zakažite termin kod naših stručnjaka već danas.",
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
