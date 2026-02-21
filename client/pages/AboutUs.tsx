import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import CallBox from "@site/components/shared/CallBox";
import StatsGrid from "@site/components/shared/StatsGrid";
import TeamMemberCard from "@site/components/about/TeamMemberCard";
import ValueCard from "@site/components/about/ValueCard";
import {
  Phone,
  Calendar,
  Scale,
  Award,
  Users,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { useAboutContent } from "@site/hooks/useAboutContent";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";

const iconMap: Record<string, LucideIcon> = {
  Scale,
  Award,
  Users,
  Heart,
};

export default function AboutUs() {
  const { content } = useAboutContent();
  const { phoneDisplay, phoneLabel } = useGlobalPhone();

  const teamMembers = content.team.members;
  const coreValues = content.values.items.map((item) => ({
    icon: iconMap[item.icon] || Scale,
    title: item.title,
    description: item.description,
  }));
  const stats = content.stats.stats;
  const whyChooseUs = content.whyChooseUs.items;

  return (
    <Layout>
      <Seo
        title="About Us"
        description="Learn about our law firm's mission, values, and experienced legal team dedicated to protecting your rights."
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
                      /(Justice & Excellence|Justice|Excellence)/g,
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

      {/* ── Our Story ── */}
      <div className="bg-white py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="font-outfit text-neo-blue font-semibold text-sm uppercase tracking-widest mb-3">
                {content.story.sectionLabel}
              </p>
              <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-gray-900 mb-6">
                {content.story.heading}
              </h2>
              <div className="space-y-4">
                {content.story.paragraphs.map((paragraph, index) => (
                  <p key={index} className="font-outfit text-base text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <img
                  src={content.story.image}
                  alt={content.story.imageAlt}
                  className="max-w-full w-auto h-auto object-contain rounded-xl"
                  width={338}
                  height={462}
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mission & Vision ── */}
      <div className="bg-neo-blue py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="font-playfair text-[clamp(1.5rem,3vw,2rem)] font-light text-white mb-4">
                {content.missionVision.mission.heading}
              </h2>
              <p className="font-outfit text-base text-white/80 leading-relaxed">
                {content.missionVision.mission.text}
              </p>
            </div>
            <div>
              <h2 className="font-playfair text-[clamp(1.5rem,3vw,2rem)] font-light text-white mb-4">
                {content.missionVision.vision.heading}
              </h2>
              <p className="font-outfit text-base text-white/80 leading-relaxed">
                {content.missionVision.vision.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Team ── */}
      <div className="bg-white py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <div className="text-center mb-10">
            <p className="font-outfit text-neo-blue font-semibold text-sm uppercase tracking-widest mb-3">
              {content.team.sectionLabel}
            </p>
            <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-gray-900">
              {content.team.heading.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < content.team.heading.split("\n").length - 1 && <br className="hidden md:block" />}
                </span>
              ))}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Core Values ── */}
      <div className="bg-gray-900 py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <div className="text-center mb-10">
            <p className="font-outfit text-neo-blue font-semibold text-sm uppercase tracking-widest mb-3">
              {content.values.sectionLabel}
            </p>
            <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-white">
              {content.values.heading}
            </h2>
            {content.values.subtitle && (
              <p className="font-outfit text-base text-white/70 mt-3 max-w-2xl mx-auto">
                {content.values.subtitle}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {coreValues.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="bg-white py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <StatsGrid stats={stats} />
        </div>
      </div>

      {/* ── Why Choose Us ── */}
      <div className="bg-white py-10 pb-14 md:pb-20">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="font-outfit text-neo-blue font-semibold text-sm uppercase tracking-widest mb-3">
                {content.whyChooseUs.sectionLabel}
              </p>
              <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-gray-900 mb-4">
                {content.whyChooseUs.heading}
              </h2>
              <p className="font-outfit text-base text-gray-600 leading-relaxed mb-6">
                {content.whyChooseUs.description}
              </p>
              <div className="hidden lg:block">
                <img
                  src="/images/stock/law-firm-team.jpg"
                  alt="Law firm team"
                  className="w-full max-w-[400px] h-auto object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="space-y-5">
              {whyChooseUs.map((feature, index) => (
                <div key={index} className="border-b border-gray-100 pb-5 last:border-0">
                  <h3 className="font-outfit font-bold text-lg text-gray-900 mb-1.5">
                    {feature.number}. {feature.title}
                  </h3>
                  <p className="font-outfit text-sm text-gray-600 leading-relaxed">
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
