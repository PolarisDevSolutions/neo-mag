import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function forceRestore() {
  const pageId = 'e3a7c8b7-6e9c-4f27-a4da-cd37937f03f6';
  
  const { data: page, error: fetchError } = await supabase
    .from('pages')
    .select('*')
    .eq('id', pageId)
    .single();

  if (fetchError) {
    console.error('Fetch Error:', fetchError);
    return;
  }

  let content = [...page.content];
  content = content.filter(b => b.type !== 'reviews-slider');
  content.splice(1, 0, { 
    type: 'reviews-slider', 
    heading: 'Šta kažu naši pacijenti' 
  });
  
  console.log('Attempting to update page', pageId, 'with', content.length, 'blocks');

  const { data, error, status } = await supabase
    .from('pages')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', pageId)
    .select();

  if (error) {
    console.error('Update Error:', error);
  } else {
    console.log('Update Status:', status);
    console.log('Updated Data:', JSON.stringify(data?.[0]?.content?.map(b => b.type), null, 2));
  }
}

forceRestore();
