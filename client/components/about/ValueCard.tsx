import { LucideIcon } from "lucide-react";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <div className="group text-center">
      <div className="mb-5">
        <div className="bg-neo-blue/20 group-hover:bg-neo-blue p-5 inline-flex rounded-xl transition-all duration-300">
          <Icon
            className="w-10 h-10 text-white transition-colors duration-300"
            strokeWidth={1.5}
          />
        </div>
      </div>
      <h3 className="font-outfit font-bold text-lg text-white mb-2">{title}</h3>
      <p className="font-outfit text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
