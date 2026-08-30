export const BRACKET_PAIRS: [string, string][] = [
  ['『', '』'],
  ['【', '】'],
  ['꧁༺', '༻꧂'],
  ['𓊈', '𓊉'],
  ['《', '》'],
  ['❮', '❯'],
  ['|', '|'],
  ['乂', '乂'],
  ['亗', '亗'],
  ['么', '么'],
  ['༺', '༻'],
  ['ʚ', 'ɞ'],
  ['[', ']'],
  ['(', ')'],
  ['⟨', '⟩'],
  ['×', '×'],
  ['•', '•'],
  ['⚡', '⚡'],
  ['☠', '☠'],
  ['⚔', '⚔'],
  ['†', '†'],
  ['☬', '☬'],
  ['👑', '👑'],
  ['♛', '♛'],
  ['神', '神'],
  ['鬼', '鬼'],
  ['乡', '乡'],
  ['✿', '✿'],
  ['♡', '♡'],
  ['✧', '✧'],
  ['⋆', '⋆'],
  ['╰‿╯', '╰‿╯'],
  ['ツ', 'ツ'],
  ['🧸', '🧸'],
  ['◈', '◈'],
  ['★', '★'],
  ['✪', '✪'],
];

export const SYMBOL_COLLECTIONS = {
  royal: ['亗', '👑', '♛', '☬', '⚜', '♚', '𒆜', '༒', '霸', '王'],
  japanese: ['メ', '々', '么', '〆', '乡', 'ッ', '彡', '父', '气', '神', '鬼', '侍', '竜', '雷', '影', '極', '龍', '愛', '死', '魔', '狼', '零', '天'],
  wings: ['꧁༺', '༻꧂', '༺', '༻', 'ʚ', 'ɞ', 'ᖭི', 'ᖫྀ', '࿐', '๛', '༄'],
  weapons: ['⚔', '☠', '⚡', '☣', '✞', '乂', '†', '🗡️', '✘', '𝕏', '🎯'],
  brackets: ['『', '』', '【', '】', '𓊈', '𓊉', '《', '》', '❮', '❯', '[', ']'],
  stars: ['★', '✪', '✦', '✧', '✿', '♡', '⋆', '✰', '╰‿╯', 'ツ', 'ヅ', '🧸', '❀'],
  dividers: ['•', '°', '×', '—', 'ø', 'Ø', 'iL', '™', '::', '><', '|', '丨', '·', '/', '_'],
};

