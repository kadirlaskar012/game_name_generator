import { dbClient } from './db';
import * as schema from './schema';
import {
  SEED_GAMES,
  SEED_STYLES,
  SEED_SYMBOLS,
  SEED_TEMPLATES,
  SEED_SEO_PAGES,
  SEED_FAQS,
  SEED_BLOCKED_WORDS,
  SEED_SETTINGS,
} from './seedData';

async function main() {
  console.log('🌱 Starting GamerTag Pro Database Seeder...');

  if (!dbClient) {
    console.log('ℹ️  No DATABASE_URL configured. In-memory fallback is automatically seeded.');
    process.exit(0);
  }

  try {
    // 1. Seed Games
    console.log('🎮 Seeding Games...');
    for (const g of SEED_GAMES) {
      await dbClient.insert(schema.games).values(g as any).onConflictDoNothing();
    }

    // 2. Seed Styles
    console.log('✨ Seeding Styles...');
    for (const s of SEED_STYLES) {
      await dbClient.insert(schema.styles).values(s as any).onConflictDoNothing();
    }

    // 3. Seed Symbols
    console.log('⚡ Seeding Symbols...');
    for (const sym of SEED_SYMBOLS) {
      await dbClient.insert(schema.symbols).values(sym as any).onConflictDoNothing();
    }

    // 4. Seed Templates
    console.log('📐 Seeding Templates...');
    for (const t of SEED_TEMPLATES) {
      await dbClient.insert(schema.nameTemplates).values(t as any).onConflictDoNothing();
    }

    // 5. Seed SEO Pages
    console.log('📄 Seeding SEO Pages...');
    for (const p of SEED_SEO_PAGES) {
      await dbClient.insert(schema.seoPages).values(p as any).onConflictDoNothing();
    }

    // 6. Seed FAQs
    console.log('❓ Seeding FAQs...');
    for (const f of SEED_FAQS) {
      await dbClient.insert(schema.faqs).values(f as any).onConflictDoNothing();
    }

    // 7. Seed Blocked Words
    console.log('🛡️ Seeding Blocked Words...');
    for (const w of SEED_BLOCKED_WORDS) {
      await dbClient.insert(schema.blockedWords).values({ word: w, severity: 'high' } as any).onConflictDoNothing();
    }

    // 8. Seed Settings
    console.log('⚙️ Seeding Site Settings...');
    await dbClient.insert(schema.siteSettings).values({
      key: 'system_settings',
      value: SEED_SETTINGS,
    } as any).onConflictDoNothing();

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();
