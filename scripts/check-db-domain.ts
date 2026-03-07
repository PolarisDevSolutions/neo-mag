import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jphaxpojinhibagvsdmq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwaGF4cG9qaW5oaWJhZ3ZzZG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NjkxOTAsImV4cCI6MjA4NzI0NTE5MH0.CojJkufppVrRv72jEKlJ8G_3Qg4m5S95Zz7mpDVlZLc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabase() {
  console.log('Checking pages table for old domain...');
  const { data: pages, error: pagesError } = await supabase
    .from('pages')
    .select('id, url_path, canonical_url')
    .ilike('canonical_url', '%silva%');

  if (pagesError) {
    console.error('Error fetching pages:', pagesError);
  } else if (pages && pages.length > 0) {
    console.log('Found pages with old domain in canonical_url:');
    console.table(pages);
  } else {
    console.log('No pages found with old domain in canonical_url.');
  }

  console.log('\nChecking site_settings table...');
  const { data: settings, error: settingsError } = await supabase
    .from('site_settings')
    .select('*');

  if (settingsError) {
    console.error('Error fetching site_settings:', settingsError);
  } else {
    const stringified = JSON.stringify(settings);
    if (stringified.includes('silva')) {
      console.log('Old domain found in site_settings!');
    } else {
      console.log('No old domain found in site_settings.');
    }
  }
}

checkDatabase();
