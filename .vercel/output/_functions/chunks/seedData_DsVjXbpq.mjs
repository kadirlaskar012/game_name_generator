const SEED_GAMES = [
  {
    id: "11111111-1111-1111-1111-111111111101",
    name: "Free Fire / FF Max",
    slug: "free-fire",
    description: "Generate stylish names, boss crowns (亗), and wing symbols for Garena Free Fire and Free Fire MAX with 12 character limit.",
    logo: "🔥",
    isActive: true,
    isFeatured: true,
    rules: {
      maxLength: 12,
      minLength: 3,
      allowedRegex: "^[\\p{L}\\p{N}\\p{M}\\p{S}\\p{P}\\s]+$",
      forbiddenChars: ["\n", "\r", "	"],
      preferredSymbols: ["亗", "👑", "☬", "꧁༺", "༻꧂", "࿐", "么", "々", "メ", "⚡", "☠", "╰‿╯", "乂"],
      customPrefixes: ["OP", "V •", "BOSS", "RAISTAR", "BADGE99", "TOTAL", "FF", "SK"],
      customSuffixes: ["999", "YT", "FF", "007", "VIP", "OFFICIAL", "GOD", "444", "777"]
    },
    seoTitle: "Free Fire Stylish Name Generator 2026 — 100% In-Game Compatible FF Names (亗, ꧁༺ ༻꧂)",
    seoDescription: "Generate stylish Free Fire names with boss crowns, angel wings, and Small Caps fonts. Compliant with Garena Free Fire 12 character limit."
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    name: "BGMI / PUBG Mobile",
    slug: "bgmi",
    description: "Craft pro gamer tags, Japanese katakana suffixes (メ, 々, 么, 〆), and clan brackets for Battlegrounds Mobile India.",
    logo: "🎯",
    isActive: true,
    isFeatured: true,
    rules: {
      maxLength: 14,
      minLength: 3,
      allowedRegex: "^[\\p{L}\\p{N}\\p{M}\\p{S}\\p{P}\\s]+$",
      forbiddenChars: ["\n", "\r", "	"],
      preferredSymbols: ["メ", "〆", "々", "么", "乡", "『", "』", "【", "】", "父", "气", "神"],
      customPrefixes: ["MORTAL", "SCOUT", "JONATHAN", "DYNAMO", "SOUL", "GODL", "TX", "BLIND"],
      customSuffixes: ["メ", "〆", "々", "么", "OP", "YT", "GAMING", "T1", "M416"]
    },
    seoTitle: "BGMI Stylish Name Generator — PUBG Mobile Nicknames with Japanese Symbols (メ, 々, 〆)",
    seoDescription: "Generate pro BGMI names with Japanese symbols, clan tags, and attitude text within Krafton 14 character limit."
  },
  {
    id: "11111111-1111-1111-1111-111111111103",
    name: "Valorant",
    slug: "valorant",
    description: "Minimalist, clean, and tournament-ready Riot ID tags with Small Caps, dot dividers, and VLR clan identifiers.",
    logo: "⚔️",
    isActive: true,
    isFeatured: true,
    rules: {
      maxLength: 16,
      minLength: 3,
      allowedRegex: "^[\\p{L}\\p{N}\\p{M}\\p{S}\\p{P}\\s]+$",
      forbiddenChars: ["\n", "\r", "	"],
      preferredSymbols: ["•", "·", "/", "|", "—", "×", "ø", "†", "::", "◈"],
      customPrefixes: ["VLR", "RADIANT", "IMMORTAL", "ACE", "T1", "SEN", "FNC", "PRX"],
      customSuffixes: ["VLR", "FPS", "ACE", "240HZ", "AIM", "1TAP", "PRO", "CLUTCH"]
    },
    seoTitle: "Valorant Name Generator — Aesthetic Riot IDs & Clean Small Caps IGNs",
    seoDescription: "Generate clean, aesthetic Valorant gamer tags in Small Caps and minimal esports formats within Riot Games 16 character limit."
  },
  {
    id: "11111111-1111-1111-1111-111111111104",
    name: "Call of Duty: Mobile",
    slug: "codm",
    description: "Military attitude aliases, skull emblems (☠, ⚔), and clan squad tags for Activision CODM.",
    logo: "💀",
    isActive: true,
    isFeatured: false,
    rules: {
      maxLength: 14,
      minLength: 3,
      allowedRegex: "^[\\p{L}\\p{N}\\p{M}\\p{S}\\p{P}\\s]+$",
      forbiddenChars: [],
      preferredSymbols: ["☠", "⚔", "⚡", "☣", "✘", "𝕏", "🎯", "×", "•"],
      customPrefixes: ["GHOST", "REAPER", "TASK141", "SOAP", "PRICE", "NUKE"],
      customSuffixes: ["YT", "CODM", "FPS", "PRO", "LEGEND", "WARZONE"]
    },
    seoTitle: "CODM Stylish Name Generator — Call of Duty Mobile Nicknames & Symbols",
    seoDescription: "Generate lethal Call of Duty Mobile gamer tags with military symbols, crosshairs, and squad identifiers."
  },
  {
    id: "11111111-1111-1111-1111-111111111105",
    name: "Fortnite",
    slug: "fortnite",
    description: "Sweaty clan tags, smileys (ツ), and competitive 240FPS aliases for Epic Games Fortnite.",
    logo: "⚡",
    isActive: true,
    isFeatured: false,
    rules: {
      maxLength: 16,
      minLength: 3,
      preferredSymbols: ["ツ", "✿", "⚡", "★", "×", "•", "—"],
      customPrefixes: ["FAZE", "FN", "BOXED", "SWEAT", "CRACKED", "NOT", "ITS"],
      customSuffixes: ["FN", "ON240FPS", "BOXED", "CLUTCH", "EXE"]
    },
    seoTitle: "Fortnite Sweaty Name Generator — Epic Games Competitive Nicknames",
    seoDescription: "Generate sweaty Fortnite player tags with Japanese smileys (ツ) and clean minimal aesthetic symbols."
  },
  {
    id: "11111111-1111-1111-1111-111111111106",
    name: "Roblox",
    slug: "roblox",
    description: "Cute, aesthetic, soft, and aesthetic symbols (✿, ♡, 🧸) compliant with Roblox username filters.",
    logo: "🧱",
    isActive: true,
    isFeatured: false,
    rules: {
      maxLength: 20,
      minLength: 3,
      preferredSymbols: ["✿", "♡", "✧", "⋆", "🧸", "ʚɞ", "✰", "❀"],
      customPrefixes: ["xX", "i_", "rblx_", "queen_", "king_", "sweet_", "soft_"],
      customSuffixes: ["Xx", "_rblx", "_vibes", "_cutie", "♡", "✿", "_yt"]
    },
    seoTitle: "Roblox Aesthetic Name Generator — Cute & Soft Roblox Nicknames (✿, ♡)",
    seoDescription: "Generate aesthetic, cute, and soft Roblox usernames with hearts, sparkles, and flower symbols."
  },
  {
    id: "11111111-1111-1111-1111-111111111107",
    name: "Minecraft",
    slug: "minecraft",
    description: "Classic PvP gamertags, clean alphanumeric aliases, and underscore separators for Java & Bedrock.",
    logo: "⛏️",
    isActive: true,
    isFeatured: false,
    rules: {
      maxLength: 16,
      minLength: 3,
      allowedRegex: "^[a-zA-Z0-9_]+$",
      preferredSymbols: ["_"],
      customPrefixes: ["MC_", "x_", "Craft_", "PvP_", "Not", "Real", "The"],
      customSuffixes: ["_MC", "_PvP", "_God", "_HD", "_Craft", "_YT"]
    },
    seoTitle: "Minecraft IGN Generator — Best Java & Bedrock PvP Nicknames",
    seoDescription: "Generate clean, memorable Minecraft usernames and PvP gamer tags for Java & Bedrock editions."
  },
  {
    id: "11111111-1111-1111-1111-111111111108",
    name: "Esports & Clan Squads",
    slug: "esports-clan",
    description: "Tournament squad tags, clan brackets (『』, 【】, 𓊈𓊉), and guild names for all competitive esports titles.",
    logo: "🏆",
    isActive: true,
    isFeatured: true,
    rules: {
      maxLength: 16,
      minLength: 3,
      preferredSymbols: ["『", "』", "【", "】", "𓊈", "𓊉", "《", "》", "❮", "❯", "亗", "メ", "〆", "乡"],
      customPrefixes: ["SOUL", "GODL", "TSG", "FAZE", "T1", "NAVI", "OPTIC", "VLR", "RASTAR", "TOTAL"],
      customSuffixes: ["ESPORTS", "CLAN", "SQUAD", "OFFICIAL", "ARMY", "LEGACY", "GAMING"]
    },
    seoTitle: "Esports Clan Name Generator — Professional Squad & Guild Tags",
    seoDescription: "Generate uniform clan tags, squad identifiers, and esports guild names with bracket wraps and symbols."
  }
];
const SEED_STYLES = [
  {
    id: "22222222-2222-2222-2222-222222222201",
    name: "Small Caps",
    slug: "small-caps",
    description: "Clean, modern Small Caps mathematical font transformation (ᴋᴀᴅɪʀ) widely used in pro esports.",
    configuration: { unicodeFont: "small_caps", casing: "preserve" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222202",
    name: "Boss Crown",
    slug: "boss-crown",
    description: "Prestigious Free Fire boss crown emblems (亗, 👑, ☬) and royal crests.",
    configuration: { decoratorPrefix: "亗", decoratorSuffix: "亗", allowedSymbols: ["亗", "👑", "♛", "☬", "⚜"] },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222203",
    name: "Angel Wings",
    slug: "wings",
    description: "Flowing angel wing symbols (꧁༺ ༻꧂, ༺ ༻, ʚ ɞ) for celestial names.",
    configuration: { bracketPair: ["꧁༺", "༻꧂"], allowedSymbols: ["꧁༺", "༻꧂", "༺", "༻", "ʚ", "ɞ", "࿐"] },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222204",
    name: "Japanese Katakana",
    slug: "japanese-katakana",
    description: "Iconic anime and BGMI katakana glyphs (メ, 々, 么, 〆, 乡).",
    configuration: { decoratorSuffix: "メ", allowedSymbols: ["メ", "々", "么", "〆", "乡", "ッ", "神", "鬼"] },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222205",
    name: "Bold Gothic",
    slug: "gothic-fraktur",
    description: "Heavy Blackletter Gothic Fraktur font (𝕶𝖆𝖉𝖎𝖗) for dark warrior names.",
    configuration: { unicodeFont: "bold_gothic", casing: "preserve" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222206",
    name: "Classic Gothic",
    slug: "classic-gothic",
    description: "Classic Medieval Fraktur font (𝔎𝔞𝔡𝔦𝔯) for fantasy knights.",
    configuration: { unicodeFont: "gothic", casing: "preserve" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222207",
    name: "Bold Script",
    slug: "bold-script",
    description: "Bold Calligraphy Script (𝓚𝓪𝓭𝓲𝓻) with flowing curves.",
    configuration: { unicodeFont: "bold_cursive", casing: "preserve" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222208",
    name: "Cursive Script",
    slug: "cursive-script",
    description: "Delicate cursive handwriting (𝒦𝒶𝒹𝒾𝓇).",
    configuration: { unicodeFont: "cursive", casing: "preserve" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222209",
    name: "Clan Brackets",
    slug: "clan-brackets",
    description: "Esports squad brackets (『』, 【】, 𓊈𓊉, 《》, ❮❯).",
    configuration: { bracketPair: ["『", "』"], allowedSymbols: ["『", "』", "【", "】", "𓊈", "𓊉", "《", "》"] },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222210",
    name: "Attitude Cross",
    slug: "attitude-cross",
    description: "Lethal weapons and attitude cross marks (乂, ⚔, ☠, ⚡, ✞).",
    configuration: { decoratorPrefix: "乂", decoratorSuffix: "乂", allowedSymbols: ["乂", "⚔", "☠", "⚡", "✞", "†"] },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222211",
    name: "Clean Spaced",
    slug: "clean-spaced",
    description: "Minimalist spaced lettering (K A D I R).",
    configuration: { unicodeFont: "spaced", casing: "uppercase" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222212",
    name: "Dot Minimal",
    slug: "dot-minimal",
    description: "Dot separated modern aesthetic (k · a · d · i · r).",
    configuration: { unicodeFont: "dot_spaced", casing: "lowercase" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222213",
    name: "Slash Minimal",
    slug: "slash-minimal",
    description: "Futuristic slash separated format (k / a / d / i / r).",
    configuration: { unicodeFont: "slash_spaced", casing: "lowercase" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222214",
    name: "Esports Pro",
    slug: "esports-pro",
    description: "Tier-1 tournament team tags ([SOUL], [GODL], [T1], [SEN], [FAZE]).",
    configuration: { unicodeFont: "small_caps", decoratorPrefix: "[SOUL] " },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222215",
    name: "Sniper & Guns",
    slug: "sniper-guns",
    description: "Sniper crosshairs and minimal bullet marks (×, •, —, ø, †).",
    configuration: { decoratorPrefix: "× ", decoratorSuffix: " ×", allowedSymbols: ["×", "•", "—", "ø", "†"] },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222216",
    name: "Aesthetic Cute",
    slug: "aesthetic-cute",
    description: "Soft pastel flowers and aesthetic hearts (✿, ♡, ✧, ⋆, ╰‿╯).",
    configuration: { decoratorPrefix: "✿", decoratorSuffix: "✿", allowedSymbols: ["✿", "♡", "✧", "⋆", "╰‿╯", "ツ"] },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222217",
    name: "Double Struck",
    slug: "double-struck",
    description: "Blackboard Double-Struck mathematical characters (𝕂𝕒𝕕𝕚𝕣).",
    configuration: { unicodeFont: "double_struck", casing: "preserve" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222218",
    name: "Monospace Hacker",
    slug: "monospace-hacker",
    description: "Terminal monospace developer and cyberpunk hacker style (𝙺𝚊𝚍𝚒𝚛).",
    configuration: { unicodeFont: "monospace", casing: "preserve" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222219",
    name: "Impact Bold",
    slug: "impact-bold",
    description: "Heavy Sans-Serif Bold (𝗞𝗮𝗱𝗶𝗿) with high kill-feed readability.",
    configuration: { unicodeFont: "sans_bold", casing: "preserve" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222220",
    name: "Clean Italic",
    slug: "clean-italic",
    description: "Modern streamlined italic typography (𝘒𝘢𝘥𝘪𝘳).",
    configuration: { unicodeFont: "sans_italic", casing: "preserve" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222221",
    name: "Circled Bubble",
    slug: "circled-bubble",
    description: "Circular framed bubble letters (Ⓚⓐⓓⓘⓡ).",
    configuration: { unicodeFont: "circled", casing: "preserve" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Square Box",
    slug: "square-box",
    description: "Enclosed square box block glyphs (🄺🄰🄳🄸🅁).",
    configuration: { unicodeFont: "square", casing: "uppercase" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222223",
    name: "Fullwidth Wide",
    slug: "fullwidth-wide",
    description: "Japanese Zenkaku fullwidth aesthetic characters (Ｋａｄｉｒ).",
    configuration: { unicodeFont: "fullwidth", casing: "preserve" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222224",
    name: "Inverted Flip",
    slug: "inverted-flip",
    description: "Upside down flipped text (ɹıpɐʞ) that surprises opponents.",
    configuration: { unicodeFont: "inverted", casing: "preserve" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222225",
    name: "Japanese Kanji",
    slug: "japanese-kanji",
    description: "Kanji elements for Gods and Warriors (神, 鬼, 侍, 竜, 影, 極).",
    configuration: { decoratorPrefix: "神", decoratorSuffix: "神", allowedSymbols: ["神", "鬼", "侍", "竜", "影", "極", "龍"] },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222226",
    name: "Demon & Villain",
    slug: "villain-demon",
    description: "Dark aliases with DEVIL, VILLAIN, DARK, and GHOST prefixes.",
    configuration: { unicodeFont: "bold_gothic", decoratorPrefix: "DEVIL • " },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222227",
    name: "King & Royal",
    slug: "king-royal",
    description: "Royal leader aliases with KING, LORD, TITAN, and ALPHA.",
    configuration: { unicodeFont: "small_caps", decoratorPrefix: "KING • " },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222228",
    name: "Queen & Angel",
    slug: "queen-angel",
    description: "Empress gamer tags with QUEEN, PRINCESS, ANGEL, and GODDESS.",
    configuration: { unicodeFont: "bold_cursive", decoratorPrefix: "QUEEN ♡ " },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222229",
    name: "Free Fire Legends",
    slug: "freefire-legend",
    description: "Iconic Free Fire streamer tags (Raistar, Badge 99, Total Gaming, V •).",
    configuration: { decoratorPrefix: "V • ", allowedSymbols: ["亗", "☂️", "࿐", "么"] },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222230",
    name: "BGMI Pro Tags",
    slug: "bgmi-pro",
    description: "Elite BGMI squad tags (Mortal, Scout, Jonathan, Dynamo, Soul).",
    configuration: { bracketPair: ["『", "』"], decoratorSuffix: "メ" },
    isActive: true
  },
  {
    id: "22222222-2222-2222-2222-222222222231",
    name: "Gamer Numbers",
    slug: "gamer-numbers",
    description: "Lucky and pro gamer numbers (999, 777, 007, 444, 100).",
    configuration: { decoratorSuffix: " • 999" },
    isActive: true
  }
];
const SEED_SYMBOLS = [
  { id: "33333333-3333-3333-3333-333333333301", symbol: "亗", category: "royal", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333302", symbol: "👑", category: "royal", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333303", symbol: "♛", category: "royal", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333304", symbol: "☬", category: "royal", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333305", symbol: "メ", category: "japanese", position: "suffix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333306", symbol: "々", category: "japanese", position: "suffix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333307", symbol: "么", category: "japanese", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333308", symbol: "〆", category: "japanese", position: "suffix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333309", symbol: "乡", category: "japanese", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333310", symbol: "神", category: "japanese", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333311", symbol: "鬼", category: "japanese", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333312", symbol: "侍", category: "japanese", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333313", symbol: "꧁༺", category: "wings", position: "prefix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333314", symbol: "༻꧂", category: "wings", position: "suffix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333315", symbol: "༺", category: "wings", position: "prefix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333316", symbol: "༻", category: "wings", position: "suffix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333317", symbol: "ʚ", category: "wings", position: "prefix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333318", symbol: "ɞ", category: "wings", position: "suffix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333319", symbol: "࿐", category: "wings", position: "suffix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333320", symbol: "⚔", category: "weapons", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333321", symbol: "☠", category: "weapons", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333322", symbol: "⚡", category: "weapons", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333323", symbol: "乂", category: "weapons", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333324", symbol: "✞", category: "weapons", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333325", symbol: "†", category: "weapons", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333326", symbol: "『", category: "brackets", position: "prefix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333327", symbol: "』", category: "brackets", position: "suffix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333328", symbol: "【", category: "brackets", position: "prefix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333329", symbol: "】", category: "brackets", position: "suffix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333330", symbol: "𓊈", category: "brackets", position: "prefix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333331", symbol: "𓊉", category: "brackets", position: "suffix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333332", symbol: "《", category: "brackets", position: "prefix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333333", symbol: "》", category: "brackets", position: "suffix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333334", symbol: "✿", category: "stars", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333335", symbol: "♡", category: "stars", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333336", symbol: "✧", category: "stars", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333337", symbol: "⋆", category: "stars", position: "both", isActive: true },
  { id: "33333333-3333-3333-3333-333333333338", symbol: "╰‿╯", category: "stars", position: "prefix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333339", symbol: "ツ", category: "stars", position: "prefix", isActive: true },
  { id: "33333333-3333-3333-3333-333333333340", symbol: "🧸", category: "stars", position: "both", isActive: true }
];
const SEED_SEO_PAGES = [
  {
    id: "55555555-5555-5555-5555-555555555501",
    title: "Free Fire Name Generator",
    slug: "free-fire-name-generator",
    pageType: "game",
    content: "Free Fire in-game name generator compliant with Garena Free Fire 12 character limit.",
    seoTitle: "Free Fire Name Generator 2026 — Stylish Nicknames, Boss Crowns & Symbols",
    seoDescription: "Generate stylish Free Fire names with boss crowns (亗), angel wings, and Small Caps fonts. 100% in-game supported.",
    robots: "index, follow",
    schemaJson: {},
    isPublished: true
  },
  {
    id: "55555555-5555-5555-5555-555555555502",
    title: "BGMI Name Generator",
    slug: "bgmi-name-generator",
    pageType: "game",
    content: "BGMI & PUBG Mobile nickname generator compliant with Krafton 14 character limit.",
    seoTitle: "BGMI Stylish Name Generator — PUBG Mobile Nicknames with Japanese Symbols",
    seoDescription: "Generate pro BGMI names with Japanese symbols (メ, 々, 〆), clan tags, and attitude text.",
    robots: "index, follow",
    schemaJson: {},
    isPublished: true
  },
  {
    id: "55555555-5555-5555-5555-555555555503",
    title: "Clan Name Generator",
    slug: "clan-name-generator",
    pageType: "category",
    content: "Esports clan tag generator for squads, guilds, and teams with brackets.",
    seoTitle: "Clan Name Generator — Squad & Guild Tags for Free Fire, BGMI & Valorant",
    seoDescription: "Generate cool clan tags, squad abbreviations, and guild nicknames with brackets 『 』 and 【 】.",
    robots: "index, follow",
    schemaJson: {},
    isPublished: true
  },
  {
    id: "55555555-5555-5555-5555-555555555504",
    title: "Esports Name Generator",
    slug: "esports-name-generator",
    pageType: "category",
    content: "Esports player nickname generator with Small Caps and minimal aesthetics.",
    seoTitle: "Esports Pro Name Generator — Professional Gamer Tags & Small Caps",
    seoDescription: "Generate clean, minimalist, pro gamer tags in Small Caps, Gothic Fraktur, and impact fonts.",
    robots: "index, follow",
    schemaJson: {},
    isPublished: true
  }
];
const SEED_FAQS = [
  {
    id: "66666666-6666-6666-6666-666666666601",
    question: "How do I copy and use the generated name in Free Fire or BGMI?",
    answer: 'Simply click the "Copy" button next to your favorite generated name. Open Free Fire or BGMI, navigate to your Profile, tap on the edit icon beside your nickname, paste the copied name into the text box, and confirm with your Name Change Card or diamonds/UC.',
    sortOrder: 1,
    isActive: true
  },
  {
    id: "66666666-6666-6666-6666-666666666602",
    question: "Will these symbols cause a square box (□) or question mark in-game?",
    answer: "No! All symbols provided by GamerTag Pro (including 亗, ꧁༺ ༻꧂, メ, 々, 么, and Small Caps) are verified to be fully compatible with the UTF-8 rendering engines of Free Fire, BGMI, and Valorant without rendering as missing glyph boxes.",
    sortOrder: 2,
    isActive: true
  },
  {
    id: "66666666-6666-6666-6666-666666666603",
    question: "What is the character limit for names in Free Fire and BGMI?",
    answer: "Garena Free Fire enforces a strict maximum length of 12 characters, while BGMI and PUBG Mobile allow up to 14 characters. Valorant supports up to 16 characters for Riot IDs.",
    sortOrder: 3,
    isActive: true
  },
  {
    id: "66666666-6666-6666-6666-666666666604",
    question: "How do I get a custom clan tag for my squad?",
    answer: "Use our Clan Name Generator to add clan brackets such as 『SOUL』, 【GODL】, or 𓊈TSG𓊉 before your player name to create a matching, unified look for your entire tournament roster.",
    sortOrder: 4,
    isActive: true
  },
  {
    id: "66666666-6666-6666-6666-666666666605",
    question: "Is this gaming name generator 100% free to use?",
    answer: "Yes! GamerTag Pro is completely free with no registration required, unlimited generations, instant copy-paste, and zero watermarks on generated banner cards.",
    sortOrder: 5,
    isActive: true
  }
];
const SEED_BLOCKED_WORDS = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "cunt",
  "dick",
  "nigger",
  "nigga",
  "faggot",
  "whore",
  "slut",
  "pussy",
  "bastard",
  "hitler",
  "nazi",
  "pedophile",
  "rape",
  "suicide",
  "terrorist",
  "retard",
  "cock",
  "porn"
];
const SEED_SETTINGS = {
  trendingWeights: {
    copy: 3,
    favorite: 5,
    share: 4,
    usage: 1
  },
  rateLimits: {
    generatePerMinute: 60,
    searchPerMinute: 120
  },
  maintenanceMode: false
};

export { SEED_BLOCKED_WORDS as S, SEED_GAMES as a, SEED_STYLES as b, SEED_FAQS as c, SEED_SEO_PAGES as d, SEED_SETTINGS as e, SEED_SYMBOLS as f };
