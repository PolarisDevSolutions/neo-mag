import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqContent } from "@site/lib/cms/homePageTypes";

interface FaqSectionProps {
  content?: FaqContent;
}

const defaultContent: FaqContent = {
  heading: "Frequently Asked Questions",
  description: "Aenean porta erat id urna porttitor scelerisque. Aliquam vitae auctor nunc.",
  videoThumbnail: "/images/backgrounds/faq-bg.jpg",
  videoUrl: "https://www.youtube.com/embed/FkQuawiGWUw?autoplay=1&feature=oembed",
  items: [
    {
      question: "This is an example FAQ",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
    {
      question: "This is an example FAQ",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
    {
      question: "This is an example FAQ",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
    {
      question: "This is an example FAQ",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
  ],
};

export default function FaqSection({ content }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const data = content || defaultContent;
  const faqs = data.items || defaultContent.items;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-white py-14 md:py-20">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto w-[90%] text-center mb-12">
        <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-gray-900 mb-3">
          {data.heading}
        </h2>
        {data.description && (
          <p className="font-outfit text-base text-gray-600">{data.description}</p>
        )}
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto w-[90%] flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-12">

        {/* Left: Image */}
        <div className="lg:w-[45%]">
          <img
            src={data.videoThumbnail}
            alt="Frequently Asked Questions"
            className="w-full h-auto object-cover rounded-xl"
            loading="lazy"
          />
        </div>

        {/* Right: Accordion */}
        <div className="lg:w-[55%] space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                openIndex === index
                  ? "border-neo-blue bg-neo-blue-light"
                  : "border-gray-200 bg-white hover:border-neo-blue/40"
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full font-outfit font-semibold text-base px-5 py-4 text-left flex items-center justify-between cursor-pointer transition-colors ${
                  openIndex === index ? "text-neo-blue" : "text-gray-800"
                }`}
              >
                <span className="pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180 text-neo-blue" : "text-gray-400"
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="font-outfit text-sm text-gray-700 leading-relaxed px-5 pb-5">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
