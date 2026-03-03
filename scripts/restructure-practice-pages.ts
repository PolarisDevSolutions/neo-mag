import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const practicePaths = [
  '/dijagnostika/magnetna-rezonanca/',
  '/dijagnostika/rendgen/',
  '/dijagnostika/ultrazvuk/',
  '/dijagnostika/multilajsni-skener/',
  '/dijagnostika/ostali-pregledi/',
];

async function restructure() {
  for (const path of practicePaths) {
    console.log(`Restructuring ${path}...`);
    
    const { data: page, error: fetchError } = await supabase
      .from('pages')
      .select('*')
      .eq('url_path', path)
      .single();

    if (fetchError || !page) {
      console.error(`Error fetching page ${path}:`, fetchError);
      continue;
    }

    const content = Array.isArray(page.content) ? page.content : [];
    const heroBlock = content.find(b => b.type === 'hero') || {
      type: 'hero',
      title: page.title,
      subtitle: '',
      showCTA: true,
      ctaText: 'Zakažite pregled'
    };

    const newContent = [
      heroBlock,
      {
        type: 'info-section',
        heading: 'O pregledu',
        text: '<p>Ovde unesite detaljan opis pregleda, informaciju o tome kako se izvodi i šta pacijent može očekivati.</p>',
        image: '',
        imagePosition: 'right',
        ctaText: 'Zakažite termin',
        ctaLink: '#cta-section'
      },
      {
        type: 'faq',
        heading: 'Često postavljana pitanja',
        items: [
          { question: 'Da li je potrebna posebna priprema?', answer: 'Za većinu ovih pregleda nije potrebna posebna priprema. Ukoliko je potrebna, naš tim će Vas blagovremeno obavestiti.' },
          { question: 'Koliko traje pregled?', answer: 'Trajanje pregleda zavisi od vrste, ali većina se završi u roku od 15-30 minuta.' }
        ]
      },
      {
        type: 'cta',
        text: 'Zakažite pregled',
        phoneType: 'primary',
        variant: 'primary',
        align: 'center'
      }
    ];

    const { error: updateError } = await supabase
      .from('pages')
      .update({ 
        content: newContent, 
        page_type: 'practice' 
      })
      .eq('id', page.id);

    if (updateError) {
      console.error(`Error updating page ${path}:`, updateError);
    } else {
      console.log(`Successfully restructured ${path}`);
    }
  }
}

restructure();
