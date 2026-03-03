/**
 * JSON-LD Schema Helpers
 * Built for NEO MAG - Diagnostic Center in Niš
 */

export interface SchemaBase {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: any;
}

/**
 * Parses schema_type into an array of strings.
 * Handles:
 * - null/undefined -> []
 * - string "LocalBusiness" -> ["LocalBusiness"]
 * - string "LocalBusiness, FAQPage" -> ["LocalBusiness", "FAQPage"]
 * - JSON string '["LocalBusiness"]' -> ["LocalBusiness"]
 */
export function parseSchemaTypes(schemaType: any): string[] {
  if (!schemaType) return [];
  if (Array.isArray(schemaType)) return schemaType;

  if (typeof schemaType === "string") {
    // Try JSON parsing first
    if (schemaType.startsWith("[") && schemaType.endsWith("]")) {
      try {
        const parsed = JSON.parse(schemaType);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // Fall through
      }
    }

    // Comma separated
    return schemaType
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return [];
}

/**
 * Extracts FAQ items from page content blocks
 */
export function extractFaqItems(content: any): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  if (!content || !Array.isArray(content)) return faqs;

  content.forEach((block: any) => {
    // 1. Direct FAQ blocks
    if (block.type === "faq" && Array.isArray(block.items)) {
      block.items.forEach((item: any) => {
        if (item.question && item.answer) {
          faqs.push({ question: item.question, answer: item.answer });
        }
      });
    }

    // 2. Tabs section blocks that might have FAQ-like content
    if (block.type === "tabs-section" && Array.isArray(block.tabs)) {
      block.tabs.forEach((tab: any) => {
        if (tab.label && tab.paragraphs) {
           // Heuristic: If it looks like a question/answer
           // We might not want to auto-extract every tab as FAQ though
        }
      });
    }
  });

  return faqs;
}

/**
 * Builds LocalBusiness schema for NEO MAG Niš
 */
export function buildLocalBusinessSchema(overrides: any = {}): SchemaBase {
  const siteUrl = (typeof process !== "undefined" && process.env.VITE_SITE_URL) || (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_SITE_URL) || "https://neo-mag.rs";
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "NEO MAG Niš - Specijalna bolnica za dijagnostiku",
    "image": `${siteUrl}/logo.webp`,
    "@id": `${siteUrl}/#organization`,
    "url": siteUrl,
    "telephone": "+381 18 520 640",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bulevar Nemanjića 14a",
      "addressLocality": "Niš",
      "postalCode": "18000",
      "addressCountry": "RS"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.3209,
      "longitude": 21.9033
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "07:00",
      "closes": "21:00"
    },
    ...overrides
  };
}

/**
 * Builds WebPage schema
 */
export function buildWebPageSchema(page: any, overrides: any = {}): SchemaBase {
  const siteUrl = (typeof process !== "undefined" && process.env.VITE_SITE_URL) || (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_SITE_URL) || "https://neo-mag.rs";
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title,
    "description": page.meta_description,
    "url": `${siteUrl}${page.url_path}`,
    ...overrides
  };
}

/**
 * Builds FAQ schema
 */
export function buildFaqSchema(items: { question: string; answer: string }[]): SchemaBase | null {
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/<[^>]*>?/gm, "") // Strip HTML
      }
    }))
  };
}

/**
 * Main function to build all schemas for a page
 */
export function buildPageSchemas(page: any): any[] {
  const types = parseSchemaTypes(page.schema_type);
  const schemas: any[] = [];
  const customData = page.schema_data || {};

  // If we have customData but no specific types set, and it looks like a full schema, use it
  if (types.length === 0 && customData["@context"] && customData["@type"]) {
    schemas.push(customData);
    return schemas;
  }

  types.forEach((type) => {
    let schema: any = null;

    switch (type) {
      case "MedicalClinic":
      case "LocalBusiness":
        schema = buildLocalBusinessSchema(customData[type] || customData);
        break;
      case "WebPage":
        schema = buildWebPageSchema(page, customData[type] || customData);
        break;
      case "FAQPage":
        const faqItems = extractFaqItems(page.content);
        schema = buildFaqSchema(faqItems);
        // Merge custom data if provided for FAQPage
        if (schema && customData[type]) {
          schema = { ...schema, ...customData[type] };
        }
        break;
      case "Attorney":
        // Included because the prompt mentioned it, though this is a medical site
        schema = {
          "@context": "https://schema.org",
          "@type": "Attorney",
          "name": page.title,
          ...(customData[type] || customData)
        };
        break;
      default:
        // Generic support
        if (customData[type]) {
          schema = {
            "@context": "https://schema.org",
            "@type": type,
            ...customData[type]
          };
        }
    }

    if (schema) schemas.push(schema);
  });

  return schemas;
}

/**
 * Renders an array of schema objects as HTML script tags
 * Used for SSG/SSR generation or client-side rendering
 */
export function renderPageSchemas(page: any): string {
  const schemas = buildPageSchemas(page);
  if (!schemas || schemas.length === 0) return "";

  return schemas
    .map((schema) => {
      try {
        const obj = typeof schema === "string" ? JSON.parse(schema) : schema;
        if (Object.keys(obj).length === 0) return "";
        const json = JSON.stringify(obj);
        return `<script type="application/ld+json">${json}</script>`;
      } catch (e) {
        return "";
      }
    })
    .join("\n");
}
