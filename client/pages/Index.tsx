import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import ContactForm from "@site/components/home/ContactForm";
import AboutSection from "@site/components/home/AboutSection";
import PracticeAreasSection from "@site/components/home/PracticeAreasSection";
import PracticeAreasGrid from "@site/components/home/PracticeAreasGrid";
import AwardsSection from "@site/components/home/AwardsSection";
import TestimonialsSection from "@site/components/home/TestimonialsSection";
import ProcessSection from "@site/components/home/ProcessSection";
import GoogleReviewsSection from "@site/components/home/GoogleReviewsSection";
import FaqSection from "@site/components/home/FaqSection";
import ContactUsSection from "@site/components/home/ContactUsSection";
import { useHomeContent } from "@site/hooks/useHomeContent";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import { Phone } from "lucide-react";

export default function Index() {
  const { content, isLoading } = useHomeContent();
  const { phoneDisplay, phoneLabel } = useGlobalPhone();

  const heroContent = content.hero;
  const partnerLogos = content.partnerLogos;

  return (
    <Layout>
      <Seo
        title="Home"
        description="Protecting your rights with integrity, experience, and relentless advocacy."
      />

      {/* ── Hero Section ── */}
      <section className="bg-neo-blue relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto w-[90%] py-12 md:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-[5%]">

            {/* Left: Headline + Phone */}
            <div className="lg:w-[55%]">
              <p className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.2] text-white mb-4">
                <span className="font-semibold">
                  {heroContent.highlightedText || "Protecting your rights"}
                </span>
                <br />
                {heroContent.headline || "with integrity, experience, and relentless advocacy."}
              </p>

              {heroContent.h1Title && (
                <h1 className="font-outfit text-base md:text-lg font-medium tracking-wider uppercase text-white/80 mb-8">
                  {heroContent.h1Title}
                </h1>
              )}

              {/* Phone CTA */}
              <a
                href={`tel:${phoneDisplay.replace(/\D/g, "")}`}
                className="inline-flex items-start gap-4 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors duration-300 p-4 group max-w-sm"
              >
                <div className="bg-white p-3 flex-shrink-0 group-hover:bg-neo-blue-light transition-colors duration-300">
                  <Phone className="w-6 h-6 text-neo-blue" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-outfit text-sm text-white/80 mb-1">{phoneLabel}</p>
                  <p className="font-outfit text-[clamp(1.4rem,3.5vw,2rem)] text-white leading-tight font-semibold">
                    {phoneDisplay}
                  </p>
                </div>
              </a>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:w-[40%]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Partner Logos Section ── */}
      {partnerLogos && partnerLogos.length > 0 && (
        <div className="bg-gray-50 border-b border-gray-200 py-6">
          <div className="max-w-[1200px] mx-auto w-[90%]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-8 items-center justify-items-center">
              {partnerLogos.map((logo, index) => (
                <div key={index} className="flex items-center justify-center px-2">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-[120px] md:w-[160px] max-w-full"
                    width={160}
                    height={104}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About Us Section */}
      <AboutSection content={content.about} />

      {/* Practice Areas Section */}
      <PracticeAreasSection />

      {/* Practice Areas Grid */}
      <PracticeAreasGrid areas={content.practiceAreas} />

      {/* Awards & Membership Section */}
      <AwardsSection content={content.awards} />

      {/* Testimonials Section */}
      <TestimonialsSection content={content.testimonials} />

      {/* Process Section */}
      <ProcessSection content={content.process} />

      {/* Google Reviews Section */}
      <GoogleReviewsSection content={content.googleReviews} />

      {/* FAQ Section */}
      <FaqSection content={content.faq} />

      {/* Contact Us Section */}
      <ContactUsSection content={content.contact} />
    </Layout>
  );
}
