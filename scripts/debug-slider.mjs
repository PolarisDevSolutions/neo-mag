import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function debug() {
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('content')
    .eq('url_path', '/')
    .single();

  if (pageError) {
    console.error('Page Error:', pageError);
  } else {
    console.log('Homepage Content:', JSON.stringify(page.content, null, 2));
  }

  const { data: reviews, error: reviewsError } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_featured', true);

  if (reviewsError) {
    console.error('Reviews Error:', reviewsError);
  } else {
    console.log('Featured Reviews Count:', reviews?.length || 0);
    console.log('Featured Reviews:', JSON.stringify(reviews, null, 2));
  }
}

debug();
