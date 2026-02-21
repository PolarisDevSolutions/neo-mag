import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface PracticeAreaCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export default function PracticeAreaCard({
  icon: Icon,
  title,
  description,
  image,
  link = "/contact",
}: PracticeAreaCardProps) {
  return (
    <Link
      to={link}
      className="relative min-h-[400px] overflow-hidden group rounded-xl"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/85 group-hover:to-neo-blue/90 transition-all duration-500" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 md:p-7">
        {/* Icon */}
        <div>
          <div className="bg-white/20 group-hover:bg-white p-3 inline-flex rounded-lg transition-all duration-300">
            <Icon
              className="w-7 h-7 text-white group-hover:text-neo-blue transition-colors duration-300"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Title + Description + Link */}
        <div>
          <h3 className="font-outfit font-bold text-xl text-white mb-2 leading-tight">
            {title}
          </h3>
          <p className="font-outfit text-sm text-white/80 leading-relaxed mb-4">
            {description}
          </p>
          <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors duration-300">
            <span className="font-outfit text-sm font-medium">Learn More</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
