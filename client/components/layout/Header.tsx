import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";
import { NAV_ITEMS, type NavItem } from "@site/config/navigation";

export default function Header() {
  const { settings } = useSiteSettings();

  const logoUrl = settings.logoUrl?.trim() || "";
  const logoAlt = settings.logoAlt?.trim() || settings.siteName?.trim() || "Logo";
  const ctaText = settings.headerCtaText?.trim() || "";
  const ctaUrl = settings.headerCtaUrl?.trim() || "/kontakt/";

  return (
    <>
      {/* Top padding background that scrolls away */}
      <div className="bg-law-dark h-[30px]" />

      {/* Sticky header wrapper */}
      <div className="sticky top-0 z-50 bg-law-dark pb-[30px]">
        <div className="max-w-[2560px] mx-auto w-[95%]">
          <div className="bg-law-card border border-law-border px-[30px] py-[10px] flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center w-[300px]">
              <Link to="/" className="mr-[30px]">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={logoAlt}
                    className="w-[306px] max-w-full"
                    width={306}
                    height={50}
                  />
                ) : (
                  <span className="font-outfit text-white text-[22px] leading-none">
                    {settings.siteName || "NEO MAG"}
                  </span>
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center flex-1 justify-end">
              <ul className="flex flex-wrap justify-end -mx-[8px]">
                {NAV_ITEMS.map((item) => (
                  <DesktopNavItem key={item.href + item.label} item={item} />
                ))}
              </ul>
            </nav>

            {/* CTA Button — Desktop */}
            <div className="hidden md:block w-[220px] ml-4">
              {ctaText ? (
                <Link to={ctaUrl}>
                  <Button className="bg-white text-black font-outfit text-[18px] py-[25px] px-[15px] h-auto w-full hover:bg-law-accent hover:text-black transition-all duration-300 flex items-center justify-center gap-2">
                    {ctaText}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              ) : null}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-law-card border-law-border overflow-y-auto">
                <nav className="flex flex-col gap-1 mt-8">
                  {NAV_ITEMS.map((item) => (
                    <MobileNavItem key={item.href + item.label} item={item} />
                  ))}
                  {ctaText && (
                    <Link to={ctaUrl} className="mt-4">
                      <Button className="bg-white text-black font-outfit text-[18px] py-[25px] w-full hover:bg-law-accent hover:text-black transition-all duration-300 flex items-center justify-center gap-2">
                        {ctaText}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Desktop nav item (with hover dropdown) ─────────────────────────────────
function DesktopNavItem({ item }: { item: NavItem }) {
  const { pathname } = useLocation();
  const isActive = item.href !== "#" && (pathname === item.href || pathname.startsWith(item.href === "/" ? "/_never_" : item.href));

  if (!item.children) {
    return (
      <li className="px-[8px]">
        <Link
          to={item.href}
          className={`font-outfit text-[17px] py-[31px] px-[4px] inline-block whitespace-nowrap transition-colors duration-200 ${
            isActive ? "text-law-accent" : "text-white hover:text-law-accent"
          }`}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  // Item with dropdown
  return (
    <li className="px-[8px] relative group">
      {/* Trigger */}
      <button
        className={`font-outfit text-[17px] py-[31px] px-[4px] inline-flex items-center gap-1 whitespace-nowrap transition-colors duration-200 ${
          isActive ? "text-law-accent" : "text-white group-hover:text-law-accent"
        }`}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      {/* Dropdown panel */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 hidden group-hover:block z-50 min-w-[220px]">
        {/* Small bridge to prevent gap between button and panel */}
        <div className="h-2" />
        <ul className="bg-law-card border border-law-border shadow-xl py-1">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                to={child.href}
                className="block font-outfit text-[15px] text-white px-5 py-3 hover:bg-law-dark hover:text-law-accent transition-colors whitespace-nowrap"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

// ── Mobile nav item (accordion) ────────────────────────────────────────────
function MobileNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        to={item.href}
        className="font-outfit text-[18px] text-white py-[12px] px-[5%] border-b border-law-border/30 hover:text-law-accent transition-colors block"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-law-border/30">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between font-outfit text-[18px] text-white py-[12px] px-[5%] hover:text-law-accent transition-colors"
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="bg-law-dark">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                to={child.href}
                className="block font-outfit text-[16px] text-white/80 py-[10px] px-[10%] hover:text-law-accent transition-colors"
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
