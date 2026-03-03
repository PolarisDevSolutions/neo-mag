import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateKontaktPage() {
  const { data: page, error: fetchError } = await supabase
    .from('pages')
    .select('content')
    .eq('url_path', '/kontakt/')
    .single();

  if (fetchError) {
    console.error('Error fetching kontakt page:', fetchError);
    return;
  }

  const oldContent = page.content as any[];
  
  // New structure:
  // 1. Hero (keep)
  // 2. Contact Form (merged Heading + Paragraph)
  // 3. CTA "Kako do nas?" (merged Heading + Paragraph)
  // 4. Map
  
  const hero = oldContent.find(b => b.type === 'hero');
  const heading1 = oldContent.find(b => b.type === 'heading' && b.text === 'Zakazivanje pregleda');
  const paragraph1 = oldContent.find(b => b.type === 'paragraph' && b.content.includes('Preglede možete zakazati'));
  const heading2 = oldContent.find(b => b.type === 'heading' && b.text === 'Kako do nas?');
  const paragraph2 = oldContent.find(b => b.type === 'paragraph' && b.content.includes('Neo Mag dijagnostički centar'));
  const map = oldContent.find(b => b.type === 'map');

  console.log('Found blocks:', { hero: !!hero, heading1: !!heading1, paragraph1: !!paragraph1, heading2: !!heading2, paragraph2: !!paragraph2, map: !!map });

  const newContent = [
    hero,
    {
      type: 'contact-form',
      heading: heading1?.text || 'Zakazivanje pregleda',
      description: paragraph1 ? `<p>${paragraph1.content.replace(/<p>|<\/p>/g, '')}</p>` : '',
      image: ''
    },
    {
      type: 'cta',
      heading: heading2?.text || 'Kako do nas?',
      description: paragraph2 ? `<p>${paragraph2.content.replace(/<p>|<\/p>/g, '')}</p>` : '',
      text: 'Pozovite nas',
      variant: 'primary',
      phoneType: 'primary',
      secondaryText: 'Sekundarni kontakt',
      secondaryVariant: 'outline',
      secondaryPhoneType: 'secondary',
      align: 'center'
    },
    map
  ].filter(Boolean);

  console.log('New content length:', newContent.length);

  const { data: updatedData, error: updateError } = await supabase
    .from('pages')
    .update({ content: newContent })
    .eq('id', '50c48bc4-cf1c-4e33-9856-4f687de895e6')
    .select('content');

  if (updateError) {
    console.error('Error updating kontakt page:', updateError);
  } else {
    console.log('Kontakt page migrated successfully!');
    console.log('Updated content length:', updatedData?.[0]?.content?.length);
    console.log('Updated content:', JSON.stringify(updatedData?.[0]?.content, null, 2));
  }
}

migrateKontaktPage();
