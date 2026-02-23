import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function check() {
  const { data: page, error } = await supabase
    .from('pages')
    .select('content')
    .eq('url_path', '/')
    .single();

  if (error) {
    console.error(error);
  } else {
    console.log('Homepage blocks:', JSON.stringify(page.content.map(b => ({ type: b.type, variant: b.variant, items: b.testimonials?.length || b.items?.length || b.services?.length })), null, 2));
  }
}

check();
