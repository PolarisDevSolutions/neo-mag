import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, ChevronDown, X } from "lucide-react";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";
import { NAV_ITEMS, type NavItem } from "@site/config/navigation";

export default function Header() {
  const { settings } = useSiteSettings();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoUrl = settings.logoUrl?.trim() || "";
  const logoAlt = settings.logoAlt?.trim() || settings.siteName?.trim() || "Logo";
  const phoneDisplay = settings.phoneDisplay?.trim() || "";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="flex items-center justify-between h-[70px] md:h-[80px]">

          {/* ── Logo ── */}
          <Link to="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
            {logoUrl ? (
              <img src={logoUrl} alt={logoAlt} className="h-10 md:h-12 w-auto" />
            ) : (
              <span className="font-outfit font-bold text-xl text-gray-900">
                {settings.siteName || "NEO MAG"}
              </span>
            )}
          </Link>

          {/* ── Desktop navigation (flat — no dropdowns) ── */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Glavna navigacija">
            {NAV_ITEMS.map((item) => (
              <DesktopNavLink key={item.label} item={item} />
            ))}
          </nav>

          {/* ── Desktop CTA: phone only ── */}
          <div className="hidden md:flex items-center">
            {phoneDisplay && (
              <a
                href={`tel:${phoneDisplay.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-2 bg-neo-blue text-white font-outfit font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-neo-blue-dark transition-colors whitespace-nowrap"
              >
                <Phone className="h-4 w-4" />
                {phoneDisplay}
              </a>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-neo-blue transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="max-w-[1200px] mx-auto w-[90%] py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
            ))}
            {phoneDisplay && (
              <a
                href={`tel:${phoneDisplay.replace(/\D/g, "")}`}
                onClick={() => setMobileOpen(false)}
                className="mt-3 w-full bg-neo-blue text-white font-outfit font-semibold text-center py-3 rounded-lg hover:bg-neo-blue-dark transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                {phoneDisplay}
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

// ── Desktop flat nav link (no dropdowns) ────────────────────────────────────
function DesktopNavLink({ item }: { item: NavItem }) {
  const { pathname } = useLocation();

  // For items with children and href="#", link to the first child or the parent
  const href = item.href !== "#" ? item.href : (item.children?.[0]?.href ?? "/");

  const isActive =
    href !== "/" && pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <Link
      to={href}
      className={`relative font-outfit text-[15px] font-medium py-1 transition-colors duration-200 group ${
        isActive ? "text-neo-blue" : "text-gray-700 hover:text-neo-blue"
      }`}
    >
      {item.label}
      <span
        className={`absolute -bottom-0.5 left-0 h-0.5 bg-neo-blue transition-all duration-200 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

// ── Mobile accordion item ────────────────────────────────────────────────────
function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const href = item.href !== "#" ? item.href : (item.children?.[0]?.href ?? "/");

  if (!item.children) {
    return (
      <Link
        to={href}
        onClick={onClose}
        className="font-outfit text-base text-gray-800 py-3 px-1 border-b border-gray-100 hover:text-neo-blue transition-colors block"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between font-outfit text-base text-gray-800 py-3 px-1 hover:text-neo-blue transition-colors"
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="pl-4 pb-2 space-y-1">
          <li>
            <Link
              to={href}
              onClick={onClose}
              className="block font-outfit text-[15px] text-gray-600 py-2 hover:text-neo-blue transition-colors"
            >
              {item.label} – sve
            </Link>
          </li>
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                to={child.href}
                onClick={onClose}
                className="block font-outfit text-[15px] text-gray-600 py-2 hover:text-neo-blue transition-colors"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
