import type { ProcessContent } from "@site/lib/cms/homePageTypes";

interface ProcessSectionProps {
  content?: ProcessContent;
}

const defaultContent: ProcessContent = {
  sectionLabel: "– Process",
  headingLine1: "Get Started Easily.",
  headingLine2: "Take a Look at The Steps",
  steps: [
    {
      number: "01",
      title: "Step 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
    {
      number: "02",
      title: "Step 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
    {
      number: "03",
      title: "Step 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
  ],
};

export default function ProcessSection({ content }: ProcessSectionProps) {
  const data = content || defaultContent;
  const steps = data.steps || defaultContent.steps;

  return (
    <section className="bg-gray-900 py-14 md:py-20">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto w-[90%] text-center mb-12">
        <p className="font-outfit text-neo-blue font-semibold text-sm uppercase tracking-widest mb-3">
          {data.sectionLabel}
        </p>
        <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-white">
          {data.headingLine1}
        </h2>
        <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-white">
          {data.headingLine2}
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="max-w-[1200px] mx-auto w-[90%] grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-neo-blue transition-colors duration-300">
            <p className="font-outfit text-neo-blue font-bold text-lg mb-4">{step.number}</p>
            <h3 className="font-outfit font-bold text-xl text-white mb-3">{step.title}</h3>
            <p className="font-outfit text-gray-400 text-sm leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
