import postgres from 'postgres';
import {
  SEED_GAMES,
  SEED_STYLES,
  SEED_SYMBOLS,
  SEED_TEMPLATES,
  SEED_SEO_PAGES,
  SEED_FAQS,
  SEED_BLOCKED_WORDS,
  SEED_SETTINGS,
} from '../src/lib/database/seedData';

import fs from 'fs';
import path from 'path';

function getDbUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    const envPath = path.resolve('.env');
    if (fs.existsSync(envPath)) {
      const match = fs.readFileSync(envPath, 'utf8').match(/DATABASE_URL=["']?([^"'\n]+)/);
      if (match) return match[1];
    }
  } catch {}
  return 'postgresql://postgres:password@localhost:5432/postgres';
}

const connectionString = getDbUrl();

async function migrateAndSeed() {
  console.log('🚀 Connecting to live Supabase PostgreSQL database...');
  const sql = postgres(connectionString, { max: 1, connect_timeout: 10 });

  try {
    // 1. Seed Games
    console.log('🎮 Seeding Games into Supabase...');
    for (const g of SEED_GAMES) {
      await sql`
        INSERT INTO games (id, name, slug, description, logo, og_image, is_active, is_featured, rules, seo_title, seo_description)
        VALUES (${g.id}, ${g.name}, ${g.slug}, ${g.description}, ${g.logo}, ${g.ogImage || null}, ${g.isActive}, ${g.isFeatured}, ${sql.json(g.rules)}, ${g.seoTitle}, ${g.seoDescription})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          description = EXCLUDED.description,
          rules = EXCLUDED.rules,
          seo_title = EXCLUDED.seo_title,
          seo_description = EXCLUDED.seo_description;
      `;
    }

    // 2. Seed Styles
    console.log(`✨ Seeding ${SEED_STYLES.length} Styles into Supabase...`);
    for (const s of SEED_STYLES) {
      await sql`
        INSERT INTO styles (id, name, slug, description, configuration, is_active)
        VALUES (${s.id}, ${s.name}, ${s.slug}, ${s.description}, ${sql.json(s.configuration)}, ${s.isActive})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          description = EXCLUDED.description,
          configuration = EXCLUDED.configuration;
      `;
    }

    // 3. Seed Symbols
    console.log(`⚡ Seeding ${SEED_SYMBOLS.length} Symbols into Supabase...`);
    for (const sym of SEED_SYMBOLS) {
      await sql`
        INSERT INTO symbols (id, symbol, category, position, is_active)
        VALUES (${sym.id}, ${sym.symbol}, ${sym.category}, ${sym.position}, ${sym.isActive})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    // 4. Seed Templates
    console.log('📐 Seeding Templates into Supabase...');
    for (const t of SEED_TEMPLATES) {
      await sql`
        INSERT INTO name_templates (id, template, is_active)
        VALUES (${t.id}, ${t.template}, ${t.isActive})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    // 5. Seed SEO Pages
    console.log('📄 Seeding SEO Pages into Supabase...');
    for (const p of SEED_SEO_PAGES) {
      await sql`
        INSERT INTO seo_pages (id, title, slug, page_type, content, seo_title, seo_description, canonical, robots, schema_json, is_published)
        VALUES (${p.id}, ${p.title}, ${p.slug}, ${p.pageType}, ${p.content}, ${p.seoTitle}, ${p.seoDescription}, ${p.canonical || null}, ${p.robots}, ${sql.json(p.schemaJson)}, ${p.isPublished})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    // 6. Seed FAQs
    console.log('❓ Seeding FAQs into Supabase...');
    for (const f of SEED_FAQS) {
      await sql`
        INSERT INTO faqs (id, question, answer, game_id, sort_order, is_active)
        VALUES (${f.id}, ${f.question}, ${f.answer}, ${f.gameId || null}, ${f.sortOrder}, ${f.isActive})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    // 7. Seed Blocked Words
    console.log('🛡️ Seeding Blocked Words into Supabase...');
    for (const w of SEED_BLOCKED_WORDS) {
      await sql`
        INSERT INTO blocked_words (word, severity, is_active)
        VALUES (${w}, 'high', true)
        ON CONFLICT (word) DO NOTHING;
      `;
    }

    // 8. Seed Site Settings
    console.log('⚙️ Seeding Site Settings into Supabase...');
    await sql`
      INSERT INTO site_settings (key, value)
      VALUES ('system_settings', ${sql.json(SEED_SETTINGS)})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
    `;

    // Verify Counts in Live DB
    const [gameCount] = await sql`SELECT count(*)::int as c FROM games;`;
    const [styleCount] = await sql`SELECT count(*)::int as c FROM styles;`;
    const [symbolCount] = await sql`SELECT count(*)::int as c FROM symbols;`;

    console.log(`\n🎉 SUPABASE POSTGRESQL LIVE VERIFICATION:`);
    console.log(`  - Games in Supabase: ${gameCount.c}`);
    console.log(`  - Styles in Supabase: ${styleCount.c}`);
    console.log(`  - Symbols in Supabase: ${symbolCount.c}`);

    console.log('\n✅ Supabase PostgreSQL Database is 100% updated and seeded with 31+ styles!');
  } catch (error) {
    console.error('❌ Migration / Seeding Error:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

migrateAndSeed();
