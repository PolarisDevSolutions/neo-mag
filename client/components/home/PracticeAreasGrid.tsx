import { Link } from "react-router-dom";
import type { PracticeAreaItem } from "@site/lib/cms/homePageTypes";

interface PracticeAreasGridProps {
  areas?: PracticeAreaItem[];
}

const defaultAreas: PracticeAreaItem[] = [
  {
    title: "Practice Area",
    image: "/images/practice-areas/personal-injury.jpg",
    link: "/practice-areas",
  },
  {
    title: "Practice Area",
    image: "/images/practice-areas/medical-malpractice.jpg",
    link: "/practice-areas",
  },
  {
    title: "Practice Area",
    image: "/images/practice-areas/workers-compensation.jpg",
    link: "/practice-areas",
  },
  {
    title: "Practice Area",
    image: "/images/practice-areas/wrongful-death.jpg",
    link: "/practice-areas",
  },
];

export default function PracticeAreasGrid({ areas }: PracticeAreasGridProps) {
  const practiceAreas = areas || defaultAreas;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {practiceAreas.map((area, index) => (
          <Link
            key={index}
            to={area.link}
            className="relative min-h-[350px] lg:min-h-[450px] overflow-hidden group"
            style={{
              backgroundImage: `url(${area.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/65 group-hover:to-neo-blue/80 transition-all duration-500" />

            {/* Content */}
            <div className="relative h-full flex items-end p-5">
              <h3 className="font-outfit text-[clamp(1.4rem,2.5vw,1.8rem)] leading-tight text-white font-semibold transition-transform duration-300 group-hover:-translate-y-1">
                {area.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
