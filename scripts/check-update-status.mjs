import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkUpdate() {
  const pageId = 'e3a7c8b7-6e9c-4f27-a4da-cd37937f03f6';
  
  const { data: page } = await supabase
    .from('pages')
    .select('content')
    .eq('id', pageId)
    .single();

  const content = [...page.content];
  if (!content.some(b => b.type === 'testimonials')) {
    content.splice(1, 0, { type: 'testimonials', heading: 'Test', testimonials: [] });
  }

  const { error, status, statusText } = await supabase
    .from('pages')
    .update({ content })
    .eq('id', pageId);

  console.log('Update result:', { error, status, statusText });
}

checkUpdate();
