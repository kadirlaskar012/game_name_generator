import { z } from 'zod';

const generateRequestSchema = z.object({
  name: z.string().max(50, "Name must be 50 characters or fewer").optional().default(""),
  game: z.string().max(100).optional(),
  gameId: z.string().max(100).optional(),
  gameSlug: z.string().max(100).optional(),
  style: z.string().max(100).optional(),
  styleId: z.string().max(100).optional(),
  styleSlug: z.string().max(100).optional(),
  gender: z.enum(["all", "boy", "girl", "clan", "esports"]).optional().default("all"),
  language: z.enum(["all", "en", "ja", "hi", "es"]).optional().default("all"),
  symbols: z.boolean().optional().default(true),
  length: z.enum(["all", "short", "medium", "long"]).optional().default("all"),
  count: z.number().int().min(1).max(100).optional().default(24),
  offset: z.number().int().min(0).optional().default(0),
  seed: z.number().int().optional()
});
const searchQuerySchema = z.object({
  q: z.string().min(1, "Search query cannot be empty").max(100, "Search query too long")
});
const trackEventSchema = z.object({
  name: z.string().min(1),
  action: z.enum(["generate", "copy", "share", "download", "favorite"]).default("copy"),
  gameId: z.string().optional(),
  styleId: z.string().optional()
});
const favoriteRequestSchema = z.object({
  name: z.string().min(1).max(100),
  gameName: z.string().max(100).optional(),
  styleName: z.string().max(100).optional()
});
const adminGameSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must have at least 2 characters"),
  slug: z.string().min(2),
  description: z.string().default(""),
  logo: z.string().default("🎮"),
  ogImage: z.string().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  rules: z.object({
    maxLength: z.number().int().min(1).max(50),
    minLength: z.number().int().min(1).max(10),
    allowedRegex: z.string().optional(),
    forbiddenChars: z.array(z.string()).optional(),
    preferredSymbols: z.array(z.string()).optional(),
    customPrefixes: z.array(z.string()).optional(),
    customSuffixes: z.array(z.string()).optional()
  }).default({ maxLength: 14, minLength: 3 }),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});
const adminStyleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().default(""),
  configuration: z.record(z.any()).default({}),
  isActive: z.boolean().default(true)
});
const adminSymbolSchema = z.object({
  id: z.string().optional(),
  symbol: z.string().min(1),
  category: z.string().min(1).default("general"),
  position: z.enum(["prefix", "suffix", "both", "inline"]).default("both"),
  isActive: z.boolean().default(true)
});
const adminSeoPageSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  slug: z.string().min(2),
  pageType: z.enum(["game", "style", "category", "custom"]).default("custom"),
  content: z.string().default(""),
  seoTitle: z.string().min(2),
  seoDescription: z.string().min(2),
  canonical: z.string().optional(),
  robots: z.string().default("index, follow"),
  schemaJson: z.record(z.any()).default({}),
  isPublished: z.boolean().default(true)
});
const adminFaqSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(5),
  answer: z.string().min(5),
  gameId: z.string().optional(),
  pageId: z.string().optional(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true)
});

export { adminFaqSchema as a, adminGameSchema as b, adminSeoPageSchema as c, adminStyleSchema as d, adminSymbolSchema as e, favoriteRequestSchema as f, generateRequestSchema as g, searchQuerySchema as s, trackEventSchema as t };
