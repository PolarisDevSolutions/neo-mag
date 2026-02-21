import { Phone } from "lucide-react";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";

export default function Hero() {
  const { phoneDisplay, phoneLabel } = useGlobalPhone();

  return (
    <div className="max-w-[1200px] mx-auto w-[90%] py-10 my-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-[3%]">
        {/* Headline Section */}
        <div className="lg:w-[65.667%]">
          <div className="mb-8">
            <p className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-white">
              <span className="font-semibold">Protecting your rights</span>
              <br />
              with integrity, experience, and relentless advocacy.
            </p>
          </div>

          {/* Phone CTA */}
          <a
            href={`tel:${phoneDisplay.replace(/\D/g, "")}`}
            className="inline-flex items-start gap-4 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors duration-300 p-4 group max-w-sm"
          >
            <div className="bg-white p-3 flex-shrink-0">
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

        {/* Spacer */}
        <div className="lg:w-[31.3333%]" />
      </div>
    </div>
  );
}
