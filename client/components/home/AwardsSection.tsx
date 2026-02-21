import type { AwardsContent } from "@site/lib/cms/homePageTypes";

interface AwardsSectionProps {
  content?: AwardsContent;
}

const defaultContent: AwardsContent = {
  sectionLabel: "– Achievements",
  heading: "Awards & Membership",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
  logos: [
    { src: "/images/awards/award-1.png", alt: "Award Logo" },
    { src: "/images/awards/award-2.png", alt: "Award Logo" },
    { src: "/images/awards/award-3.png", alt: "Award Logo" },
    { src: "/images/awards/award-4.png", alt: "Award Logo" },
    { src: "/images/awards/award-5.png", alt: "Award Logo" },
    { src: "/images/awards/award-6.png", alt: "Award Logo" },
    { src: "/images/awards/forbes.png", alt: "Forbes" },
    { src: "/images/awards/lc-logo.png", alt: "LC Logo" },
  ],
};

export default function AwardsSection({ content }: AwardsSectionProps) {
  const data = content || defaultContent;
  const logos = data.logos || defaultContent.logos;

  return (
    <section className="bg-gray-50 py-14 md:py-20 border-y border-gray-200">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">

          {/* Left: Text */}
          <div className="lg:w-1/3">
            <p className="font-outfit text-neo-blue font-semibold text-sm uppercase tracking-widest mb-3">
              {data.sectionLabel}
            </p>
            <h2 className="font-playfair text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-gray-900 mb-4">
              {data.heading}
            </h2>
            <p className="font-outfit text-base text-gray-600 leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Right: Logo Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center hover:border-neo-blue transition-colors duration-300"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={100}
                    loading="lazy"
                    className="max-w-full h-auto object-contain max-h-[80px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
