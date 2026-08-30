import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { pgTable, timestamp, text, jsonb, boolean, uuid, index, integer } from 'drizzle-orm/pg-core';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const games = pgTable(
  "games",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull(),
    logo: text("logo"),
    ogImage: text("og_image"),
    isActive: boolean("is_active").default(true).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    rules: jsonb("rules").$type().notNull().default({
      maxLength: 14,
      minLength: 3,
      allowedRegex: ".*",
      forbiddenChars: [],
      preferredSymbols: ["亗", "乂", "メ", "々", "么"]
    }),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    slugIdx: index("games_slug_idx").on(table.slug),
    activeIdx: index("games_active_idx").on(table.isActive),
    featuredIdx: index("games_featured_idx").on(table.isFeatured)
  })
);
const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    gameId: uuid("game_id").references(() => games.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    gameIdIdx: index("categories_game_id_idx").on(table.gameId),
    slugIdx: index("categories_slug_idx").on(table.slug),
    activeIdx: index("categories_active_idx").on(table.isActive)
  })
);
const styles = pgTable(
  "styles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    configuration: jsonb("configuration").$type().notNull().default({}),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    slugIdx: index("styles_slug_idx").on(table.slug),
    activeIdx: index("styles_active_idx").on(table.isActive)
  })
);
const symbols = pgTable(
  "symbols",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    symbol: text("symbol").notNull(),
    category: text("category").notNull().default("general"),
    // e.g. wings, weapons, brackets, crowns, japanese, faces, dividers
    position: text("position").notNull().default("both"),
    // 'prefix' | 'suffix' | 'both' | 'inline'
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    categoryIdx: index("symbols_category_idx").on(table.category),
    activeIdx: index("symbols_active_idx").on(table.isActive)
  })
);
const nameTemplates = pgTable(
  "name_templates",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    template: text("template").notNull(),
    // e.g. "亗 {name} 亗", "『{name}』メ", "꧁༺{name}༻꧂"
    styleId: uuid("style_id").references(() => styles.id, { onDelete: "cascade" }),
    gameId: uuid("game_id").references(() => games.id, { onDelete: "cascade" }),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    styleIdIdx: index("templates_style_id_idx").on(table.styleId),
    gameIdIdx: index("templates_game_id_idx").on(table.gameId),
    activeIdx: index("templates_active_idx").on(table.isActive)
  })
);
const seoPages = pgTable(
  "seo_pages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    pageType: text("page_type").notNull().default("custom"),
    // 'game' | 'style' | 'category' | 'custom'
    content: text("content").notNull().default(""),
    seoTitle: text("seo_title").notNull(),
    seoDescription: text("seo_description").notNull(),
    canonical: text("canonical"),
    robots: text("robots").default("index, follow").notNull(),
    schemaJson: jsonb("schema_json").$type().default({}),
    isPublished: boolean("is_published").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    slugIdx: index("seo_pages_slug_idx").on(table.slug),
    publishedIdx: index("seo_pages_published_idx").on(table.isPublished)
  })
);
const faqs = pgTable(
  "faqs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    pageId: uuid("page_id").references(() => seoPages.id, { onDelete: "cascade" }),
    gameId: uuid("game_id").references(() => games.id, { onDelete: "cascade" }),
    sortOrder: integer("sort_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    pageIdIdx: index("faqs_page_id_idx").on(table.pageId),
    gameIdIdx: index("faqs_game_id_idx").on(table.gameId),
    activeIdx: index("faqs_active_idx").on(table.isActive),
    sortOrderIdx: index("faqs_sort_order_idx").on(table.sortOrder)
  })
);
const generatedNames = pgTable(
  "generated_names",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    normalizedName: text("normalized_name").notNull(),
    gameId: uuid("game_id").references(() => games.id, { onDelete: "set null" }),
    styleId: uuid("style_id").references(() => styles.id, { onDelete: "set null" }),
    usageCount: integer("usage_count").default(1).notNull(),
    copyCount: integer("copy_count").default(0).notNull(),
    shareCount: integer("share_count").default(0).notNull(),
    favoriteCount: integer("favorite_count").default(0).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    nameIdx: index("gen_names_name_idx").on(table.name),
    normIdx: index("gen_names_norm_idx").on(table.normalizedName),
    gameIdIdx: index("gen_names_game_id_idx").on(table.gameId),
    styleIdIdx: index("gen_names_style_id_idx").on(table.styleId),
    countsIdx: index("gen_names_counts_idx").on(table.copyCount, table.favoriteCount, table.usageCount)
  })
);
const favorites = pgTable(
  "favorites",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    nameId: uuid("name_id").references(() => generatedNames.id, { onDelete: "cascade" }),
    customName: text("custom_name"),
    gameName: text("game_name"),
    styleName: text("style_name"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    userIdIdx: index("favorites_user_id_idx").on(table.userId),
    nameIdIdx: index("favorites_name_id_idx").on(table.nameId)
  })
);
const blockedWords = pgTable(
  "blocked_words",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    word: text("word").notNull().unique(),
    severity: text("severity").notNull().default("high"),
    // 'low' | 'medium' | 'high'
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    wordIdx: index("blocked_words_word_idx").on(table.word),
    activeIdx: index("blocked_words_active_idx").on(table.isActive)
  })
);
const siteSettings = pgTable(
  "site_settings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    key: text("key").notNull().unique(),
    value: jsonb("value").$type().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    keyIdx: index("site_settings_key_idx").on(table.key)
  })
);
const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    eventType: text("event_type").notNull(),
    // 'generate' | 'copy' | 'share' | 'download' | 'favorite' | 'search'
    metadata: jsonb("metadata").$type().default({}),
    userId: uuid("user_id"),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    typeIdx: index("analytics_event_type_idx").on(table.eventType),
    createdAtIdx: index("analytics_created_at_idx").on(table.createdAt)
  })
);

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  analyticsEvents,
  blockedWords,
  categories,
  faqs,
  favorites,
  games,
  generatedNames,
  nameTemplates,
  seoPages,
  siteSettings,
  styles,
  symbols
}, Symbol.toStringTag, { value: 'Module' }));

function loadEnv() {
  try {
    const envPath = path.resolve(".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...vals] = trimmed.split("=");
          const val = vals.join("=").replace(/^["']|["']$/g, "");
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val.trim();
          }
        }
      }
    }
  } catch {
  }
}
loadEnv();
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres.xfhwgmnlzrbikvfcdtws:vjZEfPicn6GRLuYk@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres";
const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL || "https://xfhwgmnlzrbikvfcdtws.supabase.co";
const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
let dbClient = null;
if (!DATABASE_URL.includes("your-project-id")) {
  try {
    const queryClient = postgres(DATABASE_URL, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10
    });
    dbClient = drizzle(queryClient, { schema });
  } catch (err) {
    console.warn("Postgres connection failed, using fallback in-memory store:", err);
  }
}
const getSupabaseClient = (serviceRole = false) => {
  if (SUPABASE_URL.includes("your-project")) {
    return null;
  }
  const key = serviceRole && SUPABASE_SERVICE_ROLE_KEY ? SUPABASE_SERVICE_ROLE_KEY : SUPABASE_ANON_KEY;
  return createClient(SUPABASE_URL, key || "dummy", {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
};

export { games as a, seoPages as b, symbols as c, dbClient as d, faqs as f, getSupabaseClient as g, styles as s };
