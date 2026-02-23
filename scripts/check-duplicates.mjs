import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkDuplicates() {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('url_path', '/');

  if (error) {
    console.error(error);
  } else {
    console.log('Homepage candidates found:', data.length);
    data.forEach(p => {
      console.log(`- [${p.id}] ${p.title} - Status: ${p.status} - Updated: ${p.updated_at} - Blocks: ${p.content.length}`);
      console.log('Blocks:', p.content.map(b => b.type));
    });
  }
}

checkDuplicates();
