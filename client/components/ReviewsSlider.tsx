/**
 * ReviewsSlider
 *
 * Fetches featured reviews from public.reviews (Supabase) and renders
 * a horizontally auto-sliding carousel. No reviews are hardcoded here —
 * all data comes from the database.
 *
 * Prepared for Schema.org Review / AggregateRating markup extension.
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

const SLIDE_INTERVAL = 5000;

export default function ReviewsSlider() {
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

  // ── Auto-advance ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (reviews.length <= 1 || paused) return;

    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reviews.length, paused]);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  // Don't render anything until reviews are loaded — avoids layout shift
  if (reviews.length === 0) return null;

  const avgRating = Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length);

  return (
    <section
      className="bg-neo-blue-light py-8 border-b border-blue-100"
      aria-label="Recenzije pacijenata"
      // Schema.org AggregateRating data attributes for future structured-data injection
      data-aggregate-rating={avgRating}
      data-review-count={reviews.length}
    >
      <div className="max-w-[1200px] mx-auto w-[90%]">
        {/* Heading row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5" aria-label={`Prosečna ocena ${avgRating} od 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < avgRating ? "fill-neo-blue text-neo-blue" : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-outfit text-sm font-semibold text-gray-700">
              {avgRating}.0 · {reviews.length} recenzija
            </span>
          </div>

          {/* Prev / Next controls */}
          {reviews.length > 1 && (
            <div className="flex items-center gap-2">
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
        </div>

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
            {reviews.map((review) => (
              <article
                key={review.id}
                className="min-w-full"
                itemScope
                itemType="https://schema.org/Review"
              >
                <div className="bg-white rounded-xl border border-blue-100 p-6 max-w-2xl mx-auto shadow-sm">
                  {/* Stars */}
                  <div
                    className="flex gap-1 mb-3"
                    aria-label={`Ocena: ${review.rating} od 5`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? "fill-neo-blue text-neo-blue"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <p
                    className="font-outfit text-gray-700 text-base leading-relaxed mb-4 italic"
                    itemProp="reviewBody"
                  >
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <p className="font-outfit font-semibold text-gray-900 text-sm" itemProp="author">
                    — {review.name}
                    {review.location && (
                      <span className="font-normal text-gray-500 ml-1.5">
                        · {review.location}
                      </span>
                    )}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Recenzije">
            {reviews.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Recenzija ${i + 1}`}
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
