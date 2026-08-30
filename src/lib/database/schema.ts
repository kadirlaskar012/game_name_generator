import { pgTable, text, timestamp, boolean, uuid, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// 1. Games Table
export const games = pgTable(
  'games',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull(),
    logo: text('logo'),
    ogImage: text('og_image'),
    isActive: boolean('is_active').default(true).notNull(),
    isFeatured: boolean('is_featured').default(false).notNull(),
    rules: jsonb('rules').$type<{
      maxLength: number;
      minLength: number;
      allowedRegex?: string;
      forbiddenChars?: string[];
      preferredSymbols?: string[];
      nameFormat?: string;
      customPrefixes?: string[];
      customSuffixes?: string[];
    }>().notNull().default({
      maxLength: 14,
      minLength: 3,
      allowedRegex: '.*',
      forbiddenChars: [],
      preferredSymbols: ['亗', '乂', 'メ', '々', '么'],
    }),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index('games_slug_idx').on(table.slug),
    activeIdx: index('games_active_idx').on(table.isActive),
    featuredIdx: index('games_featured_idx').on(table.isFeatured),
  })
);

// 2. Categories Table
export const categories = pgTable(
  'categories',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    gameId: uuid('game_id').references(() => games.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    description: text('description'),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    gameIdIdx: index('categories_game_id_idx').on(table.gameId),
    slugIdx: index('categories_slug_idx').on(table.slug),
    activeIdx: index('categories_active_idx').on(table.isActive),
  })
);

// 3. Styles Table
export const styles = pgTable(
  'styles',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    configuration: jsonb('configuration').$type<{
      unicodeFont?: string;
      prefixSymbols?: string[];
      suffixSymbols?: string[];
      bracketPair?: [string, string];
      casing?: 'uppercase' | 'lowercase' | 'capitalize' | 'original';
      glitchIntensity?: number;
      leetspeak?: boolean;
    }>().notNull().default({}),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index('styles_slug_idx').on(table.slug),
    activeIdx: index('styles_active_idx').on(table.isActive),
  })
);

// 4. Symbols Table
export const symbols = pgTable(
  'symbols',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    symbol: text('symbol').notNull(),
    category: text('category').notNull().default('general'), // e.g. wings, weapons, brackets, crowns, japanese, faces, dividers
    position: text('position').notNull().default('both'), // 'prefix' | 'suffix' | 'both' | 'inline'
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    categoryIdx: index('symbols_category_idx').on(table.category),
    activeIdx: index('symbols_active_idx').on(table.isActive),
  })
);

// 5. Name Templates Table
export const nameTemplates = pgTable(
  'name_templates',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    template: text('template').notNull(), // e.g. "亗 {name} 亗", "『{name}』メ", "꧁༺{name}༻꧂"
    styleId: uuid('style_id').references(() => styles.id, { onDelete: 'cascade' }),
    gameId: uuid('game_id').references(() => games.id, { onDelete: 'cascade' }),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    styleIdIdx: index('templates_style_id_idx').on(table.styleId),
    gameIdIdx: index('templates_game_id_idx').on(table.gameId),
    activeIdx: index('templates_active_idx').on(table.isActive),
  })
);

// 6. SEO Pages Table
export const seoPages = pgTable(
  'seo_pages',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    pageType: text('page_type').notNull().default('custom'), // 'game' | 'style' | 'category' | 'custom'
    content: text('content').notNull().default(''),
    seoTitle: text('seo_title').notNull(),
    seoDescription: text('seo_description').notNull(),
    canonical: text('canonical'),
    robots: text('robots').default('index, follow').notNull(),
    schemaJson: jsonb('schema_json').$type<Record<string, unknown>>().default({}),
    isPublished: boolean('is_published').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index('seo_pages_slug_idx').on(table.slug),
    publishedIdx: index('seo_pages_published_idx').on(table.isPublished),
  })
);

