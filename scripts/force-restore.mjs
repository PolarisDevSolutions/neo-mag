import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function forceRestore() {
  const { data: page, error: fetchError } = await supabase
    .from('pages')
    .select('*')
    .eq('url_path', '/')
    .single();

  if (fetchError) {
    console.error('Error fetching homepage:', fetchError);
    return;
  }

  let content = [...page.content];
  
  // Remove any existing slider to be safe and re-insert at the right spot
  content = content.filter(b => b.type !== 'reviews-slider');
  
  // Insert after hero
  content.splice(1, 0, { 
    type: 'reviews-slider', 
    heading: 'Šta kažu naši pacijenti' 
  });
  
  const { error: updateError } = await supabase
    .from('pages')
    .update({ content })
    .eq('id', page.id);

  if (updateError) {
    console.error('Error updating homepage:', updateError);
  } else {
    console.log('Successfully FORCE restored reviews-slider to homepage content');
    console.log('New Content Length:', content.length);
  }
}

forceRestore();
