export interface NavChild {
  label: string;
  href: string;
}

export interface SiteSettings {
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
  ga4MeasurementId: string;
  googleAdsId: string;
  googleAdsConversionLabel: string;
  headScripts: string;
  footerScripts: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "",
  logoUrl: "",
  logoAlt: "",
  phoneNumber: "",
  phoneDisplay: "",
  phoneAvailability: "",
  phone2Number: "",
  phone2Display: "",
  phone2Availability: "",
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
  copyrightText: "",
  siteNoindex: false,
  ga4MeasurementId: "",
  googleAdsId: "",
  googleAdsConversionLabel: "",
  headScripts: "",
  footerScripts: "",
};

let settingsCache: SiteSettings | null = null;

function getClientEnv(name: string): string {
  if (typeof import.meta !== "undefined" && (import.meta as ImportMeta & { env?: Record<string, string> }).env) {
    return (import.meta as ImportMeta & { env?: Record<string, string> }).env?.[name] || "";
  }

  return "";
}

export function mapSiteSettingsRow(row: any): SiteSettings {
  return {
    siteName: row?.site_name || DEFAULT_SITE_SETTINGS.siteName,
    logoUrl: row?.logo_url || DEFAULT_SITE_SETTINGS.logoUrl,
    logoAlt: row?.logo_alt || DEFAULT_SITE_SETTINGS.logoAlt,
    phoneNumber: row?.phone_number || DEFAULT_SITE_SETTINGS.phoneNumber,
    phoneDisplay: row?.phone_display || DEFAULT_SITE_SETTINGS.phoneDisplay,
    phoneAvailability: row?.phone_availability || DEFAULT_SITE_SETTINGS.phoneAvailability,
    phone2Number: row?.phone_2_number || DEFAULT_SITE_SETTINGS.phone2Number,
    phone2Display: row?.phone_2_display || DEFAULT_SITE_SETTINGS.phone2Display,
    phone2Availability: row?.phone_2_availability || DEFAULT_SITE_SETTINGS.phone2Availability,
    applyPhoneGlobally: row?.apply_phone_globally ?? DEFAULT_SITE_SETTINGS.applyPhoneGlobally,
    headerCtaText: row?.header_cta_text || DEFAULT_SITE_SETTINGS.headerCtaText,
    headerCtaUrl: row?.header_cta_url || DEFAULT_SITE_SETTINGS.headerCtaUrl,
    navigationItems: Array.isArray(row?.navigation_items) ? row.navigation_items : DEFAULT_SITE_SETTINGS.navigationItems,
    footerAboutLinks: Array.isArray(row?.footer_about_links) ? row.footer_about_links : DEFAULT_SITE_SETTINGS.footerAboutLinks,
    footerPracticeLinks: Array.isArray(row?.footer_practice_links) ? row.footer_practice_links : DEFAULT_SITE_SETTINGS.footerPracticeLinks,
    addressLine1: row?.address_line1 || DEFAULT_SITE_SETTINGS.addressLine1,
    addressLine2: row?.address_line2 || DEFAULT_SITE_SETTINGS.addressLine2,
    mapEmbedUrl: row?.map_embed_url || DEFAULT_SITE_SETTINGS.mapEmbedUrl,
    socialLinks: Array.isArray(row?.social_links) ? row.social_links : DEFAULT_SITE_SETTINGS.socialLinks,
    footerTaglineHtml: row?.footer_tagline_html || DEFAULT_SITE_SETTINGS.footerTaglineHtml,
    copyrightText: row?.copyright_text || DEFAULT_SITE_SETTINGS.copyrightText,
    siteNoindex: row?.site_noindex ?? DEFAULT_SITE_SETTINGS.siteNoindex,
    ga4MeasurementId: row?.ga4_measurement_id || DEFAULT_SITE_SETTINGS.ga4MeasurementId,
    googleAdsId: row?.google_ads_id || DEFAULT_SITE_SETTINGS.googleAdsId,
    googleAdsConversionLabel: row?.google_ads_conversion_label || DEFAULT_SITE_SETTINGS.googleAdsConversionLabel,
    headScripts: row?.head_scripts || DEFAULT_SITE_SETTINGS.headScripts,
    footerScripts: row?.footer_scripts || DEFAULT_SITE_SETTINGS.footerScripts,
  };
}

export function getCachedSiteSettings(): SiteSettings | null {
  return settingsCache;
}

export function primeSiteSettingsCache(settings: SiteSettings | null | undefined) {
  settingsCache = settings ? { ...DEFAULT_SITE_SETTINGS, ...settings } : null;
}

export function clearSiteSettingsCache() {
  settingsCache = null;
}

export async function fetchPublicSiteSettings(
  fetchImpl: typeof fetch = fetch,
): Promise<SiteSettings | null> {
  const supabaseUrl = getClientEnv("VITE_SUPABASE_URL");
  const supabaseAnonKey = getClientEnv("VITE_SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase env vars not configured");
  }

  const response = await fetchImpl(
    `${supabaseUrl}/rest/v1/site_settings_public?settings_key=eq.global&select=*`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return mapSiteSettingsRow(data[0]);
}
