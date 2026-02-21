import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { TestimonialsContent } from "@site/lib/cms/homePageTypes";

interface TestimonialsSectionProps {
  content?: TestimonialsContent;
}

const defaultContent: TestimonialsContent = {
  sectionLabel: "– Testimonials",
  heading: "Inspiring client success stories that drive change.",
  backgroundImage: "/images/backgrounds/testimonials-bg.jpg",
  items: [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
      author: "Sharon",
      ratingImage: "/images/logos/rating-stars.png",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
      author: "John D.",
      ratingImage: "/images/logos/rating-stars.png",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
      author: "Maria L.",
      ratingImage: "/images/logos/rating-stars.png",
    },
  ],
};

export default function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const data = content || defaultContent;
  const testimonials = data.items || defaultContent.items;

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-[1200px] mx-auto w-[90%]">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-outfit text-neo-blue font-semibold text-sm uppercase tracking-widest mb-3">
            {data.sectionLabel}
          </p>
          <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-gray-900">
            {data.heading}
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center">

          {/* Left: Image */}
          <div className="lg:w-[45%]">
            <img
              src={data.backgroundImage}
              alt="Testimonials"
              className="w-full h-auto object-cover rounded-xl"
              loading="lazy"
            />
          </div>

          {/* Right: Carousel */}
          <div className="lg:w-[55%] relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-1">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-neo-blue text-neo-blue" />
                        ))}
                      </div>
                      <p className="font-outfit text-gray-700 text-base leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </p>
                      <p className="font-outfit font-semibold text-gray-900">
                        — {testimonial.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:border-neo-blue hover:text-neo-blue transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeSlide ? "w-6 bg-neo-blue" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:border-neo-blue hover:text-neo-blue transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
