import { useState } from "react";
import { Input } from "@site/components/ui/input";
import { Textarea } from "@site/components/ui/textarea";
import { Button } from "@site/components/ui/button";
import { Phone, MapPin } from "lucide-react";
import type { ContactContent } from "@site/lib/cms/homePageTypes";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";

interface ContactUsSectionProps {
  content?: ContactContent;
}

const defaultContent: ContactContent = {
  sectionLabel: "– Kontakt",
  heading: "Zakažite Vaš pregled danas.",
  description:
    "Naš stručni tim je spreman da Vam pruži najbolju dijagnostičku uslugu.",
  phone: "+381 18 123 456",
  phoneLabel: "Pozovite nas",
  address: "Bulevar Nemanjića 14a, Niš, Srbija",
  formHeading: "Kontaktirajte nas za više informacija",
};

export default function ContactUsSection({ content }: ContactUsSectionProps) {
  const data = content || defaultContent;
  const { phoneDisplay, phoneLabel } = useGlobalPhone();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const myForm = e.target as HTMLFormElement;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert(error));
  }

  return (
    <section className="bg-gray-50 border-t border-gray-200 py-14 md:py-20">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* ── Left: Info ── */}
          <div className="lg:w-[45%]">
            <p className="font-outfit text-neo-blue font-semibold text-sm uppercase tracking-widest mb-3">
              {data.sectionLabel}
            </p>
            <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-gray-900 mb-4">
              {data.heading}
            </h2>
            <p className="font-outfit text-base text-gray-600 leading-relaxed mb-8">
              {data.description}
            </p>

            {/* Phone */}
            <a
              href={`tel:${phoneDisplay.replace(/\D/g, "")}`}
              className="flex items-center gap-3 mb-4 group"
            >
              <div className="bg-neo-blue-light group-hover:bg-neo-blue p-3 rounded-lg transition-colors duration-300">
                <Phone className="w-5 h-5 text-neo-blue group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-outfit text-xs text-gray-500">{phoneLabel}</p>
                <p className="font-outfit font-bold text-gray-900 text-lg group-hover:text-neo-blue transition-colors">{phoneDisplay}</p>
              </div>
            </a>

            {/* Address */}
            {data.address && (
              <div className="flex items-start gap-3">
                <div className="bg-neo-blue-light p-3 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5 text-neo-blue" strokeWidth={1.5} />
                </div>
                <p className="font-outfit text-gray-600 text-sm leading-relaxed pt-1">{data.address}</p>
              </div>
            )}
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:w-[55%]">
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
              <h3 className="font-outfit font-bold text-lg text-gray-900 mb-6">{data.formHeading}</h3>

              {submitted ? (
                <div className="bg-neo-blue-light border border-neo-blue/30 rounded-xl p-8 text-center">
                  <p className="font-outfit text-neo-blue font-bold text-xl mb-2">Hvala Vam!</p>
                  <p className="font-outfit text-gray-700 text-sm">Javićemo Vam se u najkraćem roku.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  name="contact-us-section"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                >
                  <input type="hidden" name="form-name" value="contact-us-section" />
                  <p className="hidden">
                    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="firstName"
                        type="text"
                        placeholder="Ime *"
                        required
                        className="bg-gray-50 border-gray-200 text-gray-900 h-11 text-sm placeholder:text-gray-400 focus-visible:ring-neo-blue focus-visible:border-neo-blue rounded-lg"
                      />
                    </div>
                    <div>
                      <Input
                        name="lastName"
                        type="text"
                        placeholder="Prezime *"
                        required
                        className="bg-gray-50 border-gray-200 text-gray-900 h-11 text-sm placeholder:text-gray-400 focus-visible:ring-neo-blue focus-visible:border-neo-blue rounded-lg"
                      />
                    </div>
                  </div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email adresa *"
                    required
                    className="bg-gray-50 border-gray-200 text-gray-900 h-11 text-sm placeholder:text-gray-400 focus-visible:ring-neo-blue focus-visible:border-neo-blue rounded-lg"
                  />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Broj telefona"
                    className="bg-gray-50 border-gray-200 text-gray-900 h-11 text-sm placeholder:text-gray-400 focus-visible:ring-neo-blue focus-visible:border-neo-blue rounded-lg"
                  />
                  <Textarea
                    name="message"
                    placeholder="Poruka *"
                    required
                    className="bg-gray-50 border-gray-200 text-gray-900 min-h-[120px] text-sm placeholder:text-gray-400 resize-none focus-visible:ring-neo-blue focus-visible:border-neo-blue rounded-lg"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-neo-blue hover:bg-neo-blue-dark text-white font-outfit font-semibold h-11 text-sm transition-colors duration-300 rounded-lg"
                  >
                    Pošalji zahtev
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
