import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function addTestimonialsBlock() {
  const { data: reviews, error: reviewsError } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false });

  const testimonialItems = reviews.map(r => ({
    initials: r.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    rating: r.rating,
    text: r.text,
    author: `${r.name}${r.location ? ` (${r.location})` : ''}`
  }));

  const { data: page, error: fetchError } = await supabase
    .from('pages')
    .select('*')
    .eq('url_path', '/')
    .single();

  let content = [...page.content];
  // Ensure no duplicate sliders/testimonials
  content = content.filter(b => b.type !== 'reviews-slider' && b.type !== 'testimonials');
  
  // Insert after hero (index 0)
  content.splice(1, 0, {
    type: 'testimonials',
    heading: 'Šta kažu naši pacijenti',
    variant: 'slider',
    testimonials: testimonialItems
  });

  const { error: updateError } = await supabase
    .from('pages')
    .update({ content })
    .eq('id', page.id);

  if (updateError) {
    console.error('Update Error:', updateError);
  } else {
    console.log('Successfully added testimonials block to homepage DB content');
    console.log('New Block List:', content.map(b => b.type));
  }
}

addTestimonialsBlock();
