import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Site Settings types (matching submodule)
interface NavChild {
  label: string;
  href: string;
}

interface SiteSettings {
  siteName: string;
  logoUrl: string;
  logoAlt: string;
  phoneNumber: string;
  phoneDisplay: string;
  phoneAvailability: string;
  phone2Number: string;
  phone2Display: string;
  phone2Availability: string;
  applyPhoneGlobally: boolean;
  headerCtaText: string;
  headerCtaUrl: string;
  navigationItems: { label: string; href: string; order?: number; openInNewTab?: boolean; children?: NavChild[] }[];
  footerAboutLinks: { label: string; href?: string }[];
  footerPracticeLinks: { label: string; href?: string }[];
  footerTaglineHtml: string;
  addressLine1: string;
  addressLine2: string;
  mapEmbedUrl: string;
  socialLinks: { platform: string; url: string; enabled: boolean }[];
  copyrightText: string;
  siteNoindex: boolean;
}

// Default values — all blanks so no stale content appears before Supabase loads
const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "",
  logoUrl: "",
  logoAlt: "",
  phoneNumber: "",
  phoneDisplay: "",
  phoneAvailability: "",
  phone2Number: "0653520640",
  phone2Display: "065/3520-640",
  phone2Availability: "Mobilni",
  applyPhoneGlobally: true,
  headerCtaText: "",
  headerCtaUrl: "",
  navigationItems: [],
  footerAboutLinks: [],
  footerPracticeLinks: [],
  footerTaglineHtml: "",
  addressLine1: "",
  addressLine2: "",
  mapEmbedUrl: "",
  socialLinks: [],
  copyrightText: `Copyright © ${new Date().getFullYear()} | All Rights Reserved`,
  siteNoindex: false,
};

interface SiteSettingsContextValue {
  settings: SiteSettings;
  isLoading: boolean;
  // Convenience getters for phone
  phoneDisplay: string;
  phoneLabel: string;
  phone2Display: string;
  phone2Label: string;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(
  null,
);

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Global cache
let settingsCache: SiteSettings | null = null;

interface SiteSettingsProviderProps {
  children: ReactNode;
}

export function SiteSettingsProvider({ children }: SiteSettingsProviderProps) {
  const [settings, setSettings] = useState<SiteSettings>(
    settingsCache || DEFAULT_SETTINGS,
  );
  const [isLoading, setIsLoading] = useState(!settingsCache);

  useEffect(() => {
    if (settingsCache) {
      setSettings(settingsCache);
      setIsLoading(false);
      return;
    }

    async function fetchSettings() {
      try {
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/site_settings_public?settings_key=eq.global&select=*`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const row = data[0];
          const loadedSettings: SiteSettings = {
            siteName: row.site_name || DEFAULT_SETTINGS.siteName,
            logoUrl: row.logo_url || DEFAULT_SETTINGS.logoUrl,
            logoAlt: row.logo_alt || DEFAULT_SETTINGS.logoAlt,
            phoneNumber: row.phone_number || DEFAULT_SETTINGS.phoneNumber,
            phoneDisplay: row.phone_display || DEFAULT_SETTINGS.phoneDisplay,
            phoneAvailability:
              row.phone_availability || DEFAULT_SETTINGS.phoneAvailability,
            phone2Number: row.phone_2_number || DEFAULT_SETTINGS.phone2Number,
            phone2Display: row.phone_2_display || DEFAULT_SETTINGS.phone2Display,
            phone2Availability:
              row.phone_2_availability || DEFAULT_SETTINGS.phone2Availability,
            applyPhoneGlobally:
              row.apply_phone_globally ?? DEFAULT_SETTINGS.applyPhoneGlobally,
            headerCtaText:
              row.header_cta_text || DEFAULT_SETTINGS.headerCtaText,
            headerCtaUrl: row.header_cta_url || DEFAULT_SETTINGS.headerCtaUrl,
            navigationItems: row.navigation_items?.length
              ? row.navigation_items
              : DEFAULT_SETTINGS.navigationItems,
            footerAboutLinks:
              row.footer_about_links || DEFAULT_SETTINGS.footerAboutLinks,
            footerPracticeLinks:
              row.footer_practice_links || DEFAULT_SETTINGS.footerPracticeLinks,
            addressLine1: row.address_line1 || DEFAULT_SETTINGS.addressLine1,
            addressLine2: row.address_line2 || DEFAULT_SETTINGS.addressLine2,
            mapEmbedUrl: row.map_embed_url || DEFAULT_SETTINGS.mapEmbedUrl,
            socialLinks: row.social_links || DEFAULT_SETTINGS.socialLinks,
            footerTaglineHtml: row.footer_tagline_html || DEFAULT_SETTINGS.footerTaglineHtml,
            copyrightText: row.copyright_text || DEFAULT_SETTINGS.copyrightText,
            siteNoindex: row.site_noindex ?? DEFAULT_SETTINGS.siteNoindex,
          };

          settingsCache = loadedSettings;
          setSettings(loadedSettings);
        }
      } catch (err) {
        console.error("[SiteSettingsContext] Error loading settings:", err);
        // Keep defaults on error
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const value: SiteSettingsContextValue = {
    settings,
    isLoading,
    phoneDisplay: settings.phoneDisplay,
    phoneLabel: settings.phoneAvailability,
    phone2Display: settings.phone2Display,
    phone2Label: settings.phone2Availability,
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

// Hook to access site settings
export function useSiteSettings(): SiteSettingsContextValue {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    // Return defaults if used outside provider (for safety)
    return {
      settings: DEFAULT_SETTINGS,
      isLoading: false,
      phoneDisplay: DEFAULT_SETTINGS.phoneDisplay,
      phoneLabel: DEFAULT_SETTINGS.phoneAvailability,
      phone2Display: DEFAULT_SETTINGS.phone2Display,
      phone2Label: DEFAULT_SETTINGS.phone2Availability,
    };
  }
  return context;
}

// Convenience hook specifically for phone
export function useGlobalPhone() {
  const { settings, isLoading } = useSiteSettings();
  return {
    phoneNumber: settings.phoneNumber,
    phoneDisplay: settings.phoneDisplay,
    phoneLabel: settings.phoneAvailability,
    phone2Number: settings.phone2Number,
    phone2Display: settings.phone2Display,
    phone2Label: settings.phone2Availability,
    isLoading,
  };
}
