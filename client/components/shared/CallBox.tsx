import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CallBoxProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  link?: string;
  className?: string;
  variant?: "light" | "dark";
}

export default function CallBox({
  icon: Icon,
  title,
  subtitle,
  link,
  className = "",
  variant = "light",
}: CallBoxProps) {
  const bg = variant === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-neo-blue hover:bg-neo-blue-dark";
  const textColor = "text-white";

  const content = (
    <div
      className={`${bg} p-4 w-full md:w-[340px] cursor-pointer transition-all duration-300 group rounded-lg ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="bg-white/20 group-hover:bg-white/30 p-3 flex items-center justify-center rounded-lg transition-colors duration-300 flex-shrink-0">
          <Icon
            className="w-6 h-6 text-white"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-1">
          <h4 className={`font-outfit text-sm leading-tight ${textColor} opacity-80 pb-1`}>
            {title}
          </h4>
          <p className={`font-outfit text-lg font-semibold ${textColor} leading-tight`}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }

  return content;
}
