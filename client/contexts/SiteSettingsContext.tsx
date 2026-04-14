import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_SITE_SETTINGS,
  fetchPublicSiteSettings,
  getCachedSiteSettings,
  primeSiteSettingsCache,
  type SiteSettings,
} from "@site/lib/siteSettingsData";

interface SiteSettingsContextValue {
  settings: SiteSettings;
  isLoading: boolean;
  phoneDisplay: string;
  phoneLabel: string;
  phone2Display: string;
  phone2Label: string;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

interface SiteSettingsProviderProps {
  children: ReactNode;
  initialSettings?: SiteSettings | null;
}

export function SiteSettingsProvider({
  children,
  initialSettings = null,
}: SiteSettingsProviderProps) {
  const cachedSettings = initialSettings || getCachedSiteSettings();
  const [settings, setSettings] = useState<SiteSettings>(
    cachedSettings || DEFAULT_SITE_SETTINGS,
  );
  const [isLoading, setIsLoading] = useState(!cachedSettings);

  useEffect(() => {
    let isMounted = true;

    if (initialSettings) {
      primeSiteSettingsCache(initialSettings);
      setSettings(initialSettings);
      setIsLoading(false);
      return;
    }

    const existingSettings = getCachedSiteSettings();
    if (existingSettings) {
      setSettings(existingSettings);
      setIsLoading(false);
      return;
    }

    async function fetchSettings() {
      try {
        const loadedSettings = await fetchPublicSiteSettings();

        if (!isMounted) {
          return;
        }

        if (loadedSettings) {
          primeSiteSettingsCache(loadedSettings);
          setSettings(loadedSettings);
        }
      } catch (err) {
        console.error("[SiteSettingsContext] Error loading settings:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchSettings();

    return () => {
      isMounted = false;
    };
  }, [initialSettings]);

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

export function useSiteSettings(): SiteSettingsContextValue {
  const context = useContext(SiteSettingsContext);

  if (!context) {
    return {
      settings: DEFAULT_SITE_SETTINGS,
      isLoading: false,
      phoneDisplay: DEFAULT_SITE_SETTINGS.phoneDisplay,
      phoneLabel: DEFAULT_SITE_SETTINGS.phoneAvailability,
      phone2Display: DEFAULT_SITE_SETTINGS.phone2Display,
      phone2Label: DEFAULT_SITE_SETTINGS.phone2Availability,
    };
  }

  return context;
}

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
