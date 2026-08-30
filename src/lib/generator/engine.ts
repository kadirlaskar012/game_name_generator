import { applyUnicodeFont, AVAILABLE_FONTS } from './unicode';
import { BRACKET_PAIRS, SYMBOL_COLLECTIONS, COMMON_PREFIXES, COMMON_SUFFIXES, GAME_SPECIFIC_AFFIXES, getRandomElement } from './symbols';
import { validateGameRules, type GameRules, type RuleValidationResult } from './rules';
import { validateContentSafety } from './safety';
import { getGames, getStyles, getSymbols } from '../database/repository';

export interface GenerateOptions {
  name?: string;
  gameId?: string;
  gameSlug?: string;
  styleId?: string;
  styleSlug?: string;
  gender?: 'all' | 'boy' | 'girl' | 'clan' | 'esports';
  language?: 'all' | 'en' | 'ja' | 'hi' | 'es';
  includeSymbols?: boolean;
  lengthCategory?: 'all' | 'short' | 'medium' | 'long';
  count?: number;
  offset?: number;
  seed?: number;
}

export interface GeneratedResultItem {
  id: string;
  name: string;
  plainName: string;
  gameName: string;
  styleName: string;
  validation: RuleValidationResult;
  font: string;
  isPopular?: boolean;
}

const DEFAULT_GAMER_NAMES = [
  'Kadir', 'Ghost', 'Shadow', 'Titan', 'Hunter', 'Viper', 'Blade', 'Phoenix',
  'Raven', 'Wolf', 'Storm', 'Reaper', 'Nomad', 'Echo', 'Nova', 'Frost',
  'Maverick', 'Apex', 'Cipher', 'Venom', 'Blaze', 'Ninja', 'Samurai', 'Legend',
  'Knight', 'Slayer', 'Spectre', 'Valkyrie', 'Rogue', 'Hydra', 'Vortex', 'Kaiser'
];

function createPrng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Core Gaming Name Generator Engine with Infinite Procedural Variety
 */
