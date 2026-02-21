import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import PracticeAreaCard from "@site/components/practice/PracticeAreaCard";
import CallBox from "@site/components/shared/CallBox";
import {
  Phone,
  Calendar,
  Scale,
  Car,
  Briefcase,
  Users,
  Home,
  DollarSign,
  FileText,
  Heart,
  Shield,
  TrendingUp,
  Stethoscope,
  Building,
  type LucideIcon,
} from "lucide-react";
import { usePracticeAreasContent } from "@site/hooks/usePracticeAreasContent";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";

const iconMap: Record<string, LucideIcon> = {
  Car, Stethoscope, Briefcase, Heart, Building, Shield, Scale, FileText,
  Users, Home, DollarSign, TrendingUp,
};

export default function PracticeAreas() {
  const { content } = usePracticeAreasContent();
  const { phoneDisplay, phoneLabel } = useGlobalPhone();

  const practiceAreas = content.grid.areas.map((area) => ({
    icon: iconMap[area.icon] || Scale,
    title: area.title,
    description: area.description,
    image: area.image,
    link: area.link,
  }));

  const whyChooseOurPractice = content.whyChoose.items;

  return (
    <Layout>
      <Seo
        title="Practice Areas"
        description="Explore our comprehensive areas of legal expertise. From personal injury to complex litigation, our experienced attorneys are ready to fight for your rights."
      />

      {/* ── Hero ── */}
      <div className="bg-neo-blue py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="lg:flex-1">
              <h1 className="font-outfit text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
                {content.hero.sectionLabel}
              </h1>
              <p className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-white mb-4">
                <span
                  dangerouslySetInnerHTML={{
                    __html: content.hero.tagline.replace(
                      /(Expertise)/g,
                      '<span class="font-semibold">$1</span>',
                    ),
                  }}
                />
              </p>
              <p className="font-outfit text-base text-white/80">
                {content.hero.description}
              </p>
            </div>
            <div className="lg:w-[280px] flex-shrink-0">
              <CallBox icon={Phone} title={phoneLabel} subtitle={phoneDisplay} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Practice Areas Grid ── */}
      <div className="bg-white py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <div className="text-center mb-10">
            <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-gray-900">
              {content.grid.heading}
            </h2>
            <p className="font-outfit text-base text-gray-600 mt-3 max-w-2xl mx-auto">
              {content.grid.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {practiceAreas.map((area, index) => (
              <PracticeAreaCard key={index} {...area} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Why Choose Our Practice ── */}
      <div className="bg-gray-900 py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="font-outfit text-neo-blue font-semibold text-sm uppercase tracking-widest mb-3">
                {content.whyChoose.sectionLabel}
              </p>
              <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-white mb-4">
                {content.whyChoose.heading}
              </h2>
              {content.whyChoose.subtitle && (
                <p className="font-outfit text-base text-white/70 mb-3">
                  {content.whyChoose.subtitle}
                </p>
              )}
              <p className="font-outfit text-base text-white/80 leading-relaxed mb-6">
                {content.whyChoose.description}
              </p>
              <div className="hidden lg:block">
                <img
                  src="/images/stock/lawyer-consulting.jpg"
                  alt="Law book with scales of justice"
                  className="w-full max-w-[400px] h-auto object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="space-y-5">
              {whyChooseOurPractice.map((feature, index) => (
                <div key={index} className="border-b border-gray-700 pb-5 last:border-0">
                  <h3 className="font-outfit font-bold text-lg text-white mb-1.5">
                    {feature.number}. {feature.title}
                  </h3>
                  <p className="font-outfit text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-neo-blue py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-white mb-3">
              {content.cta.heading}
            </h2>
            <p className="font-outfit text-base text-white/80 max-w-xl mx-auto">
              {content.cta.description}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <CallBox icon={Phone} title={phoneLabel} subtitle={phoneDisplay} />
            <CallBox
              icon={Calendar}
              title={content.cta.secondaryButton.label}
              subtitle={content.cta.secondaryButton.sublabel}
              link={content.cta.secondaryButton.link}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
