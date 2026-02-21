import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import type { AboutContent } from "@site/lib/cms/homePageTypes";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";

interface AboutSectionProps {
  content?: AboutContent;
}

const defaultContent: AboutContent = {
  sectionLabel: "– About Us",
  heading: "A Leading Lawyer for an Atlanta Law Firm",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
  phone: "404-555-5555",
  phoneLabel: "Call Us 24/7",
  contactLabel: "Contact Us",
  contactText: "For a Free Consultation",
  attorneyImage: "/images/team/attorney-1.png",
  attorneyImageAlt: "Attorney",
  features: [
    {
      number: "1",
      title: "Nationwide Representation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget augue tincidunt, rhoncus lacus a, congue diam.",
    },
    {
      number: "2",
      title: "Understanding Your Case",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget augue tincidunt, rhoncus lacus a, congue diam.",
    },
    {
      number: "3",
      title: "Seeking Compensation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget augue tincidunt, rhoncus lacus a, congue diam.",
    },
  ],
  stats: [
    { value: "1000+", label: "Trusted Clients Served" },
    { value: "$50 Million", label: "Recovered in Legal Dispute Settlements" },
    { value: "98%", label: "Client Satisfaction Rate" },
    { value: "150+", label: "Legal Professionals Available 24/7" },
  ],
};

export default function AboutSection({ content }: AboutSectionProps) {
  const data = content || defaultContent;
  const features = data.features || defaultContent.features;
  const stats = data.stats || defaultContent.stats;
  const { phoneLabel, phoneDisplay } = useGlobalPhone();

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-[1200px] mx-auto w-[90%]">

        {/* ── Three-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Left: Text + CTAs */}
          <div>
            <p className="font-outfit text-neo-blue font-semibold text-sm uppercase tracking-widest mb-3">
              {data.sectionLabel}
            </p>
            <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-gray-900 mb-4">
              {data.heading}
            </h2>
            <p className="font-outfit text-base text-gray-600 leading-relaxed mb-8">
              {data.description}
            </p>

            {/* Phone CTA */}
            <a
              href={`tel:${phoneDisplay.replace(/\D/g, "")}`}
              className="flex items-center gap-3 bg-neo-blue-light border border-neo-blue/20 px-5 py-4 rounded-lg hover:bg-neo-blue hover:text-white group transition-all duration-300 mb-4 max-w-xs"
            >
              <div className="bg-neo-blue group-hover:bg-white p-2.5 rounded-lg transition-colors duration-300 flex-shrink-0">
                <Phone className="w-5 h-5 text-white group-hover:text-neo-blue transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-outfit text-xs text-gray-500 group-hover:text-white/80 transition-colors">{phoneLabel}</p>
                <p className="font-outfit text-lg font-bold text-gray-900 group-hover:text-white transition-colors">{phoneDisplay}</p>
              </div>
            </a>

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-5 py-4 rounded-lg hover:border-neo-blue group transition-all duration-300 max-w-xs"
            >
              <div className="bg-gray-200 group-hover:bg-neo-blue p-2.5 rounded-lg transition-colors duration-300 flex-shrink-0">
                <Mail className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-outfit text-xs text-gray-500">{data.contactLabel}</p>
                <p className="font-outfit text-base font-semibold text-gray-800 group-hover:text-neo-blue transition-colors">{data.contactText}</p>
              </div>
            </Link>
          </div>

          {/* Middle: Attorney Image */}
          <div className="flex justify-center items-start">
            <img
              src={data.attorneyImage}
              alt={data.attorneyImageAlt}
              className="max-w-full w-auto h-auto object-contain rounded-lg"
              width={462}
              height={631}
              loading="lazy"
            />
          </div>

          {/* Right: Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="border-l-2 border-neo-blue pl-5">
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

        {/* ── Stats row ── */}
        {stats.length > 0 && (
          <div className="mt-14 pt-10 border-t border-gray-200 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="font-playfair text-[clamp(2rem,4vw,3rem)] font-bold text-neo-blue mb-1">
                  {stat.value}
                </p>
                <p className="font-outfit text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
