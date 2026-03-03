import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { buildPageSchemas } from '@site/lib/schemaHelpers';

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noindex?: boolean;
  page?: any; // Pass the whole page object to build schema
}

/**
 * Helper to render JSON-LD safely
 */
function renderJsonLd(schema: any) {
  if (!schema) return null;
  try {
    // If it's already an object, stringify it. If it's a string, parse it first to validate then stringify.
    const obj = typeof schema === 'string' ? JSON.parse(schema) : schema;
    if (Object.keys(obj).length === 0) return null;

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
      />
    );
  } catch (e) {
    return null;
  }
}

export default function Seo({
  title,
  description,
  canonical,
  image,
  noindex = false,
  page
}: SeoProps) {
  const { pathname } = useLocation();
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://neo-mag.rs';

  // Build full canonical URL
  const fullCanonical = canonical || (siteUrl ? `${siteUrl}${pathname}` : undefined);

  // Build full title
  const fullTitle = title || '';

  // Default description
  const fullDescription = description || '';

  // Build full image
  const fullImage = image;

  // Render JSON-LD schemas
  const schemas = page ? buildPageSchemas(page) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="icon" type="image/png" href="https://cdn.builder.io/api/v1/image/assets%2F63b17c17cd28402ebbde4e53779092d0%2F43b0f4ae64634c898a35ff8085d25a38?format=webp&width=32&height=32" />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content="website" />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      {fullImage && <meta property="og:image" content={fullImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      {fullImage && <meta name="twitter:image" content={fullImage} />}

      {/* JSON-LD Schemas */}
      {schemas.map((schema, i) => (
        <Fragment key={i}>
          {renderJsonLd(schema)}
        </Fragment>
      ))}
    </Helmet>
  );
}
