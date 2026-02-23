import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkAllPages() {
  const { data, error } = await supabase
    .from('pages')
    .select('id, title, url_path, content');

  if (error) {
    console.error(error);
    return;
  }

  console.log('All Pages:');
  data.forEach(p => {
    console.log(`- [${p.id}] ${p.url_path} (${p.title}) - Blocks: ${p.content?.length}`);
  });
}

checkAllPages();