export async function generateGamingNames(options: GenerateOptions = {}): Promise<{
  results: GeneratedResultItem[];
  total: number;
  inputName: string;
  gameName: string;
  styleName: string;
}> {
  const count = Math.min(100, Math.max(1, options.count || 24));
  const offset = options.offset || 0;
  const includeSymbols = options.includeSymbols !== false;
  const gender = options.gender || 'all';
  const rngSeed = (options.seed || Date.now()) + offset;
  const rng = createPrng(rngSeed);

  // 1. Fetch DB records
  const [allGames, allStyles] = await Promise.all([
    getGames(),
    getStyles(),
  ]);

  let selectedGame = allGames.find((g) => g.id === options.gameId || g.slug === options.gameSlug);
  if (!selectedGame && allGames.length > 0) {
    selectedGame = allGames[0];
  }

  const selectedGameSlug = selectedGame?.slug || 'free-fire';
  const gameAffixes = GAME_SPECIFIC_AFFIXES[selectedGameSlug] || GAME_SPECIFIC_AFFIXES['free-fire'];

  let selectedStyle = allStyles.find((s) => s.id === options.styleId || s.slug === options.styleSlug);
  const styleSlug = selectedStyle?.slug || options.styleSlug || 'all';

  // Raw Input name or random pick
  let rawName = (options.name || '').trim();
  if (!rawName) {
    rawName = getRandomElement(DEFAULT_GAMER_NAMES, rng);
  }

  // 2. Safety / Profanity Check
  const safetyCheck = await validateContentSafety(rawName);
  if (!safetyCheck.isSafe) {
    throw new Error(`The provided name violates safety filters: "${safetyCheck.flaggedWord}"`);
  }

  const results: GeneratedResultItem[] = [];
  const seenNames = new Set<string>();

  const gameRules: GameRules = selectedGame?.rules || {
    maxLength: 14,
    minLength: 3,
    preferredSymbols: ['亗', '乂', 'メ', '々', '么', '꧁', '꧂'],
  };

  const activePrefixes = [
    ...(gender === 'girl' ? COMMON_PREFIXES.girl : []),
    ...(gender === 'boy' ? COMMON_PREFIXES.boy : []),
    ...(gender === 'clan' ? COMMON_PREFIXES.clan : []),
    ...(gender === 'esports' ? COMMON_PREFIXES.esports : []),
    ...(gameAffixes.prefixes || []),
    ...COMMON_PREFIXES.boy,
    ...COMMON_PREFIXES.clan,
  ];

  const activeSuffixes = [
    ...(gender === 'girl' ? COMMON_SUFFIXES.girl : []),
    ...(gender === 'boy' ? COMMON_SUFFIXES.boy : []),
    ...(gender === 'clan' ? COMMON_SUFFIXES.clan : []),
    ...(gender === 'esports' ? COMMON_SUFFIXES.esports : []),
    ...(gameAffixes.suffixes || []),
    ...COMMON_SUFFIXES.boy,
    ...COMMON_SUFFIXES.esports,
  ];

  let attempts = 0;
  const maxAttempts = count * 15;

  while (results.length < count && attempts < maxAttempts) {
    attempts++;
    const stepSeed = attempts + offset;

    // Pick font based on selected style or random
    let fontKey = 'small_caps';
    if (selectedStyle?.configuration?.unicodeFont) {
      fontKey = selectedStyle.configuration.unicodeFont;
    } else if (styleSlug === 'gothic-fraktur') {
      fontKey = 'bold_gothic';
    } else if (styleSlug === 'classic-gothic') {
      fontKey = 'gothic';
    } else if (styleSlug === 'bold-script') {
      fontKey = 'bold_cursive';
    } else if (styleSlug === 'cursive-script') {
      fontKey = 'cursive';
    } else if (styleSlug === 'double-struck') {
      fontKey = 'double_struck';
    } else if (styleSlug === 'monospace-hacker') {
      fontKey = 'monospace';
    } else if (styleSlug === 'impact-bold') {
      fontKey = 'sans_bold';
    } else if (styleSlug === 'clean-italic') {
      fontKey = 'sans_italic';
    } else if (styleSlug === 'circled-bubble') {
      fontKey = 'circled';
    } else if (styleSlug === 'square-box') {
      fontKey = 'square';
    } else if (styleSlug === 'fullwidth-wide') {
      fontKey = 'fullwidth';
    } else if (styleSlug === 'inverted-flip') {
      fontKey = 'inverted';
    } else if (styleSlug === 'clean-spaced') {
      fontKey = 'spaced';
    } else if (styleSlug === 'dot-minimal') {
      fontKey = 'dot_spaced';
    } else if (styleSlug === 'slash-minimal') {
      fontKey = 'slash_spaced';
    } else {
      // Pick varied font for general mode
      const fontList = ['small_caps', 'bold_gothic', 'bold_cursive', 'sans_bold', 'double_struck', 'monospace', 'sans_italic', 'circled', 'square', 'normal'];
      fontKey = fontList[stepSeed % fontList.length];
    }

    let styledBase = applyUnicodeFont(rawName, fontKey);
    if (selectedStyle?.configuration?.casing === 'uppercase' || styleSlug === 'clean-spaced') {
      styledBase = applyUnicodeFont(rawName.toUpperCase(), fontKey);
    } else if (selectedStyle?.configuration?.casing === 'lowercase' || styleSlug === 'dot-minimal' || styleSlug === 'slash-minimal') {
      styledBase = applyUnicodeFont(rawName.toLowerCase(), fontKey);
    }

    let candidate = styledBase;

    // Build specific styles if style selected
    if (styleSlug === 'boss-crown') {
      const crown = getRandomElement(['亗', '👑', '♛', '☬', '⚜', '♚', '𒆜', '霸', '王'], rng);
      const variants = [
        `${crown}${styledBase}${crown}`,
        `亗 ${styledBase} 亗`,
        `👑 ${styledBase} 👑`,
        `亗 OP ${styledBase} 亗`,
        `☬ ${styledBase} ☬`,
        `『${styledBase}』亗`,
        `【${styledBase}】👑`,
        `亗 ${styledBase}_VIP`,
        `BOSS • ${styledBase} 亗`,
      ];
      candidate = variants[stepSeed % variants.length];
    } else if (styleSlug === 'wings') {
      const wings = [
        `꧁༺${styledBase}༻꧂`,
        `༺${styledBase}༻`,
        `ʚ${styledBase}ɞ`,
        `ᖭི${styledBase}ᖫྀ`,
        `꧁${styledBase}꧂`,
        `༺ ${styledBase} ༻`,
        `${styledBase}࿐`,
        `${styledBase} ๛`,
        `꧁༺ ${styledBase} ༻꧂`,
        `ʚ ${styledBase} ɞ`,
      ];
      candidate = wings[stepSeed % wings.length];
    } else if (styleSlug === 'japanese-katakana') {
      const sfx = getRandomElement(['メ', '々', '么', '〆', '乡', 'ッ', '彡'], rng);
      const variants = [
        `『${styledBase}』${sfx}`,
        `【${styledBase}】${sfx}`,
        `${styledBase}々`,
        `么${styledBase}么`,
        `乡${styledBase}乡`,
        `父${styledBase}气`,
        `神${styledBase}神`,
        `鬼${styledBase}鬼`,
        `${styledBase}メ`,
        `${styledBase}〆`,
        `『${styledBase}』メ`,
        `【${styledBase}】〆`,
      ];
      candidate = variants[stepSeed % variants.length];
    } else if (styleSlug === 'clan-brackets') {
      const pair = getRandomElement(BRACKET_PAIRS, rng);
      const pfx = getRandomElement(activePrefixes, rng);
      const variants = [
        `${pair[0]}${styledBase}${pair[1]}`,
        `『${pfx}』${styledBase}`,
        `【${pfx}】${styledBase}`,
        `𓊈${pfx}𓊉 ${styledBase}`,
        `《${pfx}》${styledBase}`,
        `[${pfx}] ${styledBase}`,
        `『${styledBase}』メ`,
        `【${styledBase}】〆`,
        `𓊈${styledBase}𓊉`,
        `❮${styledBase}❯`,
      ];
      candidate = variants[stepSeed % variants.length];
    } else if (styleSlug === 'attitude-cross') {
      const wpn = getRandomElement(['⚔', '☠', '⚡', '☣', '✞', '乂', '†', '✘', '𝕏'], rng);
      const variants = [
        `${wpn}${styledBase}${wpn}`,
        `乂${styledBase}乂`,
        `⚡${styledBase}⚡`,
        `☠${styledBase}☠`,
        `⚔ ${styledBase} ⚔`,
        `† ${styledBase} †`,
        `𝕏 ${styledBase} 𝕏`,
        `× ${styledBase} ×`,
      ];
      candidate = variants[stepSeed % variants.length];
    } else if (styleSlug === 'esports-pro') {
      const team = getRandomElement(['SOUL', 'GODL', 'T1', 'SEN', 'FNC', 'PRX', 'TSG', 'FAZE', 'OPTIC', 'NAVI', 'VLR', 'RASTAR'], rng);
      const variants = [
        `[${team}] ${styledBase}`,
        `『${team}』${styledBase}`,
        `【${team}】${styledBase}`,
        `${team} • ${styledBase}`,
        `${styledBase} • ${team}`,
        `PRO • ${styledBase}`,
        `${styledBase} .`,
        `iAm${styledBase}`,
        `${styledBase} 1tap`,
      ];
      candidate = variants[stepSeed % variants.length];
    } else if (styleSlug === 'sniper-guns') {
      const sym = getRandomElement(['×', '•', '—', 'ø', '†', '::', '🎯', '🔫'], rng);
      const variants = [
        `${sym} ${styledBase} ${sym}`,
        `• ${styledBase} •`,
        `× ${styledBase} ×`,
        `ø ${styledBase} ø`,
        `🎯 ${styledBase}`,
        `${styledBase} • 999`,
        `${styledBase} • 007`,
        `— ${styledBase} —`,
      ];
      candidate = variants[stepSeed % variants.length];
    } else if (styleSlug === 'aesthetic-cute') {
      const sym = getRandomElement(['✿', '♡', '✧', '⋆', '✰', '╰‿╯', 'ツ', 'ヅ', '🧸', '❀'], rng);
      const variants = [
        `${sym}${styledBase}${sym}`,
        `✿ ${styledBase} ✿`,
        `♡ ${styledBase} ♡`,
        `✧ ${styledBase} ✧`,
        `⋆ ${styledBase} ⋆`,
        `╰‿╯ ${styledBase}`,
        `ツ ${styledBase}`,
        `🧸 ${styledBase}`,
        `${styledBase} vibes ♡`,
        `sweet_${styledBase}`,
      ];
      candidate = variants[stepSeed % variants.length];
    } else if (styleSlug === 'japanese-kanji') {
      const kanji = getRandomElement(['神', '鬼', '侍', '竜', '影', '極', '龍', '雷', '愛', '死', '魔', '狼', '零', '天'], rng);
      const variants = [
        `${kanji}${styledBase}${kanji}`,
        `${kanji} • ${styledBase}`,
        `${styledBase} • ${kanji}`,
        `『${kanji}』${styledBase}`,
        `${styledBase} ${kanji}`,
      ];
      candidate = variants[stepSeed % variants.length];
    } else if (styleSlug === 'villain-demon') {
      const pfx = getRandomElement(['VILLAIN', 'DEVIL', 'DARK', 'GHOST', 'SHADOW', 'DEATH', 'TOXIC', 'REAPER'], rng);
      candidate = `${pfx} • ${styledBase}`;
    } else if (styleSlug === 'king-royal') {
      const pfx = getRandomElement(['KING', 'LORD', 'TITAN', 'ALPHA', 'PRINCE', 'LEGEND', 'EMPEROR'], rng);
      candidate = `${pfx} • ${styledBase}`;
    } else if (styleSlug === 'queen-angel') {
      const pfx = getRandomElement(['QUEEN', 'PRINCESS', 'ANGEL', 'GODDESS', 'LADY', 'VALKYRIE', 'DOLL'], rng);
      candidate = `${pfx} ♡ ${styledBase}`;
    } else if (styleSlug === 'freefire-legend') {
      const variants = [
        `亗 ${styledBase} 亗`,
        `V • ${styledBase}`,
        `Raistar • ${styledBase}`,
        `Badge99 • ${styledBase}`,
        `Total • ${styledBase}`,
        `亗 OP ${styledBase} 亗`,
        `SK • ${styledBase} 亗`,
        `${styledBase}࿐`,
        `${styledBase} 么`,
      ];
      candidate = variants[stepSeed % variants.length];
    } else if (styleSlug === 'bgmi-pro') {
      const variants = [
        `『${styledBase}』メ`,
        `【${styledBase}】〆`,
        `么${styledBase}么`,
        `乡${styledBase}乡`,
        `[SOUL] ${styledBase}`,
        `[GODL] ${styledBase}`,
        `Mortal • ${styledBase}`,
        `Jonathan • ${styledBase}`,
        `Tx_${styledBase}`,
        `父${styledBase}气`,
      ];
      candidate = variants[stepSeed % variants.length];
    } else if (styleSlug === 'gamer-numbers') {
      const num = getRandomElement(['999', '777', '007', '444', '100', '01', '69', '333', '888'], rng);
      const sep = getRandomElement([' • ', '_', ' ', '-'], rng);
      candidate = `${styledBase}${sep}${num}`;
    } else {
      // General Mode with High Procedural Variation & Game Affinity
      if (includeSymbols) {
        const patternIndex = stepSeed % 20;
        if (patternIndex === 0 && gameAffixes.templates.length > 0) {
          const tpl = getRandomElement(gameAffixes.templates, rng);
          candidate = tpl.replace('{name}', styledBase);
        } else if (patternIndex === 1) {
          candidate = `亗${styledBase}亗`;
        } else if (patternIndex === 2) {
          const pair = getRandomElement(BRACKET_PAIRS, rng);
          const sfx = getRandomElement(['メ', '々', '么', '〆', '★', '⚡', '✿', '亗'], rng);
          candidate = `${pair[0]}${styledBase}${pair[1]}${sfx}`;
        } else if (patternIndex === 3) {
          candidate = `꧁༺${styledBase}༻꧂`;
        } else if (patternIndex === 4) {
          candidate = `${styledBase}々`;
        } else if (patternIndex === 5) {
          candidate = `么${styledBase}么`;
        } else if (patternIndex === 6) {
          const pfx = getRandomElement(activePrefixes, rng);
          candidate = `[${pfx}] ${styledBase}`;
        } else if (patternIndex === 7) {
          candidate = `乂${styledBase}乂`;
        } else if (patternIndex === 8) {
          candidate = `乡${styledBase}乡`;
        } else if (patternIndex === 9) {
          const royal = getRandomElement(['👑', '♛', '☬', '⚜', '♚'], rng);
          candidate = `${royal}${styledBase}${royal}`;
        } else if (patternIndex === 10) {
          candidate = `${styledBase}࿐`;
        } else if (patternIndex === 11) {
          const combat = getRandomElement(['⚔', '☠', '⚡', '✞', '†'], rng);
          candidate = `${combat}${styledBase}${combat}`;
        } else if (patternIndex === 12) {
          const kanji = getRandomElement(['神', '鬼', '侍', '竜', '影', '極'], rng);
          candidate = `${kanji}${styledBase}${kanji}`;
        } else if (patternIndex === 13) {
          candidate = `• ${styledBase} •`;
        } else if (patternIndex === 14) {
          candidate = `× ${styledBase} ×`;
        } else if (patternIndex === 15) {
          const soft = getRandomElement(['✿', '♡', '✧', '⋆', '╰‿╯', 'ツ', '🧸'], rng);
          candidate = `${soft}${styledBase}${soft}`;
        } else if (patternIndex === 16) {
          const sfx = getRandomElement(activeSuffixes, rng);
          candidate = `${styledBase} • ${sfx}`;
        } else if (patternIndex === 17) {
          candidate = `𓊈${styledBase}𓊉`;
        } else if (patternIndex === 18) {
          candidate = `【${styledBase}】〆`;
        } else {
          candidate = `༺${styledBase}༻`;
        }
      }
    }

    // Length filtering
    const val = validateGameRules(candidate, gameRules);
    if (options.lengthCategory === 'short' && val.length > 8) continue;
    if (options.lengthCategory === 'medium' && (val.length < 7 || val.length > 12)) continue;
    if (options.lengthCategory === 'long' && val.length < 11) continue;

    if (!seenNames.has(candidate)) {
      seenNames.add(candidate);
      results.push({
        id: `gen-${results.length + 1}-${Date.now().toString(36)}-${stepSeed}`,
        name: candidate,
        plainName: rawName,
        gameName: selectedGame?.name || 'All Games',
        styleName: selectedStyle?.name || fontKey.replace(/_/g, ' ').toUpperCase(),
        validation: val,
        font: fontKey,
        isPopular: results.length < 4,
      });
    }
  }

  return {
    results,
    total: results.length,
    inputName: rawName,
    gameName: selectedGame?.name || 'General',
    styleName: selectedStyle?.name || 'All Styles',
  };
}
