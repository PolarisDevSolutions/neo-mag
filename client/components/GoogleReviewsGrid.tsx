import { Star } from "lucide-react";

interface Testimonial {
  initials: string;
  rating: number;
  text: string;
  author?: string;
}

interface Props {
  testimonials: Testimonial[];
}

export default function GoogleReviewsGrid({ testimonials }: Props) {
  // Ensure testimonials is an array
  const items = Array.isArray(testimonials) ? testimonials : [];

  // Use first 9 testimonials or pad with defaults if less than 9
  const gridTestimonials = items.slice(0, 9);

  // If we have fewer than 1, just return null
  if (gridTestimonials.length === 0) return null;

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto w-[90%]">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div>
              <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900 leading-tight">
                Google Recenzije
              </h2>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-[#f4b400] text-[#f4b400]" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
            <span className="text-gray-500 text-sm font-medium mr-3">Proveren profil</span>
            <div className="flex items-center gap-1 text-neo-blue font-bold">
              <span className="text-xs uppercase tracking-wider">Google Business</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridTestimonials.map((t, i) => (
            <article key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              {/* Google color bar at the top */}
              <div className="absolute top-0 left-0 w-full h-1 flex">
                <div className="flex-1 bg-[#4285F4]" />
                <div className="flex-1 bg-[#EA4335]" />
                <div className="flex-1 bg-[#FBBC05]" />
                <div className="flex-1 bg-[#34A853]" />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700">
                    {t.initials}
                  </div>
                  <div>
                    <h3 className="font-outfit font-bold text-gray-900 text-sm">{t.author || 'Anonimni pacijent'}</h3>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`h-3 w-3 ${j < t.rating ? 'fill-[#f4b400] text-[#f4b400]' : 'fill-gray-200 text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-1.5 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>
              
              <div 
                className="font-outfit text-gray-700 text-sm leading-relaxed mb-3 [&_p]:inline italic"
                dangerouslySetInnerHTML={{ __html: `"${t.text}"` }}
              />
              
              <div className="text-gray-400 text-xs mt-auto flex items-center gap-1.5">
                <span className="text-neo-blue/70">Google Review</span>
              </div>
            </article>
          ))}
        </div>
        
      </div>
    </section>
  );
}
