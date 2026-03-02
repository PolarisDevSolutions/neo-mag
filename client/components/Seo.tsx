import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noindex?: boolean;
}

export default function Seo({ 
  title, 
  description, 
  canonical, 
  image,
  noindex = false 
}: SeoProps) {
  const { pathname } = useLocation();
  const siteUrl = import.meta.env.VITE_SITE_URL || '';
  
  // Build full canonical URL
  const fullCanonical = canonical || (siteUrl ? `${siteUrl}${pathname}` : undefined);
  
  // Build full title
  const siteName = 'Neo Mag';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  // Default description
  const defaultDescription = 'Specijalistička lekarska ordinacija za radiologiju i internu medicinu.';
  const fullDescription = description || defaultDescription;
  
  // Default image
  const defaultImage = siteUrl ? `${siteUrl}/og-image.jpg` : undefined;
  const fullImage = image || defaultImage;

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
    </Helmet>
  );
}
