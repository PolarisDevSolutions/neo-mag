import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import ContactForm from "@site/components/home/ContactForm";
import CallBox from "@site/components/shared/CallBox";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import { useContactContent } from "@site/hooks/useContactContent";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";

const iconMap: Record<string, LucideIcon> = {
  Phone,
  Mail,
  MapPin,
  Clock,
};

export default function ContactPage() {
  const { content } = useContactContent();
  const { phoneDisplay, phoneLabel } = useGlobalPhone();

  const contactMethods = content.contactMethods.methods.map((method) => ({
    icon: iconMap[method.icon] || Phone,
    title: method.title,
    detail: method.detail,
    subdDetail: method.subDetail,
  }));

  const officeHours = content.officeHours.items;
  const whatToExpect = content.process.steps;

  return (
    <Layout>
      <Seo
        title="Contact Us"
        description="Get in touch with our experienced legal team. Free consultation available 24/7. We're here to help with your legal needs."
      />

      {/* Hero Section */}
      <div className="bg-neo-blue py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto w-[90%] text-center max-w-[900px]">
          <h1 className="font-outfit text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
            {content.hero.sectionLabel}
          </h1>
          <p className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-white mb-4">
            <span
              dangerouslySetInnerHTML={{
                __html: content.hero.tagline.replace(
                  /(Talk)/g,
                  '<span class="font-semibold">$1</span>',
                ),
              }}
            />
          </p>
          <p className="font-outfit text-base text-white/80 max-w-2xl mx-auto">
            {content.hero.description}
          </p>
        </div>
      </div>

      {/* Contact Methods Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 text-center group hover:border-neo-blue hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-center mb-5">
                    <div className="bg-neo-blue-light group-hover:bg-neo-blue p-5 rounded-xl inline-block transition-all duration-300">
                      <Icon
                        className="w-8 h-8 text-neo-blue group-hover:text-white transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                  <h3 className="font-outfit font-bold text-lg text-gray-900 mb-3">
                    {method.title}
                  </h3>
                  <p className="font-outfit text-gray-700 mb-1">{method.detail}</p>
                  <p className="font-outfit text-sm text-gray-500">{method.subdDetail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Form & Office Hours Section */}
      <div className="bg-gray-50 border-y border-gray-200 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Left: Form */}
            <div>
              <h2 className="font-playfair text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-gray-900 mb-3">
                {content.form.heading}
              </h2>
              {content.form.subtext && (
                <p className="font-outfit text-base text-gray-600 mb-6">
                  {content.form.subtext}
                </p>
              )}
              <ContactForm />
            </div>

            {/* Right: Office Hours + CTA */}
            <div className="space-y-6">
              {/* Office Hours */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-neo-blue-light p-3 rounded-lg">
                    <Clock className="w-5 h-5 text-neo-blue" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-outfit font-bold text-lg text-gray-900">
                    {content.officeHours.heading}
                  </h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <span className="font-outfit text-sm text-gray-600">{item.day}</span>
                      <span className="font-outfit text-sm font-semibold text-neo-blue">{item.hours}</span>
                    </div>
                  ))}
                </div>
                {content.officeHours.note && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="font-outfit text-xs text-gray-500 leading-relaxed">
                      {content.officeHours.note}
                    </p>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <CallBox
                  icon={Phone}
                  title={phoneLabel}
                  subtitle={phoneDisplay}
                  className="w-full max-w-none"
                />
                <CallBox
                  icon={Calendar}
                  title={content.cta.secondaryButton.label}
                  subtitle={content.cta.secondaryButton.sublabel}
                  className="w-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto w-[90%]">
          <div className="text-center mb-10">
            <p className="font-outfit text-neo-blue font-semibold text-sm uppercase tracking-widest mb-3">
              {content.process.sectionLabel}
            </p>
            <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-gray-900">
              {content.process.heading}
            </h2>
            {content.process.subtitle && (
              <p className="font-outfit text-base text-gray-600 mt-3 max-w-2xl mx-auto">
                {content.process.subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatToExpect.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-5 flex justify-center">
                  <div className="w-14 h-14 bg-neo-blue rounded-full flex items-center justify-center">
                    <span className="font-outfit font-bold text-xl text-white">{item.number}</span>
                  </div>
                </div>
                <h3 className="font-outfit font-bold text-base text-gray-900 mb-2">{item.title}</h3>
                <p className="font-outfit text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      {content.visitOffice.mapEmbedUrl && (
        <div className="bg-gray-50 border-t border-gray-200 py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto w-[90%]">
            <div className="text-center mb-8">
              <h2 className="font-playfair text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-gray-900">
                {content.visitOffice.heading}
              </h2>
              {content.visitOffice.subtext && (
                <p className="font-outfit text-base text-gray-600 mt-3">
                  {content.visitOffice.subtext}
                </p>
              )}
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <iframe
                src={content.visitOffice.mapEmbedUrl}
                width="100%"
                height="400"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[350px] md:h-[400px]"
                title="Office Location"
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
