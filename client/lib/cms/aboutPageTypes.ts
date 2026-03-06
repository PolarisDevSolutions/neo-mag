// Type definitions for structured About page content
// Each section maps directly to a static component's data needs

export interface AboutHeroContent {
  sectionLabel: string; // "– O nama"
  tagline: string; // "Posvećeni zdravlju..." (styled paragraph)
  description: string; // Description paragraph
  phone: string;
  phoneLabel: string;
}

export interface StoryContent {
  sectionLabel: string; // "– Naša priča"
  heading: string; // "Gradimo poverenje..."
  paragraphs: string[]; // Array of paragraph texts
  image: string;
  imageAlt: string;
}

export interface MissionVisionContent {
  mission: {
    heading: string; // "Our Mission"
    text: string; // Mission paragraph
  };
  vision: {
    heading: string; // "Our Vision"
    text: string; // Vision paragraph
  };
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties: string[];
}

export interface TeamContent {
  sectionLabel: string; // "– Naš stručni tim"
  heading: string; // "Iskusni lekari..."
  members: TeamMember[];
}

export interface ValueItem {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export interface ValuesContent {
  sectionLabel: string; // "– Naše vrednosti"
  heading: string; // "Principi koji vode naš rad"
  subtitle: string; // Subtitle text (NEW)
  items: ValueItem[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsContent {
  stats: StatItem[];
}

export interface WhyChooseUsItem {
  number: string;
  title: string;
  description: string;
}

export interface WhyChooseUsContent {
  sectionLabel: string; // "– Zašto mi?"
  heading: string; // "Šta nas izdvaja"
  description: string; // Intro paragraph
  items: WhyChooseUsItem[];
}

export interface CTAContent {
  heading: string; // "Spremni za pregled?"
  description: string; // Subtitle text
  primaryButton: {
    label: string; // "Pozovite nas"
    phone: string; // Phone number
  };
  secondaryButton: {
    label: string; // "Zakažite odmah"
    sublabel: string; // "Online zakazivanje"
    link: string; // Link URL
  };
}

// Complete About page content structure
export interface AboutPageContent {
  hero: AboutHeroContent;
  story: StoryContent;
  missionVision: MissionVisionContent;
  team: TeamContent;
  values: ValuesContent;
  stats: StatsContent;
  whyChooseUs: WhyChooseUsContent;
  cta: CTAContent;
}

// Default content - used as fallback when CMS content is not available
export const defaultAboutContent: AboutPageContent = {
  hero: {
    sectionLabel: "– O nama",
    tagline: "Posvećeni zdravlju i preciznosti",
    description:
      "Više od dve decenije, naš dijagnostički centar stoji kao simbol poverenja za pojedince koji traže vrhunsku medicinsku uslugu. Kombinujemo duboku medicinsku ekspertizu sa najsavremenijom tehnologijom.",
    phone: "+381 18 123 456",
    phoneLabel: "Pozovite nas",
  },
  story: {
    sectionLabel: "– Naša priča",
    heading: "Gradimo poverenje od 1999. godine",
    paragraphs: [
      "Naš centar je osnovan na jednostavnom, ali moćnom principu: svaka osoba zaslužuje pristup izuzetnoj dijagnostici, bez obzira na okolnosti.",
      "Ono što je počelo kao mala ordinacija preraslo je u jedan od najrespektabilnijih dijagnostičkih centara u Nišu, ali naše osnovne vrednosti ostaju nepromenjene. I dalje svakog pacijenta tretiramo sa maksimalnom pažnjom.",
      "Danas, naš tim iskusnih stručnjaka nastavlja da postavlja nove standarde u medicinskoj dijagnostici u našoj zajednici.",
    ],
    image: "/images/team/doctor-2.png",
    imageAlt: "Naš centar",
  },
  missionVision: {
    mission: {
      heading: "Naša misija",
      text: "Pružanje izuzetne dijagnostičke usluge koja osnažuje naše pacijente i pruža precizne informacije za dalje lečenje. Posvećeni smo tome da budemo dostupni, brzi i pouzdani.",
    },
    vision: {
      heading: "Naša vizija",
      text: "Da budemo najpouzdaniji dijagnostički centar u regionu, prepoznat po integritetu, medicinskoj izvrsnosti i iskrenoj brizi za pacijente.",
    },
  },
  team: {
    sectionLabel: "– Naš stručni tim",
    heading: "Iskusni lekari posvećeni vašem zdravlju",
    members: [
      {
        name: "Dr Marko Marković",
        title: "Radiolog",
        bio: "Sa preko 20 godina iskustva u radiologiji, dr Marković je stručnjak za magnetnu rezonancu i kompleksne dijagnostičke procedure.",
        image: "/images/team/doctor-1.png",
        specialties: [
          "Magnetna rezonanca",
          "CT Skeniranje",
          "Radiologija",
        ],
      },
    ],
  },
  values: {
    sectionLabel: "– Naše vrednosti",
    heading: "Principi koji vode naš rad",
    subtitle: "",
    items: [
      {
        icon: "Shield",
        title: "Integritet",
        description:
          "Pridržavamo se najviših etičkih standarda u svakom pregledu. Vaše poverenje je naš temelj.",
      },
      {
        icon: "Award",
        title: "Izvrsnost",
        description:
          "Naša posvećenost izvrsnosti nas tera da koristimo najnovije medicinske strategije i postižemo najbolje rezultate.",
      },
      {
        icon: "Users",
        title: "Pacijent na prvom mestu",
        description:
          "Vaše potrebe su prioritet. Pažljivo slušamo, jasno komuniciramo i neumorno radimo za vaše zdravlje.",
      },
      {
        icon: "Heart",
        title: "Empatija",
        description:
          "Razumemo da su medicinski pregledi stresni. Naš tim pruža ne samo stručnost, već i iskrenu podršku.",
      },
    ],
  },
  stats: {
    stats: [
      { value: "25+", label: "Godina iskustva" },
      { value: "10000+", label: "Uspešnih pregleda" },
      { value: "99%", label: "Tačnost dijagnoze" },
      { value: "98%", label: "Zadovoljnih pacijenata" },
    ],
  },
  whyChooseUs: {
    sectionLabel: "– Zašto mi?",
    heading: "Šta nas izdvaja",
    description:
      "Kada izaberete naš centar, birate tim koji kombinuje medicinsku ekspertizu sa iskrenom brigom za vaše dobro.",
    items: [
      {
        number: "1",
        title: "Individualni pristup",
        description:
          "Svaki pacijent dobija individualnu pažnju. Razvijamo strategiju pregleda prilagođenu vašoj situaciji.",
      },
      {
        number: "2",
        title: "Dokazani rezultati",
        description:
          "Naša istorija preciznih dijagnoza govori sama za sebe. Posedujemo iskustvo i veštine za vrhunsku uslugu.",
      },
      {
        number: "3",
        title: "Dostupnost",
        description:
          "Tu smo da odgovorimo na vaše brige i zakakažemo termin u najkraćem roku.",
      },
      {
        number: "4",
        title: "Savremena tehnologija",
        description:
          "Koristimo najnoviju opremu za preciznu i bezbednu dijagnostiku.",
      },
    ],
  },
  cta: {
    heading: "Spremni za pregled?",
    description: "Naš stručni tim je spreman da vam pomogne.",
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
