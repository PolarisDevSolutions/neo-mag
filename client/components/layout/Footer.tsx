import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

const SOCIAL_LABEL_MAP: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "Youtube",
  linkedin: "LinkedIn",
  twitter: "X",
};

export default function Footer() {
  const { settings } = useSiteSettings();

  const logoUrl = settings.logoUrl?.trim() || "";
  const logoAlt = settings.logoAlt?.trim() || settings.siteName?.trim() || "Logo";
  const phoneDisplay = settings.phoneDisplay?.trim() || "";
  const phoneLabel = settings.phoneAvailability?.trim() || "";
  const copyrightText = settings.copyrightText?.trim() || "";
  const mapEmbedUrl = settings.mapEmbedUrl?.trim() || "";
  const resourceLinks = settings.footerAboutLinks ?? [];
  const practiceLinks = settings.footerPracticeLinks ?? [];
  const footerTaglineHtml = settings.footerTaglineHtml || "";
  const enabledSocialLinks = (settings.socialLinks ?? []).filter((s) => s.enabled);

  return (
    <footer className="bg-gray-900 text-white">

      {/* ── Top strip: tagline + phone ── */}
      <div className="border-b border-gray-700">
        <div className="max-w-[1200px] mx-auto w-[90%] py-10 flex flex-col lg:flex-row lg:items-center gap-8">

          {/* Tagline */}
          <div className="lg:flex-1">
            {footerTaglineHtml ? (
              <div
                className="font-playfair text-[clamp(1.8rem,4vw,3rem)] leading-tight font-light text-white"
                dangerouslySetInnerHTML={{ __html: footerTaglineHtml }}
              />
            ) : (
              <p className="font-playfair text-[clamp(1.8rem,4vw,3rem)] leading-tight font-light text-white">
                <span className="text-neo-blue font-semibold">Your rights. Our mission.</span>
                <br />
                Backed by integrity and relentless representation.
              </p>
            )}
          </div>

          {/* Phone CTA */}
          {phoneDisplay && (
            <div className="lg:flex-shrink-0">
              <a
                href={`tel:${phoneDisplay.replace(/\D/g, "")}`}
                className="inline-flex items-start gap-4 bg-neo-blue hover:bg-neo-blue-dark transition-colors duration-300 p-4 group"
              >
                <div className="bg-white p-3 flex-shrink-0">
                  <Phone className="w-6 h-6 text-neo-blue" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-outfit text-sm text-white/80 mb-1">{phoneLabel}</p>
                  <p className="font-outfit text-[clamp(1.25rem,2.5vw,1.75rem)] text-white leading-tight font-semibold whitespace-nowrap">
                    {phoneDisplay}
                  </p>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ── Main footer links ── */}
      <div className="max-w-[1200px] mx-auto w-[90%] py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Logo column */}
        <div>
          <Link to="/" className="block mb-5">
            {logoUrl ? (
              <img src={logoUrl} alt={logoAlt} className="h-10 w-auto" width={160} height={40} />
            ) : (
              <span className="font-outfit text-white text-xl font-bold">
                {settings.siteName || " "}
              </span>
            )}
          </Link>
        </div>

        {/* Quick links */}
        {resourceLinks.length > 0 && (
          <div>
            <h3 className="font-outfit text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
              Brzi linkovi
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href || "#"}
                    className="font-outfit text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Practice/service links */}
        {practiceLinks.length > 0 && (
          <div>
            <h3 className="font-outfit text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
              Usluge
            </h3>
            <ul className="space-y-2">
              {practiceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href || "#"}
                    className="font-outfit text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Map */}
        {mapEmbedUrl && (
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-outfit text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
              Lokacija
            </h3>
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="200"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[200px] border-0"
              title="Office Location"
            />
          </div>
        )}
      </div>

      {/* ── Social links ── */}
      {enabledSocialLinks.length > 0 && (
        <div className="border-t border-gray-700">
          <div className="max-w-[1200px] mx-auto w-[90%] py-5 flex items-center justify-center gap-3">
            {enabledSocialLinks.map((social) => {
              const Icon = SOCIAL_ICON_MAP[social.platform];
              const label = SOCIAL_LABEL_MAP[social.platform] || social.platform;
              if (!Icon) return null;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Follow on ${label}`}
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-neo-blue border border-gray-600 hover:border-neo-blue transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  <span className="sr-only">Follow on {label}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Copyright ── */}
      <div className="border-t border-gray-700">
        <div className="max-w-[1200px] mx-auto w-[90%] py-4">
          <p className="font-outfit text-sm text-gray-400 text-center">
            {copyrightText || `Copyright © ${new Date().getFullYear()} | All Rights Reserved`}
          </p>
        </div>
      </div>
    </footer>
  );
}
