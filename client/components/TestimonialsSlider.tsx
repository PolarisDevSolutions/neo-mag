/**
 * TestimonialsSlider
 *
 * Renders a horizontally sliding carousel showing 3 testimonials per slide.
 * Receives items as props from the CMS block content.
 */
import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  initials: string;
  rating: number;
  text: string;
  author?: string;
}

interface Props {
  heading?: string;
  testimonials: Testimonial[];
}

const CARDS_PER_SLIDE = 3;
const SLIDE_INTERVAL = 6000;

export default function TestimonialsSlider({ heading, testimonials }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Group testimonials into slides of CARDS_PER_SLIDE
  const slides: Testimonial[][] = [];
  for (let i = 0; i < testimonials.length; i += CARDS_PER_SLIDE) {
    slides.push(testimonials.slice(i, i + CARDS_PER_SLIDE));
  }
  const totalSlides = slides.length;

  // ── Auto-advance ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (totalSlides <= 1 || paused) return;

    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % totalSlides);
    }, SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalSlides, paused]);

  const prev = () => setCurrent((c) => (c - 1 + totalSlides) % totalSlides);
  const next = () => setCurrent((c) => (c + 1) % totalSlides);

  if (testimonials.length === 0) return null;

  return (
    <section
      className="bg-neo-blue-light py-12 border-b border-blue-100"
      aria-label="Recenzije pacijenata"
    >
      <div className="max-w-[1200px] mx-auto w-[90%]">
        {heading && (
          <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900 mb-8 text-center">
            {heading}
          </h2>
        )}
        
        {/* Controls row */}
        {totalSlides > 1 && (
          <div className="flex justify-end mb-4 gap-2">
            <button
              onClick={prev}
              aria-label="Prethodni slajd"
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-neo-blue hover:text-neo-blue transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Sledeći slajd"
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-neo-blue hover:text-neo-blue transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Slider track */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, slideIdx) => (
              <div key={slideIdx} className="min-w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {slide.map((t, i) => (
                    <article
                      key={i}
                      className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-full bg-neo-blue text-white font-outfit font-bold flex items-center justify-center text-sm">
                          {t.initials}
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star 
                              key={j} 
                              className={`h-4 w-4 ${j < t.rating ? "fill-neo-blue text-neo-blue" : "fill-gray-200 text-gray-200"}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <div
                        className="font-outfit text-gray-700 italic text-sm mb-3 [&_p]:inline"
                        dangerouslySetInnerHTML={{ __html: `"${t.text}"` }}
                      />
                      {t.author && <p className="font-outfit text-gray-900 font-semibold text-sm">— {t.author}</p>}
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Slajdovi recenzija">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Slajd ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-neo-blue" : "w-2 bg-gray-300 hover:bg-neo-blue/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
