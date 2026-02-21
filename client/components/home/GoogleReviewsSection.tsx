import { Star } from "lucide-react";
import type { GoogleReviewsContent } from "@site/lib/cms/homePageTypes";

interface GoogleReviewsSectionProps {
  content?: GoogleReviewsContent;
}

const defaultContent: GoogleReviewsContent = {
  sectionLabel: "– Google Reviews",
  heading: "Real Voices, Real Trust: Our Google Reviews",
  description:
    "Our clients share their stories and insights about working with us. Dive into their experiences to understand how we prioritize your legal success.",
  reviews: [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Lorem Ipsum",
      ratingImage: "https://design.constellationdev.com/wp-content/uploads/2025/06/Group-2-min.png",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Lorem Ipsum",
      ratingImage: "https://design.constellationdev.com/wp-content/uploads/2025/06/Group-2-min.png",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Lorem Ipsum",
      ratingImage: "https://design.constellationdev.com/wp-content/uploads/2025/06/Group-2-min.png",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Lorem Ipsum",
      ratingImage: "https://design.constellationdev.com/wp-content/uploads/2025/06/Group-2-min.png",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Lorem Ipsum",
      ratingImage: "https://design.constellationdev.com/wp-content/uploads/2025/06/Group-2-min.png",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Lorem Ipsum",
      ratingImage: "https://design.constellationdev.com/wp-content/uploads/2025/06/Group-2-min.png",
    },
  ],
};

export default function GoogleReviewsSection({ content }: GoogleReviewsSectionProps) {
  const data = content || defaultContent;
  const reviews = data.reviews || defaultContent.reviews;

  return (
    <section className="bg-gray-50 border-y border-gray-200 py-14 md:py-20">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto w-[90%] text-center mb-12">
        <p className="font-outfit text-neo-blue font-semibold text-sm uppercase tracking-widest mb-3">
          {data.sectionLabel}
        </p>
        <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-gray-900 mb-4">
          {data.heading}
        </h2>
        {data.description && (
          <p className="font-outfit text-base text-gray-600 max-w-2xl mx-auto">{data.description}</p>
        )}
      </div>

      {/* Reviews Grid */}
      <div className="max-w-[1200px] mx-auto w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.slice(0, 6).map((review, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-neo-blue text-neo-blue" />
              ))}
            </div>
            <p className="font-outfit text-gray-700 text-sm leading-relaxed mb-4 italic">
              "{review.text}"
            </p>
            <div className="flex items-center justify-between">
              <strong className="font-outfit text-gray-900 text-sm font-semibold">{review.author}</strong>
              <img
                src="/images/logos/google-icon.png"
                alt="Google"
                className="h-5 w-auto"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
