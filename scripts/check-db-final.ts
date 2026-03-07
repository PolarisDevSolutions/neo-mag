import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('Checking pages table...');
  const { data: pages, error: pagesError } = await supabase
    .from('pages')
    .select('url_path, canonical_url');

  if (pagesError) {
    console.error('Error fetching pages:', pagesError);
  } else {
    const oldDomainPages = pages.filter(p => 
      (p.url_path && p.url_path.includes('silvatriallawyers.com')) || 
      (p.canonical_url && p.canonical_url.includes('silvatriallawyers.com'))
    );
    console.log(`Found ${oldDomainPages.length} pages with old domain:`, oldDomainPages);
  }

  console.log('Checking site_settings table...');
  const { data: settings, error: settingsError } = await supabase
    .from('site_settings')
    .select('*');

  if (settingsError) {
    console.error('Error fetching site_settings:', settingsError);
  } else {
    console.log('Site settings content:', JSON.stringify(settings, null, 2));
    const oldDomainSettings = JSON.stringify(settings).includes('silvatriallawyers.com');
    console.log(`Old domain found in site_settings: ${oldDomainSettings}`);
  }
}

checkDatabase();
