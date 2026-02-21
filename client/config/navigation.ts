/**
 * Site navigation config with dropdown support.
 *
 * NOTE: The existing site_settings.navigation_items supports flat items only.
 * This config provides nested dropdown support and is the source of truth for
 * the Header component until site_settings schema is extended to support children.
 */

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "O Nama", href: "/o-nama/" },
  {
    label: "Lokacije",
    href: "#",
    children: [
      { label: "Neo Mag Niš", href: "/" },
      { label: "Neo Mag Pirot", href: "/neo-mag-pirot/" },
    ],
  },
  {
    label: "Dijagnostika",
    href: "/dijagnostika/",
    children: [
      { label: "Magnetna rezonanca", href: "/dijagnostika/magnetna-rezonanca/" },
      { label: "Rendgen", href: "/dijagnostika/rendgen/" },
      { label: "Ultrazvuk", href: "/dijagnostika/ultrazvuk/" },
      { label: "Multislajsni skener (MSCT)", href: "/dijagnostika/multilajsni-skener/" },
      { label: "Ostali pregledi", href: "/dijagnostika/ostali-pregledi/" },
    ],
  },
  { label: "Cenovnik", href: "/cenovnik/" },
  { label: "Kontakt", href: "/kontakt/" },
];
