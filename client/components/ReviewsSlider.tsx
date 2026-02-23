/**
 * ReviewsSlider
 *
 * Fetches featured reviews from public.reviews (Supabase) and renders
 * a horizontally sliding carousel showing 3 reviews per slide.
 * All data comes from the database — no hardcoded content.
 */
import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  location: string | null;
}

const CARDS_PER_SLIDE = 3;
const SLIDE_INTERVAL = 6000;

export default function ReviewsSlider({ heading }: { heading?: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Fetch from DB ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

    fetch(
      `${SUPABASE_URL}/rest/v1/reviews?is_featured=eq.true&select=id,name,rating,text,location&order=created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    )
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Review[]) => setReviews(data))
      .catch(() => {/* silently degrade */});
  }, []);

  // Group reviews into slides of CARDS_PER_SLIDE
  const slides: Review[][] = [];
  for (let i = 0; i < reviews.length; i += CARDS_PER_SLIDE) {
    slides.push(reviews.slice(i, i + CARDS_PER_SLIDE));
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

  if (reviews.length === 0) return null;

  return (
    <section
      className="bg-neo-blue-light py-8 border-b border-blue-100"
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
              aria-label="Prethodna recenzija"
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-neo-blue hover:text-neo-blue transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Sledeća recenzija"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {slide.map((review) => (
                    <article
                      key={review.id}
                      className="bg-white rounded-xl border border-blue-100 p-5 shadow-sm"
                      itemScope
                      itemType="https://schema.org/Review"
                    >
                      {/* Stars */}
                      <div className="flex gap-1 mb-3" aria-label={`Ocena: ${review.rating} od 5`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-neo-blue text-neo-blue"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review text */}
                      <p
                        className="font-outfit text-gray-700 text-sm leading-relaxed mb-3 italic line-clamp-4"
                        itemProp="reviewBody"
                      >
                        "{review.text}"
                      </p>

                      {/* Author */}
                      <p className="font-outfit font-semibold text-gray-900 text-sm" itemProp="author">
                        — {review.name}
                        {review.location && (
                          <span className="font-normal text-gray-500 ml-1.5">· {review.location}</span>
                        )}
                      </p>
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
