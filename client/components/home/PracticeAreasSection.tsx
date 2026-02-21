import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PracticeAreasSection() {
  return (
    <div className="bg-neo-blue py-10">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-white font-light">
            Practice Areas
          </h2>
          <Link
            to="/practice-areas"
            className="inline-flex items-center gap-2 bg-white text-neo-blue font-outfit font-semibold px-6 py-3 rounded-lg hover:bg-neo-blue-light transition-colors duration-300 text-sm whitespace-nowrap"
          >
            Discover All Practice Areas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