// 7. FAQs Table
export const faqs = pgTable(
  'faqs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    pageId: uuid('page_id').references(() => seoPages.id, { onDelete: 'cascade' }),
    gameId: uuid('game_id').references(() => games.id, { onDelete: 'cascade' }),
    sortOrder: integer('sort_order').default(0).notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    pageIdIdx: index('faqs_page_id_idx').on(table.pageId),
    gameIdIdx: index('faqs_game_id_idx').on(table.gameId),
    activeIdx: index('faqs_active_idx').on(table.isActive),
    sortOrderIdx: index('faqs_sort_order_idx').on(table.sortOrder),
  })
);

// 8. Generated Names Table (Trending & Popular Names)
export const generatedNames = pgTable(
  'generated_names',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    normalizedName: text('normalized_name').notNull(),
    gameId: uuid('game_id').references(() => games.id, { onDelete: 'set null' }),
    styleId: uuid('style_id').references(() => styles.id, { onDelete: 'set null' }),
    usageCount: integer('usage_count').default(1).notNull(),
    copyCount: integer('copy_count').default(0).notNull(),
    shareCount: integer('share_count').default(0).notNull(),
    favoriteCount: integer('favorite_count').default(0).notNull(),
    isFeatured: boolean('is_featured').default(false).notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    nameIdx: index('gen_names_name_idx').on(table.name),
    normIdx: index('gen_names_norm_idx').on(table.normalizedName),
    gameIdIdx: index('gen_names_game_id_idx').on(table.gameId),
    styleIdIdx: index('gen_names_style_id_idx').on(table.styleId),
    countsIdx: index('gen_names_counts_idx').on(table.copyCount, table.favoriteCount, table.usageCount),
  })
);

// 9. Favorites Table
export const favorites = pgTable(
  'favorites',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull(),
    nameId: uuid('name_id').references(() => generatedNames.id, { onDelete: 'cascade' }),
    customName: text('custom_name'),
    gameName: text('game_name'),
    styleName: text('style_name'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('favorites_user_id_idx').on(table.userId),
    nameIdIdx: index('favorites_name_id_idx').on(table.nameId),
  })
);

// 10. Blocked Words / Profanity Filter Table
export const blockedWords = pgTable(
  'blocked_words',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    word: text('word').notNull().unique(),
    severity: text('severity').notNull().default('high'), // 'low' | 'medium' | 'high'
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    wordIdx: index('blocked_words_word_idx').on(table.word),
    activeIdx: index('blocked_words_active_idx').on(table.isActive),
  })
);

// 11. Site Settings Table
export const siteSettings = pgTable(
  'site_settings',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    key: text('key').notNull().unique(),
    value: jsonb('value').$type<Record<string, unknown>>().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    keyIdx: index('site_settings_key_idx').on(table.key),
  })
);

// 12. Analytics Events Table
export const analyticsEvents = pgTable(
  'analytics_events',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    eventType: text('event_type').notNull(), // 'generate' | 'copy' | 'share' | 'download' | 'favorite' | 'search'
    metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
    userId: uuid('user_id'),
    ipHash: text('ip_hash'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    typeIdx: index('analytics_event_type_idx').on(table.eventType),
    createdAtIdx: index('analytics_created_at_idx').on(table.createdAt),
  })
);

// Types
export type Game = typeof games.$inferSelect;
export type NewGame = typeof games.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Style = typeof styles.$inferSelect;
export type NewStyle = typeof styles.$inferInsert;

export type SymbolItem = typeof symbols.$inferSelect;
export type NewSymbolItem = typeof symbols.$inferInsert;

export type NameTemplate = typeof nameTemplates.$inferSelect;
export type NewNameTemplate = typeof nameTemplates.$inferInsert;

export type SeoPage = typeof seoPages.$inferSelect;
export type NewSeoPage = typeof seoPages.$inferInsert;

export type Faq = typeof faqs.$inferSelect;
export type NewFaq = typeof faqs.$inferInsert;

export type GeneratedName = typeof generatedNames.$inferSelect;
export type NewGeneratedName = typeof generatedNames.$inferInsert;

export type Favorite = typeof favorites.$inferSelect;
export type NewFavorite = typeof favorites.$inferInsert;

export type BlockedWord = typeof blockedWords.$inferSelect;
export type NewBlockedWord = typeof blockedWords.$inferInsert;

export type SiteSetting = typeof siteSettings.$inferSelect;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
