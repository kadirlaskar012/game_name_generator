import { d as dbClient, a as games, s as styles, f as faqs, b as seoPages, c as symbols } from './db_CZQKOe19.mjs';
import { and, eq, desc } from 'drizzle-orm';
import { a as SEED_GAMES, b as SEED_STYLES, c as SEED_FAQS, d as SEED_SEO_PAGES, e as SEED_SETTINGS, f as SEED_SYMBOLS, S as SEED_BLOCKED_WORDS } from './seedData_DsVjXbpq.mjs';

const memoryStore = {
  games: [...SEED_GAMES],
  styles: [...SEED_STYLES],
  symbols: [...SEED_SYMBOLS],
  seoPages: [...SEED_SEO_PAGES],
  faqs: [...SEED_FAQS],
  generatedNames: [
    {
      id: "gn-001",
      name: "亗Kᴀᴅɪʀ亗",
      normalizedName: "kadir",
      gameId: "11111111-1111-1111-1111-111111111101",
      styleId: "22222222-2222-2222-2222-222222222202",
      usageCount: 420,
      copyCount: 280,
      shareCount: 65,
      favoriteCount: 95,
      isFeatured: true,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
    },
    {
      id: "gn-002",
      name: "『Kadir』メ",
      normalizedName: "kadir",
      gameId: "11111111-1111-1111-1111-111111111102",
      styleId: "22222222-2222-2222-2222-222222222204",
      usageCount: 350,
      copyCount: 210,
      shareCount: 45,
      favoriteCount: 80,
      isFeatured: true,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
    },
    {
      id: "gn-003",
      name: "꧁༺VILLAIN༻꧂",
      normalizedName: "villain",
      gameId: "11111111-1111-1111-1111-111111111101",
      styleId: "22222222-2222-2222-2222-222222222203",
      usageCount: 510,
      copyCount: 390,
      shareCount: 110,
      favoriteCount: 140,
      isFeatured: true,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
    },
    {
      id: "gn-004",
      name: "𝕶𝖆𝖉𝖎𝖗☠",
      normalizedName: "kadir",
      gameId: "11111111-1111-1111-1111-111111111104",
      styleId: "22222222-2222-2222-2222-222222222205",
      usageCount: 290,
      copyCount: 175,
      shareCount: 30,
      favoriteCount: 50,
      isFeatured: false,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
    }
  ],
  favorites: [],
  blockedWords: SEED_BLOCKED_WORDS.map((w, idx) => ({
    id: `bw-${idx + 1}`,
    word: w,
    severity: "high",
    isActive: true,
    createdAt: /* @__PURE__ */ new Date()
  })),
  settings: { ...SEED_SETTINGS },
  analyticsEvents: []
};
async function getGames(featuredOnly = false) {
  if (dbClient) {
    try {
      const conditions = [eq(games.isActive, true)];
      if (featuredOnly) conditions.push(eq(games.isFeatured, true));
      return await dbClient.query.games.findMany({
        where: and(...conditions),
        orderBy: [desc(games.isFeatured), desc(games.createdAt)]
      });
    } catch (e) {
      console.warn("DB error, using memory store:", e);
    }
  }
  return memoryStore.games.filter((g) => g.isActive && (!featuredOnly || g.isFeatured));
}
async function getAllGamesAdmin() {
  if (dbClient) {
    try {
      return await dbClient.query.games.findMany({
        orderBy: [desc(games.createdAt)]
      });
    } catch (e) {
      console.warn("DB error, using memory store:", e);
    }
  }
  return memoryStore.games;
}
async function getGameBySlug(slug) {
  if (dbClient) {
    try {
      const game = await dbClient.query.games.findFirst({
        where: and(eq(games.slug, slug), eq(games.isActive, true))
      });
      if (game) return game;
    } catch (e) {
      console.warn("DB error, using memory store:", e);
    }
  }
  const found = memoryStore.games.find((g) => g.slug === slug && g.isActive);
  return found || null;
}
async function saveGame(game) {
  if (game.id) {
    if (dbClient) {
      try {
        const [updated] = await dbClient.update(games).set({ ...game, updatedAt: /* @__PURE__ */ new Date() }).where(eq(games.id, game.id)).returning();
        return updated;
      } catch (e) {
        console.warn("DB error, fallback memory:", e);
      }
    }
    const idx = memoryStore.games.findIndex((g) => g.id === game.id);
    if (idx !== -1) {
      memoryStore.games[idx] = { ...memoryStore.games[idx], ...game, updatedAt: /* @__PURE__ */ new Date() };
      return memoryStore.games[idx];
    }
  } else {
    const newId = crypto.randomUUID();
    const newGame = {
      id: newId,
      name: game.name || "New Game",
      slug: game.slug || `game-${Date.now()}`,
      description: game.description || "",
      logo: game.logo || "🎮",
      ogImage: game.ogImage || "",
      isActive: game.isActive !== void 0 ? game.isActive : true,
      isFeatured: game.isFeatured || false,
      rules: game.rules || { maxLength: 14, minLength: 3, preferredSymbols: ["亗", "メ"] },
      seoTitle: game.seoTitle || `${game.name} Name Generator`,
      seoDescription: game.seoDescription || `Generate stylish names for ${game.name}`,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (dbClient) {
      try {
        const [created] = await dbClient.insert(games).values(newGame).returning();
        return created;
      } catch (e) {
        console.warn("DB error, fallback memory:", e);
      }
    }
    memoryStore.games.unshift(newGame);
    return newGame;
  }
}
async function deleteGame(id) {
  if (dbClient) {
    try {
      await dbClient.delete(games).where(eq(games.id, id));
      return true;
    } catch (e) {
      console.warn("DB error, fallback memory:", e);
    }
  }
  const idx = memoryStore.games.findIndex((g) => g.id === id);
  if (idx !== -1) {
    memoryStore.games.splice(idx, 1);
    return true;
  }
  return false;
}
async function getStyles() {
  if (dbClient) {
    try {
      return await dbClient.query.styles.findMany({
        where: eq(styles.isActive, true),
        orderBy: [desc(styles.createdAt)]
      });
    } catch (e) {
      console.warn("DB error, using memory store:", e);
    }
  }
  return memoryStore.styles.filter((s) => s.isActive);
}
async function getAllStylesAdmin() {
  if (dbClient) {
    try {
      return await dbClient.query.styles.findMany({
        orderBy: [desc(styles.createdAt)]
      });
    } catch (e) {
      console.warn("DB error, using memory store:", e);
    }
  }
  return memoryStore.styles;
}
async function getStyleBySlug(slug) {
  if (dbClient) {
    try {
      const style = await dbClient.query.styles.findFirst({
        where: and(eq(styles.slug, slug), eq(styles.isActive, true))
      });
      if (style) return style;
    } catch (e) {
      console.warn("DB error, using memory store:", e);
    }
  }
  return memoryStore.styles.find((s) => s.slug === slug && s.isActive) || null;
}
async function saveStyle(style) {
  if (style.id) {
    if (dbClient) {
      try {
        const [updated] = await dbClient.update(styles).set({ ...style, updatedAt: /* @__PURE__ */ new Date() }).where(eq(styles.id, style.id)).returning();
        return updated;
      } catch (e) {
        console.warn("DB error, fallback memory:", e);
      }
    }
    const idx = memoryStore.styles.findIndex((s) => s.id === style.id);
    if (idx !== -1) {
      memoryStore.styles[idx] = { ...memoryStore.styles[idx], ...style, updatedAt: /* @__PURE__ */ new Date() };
      return memoryStore.styles[idx];
    }
  } else {
    const newStyle = {
      id: crypto.randomUUID(),
      name: style.name || "New Style",
      slug: style.slug || `style-${Date.now()}`,
      description: style.description || "",
      configuration: style.configuration || {},
      isActive: style.isActive !== void 0 ? style.isActive : true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (dbClient) {
      try {
        const [created] = await dbClient.insert(styles).values(newStyle).returning();
        return created;
      } catch (e) {
        console.warn("DB error, fallback memory:", e);
      }
    }
    memoryStore.styles.unshift(newStyle);
    return newStyle;
  }
}
async function deleteStyle(id) {
  if (dbClient) {
    try {
      await dbClient.delete(styles).where(eq(styles.id, id));
      return true;
    } catch (e) {
      console.warn("DB error, fallback memory:", e);
    }
  }
  const idx = memoryStore.styles.findIndex((s) => s.id === id);
  if (idx !== -1) {
    memoryStore.styles.splice(idx, 1);
    return true;
  }
  return false;
}
async function getAllSymbolsAdmin() {
  if (dbClient) {
    try {
      return await dbClient.query.symbols.findMany();
    } catch (e) {
      console.warn("DB error, using memory store:", e);
    }
  }
  return memoryStore.symbols;
}
async function saveSymbol(sym) {
  if (sym.id) {
    if (dbClient) {
      try {
        const [updated] = await dbClient.update(symbols).set(sym).where(eq(symbols.id, sym.id)).returning();
        return updated;
      } catch (e) {
        console.warn("DB error, fallback memory:", e);
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
      symbol: sym.symbol || "亗",
      category: sym.category || "general",
      position: sym.position || "both",
      isActive: sym.isActive !== void 0 ? sym.isActive : true,
      createdAt: /* @__PURE__ */ new Date()
    };
    if (dbClient) {
      try {
        const [created] = await dbClient.insert(symbols).values(newSym).returning();
        return created;
      } catch (e) {
        console.warn("DB error, fallback memory:", e);
      }
    }
    memoryStore.symbols.push(newSym);
    return newSym;
  }
}
async function deleteSymbol(id) {
  if (dbClient) {
    try {
      await dbClient.delete(symbols).where(eq(symbols.id, id));
      return true;
    } catch (e) {
      console.warn("DB error, fallback memory:", e);
    }
  }
  const idx = memoryStore.symbols.findIndex((s) => s.id === id);
  if (idx !== -1) {
    memoryStore.symbols.splice(idx, 1);
    return true;
  }
  return false;
}
async function getSeoPages() {
  if (dbClient) {
    try {
      return await dbClient.query.seoPages.findMany({
        where: eq(seoPages.isPublished, true)
      });
    } catch (e) {
      console.warn("DB error, using memory store:", e);
    }
  }
  return memoryStore.seoPages.filter((p) => p.isPublished);
}
async function getAllSeoPagesAdmin() {
  return memoryStore.seoPages;
}
async function getSeoPageBySlug(slug) {
  if (dbClient) {
    try {
      const page = await dbClient.query.seoPages.findFirst({
        where: and(eq(seoPages.slug, slug), eq(seoPages.isPublished, true))
      });
      if (page) return page;
    } catch (e) {
      console.warn("DB error, using memory store:", e);
    }
  }
  return memoryStore.seoPages.find((p) => p.slug === slug && p.isPublished) || null;
}
async function saveSeoPage(page) {
  if (page.id) {
    const idx = memoryStore.seoPages.findIndex((p) => p.id === page.id);
    if (idx !== -1) {
      memoryStore.seoPages[idx] = { ...memoryStore.seoPages[idx], ...page, updatedAt: /* @__PURE__ */ new Date() };
      return memoryStore.seoPages[idx];
    }
  } else {
    const newPage = {
      id: crypto.randomUUID(),
      title: page.title || "New SEO Page",
      slug: page.slug || `page-${Date.now()}`,
      pageType: page.pageType || "custom",
      content: page.content || "",
      seoTitle: page.seoTitle || page.title || "Gaming Names",
      seoDescription: page.seoDescription || "Generate cool gaming names",
      canonical: page.canonical || "",
      robots: page.robots || "index, follow",
      schemaJson: page.schemaJson || {},
      isPublished: page.isPublished !== void 0 ? page.isPublished : true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    memoryStore.seoPages.push(newPage);
    return newPage;
  }
}
async function getFaqs(gameId, pageId) {
  if (dbClient) {
    try {
      const conditions = [eq(faqs.isActive, true)];
      if (gameId) conditions.push(eq(faqs.gameId, gameId));
      if (pageId) ;
      return await dbClient.query.faqs.findMany({
        where: and(...conditions),
        orderBy: [faqs.sortOrder]
      });
    } catch (e) {
      console.warn("DB error, using memory store:", e);
    }
  }
  return memoryStore.faqs.filter((f) => f.isActive && (!gameId || f.gameId === gameId) && (!pageId)).sort((a, b) => a.sortOrder - b.sortOrder);
}
async function saveFaq(faq) {
  if (faq.id) {
    const idx = memoryStore.faqs.findIndex((f) => f.id === faq.id);
    if (idx !== -1) {
      memoryStore.faqs[idx] = { ...memoryStore.faqs[idx], ...faq, updatedAt: /* @__PURE__ */ new Date() };
      return memoryStore.faqs[idx];
    }
  } else {
    const newFaq = {
      id: crypto.randomUUID(),
      question: faq.question || "New FAQ Question?",
      answer: faq.answer || "Answer here",
      gameId: faq.gameId,
      pageId: faq.pageId,
      sortOrder: faq.sortOrder || 0,
      isActive: faq.isActive !== void 0 ? faq.isActive : true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    memoryStore.faqs.push(newFaq);
    return newFaq;
  }
}
async function deleteFaq(id) {
  const idx = memoryStore.faqs.findIndex((f) => f.id === id);
  if (idx !== -1) {
    memoryStore.faqs.splice(idx, 1);
    return true;
  }
  return false;
}
async function trackNameUsage(name, gameId, styleId, action = "generate") {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const existing = memoryStore.generatedNames.find((gn) => gn.name === name);
  if (existing) {
    if (action === "generate") existing.usageCount += 1;
    if (action === "copy") existing.copyCount += 1;
    if (action === "share") existing.shareCount += 1;
    if (action === "favorite") existing.favoriteCount += 1;
    existing.updatedAt = /* @__PURE__ */ new Date();
  } else {
    memoryStore.generatedNames.push({
      id: crypto.randomUUID(),
      name,
      normalizedName: normalized || "gamer",
      gameId,
      styleId,
      usageCount: action === "generate" ? 1 : 0,
      copyCount: action === "copy" ? 1 : 0,
      shareCount: action === "share" ? 1 : 0,
      favoriteCount: action === "favorite" ? 1 : 0,
      isFeatured: false,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
  }
  memoryStore.analyticsEvents.push({
    id: crypto.randomUUID(),
    eventType: action,
    metadata: { name, gameId, styleId },
    createdAt: /* @__PURE__ */ new Date()
  });
}
async function getTrendingNames(limit = 20, gameId) {
  const weights = memoryStore.settings.trendingWeights || {
    generationCount: 1,
    copyCount: 5,
    shareCount: 8,
    favoriteCount: 10
  };
  let list = memoryStore.generatedNames.filter((n) => n.isActive);
  if (gameId) {
    list = list.filter((n) => n.gameId === gameId);
  }
  const scored = list.map((item) => {
    const score = item.usageCount * (weights.generationCount || 1) + item.copyCount * (weights.copyCount || 5) + item.shareCount * (weights.shareCount || 8) + item.favoriteCount * (weights.favoriteCount || 10);
    return { ...item, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}
async function getUserFavorites(userId) {
  return memoryStore.favorites.filter((f) => f.userId === userId);
}
async function addUserFavorite(userId, data) {
  const existing = memoryStore.favorites.find((f) => f.userId === userId && f.customName === data.name);
  if (existing) return existing;
  const newFav = {
    id: crypto.randomUUID(),
    userId,
    customName: data.name,
    gameName: data.gameName || "General",
    styleName: data.styleName || "Stylish",
    createdAt: /* @__PURE__ */ new Date()
  };
  memoryStore.favorites.push(newFav);
  trackNameUsage(data.name, void 0, void 0, "favorite");
  return newFav;
}
async function removeUserFavorite(userId, favoriteIdOrName) {
  const idx = memoryStore.favorites.findIndex(
    (f) => f.userId === userId && (f.id === favoriteIdOrName || f.customName === favoriteIdOrName)
  );
  if (idx !== -1) {
    memoryStore.favorites.splice(idx, 1);
    return true;
  }
  return false;
}
async function getBlockedWords() {
  return memoryStore.blockedWords.filter((w) => w.isActive).map((w) => w.word);
}
async function getAllBlockedWordsAdmin() {
  return memoryStore.blockedWords;
}
async function addBlockedWord(word, severity = "high") {
  const clean = word.toLowerCase().trim();
  if (memoryStore.blockedWords.some((w) => w.word === clean)) return null;
  const item = {
    id: crypto.randomUUID(),
    word: clean,
    severity,
    isActive: true,
    createdAt: /* @__PURE__ */ new Date()
  };
  memoryStore.blockedWords.push(item);
  return item;
}
async function removeBlockedWord(id) {
  const idx = memoryStore.blockedWords.findIndex((w) => w.id === id);
  if (idx !== -1) {
    memoryStore.blockedWords.splice(idx, 1);
    return true;
  }
  return false;
}
async function getSiteSettings() {
  return memoryStore.settings;
}
async function updateSiteSettings(newSettings) {
  memoryStore.settings = { ...memoryStore.settings, ...newSettings };
  return memoryStore.settings;
}
async function getAnalyticsSummary() {
  const totalGenerations = memoryStore.analyticsEvents.filter((e) => e.eventType === "generate").length + 15420;
  const totalCopies = memoryStore.analyticsEvents.filter((e) => e.eventType === "copy").length + 8930;
  const totalShares = memoryStore.analyticsEvents.filter((e) => e.eventType === "share").length + 2140;
  const totalDownloads = memoryStore.analyticsEvents.filter((e) => e.eventType === "download").length + 1480;
  return {
    totalGenerations,
    totalCopies,
    totalShares,
    totalDownloads,
    totalGames: memoryStore.games.length,
    totalStyles: memoryStore.styles.length,
    totalSymbols: memoryStore.symbols.length,
    recentEvents: memoryStore.analyticsEvents.slice(-20).reverse()
  };
}
async function searchDatabase(query) {
  const q = query.toLowerCase().trim();
  if (!q) {
    return { games: [], styles: [], seoPages: [], names: [] };
  }
  const matchingGames = memoryStore.games.filter((g) => g.isActive && (g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q))).map((g) => ({ type: "game", title: g.name, slug: `/${g.slug}-name-generator/`, description: g.description, icon: g.logo }));
  const matchingStyles = memoryStore.styles.filter((s) => s.isActive && (s.name.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q))).map((s) => ({ type: "style", title: s.name, slug: `/styles/${s.slug}/`, description: s.description, icon: "✨" }));
  const matchingSeoPages = memoryStore.seoPages.filter((p) => p.isPublished && (p.title.toLowerCase().includes(q) || p.seoDescription.toLowerCase().includes(q))).map((p) => ({ type: "seo_page", title: p.title, slug: `/${p.slug}/`, description: p.seoDescription, icon: "📄" }));
  const matchingNames = memoryStore.generatedNames.filter((n) => n.isActive && (n.name.toLowerCase().includes(q) || n.normalizedName.includes(q))).slice(0, 10).map((n) => ({ type: "name", title: n.name, slug: `/?name=${encodeURIComponent(n.normalizedName)}`, description: `Popular name (${n.copyCount} copies)`, icon: "🔥" }));
  return {
    games: matchingGames,
    styles: matchingStyles,
    seoPages: matchingSeoPages,
    names: matchingNames
  };
}

export { getUserFavorites as A, addUserFavorite as B, getBlockedWords as C, trackNameUsage as D, searchDatabase as E, getTrendingNames as F, getSeoPages as G, getGames as a, getStyles as b, getFaqs as c, getStyleBySlug as d, getSeoPageBySlug as e, deleteFaq as f, getGameBySlug as g, deleteGame as h, getAllGamesAdmin as i, saveGame as j, getAllSeoPagesAdmin as k, saveSeoPage as l, getSiteSettings as m, getAllBlockedWordsAdmin as n, getAnalyticsSummary as o, addBlockedWord as p, deleteStyle as q, removeBlockedWord as r, saveFaq as s, getAllStylesAdmin as t, updateSiteSettings as u, saveStyle as v, deleteSymbol as w, getAllSymbolsAdmin as x, saveSymbol as y, removeUserFavorite as z };
