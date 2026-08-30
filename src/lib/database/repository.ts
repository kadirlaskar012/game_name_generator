import { dbClient } from './db';
import * as schema from './schema';
import { eq, desc, ilike, or, and, sql } from 'drizzle-orm';
import {
  SEED_GAMES,
  SEED_STYLES,
  SEED_SYMBOLS,
  SEED_TEMPLATES,
  SEED_SEO_PAGES,
  SEED_FAQS,
  SEED_BLOCKED_WORDS,
  SEED_SETTINGS,
  type SeedGame,
  type SeedStyle,
  type SeedSymbol,
  type SeedTemplate,
  type SeedSeoPage,
  type SeedFaq,
} from './seedData';

// In-memory runtime state (initialized with seed data)
const memoryStore = {
  games: [...SEED_GAMES] as any[],
  categories: [] as any[],
  styles: [...SEED_STYLES] as any[],
  symbols: [...SEED_SYMBOLS] as any[],
  templates: [...SEED_TEMPLATES] as any[],
  seoPages: [...SEED_SEO_PAGES] as any[],
  faqs: [...SEED_FAQS] as any[],
  generatedNames: [
    {
      id: 'gn-001',
      name: '亗Kᴀᴅɪʀ亗',
      normalizedName: 'kadir',
      gameId: '11111111-1111-1111-1111-111111111101',
      styleId: '22222222-2222-2222-2222-222222222202',
      usageCount: 420,
      copyCount: 280,
      shareCount: 65,
      favoriteCount: 95,
      isFeatured: true,
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: 'gn-002',
      name: '『Kadir』メ',
      normalizedName: 'kadir',
      gameId: '11111111-1111-1111-1111-111111111102',
      styleId: '22222222-2222-2222-2222-222222222204',
      usageCount: 350,
      copyCount: 210,
      shareCount: 45,
      favoriteCount: 80,
      isFeatured: true,
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: 'gn-003',
      name: '꧁༺VILLAIN༻꧂',
      normalizedName: 'villain',
      gameId: '11111111-1111-1111-1111-111111111101',
      styleId: '22222222-2222-2222-2222-222222222203',
      usageCount: 510,
      copyCount: 390,
      shareCount: 110,
      favoriteCount: 140,
      isFeatured: true,
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: 'gn-004',
      name: '𝕶𝖆𝖉𝖎𝖗☠',
      normalizedName: 'kadir',
      gameId: '11111111-1111-1111-1111-111111111104',
      styleId: '22222222-2222-2222-2222-222222222205',
      usageCount: 290,
      copyCount: 175,
      shareCount: 30,
      favoriteCount: 50,
      isFeatured: false,
      isActive: true,
      createdAt: new Date(),
    },
  ] as any[],
  favorites: [] as any[],
  blockedWords: SEED_BLOCKED_WORDS.map((w, idx) => ({
    id: `bw-${idx + 1}`,
    word: w,
    severity: 'high',
    isActive: true,
    createdAt: new Date(),
  })) as any[],
  settings: { ...SEED_SETTINGS } as Record<string, any>,
  analyticsEvents: [] as any[],
};

// =================== GAMES REPOSITORY ===================

export async function getGames(featuredOnly = false): Promise<SeedGame[]> {
  if (dbClient) {
    try {
      const conditions = [eq(schema.games.isActive, true)];
      if (featuredOnly) conditions.push(eq(schema.games.isFeatured, true));
      return (await dbClient.query.games.findMany({
        where: and(...conditions),
        orderBy: [desc(schema.games.isFeatured), desc(schema.games.createdAt)],
      })) as any;
    } catch (e) {
      console.warn('DB error, using memory store:', e);
    }
  }
  return memoryStore.games.filter((g) => g.isActive && (!featuredOnly || g.isFeatured));
}

export async function getAllGamesAdmin(): Promise<any[]> {
  if (dbClient) {
    try {
      return await dbClient.query.games.findMany({
        orderBy: [desc(schema.games.createdAt)],
      });
    } catch (e) {
      console.warn('DB error, using memory store:', e);
    }
  }
  return memoryStore.games;
}

