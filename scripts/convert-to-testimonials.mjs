import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function convertToTestimonials() {
  // 1. Fetch featured reviews
  const { data: reviews, error: reviewsError } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false });

  if (reviewsError) {
    console.error('Reviews Fetch Error:', reviewsError);
    return;
  }

  // 2. Map to testimonials format
  const testimonialItems = reviews.map(r => ({
    initials: r.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    rating: r.rating,
    text: r.text,
    author: `${r.name}${r.location ? ` (${r.location})` : ''}`
  }));

  // 3. Fetch homepage
  const { data: page, error: fetchError } = await supabase
    .from('pages')
    .select('*')
    .eq('url_path', '/')
    .single();

  if (fetchError) {
    console.error('Homepage Fetch Error:', fetchError);
    return;
  }

  // 4. Transform content: reviews-slider -> testimonials
  let content = [...page.content];
  content = content.map(b => {
    if (b.type === 'reviews-slider') {
      return {
        type: 'testimonials',
        heading: b.heading || 'Šta kažu naši pacijenti',
        variant: 'slider',
        testimonials: testimonialItems
      };
    }
    return b;
  });

  // 5. Update homepage
  const { error: updateError } = await supabase
    .from('pages')
    .update({ content })
    .eq('id', page.id);

  if (updateError) {
    console.error('Homepage Update Error:', updateError);
  } else {
    console.log('Successfully converted reviews-slider to editable testimonials block');
  }
}

convertToTestimonials();
