import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function dumpKontaktPage() {
  const { data, error } = await supabase
    .from('pages')
    .select('id, content, url_path')
    .eq('url_path', '/kontakt/')
    .single();

  if (error) {
    console.error('Error fetching kontakt page:', error);
    return;
  }

  console.log('ID:', data.id);
  console.log('URL Path:', data.url_path);
  console.log('Content:', JSON.stringify(data.content, null, 2));
}

dumpKontaktPage();
