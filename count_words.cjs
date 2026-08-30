const fs = require('fs');

const files = [
  { name: 'Universal Generator (Home)', path: 'src/pages/index.astro' },
  { name: 'Clan & Squad Name Generator', path: 'src/pages/clan-name-generator.astro' },
  { name: 'Esports Name Generator', path: 'src/pages/esports-name-generator.astro' },
  { name: 'Pet Name Generator', path: 'src/pages/pet-name-generator.astro' },
  { name: 'Multilingual Name Generator', path: 'src/pages/multilingual-name-generator.astro' },
  { name: 'Daily Name Battle', path: 'src/pages/name-battle.astro' },
  { name: 'Trending Leaderboard', path: 'src/pages/trending.astro' },
  { name: 'Games Directory', path: 'src/pages/games/index.astro' },
  { name: 'Favorites Vault', path: 'src/pages/favorites.astro' },
  { name: 'Game Template ([game]-name-generator)', path: 'src/pages/[game]-name-generator/index.astro' }
];

console.log('=== EXACT WORD COUNT AUDIT ===\n');

for (const f of files) {
  try {
    const content = fs.readFileSync(f.path, 'utf8');
    // Extract frontmatter text too (SEO descriptions, FAQ answers, schemas)
    const allText = content
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[{}()\[\]]/g, ' ')
      .replace(/['"`]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    const words = allText ? allText.split(/\s+/).filter(w => w.length > 0).length : 0;
    console.log(f.name + ': ' + words + ' words (Characters: ' + allText.length + ')');
  } catch (err) {
    console.error(f.name + ': Error reading file: ' + err.message);
  }
}