// Game specific cultural prefixes, tags & affixes
export const GAME_SPECIFIC_AFFIXES: Record<string, {
  prefixes: string[];
  suffixes: string[];
  symbols: string[];
  templates: string[];
}> = {
  'free-fire': {
    prefixes: ['OP', 'V •', 'BOSS', 'RAISTAR', 'BADGE99', 'TOTAL', 'FF', 'KILLER', 'ALPHA', 'DEVIL', 'DARK', 'SK', 'TSG'],
    suffixes: ['999', 'YT', 'FF', '007', 'VIP', 'OFFICIAL', 'GOD', 'GAMING', 'BRO', '444', '777', 'LIVE'],
    symbols: ['亗', '👑', '☬', '꧁༺', '༻꧂', '࿐', '么', '々', 'メ', '⚡', '☠', '☂️', '╰‿╯', '乂'],
    templates: [
      '亗{name}亗', 'V • {name}', '꧁༺{name}༻꧂', '{name}࿐', 'OP • {name}',
      '『{name}』亗', '{name} 么', '{name}々', '⚡{name}⚡', '亗 OP {name} 亗',
      '╰‿╯{name}', 'Raistar • {name}', '𓊈{name}𓊉', '☬{name}☬', '{name}_999'
    ],
  },
  'bgmi': {
    prefixes: ['MORTAL', 'SCOUT', 'JONATHAN', 'DYNAMO', 'SOUL', 'GODL', 'TX', 'BLIND', 'TEAM', 'IGL', 'SNIPER'],
    suffixes: ['メ', '〆', '々', '么', 'OP', 'YT', 'GAMING', 'T1', 'BATTLES', 'VIP', 'M416', 'PUBG'],
    symbols: ['メ', '〆', '々', '么', '乡', '『', '』', '【', '】', '父', '气', '神', '×', '•'],
    templates: [
      '『{name}』メ', '{name}々', '【{name}】〆', '么{name}么', '乡{name}乡',
      '父{name}气', '[SOUL] {name}', '[GODL] {name}', 'Tx_{name}', '{name} • OP',
      '神{name}神', '『Tx』{name}', '× {name} ×', '{name} 亗'
    ],
  },
  'valorant': {
    prefixes: ['VLR', 'RADIANT', 'IMMORTAL', 'ACE', 'T1', 'SEN', 'FNC', 'PRX', 'DRX', 'NRG', 'VAL'],
    suffixes: ['VLR', 'FPS', 'ACE', '240HZ', 'AIM', '1TAP', 'PRO', 'CLUTCH', 'DIFF', 'EXE'],
    symbols: ['•', '·', '/', '|', '—', '×', 'ø', '†', '::', '◈'],
    templates: [
      '{name} .', 'iAm{name}', 'vlr / {name}', '[SEN] {name}', '[T1] {name}',
      '{name} 1tap', 'k · a · d · i · r', '• {name} •', '{name} // vlr',
      'noScope {name}', '{name} diff', '{name}_fps', '† {name} †'
    ],
  },
  'codm': {
    prefixes: ['GHOST', 'REAPER', 'SOAP', 'PRICE', 'TASK141', 'SNIPER', 'NUKE', 'CODM', 'ELITE'],
    suffixes: ['YT', 'CODM', 'FPS', 'PRO', 'LEGEND', 'NUKE', 'WARZONE', 'SNIPER'],
    symbols: ['☠', '⚔', '⚡', '☣', '✘', '𝕏', '🎯', '×', '•'],
    templates: [
      '☠{name}☠', '⚔ {name} ⚔', 'TASK141 • {name}', 'GHOST_{name}', '☣{name}☣',
      '🎯{name}', '{name} • CODM', '𝕏{name}𝕏', '× {name} ×'
    ],
  },
  'fortnite': {
    prefixes: ['FAZE', 'FN', 'BOXED', 'SWEAT', 'CRACKED', 'NOT', 'ITS', 'CLIX', 'MONGRAAL'],
    suffixes: ['FN', 'ON240FPS', 'ONPIGS', 'BOXED', 'ONWHEEL', 'CLUTCH', 'EXE'],
    symbols: ['ツ', '✿', '⚡', '★', '×', '•', '—'],
    templates: [
      'ツ {name}', 'not {name}', 'faze {name}', '{name} on 240hz', '{name} fn',
      '{name} in the box', '✿ {name} ✿', '⚡ {name} ⚡', 'Its_{name}'
    ],
  },
  'roblox': {
    prefixes: ['xX', 'i_', 'rblx_', 'queen_', 'king_', 'sweet_', 'soft_', 'cloud_'],
    suffixes: ['Xx', '_rblx', '_vibes', '_cloud', '_cutie', '♡', '✿', '_yt'],
    symbols: ['✿', '♡', '✧', '⋆', '🧸', 'ʚɞ', '✰', '❀'],
    templates: [
      '✿{name}✿', '♡{name}♡', 'xX_{name}_Xx', 'i_{name}', 'ʚ{name}ɞ',
      '✧ {name} ✧', '{name} vibes ♡', '🧸 {name}', 'sweet_{name}'
    ],
  },
  'minecraft': {
    prefixes: ['MC_', 'x_', 'Craft_', 'PvP_', 'Not', 'Real', 'The'],
    suffixes: ['_MC', '_PvP', '_God', '_HD', '_Craft', '_YT'],
    symbols: ['_', 'x', '•', '—', '|'],
    templates: [
      '{name}_PvP', 'x_{name}_x', 'MC_{name}', '{name}_God', 'The_{name}',
      'Not{name}', 'Real_{name}', '{name}_Craft'
    ],
  },
  'esports-clan': {
    prefixes: ['SOUL', 'GODL', 'TSG', 'FAZE', 'T1', 'NAVI', 'OPTIC', 'VLR', 'RASTAR', 'TOTAL', 'SQUAD', 'TEAM'],
    suffixes: ['ESPORTS', 'CLAN', 'SQUAD', 'OFFICIAL', 'ARMY', 'LEGACY', 'GAMING'],
    symbols: ['『', '』', '【', '】', '𓊈', '𓊉', '《', '》', '❮', '❯', '亗', 'メ', '〆', '乡'],
    templates: [
      '『SOUL』{name}', '【GODL】{name}', '𓊈TSG𓊉 {name}', '《FAZE》{name}',
      '[T1] {name}', '亗 SQUAD {name} 亗', '『{name}』メ', '【{name}】〆',
      '❮TEAM❯ {name}', 'SOUL • {name}', 'GODL • {name}'
    ],
  },
};

export const COMMON_PREFIXES = {
  boy: ['OP', 'MR', 'KING', 'LORD', 'DEVIL', 'ALPHA', 'DARK', 'GHOST', 'BADBOY', 'SHADOW', 'TITAN', 'VILLAIN', 'RASTAR', 'BOSS', 'GOD'],
  girl: ['QUEEN', 'MISS', 'ANGEL', 'PRINCESS', 'GODDESS', 'LADY', 'BABY', 'KITTY', 'VALKYRIE', 'CANDY', 'ROSE', 'SWEET', 'DOLL'],
  clan: ['SOUL', 'GODL', 'TSG', 'FAZE', 'OPTIC', 'NAVI', 'VLR', 'T1', 'RASTAR', 'TOTAL', 'SQUAD', 'TEAM', 'LEGACY', 'ALPHA'],
  esports: ['PRO', 'ELITE', 'ACE', 'LETHAL', 'RADIANT', 'MYTHIC', 'IMMORTAL', 'VORTEX', 'SNIPER', 'LEGEND', 'CLUTCH', '1TAP'],
};

export const COMMON_SUFFIXES = {
  boy: ['999', 'GOD', 'YT', 'VIP', 'OP', '007', 'FF', 'KILLER', 'BOY', '777', 'BRO', 'BOSS', '444', 'LIVE'],
  girl: ['GIRL', 'CHAN', 'VIBES', 'CUTIE', 'QUEEN', '♡', '✿', 'BABY', 'PRINCESS', 'DOLL', 'ANGEL'],
  clan: ['ESPORTS', 'CLAN', 'SQUAD', 'LEGACY', 'ARMY', 'TEAM', 'OFFICIAL', 'GAMING', 'GUILD', 'FORCE'],
  esports: ['PRO', 'FPS', 'SNIPER', 'WINNER', 'CHAMP', '240FPS', 'ONE', 'VLR', 'DIFF', '1TAP', 'AIM'],
};

export function getRandomElement<T>(array: T[], seedRng?: () => number): T {
  if (!array || array.length === 0) return undefined as any;
  const rng = seedRng ? seedRng() : Math.random();
  return array[Math.floor(rng * array.length)];
}
