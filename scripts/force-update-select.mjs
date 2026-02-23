import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function forceUpdate() {
  const pageId = 'e3a7c8b7-6e9c-4f27-a4da-cd37937f03f6';
  
  // 1. Fetch
  const { data: page } = await supabase
    .from('pages')
    .select('content')
    .eq('id', pageId)
    .single();

  // 2. Add testimonials if missing
  let content = [...page.content];
  if (!content.some(b => b.type === 'testimonials')) {
    content.splice(1, 0, { 
      type: 'testimonials', 
      heading: 'Šta kažu naši pacijenti',
      variant: 'slider',
      testimonials: [
        { initials: 'MJ', rating: 5, text: 'Odlična usluga...', author: 'Marija J.' }
      ]
    });
  }

  // 3. Update AND Select back
  const { data, error } = await supabase
    .from('pages')
    .update({ content })
    .eq('id', pageId)
    .select();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Update result data:', JSON.stringify(data?.[0]?.content?.map(b => b.type), null, 2));
  }
}

forceUpdate();