export async function getGameBySlug(slug: string): Promise<SeedGame | null> {
  if (dbClient) {
    try {
      const game = await dbClient.query.games.findFirst({
        where: and(eq(schema.games.slug, slug), eq(schema.games.isActive, true)),
      });
      if (game) return game as any;
    } catch (e) {
      console.warn('DB error, using memory store:', e);
    }
  }
  const found = memoryStore.games.find((g) => g.slug === slug && g.isActive);
  return found || null;
}

export async function saveGame(game: Partial<schema.NewGame> & { id?: string }): Promise<any> {
  if (game.id) {
    // Update
    if (dbClient) {
      try {
        const [updated] = await dbClient
          .update(schema.games)
          .set({ ...game, updatedAt: new Date() })
          .where(eq(schema.games.id, game.id))
          .returning();
        return updated;
      } catch (e) {
        console.warn('DB error, fallback memory:', e);
      }
    }
    const idx = memoryStore.games.findIndex((g) => g.id === game.id);
    if (idx !== -1) {
      memoryStore.games[idx] = { ...memoryStore.games[idx], ...game, updatedAt: new Date() };
      return memoryStore.games[idx];
    }
  } else {
    // Create
    const newId = crypto.randomUUID();
    const newGame = {
      id: newId,
      name: game.name || 'New Game',
      slug: game.slug || `game-${Date.now()}`,
      description: game.description || '',
      logo: game.logo || '🎮',
      ogImage: game.ogImage || '',
      isActive: game.isActive !== undefined ? game.isActive : true,
      isFeatured: game.isFeatured || false,
      rules: game.rules || { maxLength: 14, minLength: 3, preferredSymbols: ['亗', 'メ'] },
      seoTitle: game.seoTitle || `${game.name} Name Generator`,
      seoDescription: game.seoDescription || `Generate stylish names for ${game.name}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (dbClient) {
      try {
        const [created] = await dbClient.insert(schema.games).values(newGame as any).returning();
        return created;
      } catch (e) {
        console.warn('DB error, fallback memory:', e);
      }
    }
    memoryStore.games.unshift(newGame);
    return newGame;
  }
}

export async function deleteGame(id: string): Promise<boolean> {
  if (dbClient) {
    try {
      await dbClient.delete(schema.games).where(eq(schema.games.id, id));
      return true;
    } catch (e) {
      console.warn('DB error, fallback memory:', e);
    }
  }
  const idx = memoryStore.games.findIndex((g) => g.id === id);
  if (idx !== -1) {
    memoryStore.games.splice(idx, 1);
    return true;
  }
  return false;
}

// =================== STYLES REPOSITORY ===================

export async function getStyles(): Promise<SeedStyle[]> {
  if (dbClient) {
    try {
      return (await dbClient.query.styles.findMany({
        where: eq(schema.styles.isActive, true),
        orderBy: [desc(schema.styles.createdAt)],
      })) as any;
    } catch (e) {
      console.warn('DB error, using memory store:', e);
    }
  }
  return memoryStore.styles.filter((s) => s.isActive);
}

export async function getAllStylesAdmin(): Promise<any[]> {
  if (dbClient) {
    try {
      return await dbClient.query.styles.findMany({
        orderBy: [desc(schema.styles.createdAt)],
      });
    } catch (e) {
      console.warn('DB error, using memory store:', e);
    }
  }
  return memoryStore.styles;
}

export async function getStyleBySlug(slug: string): Promise<SeedStyle | null> {
  if (dbClient) {
    try {
      const style = await dbClient.query.styles.findFirst({
        where: and(eq(schema.styles.slug, slug), eq(schema.styles.isActive, true)),
      });
      if (style) return style as any;
    } catch (e) {
      console.warn('DB error, using memory store:', e);
    }
  }
  return memoryStore.styles.find((s) => s.slug === slug && s.isActive) || null;
}

export async function saveStyle(style: Partial<schema.NewStyle> & { id?: string }): Promise<any> {
  if (style.id) {
    if (dbClient) {
      try {
        const [updated] = await dbClient
          .update(schema.styles)
          .set({ ...style, updatedAt: new Date() })
          .where(eq(schema.styles.id, style.id))
          .returning();
        return updated;
      } catch (e) {
        console.warn('DB error, fallback memory:', e);
      }
    }
    const idx = memoryStore.styles.findIndex((s) => s.id === style.id);
    if (idx !== -1) {
      memoryStore.styles[idx] = { ...memoryStore.styles[idx], ...style, updatedAt: new Date() };
      return memoryStore.styles[idx];
    }
  } else {
    const newStyle = {
      id: crypto.randomUUID(),
      name: style.name || 'New Style',
      slug: style.slug || `style-${Date.now()}`,
      description: style.description || '',
      configuration: style.configuration || {},
      isActive: style.isActive !== undefined ? style.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (dbClient) {
      try {
        const [created] = await dbClient.insert(schema.styles).values(newStyle as any).returning();
        return created;
      } catch (e) {
        console.warn('DB error, fallback memory:', e);
      }
    }
    memoryStore.styles.unshift(newStyle);
    return newStyle;
  }
}

export async function deleteStyle(id: string): Promise<boolean> {
  if (dbClient) {
    try {
      await dbClient.delete(schema.styles).where(eq(schema.styles.id, id));
      return true;
    } catch (e) {
      console.warn('DB error, fallback memory:', e);
    }
  }
  const idx = memoryStore.styles.findIndex((s) => s.id === id);
  if (idx !== -1) {
    memoryStore.styles.splice(idx, 1);
    return true;
  }
  return false;
}

// =================== SYMBOLS REPOSITORY ===================

export async function getSymbols(category?: string): Promise<SeedSymbol[]> {
  if (dbClient) {
    try {
      const conditions = [eq(schema.symbols.isActive, true)];
      if (category && category !== 'all') {
        conditions.push(eq(schema.symbols.category, category));
      }
      return (await dbClient.query.symbols.findMany({
        where: and(...conditions),
      })) as any;
    } catch (e) {
      console.warn('DB error, using memory store:', e);
    }
  }
  return memoryStore.symbols.filter((s) => s.isActive && (!category || category === 'all' || s.category === category));
}

export async function getAllSymbolsAdmin(): Promise<any[]> {
  if (dbClient) {
    try {
      return await dbClient.query.symbols.findMany();
    } catch (e) {
      console.warn('DB error, using memory store:', e);
    }
  }
  return memoryStore.symbols;
}

export async function saveSymbol(sym: Partial<schema.NewSymbolItem> & { id?: string }): Promise<any> {
  if (sym.id) {
    if (dbClient) {
      try {
        const [updated] = await dbClient
          .update(schema.symbols)
          .set(sym)
          .where(eq(schema.symbols.id, sym.id))
          .returning();
        return updated;
      } catch (e) {
        console.warn('DB error, fallback memory:', e);
      }
    }
    const idx = memoryStore.symbols.findIndex((s) => s.id === sym.id);
    if (idx !== -1) {
      memoryStore.symbols[idx] = { ...memoryStore.symbols[idx], ...sym };
      return memoryStore.symbols[idx];
    }
  } else {
    const newSym = {
      id: crypto.randomUUID(),
      symbol: sym.symbol || '亗',
      category: sym.category || 'general',
      position: sym.position || 'both',
      isActive: sym.isActive !== undefined ? sym.isActive : true,
      createdAt: new Date(),
    };
    if (dbClient) {
      try {
        const [created] = await dbClient.insert(schema.symbols).values(newSym as any).returning();
        return created;
      } catch (e) {
        console.warn('DB error, fallback memory:', e);
      }
    }
    memoryStore.symbols.push(newSym);
    return newSym;
  }
}

export async function deleteSymbol(id: string): Promise<boolean> {
  if (dbClient) {
    try {
      await dbClient.delete(schema.symbols).where(eq(schema.symbols.id, id));
      return true;
    } catch (e) {
      console.warn('DB error, fallback memory:', e);
    }
  }
  const idx = memoryStore.symbols.findIndex((s) => s.id === id);
  if (idx !== -1) {
    memoryStore.symbols.splice(idx, 1);
    return true;
  }
  return false;
}

// =================== TEMPLATES REPOSITORY ===================

export async function getNameTemplates(): Promise<SeedTemplate[]> {
  if (dbClient) {
    try {
      return (await dbClient.query.nameTemplates.findMany({
        where: eq(schema.nameTemplates.isActive, true),
      })) as any;
    } catch (e) {
      console.warn('DB error, using memory store:', e);
    }
  }
  return memoryStore.templates.filter((t) => t.isActive);
}

export async function saveTemplate(tmpl: { id?: string; template: string; styleId?: string; gameId?: string; isActive?: boolean }): Promise<any> {
  if (tmpl.id) {
    const idx = memoryStore.templates.findIndex((t) => t.id === tmpl.id);
    if (idx !== -1) {
      memoryStore.templates[idx] = { ...memoryStore.templates[idx], ...tmpl };
      return memoryStore.templates[idx];
    }
  } else {
    const newTmpl = {
      id: crypto.randomUUID(),
      template: tmpl.template,
      styleId: tmpl.styleId,
      gameId: tmpl.gameId,
      isActive: tmpl.isActive !== undefined ? tmpl.isActive : true,
      createdAt: new Date(),
    };
    memoryStore.templates.push(newTmpl);
    return newTmpl;
  }
}

export async function deleteTemplate(id: string): Promise<boolean> {
  const idx = memoryStore.templates.findIndex((t) => t.id === id);
  if (idx !== -1) {
    memoryStore.templates.splice(idx, 1);
    return true;
  }
  return false;
}

// =================== SEO PAGES & FAQS REPOSITORY ===================

export async function getSeoPages(): Promise<SeedSeoPage[]> {
  if (dbClient) {
    try {
      return (await dbClient.query.seoPages.findMany({
        where: eq(schema.seoPages.isPublished, true),
      })) as any;
    } catch (e) {
      console.warn('DB error, using memory store:', e);
    }
  }
  return memoryStore.seoPages.filter((p) => p.isPublished);
}

export async function getAllSeoPagesAdmin(): Promise<any[]> {
  return memoryStore.seoPages;
}

export async function getSeoPageBySlug(slug: string): Promise<SeedSeoPage | null> {
  if (dbClient) {
    try {
      const page = await dbClient.query.seoPages.findFirst({
        where: and(eq(schema.seoPages.slug, slug), eq(schema.seoPages.isPublished, true)),
      });
      if (page) return page as any;
    } catch (e) {
      console.warn('DB error, using memory store:', e);
    }
  }
  return memoryStore.seoPages.find((p) => p.slug === slug && p.isPublished) || null;
}

export async function saveSeoPage(page: Partial<schema.NewSeoPage> & { id?: string }): Promise<any> {
  if (page.id) {
    const idx = memoryStore.seoPages.findIndex((p) => p.id === page.id);
    if (idx !== -1) {
      memoryStore.seoPages[idx] = { ...memoryStore.seoPages[idx], ...page, updatedAt: new Date() };
      return memoryStore.seoPages[idx];
    }
  } else {
    const newPage = {
      id: crypto.randomUUID(),
      title: page.title || 'New SEO Page',
      slug: page.slug || `page-${Date.now()}`,
      pageType: page.pageType || 'custom',
      content: page.content || '',
      seoTitle: page.seoTitle || page.title || 'Gaming Names',
      seoDescription: page.seoDescription || 'Generate cool gaming names',
      canonical: page.canonical || '',
      robots: page.robots || 'index, follow',
      schemaJson: page.schemaJson || {},
      isPublished: page.isPublished !== undefined ? page.isPublished : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryStore.seoPages.push(newPage);
    return newPage;
  }
}

export async function getFaqs(gameId?: string, pageId?: string): Promise<SeedFaq[]> {
  if (dbClient) {
    try {
      const conditions = [eq(schema.faqs.isActive, true)];
      if (gameId) conditions.push(eq(schema.faqs.gameId, gameId));
      if (pageId) conditions.push(eq(schema.faqs.pageId, pageId));
      return (await dbClient.query.faqs.findMany({
        where: and(...conditions),
        orderBy: [schema.faqs.sortOrder],
      })) as any;
    } catch (e) {
      console.warn('DB error, using memory store:', e);
    }
  }
  return memoryStore.faqs
    .filter((f) => f.isActive && (!gameId || f.gameId === gameId) && (!pageId || f.pageId === pageId))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function saveFaq(faq: Partial<schema.NewFaq> & { id?: string }): Promise<any> {
  if (faq.id) {
    const idx = memoryStore.faqs.findIndex((f) => f.id === faq.id);
    if (idx !== -1) {
      memoryStore.faqs[idx] = { ...memoryStore.faqs[idx], ...faq, updatedAt: new Date() };
      return memoryStore.faqs[idx];
    }
  } else {
    const newFaq = {
      id: crypto.randomUUID(),
      question: faq.question || 'New FAQ Question?',
      answer: faq.answer || 'Answer here',
      gameId: faq.gameId,
      pageId: faq.pageId,
      sortOrder: faq.sortOrder || 0,
      isActive: faq.isActive !== undefined ? faq.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryStore.faqs.push(newFaq);
    return newFaq;
  }
}

export async function deleteFaq(id: string): Promise<boolean> {
  const idx = memoryStore.faqs.findIndex((f) => f.id === id);
  if (idx !== -1) {
    memoryStore.faqs.splice(idx, 1);
    return true;
  }
  return false;
}

// =================== TRENDING & GENERATED NAMES ===================

export async function trackNameUsage(
  name: string,
  gameId?: string,
  styleId?: string,
  action: 'generate' | 'copy' | 'share' | 'download' | 'favorite' = 'generate'
) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const existing = memoryStore.generatedNames.find((gn) => gn.name === name);

  if (existing) {
    if (action === 'generate') existing.usageCount += 1;
    if (action === 'copy') existing.copyCount += 1;
    if (action === 'share') existing.shareCount += 1;
    if (action === 'favorite') existing.favoriteCount += 1;
    existing.updatedAt = new Date();
  } else {
    memoryStore.generatedNames.push({
      id: crypto.randomUUID(),
      name,
      normalizedName: normalized || 'gamer',
      gameId,
      styleId,
      usageCount: action === 'generate' ? 1 : 0,
      copyCount: action === 'copy' ? 1 : 0,
      shareCount: action === 'share' ? 1 : 0,
      favoriteCount: action === 'favorite' ? 1 : 0,
      isFeatured: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Also record analytics event
  memoryStore.analyticsEvents.push({
    id: crypto.randomUUID(),
    eventType: action,
    metadata: { name, gameId, styleId },
    createdAt: new Date(),
  });
}

export async function getTrendingNames(limit = 20, gameId?: string): Promise<any[]> {
  const weights = memoryStore.settings.trendingWeights || {
    generationCount: 1,
    copyCount: 5,
    shareCount: 8,
    favoriteCount: 10,
  };

  let list = memoryStore.generatedNames.filter((n) => n.isActive);
  if (gameId) {
    list = list.filter((n) => n.gameId === gameId);
  }

  const scored = list.map((item) => {
    const score =
      item.usageCount * (weights.generationCount || 1) +
      item.copyCount * (weights.copyCount || 5) +
      item.shareCount * (weights.shareCount || 8) +
      item.favoriteCount * (weights.favoriteCount || 10);
    return { ...item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

// =================== FAVORITES REPOSITORY ===================

export async function getUserFavorites(userId: string): Promise<any[]> {
  return memoryStore.favorites.filter((f) => f.userId === userId);
}

export async function addUserFavorite(userId: string, data: { name: string; gameName?: string; styleName?: string }): Promise<any> {
  const existing = memoryStore.favorites.find((f) => f.userId === userId && f.customName === data.name);
  if (existing) return existing;

  const newFav = {
    id: crypto.randomUUID(),
    userId,
    customName: data.name,
    gameName: data.gameName || 'General',
    styleName: data.styleName || 'Stylish',
    createdAt: new Date(),
  };
  memoryStore.favorites.push(newFav);

  // Increment favorite count on generated name
  trackNameUsage(data.name, undefined, undefined, 'favorite');
  return newFav;
}

export async function removeUserFavorite(userId: string, favoriteIdOrName: string): Promise<boolean> {
  const idx = memoryStore.favorites.findIndex(
    (f) => f.userId === userId && (f.id === favoriteIdOrName || f.customName === favoriteIdOrName)
  );
  if (idx !== -1) {
    memoryStore.favorites.splice(idx, 1);
    return true;
  }
  return false;
}

// =================== BLOCKED WORDS REPOSITORY ===================

export async function getBlockedWords(): Promise<string[]> {
  return memoryStore.blockedWords.filter((w) => w.isActive).map((w) => w.word);
}

export async function getAllBlockedWordsAdmin(): Promise<any[]> {
  return memoryStore.blockedWords;
}

export async function addBlockedWord(word: string, severity = 'high'): Promise<any> {
  const clean = word.toLowerCase().trim();
  if (memoryStore.blockedWords.some((w) => w.word === clean)) return null;

  const item = {
    id: crypto.randomUUID(),
    word: clean,
    severity,
    isActive: true,
    createdAt: new Date(),
  };
  memoryStore.blockedWords.push(item);
  return item;
}

export async function removeBlockedWord(id: string): Promise<boolean> {
  const idx = memoryStore.blockedWords.findIndex((w) => w.id === id);
  if (idx !== -1) {
    memoryStore.blockedWords.splice(idx, 1);
    return true;
  }
  return false;
}

// =================== SITE SETTINGS & ANALYTICS ===================

export async function getSiteSettings(): Promise<Record<string, any>> {
  return memoryStore.settings;
}

export async function updateSiteSettings(newSettings: Record<string, any>): Promise<Record<string, any>> {
  memoryStore.settings = { ...memoryStore.settings, ...newSettings };
  return memoryStore.settings;
}

export async function getAnalyticsSummary(): Promise<any> {
  const totalGenerations = memoryStore.analyticsEvents.filter((e) => e.eventType === 'generate').length + 15420;
  const totalCopies = memoryStore.analyticsEvents.filter((e) => e.eventType === 'copy').length + 8930;
  const totalShares = memoryStore.analyticsEvents.filter((e) => e.eventType === 'share').length + 2140;
  const totalDownloads = memoryStore.analyticsEvents.filter((e) => e.eventType === 'download').length + 1480;

  return {
    totalGenerations,
    totalCopies,
    totalShares,
    totalDownloads,
    totalGames: memoryStore.games.length,
    totalStyles: memoryStore.styles.length,
    totalSymbols: memoryStore.symbols.length,
    recentEvents: memoryStore.analyticsEvents.slice(-20).reverse(),
  };
}

// =================== GLOBAL SEARCH ===================

export async function searchDatabase(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) {
    return { games: [], styles: [], seoPages: [], names: [] };
  }

  const matchingGames = memoryStore.games
    .filter((g) => g.isActive && (g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)))
    .map((g) => ({ type: 'game', title: g.name, slug: `/${g.slug}-name-generator/`, description: g.description, icon: g.logo }));

  const matchingStyles = memoryStore.styles
    .filter((s) => s.isActive && (s.name.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q)))
    .map((s) => ({ type: 'style', title: s.name, slug: `/styles/${s.slug}/`, description: s.description, icon: '✨' }));

  const matchingSeoPages = memoryStore.seoPages
    .filter((p) => p.isPublished && (p.title.toLowerCase().includes(q) || p.seoDescription.toLowerCase().includes(q)))
    .map((p) => ({ type: 'seo_page', title: p.title, slug: `/${p.slug}/`, description: p.seoDescription, icon: '📄' }));

  const matchingNames = memoryStore.generatedNames
    .filter((n) => n.isActive && (n.name.toLowerCase().includes(q) || n.normalizedName.includes(q)))
    .slice(0, 10)
    .map((n) => ({ type: 'name', title: n.name, slug: `/?name=${encodeURIComponent(n.normalizedName)}`, description: `Popular name (${n.copyCount} copies)`, icon: '🔥' }));

  return {
    games: matchingGames,
    styles: matchingStyles,
    seoPages: matchingSeoPages,
    names: matchingNames,
  };
}
