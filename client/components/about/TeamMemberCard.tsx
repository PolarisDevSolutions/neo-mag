interface TeamMemberCardProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties?: string[];
}

export default function TeamMemberCard({
  name,
  title,
  bio,
  image,
  specialties,
}: TeamMemberCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden group transition-all duration-300 hover:border-neo-blue hover:shadow-md">
      {/* Image Section */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neo-blue/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-5 md:p-6">
        <h3 className="font-outfit font-bold text-xl text-gray-900 mb-1">{name}</h3>
        <p className="font-outfit text-sm text-neo-blue font-semibold mb-3">{title}</p>
        <p className="font-outfit text-sm text-gray-600 leading-relaxed">{bio}</p>

        {specialties && specialties.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-neo-blue-light border border-neo-blue/20 text-neo-blue text-xs font-outfit rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
