import { C as getBlockedWords, a as getGames, b as getStyles, D as trackNameUsage } from '../../chunks/repository_CQmdAj9R.mjs';
import { S as SEED_BLOCKED_WORDS } from '../../chunks/seedData_DsVjXbpq.mjs';
import { g as generateRequestSchema } from '../../chunks/schemas_B1KCwizN.mjs';
import { g as getClientIp, c as checkRateLimit } from '../../chunks/ratelimit_B38cZCNC.mjs';
export { renderers } from '../../renderers.mjs';

const SMALL_CAPS_MAP = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ғ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "ǫ",
  r: "ʀ",
  s: "s",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ",
  A: "ᴀ",
  B: "ʙ",
  C: "ᴄ",
  D: "ᴅ",
  E: "ᴇ",
  F: "ғ",
  G: "ɢ",
  H: "ʜ",
  I: "ɪ",
  J: "ᴊ",
  K: "ᴋ",
  L: "ʟ",
  M: "ᴍ",
  N: "ɴ",
  O: "ᴏ",
  P: "ᴘ",
  Q: "ǫ",
  R: "ʀ",
  S: "s",
  T: "ᴛ",
  U: "ᴜ",
  V: "ᴠ",
  W: "ᴡ",
  X: "x",
  Y: "ʏ",
  Z: "ᴢ",
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉"
};
const BOLD_GOTHIC_MAP = {
  A: "𝕬",
  B: "𝕭",
  C: "𝕮",
  D: "𝕯",
  E: "𝕰",
  F: "𝕱",
  G: "𝕲",
  H: "𝕳",
  I: "𝕴",
  J: "𝕵",
  K: "𝕶",
  L: "𝕷",
  M: "𝕸",
  N: "𝕹",
  O: "𝕺",
  P: "𝕻",
  Q: "𝕼",
  R: "𝕽",
  S: "𝕾",
  T: "𝕿",
  U: "𝖀",
  V: "𝖁",
  W: "𝖂",
  X: "𝖃",
  Y: "𝖄",
  Z: "𝖅",
  a: "𝖆",
  b: "𝖇",
  c: "𝖈",
  d: "𝖉",
  e: "𝖊",
  f: "𝖋",
  g: "𝖌",
  h: "𝖍",
  i: "𝖎",
  j: "𝖏",
  k: "𝖐",
  l: "𝖑",
  m: "𝖒",
  n: "𝖓",
  o: "𝖔",
  p: "𝖕",
  q: "𝖖",
  r: "𝖗",
  s: "𝖘",
  t: "𝖙",
  u: "𝖚",
  v: "𝖛",
  w: "𝖜",
  x: "𝖝",
  y: "𝖞",
  z: "𝖟"
};
const GOTHIC_MAP = {
  A: "𝔄",
  B: "𝔅",
  C: "ℭ",
  D: "𝔇",
  E: "𝔈",
  F: "𝔉",
  G: "𝔊",
  H: "ℌ",
  I: "ℑ",
  J: "𝔍",
  K: "𝔎",
  L: "𝔏",
  M: "𝔐",
  N: "𝔑",
  O: "𝔒",
  P: "𝔓",
  Q: "𝔔",
  R: "ℜ",
  S: "𝔖",
  T: "𝔗",
  U: "𝔘",
  V: "𝔙",
  W: "𝔚",
  X: "𝔛",
  Y: "𝔜",
  Z: "ℨ",
  a: "𝔞",
  b: "𝔟",
  c: "𝔠",
  d: "𝔡",
  e: "𝔢",
  f: "𝔣",
  g: "𝔤",
  h: "𝔥",
  i: "𝔦",
  j: "𝔧",
  k: "𝔨",
  l: "𝔩",
  m: "𝔪",
  n: "𝔫",
  o: "𝔬",
  p: "𝔭",
  q: "𝔮",
  r: "𝔯",
  s: "𝔰",
  t: "𝔱",
  u: "𝔲",
  v: "𝔳",
  w: "𝔴",
  x: "𝔵",
  y: "𝔶",
  z: "𝔷"
};
const BOLD_CURSIVE_MAP = {
  A: "𝓐",
  B: "𝓑",
  C: "𝓒",
  D: "𝓓",
  E: "𝓔",
  F: "𝓕",
  G: "𝓖",
  H: "𝓗",
  I: "𝓘",
  J: "𝓙",
  K: "𝓚",
  L: "𝓛",
  M: "𝓜",
  N: "𝓝",
  O: "𝓞",
  P: "𝓟",
  Q: "𝓠",
  R: "𝓡",
  S: "𝓢",
  T: "𝓣",
  U: "𝓤",
  V: "𝓥",
  W: "𝓦",
  X: "𝓧",
  Y: "𝓨",
  Z: "𝓩",
  a: "𝓪",
  b: "𝓫",
  c: "𝓬",
  d: "𝓭",
  e: "𝓮",
  f: "𝓯",
  g: "𝓰",
  h: "𝓱",
  i: "𝓲",
  j: "𝓳",
  k: "𝓴",
  l: "𝓵",
  m: "𝓶",
  n: "𝓷",
  o: "𝓸",
  p: "𝓹",
  q: "𝓺",
  r: "𝓻",
  s: "𝓼",
  t: "𝓽",
  u: "𝓾",
  v: "𝓿",
  w: "𝔀",
  x: "𝔁",
  y: "𝔂",
  z: "𝔃"
};
const CURSIVE_MAP = {
  A: "𝒜",
  B: "ℬ",
  C: "𝒞",
  D: "𝒟",
  E: "ℰ",
  F: "ℱ",
  G: "𝒢",
  H: "ℋ",
  I: "ℐ",
  J: "𝒥",
  K: "𝒦",
  L: "ℒ",
  M: "ℳ",
  N: "𝒩",
  O: "𝒪",
  P: "𝒫",
  Q: "𝒬",
  R: "ℛ",
  S: "𝒮",
  T: "𝒯",
  U: "𝒰",
  V: "𝒱",
  W: "𝒲",
  X: "𝒳",
  Y: "𝒴",
  Z: "𝒵",
  a: "𝒶",
  b: "𝒷",
  c: "𝒸",
  d: "𝒹",
  e: "ℯ",
  f: "𝒻",
  g: "ℊ",
  h: "𝒽",
  i: "𝒾",
  j: "𝒿",
  k: "𝓀",
  l: "𝓁",
  m: "𝓂",
  n: "𝓃",
  o: "ℴ",
  p: "𝓅",
  q: "𝓆",
  r: "𝓇",
  s: "𝓈",
  t: "𝓉",
  u: "𝓊",
  v: "𝓋",
  w: "𝓌",
  x: "𝓍",
  y: "𝓎",
  z: "𝓏"
};
const DOUBLE_STRUCK_MAP = {
  A: "𝔸",
  B: "𝔹",
  C: "ℂ",
  D: "𝔻",
  E: "𝔼",
  F: "𝔽",
  G: "𝔾",
  H: "ℍ",
  I: "𝕀",
  J: "𝕁",
  K: "𝕂",
  L: "𝕃",
  M: "𝕄",
  N: "ℕ",
  O: "𝕆",
  P: "ℙ",
  Q: "ℚ",
  R: "ℝ",
  S: "𝕊",
  T: "𝕋",
  U: "𝕌",
  V: "𝕍",
  W: "𝕎",
  X: "𝕏",
  Y: "𝕐",
  Z: "ℤ",
  a: "𝕒",
  b: "𝕓",
  c: "𝕔",
  d: "𝕕",
  e: "𝕖",
  f: "𝕗",
  g: "𝕘",
  h: "𝕙",
  i: "𝕚",
  j: "𝕛",
  k: "𝕜",
  l: "𝕝",
  m: "𝕞",
  n: "𝕟",
  o: "𝕠",
  p: "𝕡",
  q: "𝕢",
  r: "𝕣",
  s: "𝕤",
  t: "𝕥",
  u: "𝕦",
  v: "𝕧",
  w: "𝕨",
  x: "𝕩",
  y: "𝕪",
  z: "𝕫",
  "0": "𝟘",
  "1": "𝟙",
  "2": "𝟚",
  "3": "𝟛",
  "4": "𝟜",
  "5": "𝟝",
  "6": "𝟞",
  "7": "𝟟",
  "8": "𝟠",
  "9": "𝟡"
};
const MONOSPACE_MAP = {
  A: "𝙰",
  B: "𝙱",
  C: "𝙲",
  D: "𝙳",
  E: "𝙴",
  F: "𝙵",
  G: "𝙶",
  H: "𝙷",
  I: "𝙸",
  J: "𝙹",
  K: "𝙺",
  L: "𝙻",
  M: "𝙼",
  N: "𝙽",
  O: "𝙾",
  P: "𝙿",
  Q: "𝚀",
  R: "𝚁",
  S: "𝚂",
  T: "𝚃",
  U: "𝚄",
  V: "𝚅",
  W: "𝚆",
  X: "𝚇",
  Y: "𝚈",
  Z: "𝚉",
  a: "𝚊",
  b: "𝚋",
  c: "𝚌",
  d: "𝚍",
  e: "𝚎",
  f: "𝚏",
  g: "𝚐",
  h: "𝚑",
  i: "𝚒",
  j: "𝚓",
  k: "𝚔",
  l: "𝚕",
  m: "𝚖",
  n: "𝚗",
  o: "𝚘",
  p: "𝚙",
  q: "𝚚",
  r: "𝚛",
  s: "𝚜",
  t: "𝚝",
  u: "𝚞",
  v: "𝚟",
  w: "𝚠",
  x: "𝚡",
  y: "𝚢",
  z: "𝚣",
  "0": "𝟶",
  "1": "𝟷",
  "2": "𝟸",
  "3": "𝟹",
  "4": "𝟺",
  "5": "𝟻",
  "6": "𝟼",
  "7": "𝟽",
  "8": "𝟾",
  "9": "𝟿"
};
const SANS_BOLD_MAP = {
  A: "𝗔",
  B: "𝗕",
  C: "𝗖",
  D: "𝗗",
  E: "𝗘",
  F: "𝗙",
  G: "𝗚",
  H: "𝗛",
  I: "𝗜",
  J: "𝗝",
  K: "𝗞",
  L: "𝗟",
  M: "𝗠",
  N: "𝗡",
  O: "𝗢",
  P: "𝗣",
  Q: "𝗤",
  R: "𝗥",
  S: "𝗦",
  T: "𝗧",
  U: "𝗨",
  V: "𝗩",
  W: "𝗪",
  X: "𝗫",
  Y: "𝗬",
  Z: "𝗭",
  a: "𝗮",
  b: "𝗯",
  c: "𝗰",
  d: "𝗱",
  e: "𝗲",
  f: "𝗳",
  g: "𝗴",
  h: "𝗵",
  i: "𝗶",
  j: "𝗷",
  k: "𝗸",
  l: "𝗹",
  m: "𝗺",
  n: "𝗻",
  o: "𝗼",
  p: "𝗽",
  q: "𝗾",
  r: "𝗿",
  s: "𝘀",
  t: "𝘁",
  u: "𝘂",
  v: "𝘃",
  w: "𝘄",
  x: "𝘅",
  y: "𝘆",
  z: "𝘇",
  "0": "𝟬",
  "1": "𝟭",
  "2": "𝟮",
  "3": "𝟯",
  "4": "𝟰",
  "5": "𝟱",
  "6": "𝟲",
  "7": "𝟳",
  "8": "𝟴",
  "9": "𝟵"
};
const SANS_ITALIC_MAP = {
  A: "𝘈",
  B: "𝘉",
  C: "𝘊",
  D: "𝘋",
  E: "𝘌",
  F: "𝘍",
  G: "𝘎",
  H: "𝘏",
  I: "𝘐",
  J: "𝘑",
  K: "𝘒",
  L: "𝘓",
  M: "𝘔",
  N: "𝘕",
  O: "𝘖",
  P: "𝘗",
  Q: "𝘘",
  R: "𝘙",
  S: "𝘚",
  T: "𝘛",
  U: "𝘜",
  V: "𝘝",
  W: "𝘞",
  X: "𝘟",
  Y: "𝘠",
  Z: "𝘡",
  a: "𝘢",
  b: "𝘣",
  c: "𝘤",
  d: "𝘥",
  e: "𝘦",
  f: "𝘧",
  g: "𝘨",
  h: "𝘩",
  i: "𝘪",
  j: "𝘫",
  k: "𝘬",
  l: "𝘭",
  m: "𝘮",
  n: "𝘯",
  o: "𝘰",
  p: "𝘱",
  q: "𝘲",
  r: "𝘳",
  s: "𝘴",
  t: "𝘵",
  u: "𝘶",
  v: "𝘷",
  w: "𝘸",
  x: "𝘹",
  y: "𝘺",
  z: "𝘻"
};
const SANS_BOLD_ITALIC_MAP = {
  A: "𝘼",
  B: "𝘽",
  C: "𝘾",
  D: "𝘿",
  E: "𝙀",
  F: "𝙁",
  G: "𝙂",
  H: "𝙃",
  I: "𝙄",
  J: "𝙅",
  K: "𝙆",
  L: "𝙇",
  M: "𝙈",
  N: "𝙉",
  O: "𝙊",
  P: "𝙋",
  Q: "𝙌",
  R: "𝙍",
  S: "𝙎",
  T: "𝙏",
  U: "𝙐",
  V: "𝙑",
  W: "𝙒",
  X: "𝙓",
  Y: "𝙔",
  Z: "𝙕",
  a: "𝙖",
  b: "𝙗",
  c: "𝙘",
  d: "𝙙",
  e: "𝙚",
  f: "𝙛",
  g: "𝙜",
  h: "𝙝",
  i: "𝙞",
  j: "𝙟",
  k: "𝙠",
  l: "𝙡",
  m: "𝙢",
  n: "𝙣",
  o: "𝙤",
  p: "𝙥",
  q: "𝙦",
  r: "𝙧",
  s: "𝙨",
  t: "𝙩",
  u: "𝙪",
  v: "𝙫",
  w: "𝙬",
  x: "𝙭",
  y: "𝙮",
  z: "𝙯"
};
const SERIF_BOLD_MAP = {
  A: "𝐀",
  B: "𝐁",
  C: "𝐂",
  D: "𝐃",
  E: "𝐄",
  F: "𝐅",
  G: "𝐆",
  H: "𝐇",
  I: "𝐈",
  J: "𝐉",
  K: "𝐊",
  L: "𝐋",
  M: "𝐌",
  N: "𝐍",
  O: "𝐎",
  P: "𝐏",
  Q: "𝐐",
  R: "𝐑",
  S: "𝐒",
  T: "𝐓",
  U: "𝐔",
  V: "𝐕",
  W: "𝐖",
  X: "𝐗",
  Y: "𝐘",
  Z: "𝐙",
  a: "𝐚",
  b: "𝐛",
  c: "𝐜",
  d: "𝐝",
  e: "𝐞",
  f: "𝐟",
  g: "𝐠",
  h: "𝐡",
  i: "𝐢",
  j: "𝐣",
  k: "𝐤",
  l: "𝐥",
  m: "𝐦",
  n: "𝐧",
  o: "𝐨",
  p: "𝐩",
  q: "𝐪",
  r: "𝐫",
  s: "𝐬",
  t: "𝐭",
  u: "𝐮",
  v: "𝐯",
  w: "𝐰",
  x: "𝐱",
  y: "𝐲",
  z: "𝐳"
};
const CIRCLED_MAP = {
  A: "Ⓐ",
  B: "Ⓑ",
  C: "Ⓒ",
  D: "Ⓓ",
  E: "Ⓔ",
  F: "Ⓕ",
  G: "Ⓖ",
  H: "Ⓗ",
  I: "Ⓘ",
  J: "Ⓙ",
  K: "Ⓚ",
  L: "Ⓛ",
  M: "Ⓜ",
  N: "Ⓝ",
  O: "Ⓞ",
  P: "Ⓟ",
  Q: "Ⓠ",
  R: "Ⓡ",
  S: "Ⓢ",
  T: "Ⓣ",
  U: "Ⓤ",
  V: "Ⓥ",
  W: "𝓌",
  X: "Ⓧ",
  Y: "Ⓨ",
  Z: "Ⓩ",
  a: "ⓐ",
  b: "ⓑ",
  c: "ⓒ",
  d: "ⓓ",
  e: "ⓔ",
  f: "ⓕ",
  g: "ⓖ",
  h: "ⓗ",
  i: "ⓘ",
  j: "ⓙ",
  k: "ⓚ",
  l: "ⓛ",
  m: "ⓜ",
  n: "ⓝ",
  o: "ⓞ",
  p: "ⓟ",
  q: "ⓠ",
  r: "ⓡ",
  s: "ⓢ",
  t: "ⓣ",
  u: "ⓤ",
  v: "ⓥ",
  w: "ⓦ",
  x: "ⓧ",
  y: "ⓨ",
  z: "ⓩ",
  "0": "⓪",
  "1": "①",
  "2": "②",
  "3": "③",
  "4": "④",
  "5": "⑤",
  "6": "⑥",
  "7": "⑦",
  "8": "⑧",
  "9": "⑨"
};
const SQUARE_MAP = {
  A: "🄰",
  B: "🄱",
  C: "🄲",
  D: "🄳",
  E: "🄴",
  F: "🄵",
  G: "🄶",
  H: "🄷",
  I: "🄸",
  J: "🄹",
  K: "🄺",
  L: "🄻",
  M: "🄼",
  N: "🄽",
  O: "🄾",
  P: "🄿",
  Q: "🅀",
  R: "🅁",
  S: "🅂",
  T: "🅃",
  U: "🅄",
  V: "🅅",
  W: "🅆",
  X: "🅇",
  Y: "🅈",
  Z: "🅉",
  a: "🄰",
  b: "🄱",
  c: "🄲",
  d: "🄳",
  e: "🄴",
  f: "🄵",
  g: "🄶",
  h: "🄷",
  i: "🄸",
  j: "🄹",
  k: "🄺",
  l: "🄻",
  m: "🄼",
  n: "🄽",
  o: "🄾",
  p: "🄿",
  q: "🅀",
  r: "🅁",
  s: "🅂",
  t: "🅃",
  u: "🅄",
  v: "🅅",
  w: "🅆",
  x: "🅇",
  y: "🅈",
  z: "🅉"
};
const INVERTED_MAP = {
  a: "ɐ",
  b: "q",
  c: "ɔ",
  d: "p",
  e: "ǝ",
  f: "ɟ",
  g: "ƃ",
  h: "ɥ",
  i: "ᴉ",
  j: "ɾ",
  k: "ʞ",
  l: "l",
  m: "ɯ",
  n: "u",
  o: "o",
  p: "d",
  q: "b",
  r: "ɹ",
  s: "s",
  t: "ʇ",
  u: "n",
  v: "ʌ",
  w: "ʍ",
  x: "x",
  y: "ʎ",
  z: "z",
  A: "∀",
  B: "𐐒",
  C: "Ɔ",
  D: "ᗡ",
  E: "Ǝ",
  F: "Ⅎ",
  G: "⅁",
  H: "H",
  I: "I",
  J: "ſ",
  K: "ʞ",
  L: "˥",
  M: "W",
  N: "N",
  O: "O",
  P: "Ԁ",
  Q: "Ò",
  R: "ᴚ",
  S: "S",
  T: "⊥",
  U: "∩",
  V: "Λ",
  W: "M",
  X: "X",
  Y: "⅄",
  Z: "Z",
  "1": "Ɩ",
  "2": "ᄅ",
  "3": "Ɛ",
  "4": "ㄣ",
  "5": "ϛ",
  "6": "9",
  "7": "ㄥ",
  "8": "8",
  "9": "6",
  "0": "0"
};
const FULLWIDTH_MAP = {
  a: "ａ",
  b: "ｂ",
  c: "ｃ",
  d: "ｄ",
  e: "ｅ",
  f: "ｆ",
  g: "ｇ",
  h: "ｈ",
  i: "ｉ",
  j: "ｊ",
  k: "ｋ",
  l: "ｌ",
  m: "ｍ",
  n: "ｎ",
  o: "ｏ",
  p: "ｐ",
  q: "ｑ",
  r: "ｒ",
  s: "ｓ",
  t: "ｔ",
  u: "ｕ",
  v: "ｖ",
  w: "ｗ",
  x: "ｘ",
  y: "ｙ",
  z: "ｚ",
  A: "Ａ",
  B: "Ｂ",
  C: "Ｃ",
  D: "Ｄ",
  E: "Ｅ",
  F: "Ｆ",
  G: "Ｇ",
  H: "Ｈ",
  I: "Ｉ",
  J: "Ｊ",
  K: "Ｋ",
  L: "Ｌ",
  M: "Ｍ",
  N: "Ｎ",
  O: "Ｏ",
  P: "Ｐ",
  Q: "Ｑ",
  R: "Ｒ",
  S: "Ｓ",
  T: "Ｔ",
  U: "Ｕ",
  V: "Ｖ",
  W: "Ｗ",
  X: "Ｘ",
  Y: "Ｙ",
  Z: "Ｚ",
  "0": "０",
  "1": "１",
  "2": "２",
  "3": "３",
  "4": "４",
  "5": "５",
  "6": "６",
  "7": "７",
  "8": "８",
  "9": "９"
};
const FONT_MAPS = {
  small_caps: SMALL_CAPS_MAP,
  bold_gothic: BOLD_GOTHIC_MAP,
  gothic: GOTHIC_MAP,
  bold_cursive: BOLD_CURSIVE_MAP,
  cursive: CURSIVE_MAP,
  double_struck: DOUBLE_STRUCK_MAP,
  monospace: MONOSPACE_MAP,
  sans_bold: SANS_BOLD_MAP,
  sans_italic: SANS_ITALIC_MAP,
  sans_bold_italic: SANS_BOLD_ITALIC_MAP,
  serif_bold: SERIF_BOLD_MAP,
  circled: CIRCLED_MAP,
  square: SQUARE_MAP,
  inverted: INVERTED_MAP,
  fullwidth: FULLWIDTH_MAP
};
function applyUnicodeFont(text, fontKey) {
  if (!fontKey || fontKey === "normal" || fontKey === "original") {
    return text;
  }
  if (fontKey === "inverted") {
    return text.split("").reverse().map((c) => INVERTED_MAP[c] || c).join("");
  }
  if (fontKey === "spaced") {
    return text.split("").join(" ");
  }
  if (fontKey === "dot_spaced") {
    return text.split("").join(" · ");
  }
  if (fontKey === "slash_spaced") {
    return text.split("").join(" / ");
  }
  if (fontKey === "underscore_spaced") {
    return text.split("").join("_");
  }
  if (fontKey === "strike") {
    return text.split("").map((c) => c + "̶").join("");
  }
  if (fontKey === "underline") {
    return text.split("").map((c) => c + "̲").join("");
  }
  const map = FONT_MAPS[fontKey];
  if (!map) return text;
  return text.split("").map((char) => map[char] || char).join("");
}

const BRACKET_PAIRS = [
  ["『", "』"],
  ["【", "】"],
  ["꧁༺", "༻꧂"],
  ["𓊈", "𓊉"],
  ["《", "》"],
  ["❮", "❯"],
  ["|", "|"],
  ["乂", "乂"],
  ["亗", "亗"],
  ["么", "么"],
  ["༺", "༻"],
  ["ʚ", "ɞ"],
  ["[", "]"],
  ["(", ")"],
  ["⟨", "⟩"],
  ["×", "×"],
  ["•", "•"],
  ["⚡", "⚡"],
  ["☠", "☠"],
  ["⚔", "⚔"],
  ["†", "†"],
  ["☬", "☬"],
  ["👑", "👑"],
  ["♛", "♛"],
  ["神", "神"],
  ["鬼", "鬼"],
  ["乡", "乡"],
  ["✿", "✿"],
  ["♡", "♡"],
  ["✧", "✧"],
  ["⋆", "⋆"],
  ["╰‿╯", "╰‿╯"],
  ["ツ", "ツ"],
  ["🧸", "🧸"],
  ["◈", "◈"],
  ["★", "★"],
  ["✪", "✪"]
];
const GAME_SPECIFIC_AFFIXES = {
  "free-fire": {
    prefixes: ["OP", "V •", "BOSS", "RAISTAR", "BADGE99", "TOTAL", "FF", "KILLER", "ALPHA", "DEVIL", "DARK", "SK", "TSG"],
    suffixes: ["999", "YT", "FF", "007", "VIP", "OFFICIAL", "GOD", "GAMING", "BRO", "444", "777", "LIVE"],
    symbols: ["亗", "👑", "☬", "꧁༺", "༻꧂", "࿐", "么", "々", "メ", "⚡", "☠", "☂️", "╰‿╯", "乂"],
    templates: [
      "亗{name}亗",
      "V • {name}",
      "꧁༺{name}༻꧂",
      "{name}࿐",
      "OP • {name}",
      "『{name}』亗",
      "{name} 么",
      "{name}々",
      "⚡{name}⚡",
      "亗 OP {name} 亗",
      "╰‿╯{name}",
      "Raistar • {name}",
      "𓊈{name}𓊉",
      "☬{name}☬",
      "{name}_999"
    ]
  },
  "bgmi": {
    prefixes: ["MORTAL", "SCOUT", "JONATHAN", "DYNAMO", "SOUL", "GODL", "TX", "BLIND", "TEAM", "IGL", "SNIPER"],
    suffixes: ["メ", "〆", "々", "么", "OP", "YT", "GAMING", "T1", "BATTLES", "VIP", "M416", "PUBG"],
    symbols: ["メ", "〆", "々", "么", "乡", "『", "』", "【", "】", "父", "气", "神", "×", "•"],
    templates: [
      "『{name}』メ",
      "{name}々",
      "【{name}】〆",
      "么{name}么",
      "乡{name}乡",
      "父{name}气",
      "[SOUL] {name}",
      "[GODL] {name}",
      "Tx_{name}",
      "{name} • OP",
      "神{name}神",
      "『Tx』{name}",
      "× {name} ×",
      "{name} 亗"
    ]
  },
  "valorant": {
    prefixes: ["VLR", "RADIANT", "IMMORTAL", "ACE", "T1", "SEN", "FNC", "PRX", "DRX", "NRG", "VAL"],
    suffixes: ["VLR", "FPS", "ACE", "240HZ", "AIM", "1TAP", "PRO", "CLUTCH", "DIFF", "EXE"],
    symbols: ["•", "·", "/", "|", "—", "×", "ø", "†", "::", "◈"],
    templates: [
      "{name} .",
      "iAm{name}",
      "vlr / {name}",
      "[SEN] {name}",
      "[T1] {name}",
      "{name} 1tap",
      "k · a · d · i · r",
      "• {name} •",
      "{name} // vlr",
      "noScope {name}",
      "{name} diff",
      "{name}_fps",
      "† {name} †"
    ]
  },
  "codm": {
    prefixes: ["GHOST", "REAPER", "SOAP", "PRICE", "TASK141", "SNIPER", "NUKE", "CODM", "ELITE"],
    suffixes: ["YT", "CODM", "FPS", "PRO", "LEGEND", "NUKE", "WARZONE", "SNIPER"],
    symbols: ["☠", "⚔", "⚡", "☣", "✘", "𝕏", "🎯", "×", "•"],
    templates: [
      "☠{name}☠",
      "⚔ {name} ⚔",
      "TASK141 • {name}",
      "GHOST_{name}",
      "☣{name}☣",
      "🎯{name}",
      "{name} • CODM",
      "𝕏{name}𝕏",
      "× {name} ×"
    ]
  },
  "fortnite": {
    prefixes: ["FAZE", "FN", "BOXED", "SWEAT", "CRACKED", "NOT", "ITS", "CLIX", "MONGRAAL"],
    suffixes: ["FN", "ON240FPS", "ONPIGS", "BOXED", "ONWHEEL", "CLUTCH", "EXE"],
    symbols: ["ツ", "✿", "⚡", "★", "×", "•", "—"],
    templates: [
      "ツ {name}",
      "not {name}",
      "faze {name}",
      "{name} on 240hz",
      "{name} fn",
      "{name} in the box",
      "✿ {name} ✿",
      "⚡ {name} ⚡",
      "Its_{name}"
    ]
  },
  "roblox": {
    prefixes: ["xX", "i_", "rblx_", "queen_", "king_", "sweet_", "soft_", "cloud_"],
    suffixes: ["Xx", "_rblx", "_vibes", "_cloud", "_cutie", "♡", "✿", "_yt"],
    symbols: ["✿", "♡", "✧", "⋆", "🧸", "ʚɞ", "✰", "❀"],
    templates: [
      "✿{name}✿",
      "♡{name}♡",
      "xX_{name}_Xx",
      "i_{name}",
      "ʚ{name}ɞ",
      "✧ {name} ✧",
      "{name} vibes ♡",
      "🧸 {name}",
      "sweet_{name}"
    ]
  },
  "minecraft": {
    prefixes: ["MC_", "x_", "Craft_", "PvP_", "Not", "Real", "The"],
    suffixes: ["_MC", "_PvP", "_God", "_HD", "_Craft", "_YT"],
    symbols: ["_", "x", "•", "—", "|"],
    templates: [
      "{name}_PvP",
      "x_{name}_x",
      "MC_{name}",
      "{name}_God",
      "The_{name}",
      "Not{name}",
      "Real_{name}",
      "{name}_Craft"
    ]
  },
  "esports-clan": {
    prefixes: ["SOUL", "GODL", "TSG", "FAZE", "T1", "NAVI", "OPTIC", "VLR", "RASTAR", "TOTAL", "SQUAD", "TEAM"],
    suffixes: ["ESPORTS", "CLAN", "SQUAD", "OFFICIAL", "ARMY", "LEGACY", "GAMING"],
    symbols: ["『", "』", "【", "】", "𓊈", "𓊉", "《", "》", "❮", "❯", "亗", "メ", "〆", "乡"],
    templates: [
      "『SOUL』{name}",
      "【GODL】{name}",
      "𓊈TSG𓊉 {name}",
      "《FAZE》{name}",
      "[T1] {name}",
      "亗 SQUAD {name} 亗",
      "『{name}』メ",
      "【{name}】〆",
      "❮TEAM❯ {name}",
      "SOUL • {name}",
      "GODL • {name}"
    ]
  }
};
const COMMON_PREFIXES = {
  boy: ["OP", "MR", "KING", "LORD", "DEVIL", "ALPHA", "DARK", "GHOST", "BADBOY", "SHADOW", "TITAN", "VILLAIN", "RASTAR", "BOSS", "GOD"],
  girl: ["QUEEN", "MISS", "ANGEL", "PRINCESS", "GODDESS", "LADY", "BABY", "KITTY", "VALKYRIE", "CANDY", "ROSE", "SWEET", "DOLL"],
  clan: ["SOUL", "GODL", "TSG", "FAZE", "OPTIC", "NAVI", "VLR", "T1", "RASTAR", "TOTAL", "SQUAD", "TEAM", "LEGACY", "ALPHA"],
  esports: ["PRO", "ELITE", "ACE", "LETHAL", "RADIANT", "MYTHIC", "IMMORTAL", "VORTEX", "SNIPER", "LEGEND", "CLUTCH", "1TAP"]
};
const COMMON_SUFFIXES = {
  boy: ["999", "GOD", "YT", "VIP", "OP", "007", "FF", "KILLER", "BOY", "777", "BRO", "BOSS", "444", "LIVE"],
  girl: ["GIRL", "CHAN", "VIBES", "CUTIE", "QUEEN", "♡", "✿", "BABY", "PRINCESS", "DOLL", "ANGEL"],
  clan: ["ESPORTS", "CLAN", "SQUAD", "LEGACY", "ARMY", "TEAM", "OFFICIAL", "GAMING", "GUILD", "FORCE"],
  esports: ["PRO", "FPS", "SNIPER", "WINNER", "CHAMP", "240FPS", "ONE", "VLR", "DIFF", "1TAP", "AIM"]
};
function getRandomElement(array, seedRng) {
  if (!array || array.length === 0) return void 0;
  const rng = seedRng ? seedRng() : Math.random();
  return array[Math.floor(rng * array.length)];
}

function getUnicodeLength(str) {
  return Array.from(str).length;
}
function validateGameRules(name, rules) {
  const maxLength = rules?.maxLength || 16;
  const minLength = rules?.minLength || 2;
  const length = getUnicodeLength(name);
  const issues = [];
  if (length < minLength) {
    issues.push(`Too short: Name has ${length} chars (minimum is ${minLength})`);
  }
  if (length > maxLength) {
    issues.push(`Too long: Name has ${length} chars (maximum is ${maxLength})`);
  }
  if (rules?.forbiddenChars && rules.forbiddenChars.length > 0) {
    for (const char of rules.forbiddenChars) {
      if (name.includes(char)) {
        issues.push(`Forbidden character detected: "${char}"`);
      }
    }
  }
  if (rules?.allowedRegex && rules.allowedRegex !== ".*") {
    try {
      const reg = new RegExp(rules.allowedRegex, "u");
      if (!reg.test(name)) {
        issues.push(`Contains characters not supported by this game`);
      }
    } catch {
    }
  }
  const isValid = issues.length === 0;
  let score = 70;
  if (isValid) score += 20;
  if (rules?.preferredSymbols?.some((s) => name.includes(s))) score += 10;
  if (length >= 4 && length <= maxLength - 2) score += 5;
  return {
    isValid,
    length,
    maxLength,
    minLength,
    issues,
    score: Math.min(100, Math.max(0, score))
  };
}

const LEET_MAP = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "8": "b",
  "@": "a",
  "$": "s",
  "!": "i",
  "+": "t",
  "|": "l"
};
function normalizeForSafety(text) {
  if (!text) return "";
  let normalized = text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  normalized = normalized.replace(/[\u200B-\u200D\uFEFF\u00AD\u200E\u200F\u2028\u2029]/g, "");
  normalized = normalized.toLowerCase();
  normalized = normalized.split("").map((c) => LEET_MAP[c] || c).join("");
  normalized = normalized.replace(/[^a-z0-9]/g, "");
  return normalized;
}
async function validateContentSafety(text) {
  if (!text || text.trim() === "") {
    return { isSafe: true, cleanText: "" };
  }
  const normalized = normalizeForSafety(text);
  let blockedList = [];
  try {
    blockedList = await getBlockedWords();
  } catch (err) {
    blockedList = SEED_BLOCKED_WORDS;
  }
  for (const word of blockedList) {
    const normWord = normalizeForSafety(word);
    if (normWord && normalized.includes(normWord)) {
      return {
        isSafe: false,
        cleanText: text,
        flaggedWord: word
      };
    }
  }
  return {
    isSafe: true,
    cleanText: text
  };
}

const DEFAULT_GAMER_NAMES = [
  "Kadir",
  "Ghost",
  "Shadow",
  "Titan",
  "Hunter",
  "Viper",
  "Blade",
  "Phoenix",
  "Raven",
  "Wolf",
  "Storm",
  "Reaper",
  "Nomad",
  "Echo",
  "Nova",
  "Frost",
  "Maverick",
  "Apex",
  "Cipher",
  "Venom",
  "Blaze",
  "Ninja",
  "Samurai",
  "Legend",
  "Knight",
  "Slayer",
  "Spectre",
  "Valkyrie",
  "Rogue",
  "Hydra",
  "Vortex",
  "Kaiser"
];
function createPrng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = s * 16807 % 2147483647;
    return (s - 1) / 2147483646;
  };
}
function shuffleArray(array, rng) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
async function generateGamingNames(options = {}) {
  const count = Math.min(100, Math.max(1, options.count || 24));
  const offset = options.offset || 0;
  options.includeSymbols !== false;
  const gender = options.gender || "all";
  const rngSeed = (options.seed || Date.now()) + offset;
  const rng = createPrng(rngSeed);
  const [allGames, allStyles] = await Promise.all([
    getGames(),
    getStyles()
  ]);
  let selectedGame = allGames.find((g) => g.id === options.gameId || g.slug === options.gameSlug);
  if (!selectedGame && allGames.length > 0) {
    selectedGame = allGames[0];
  }
  const selectedGameSlug = selectedGame?.slug || "free-fire";
  const gameAffixes = GAME_SPECIFIC_AFFIXES[selectedGameSlug] || GAME_SPECIFIC_AFFIXES["free-fire"];
  let selectedStyle = allStyles.find((s) => s.id === options.styleId || s.slug === options.styleSlug);
  const styleSlug = selectedStyle?.slug || options.styleSlug || "all";
  let rawName = (options.name || "").trim();
  if (!rawName) {
    rawName = getRandomElement(DEFAULT_GAMER_NAMES, rng);
  }
  const safetyCheck = await validateContentSafety(rawName);
  if (!safetyCheck.isSafe) {
    throw new Error(`The provided name violates safety filters: "${safetyCheck.flaggedWord}"`);
  }
  const generatedPool = [];
  const seenNames = /* @__PURE__ */ new Set();
  const gameRules = selectedGame?.rules || {
    maxLength: 14,
    minLength: 3,
    preferredSymbols: ["亗", "乂", "メ", "々", "么", "꧁", "꧂"]
  };
  const activePrefixes = [
    ...gender === "girl" ? COMMON_PREFIXES.girl : [],
    ...gender === "boy" ? COMMON_PREFIXES.boy : [],
    ...gender === "clan" ? COMMON_PREFIXES.clan : [],
    ...gender === "esports" ? COMMON_PREFIXES.esports : [],
    ...gameAffixes.prefixes || [],
    ...COMMON_PREFIXES.boy,
    ...COMMON_PREFIXES.clan
  ];
  const activeSuffixes = [
    ...gender === "girl" ? COMMON_SUFFIXES.girl : [],
    ...gender === "boy" ? COMMON_SUFFIXES.boy : [],
    ...gender === "clan" ? COMMON_SUFFIXES.clan : [],
    ...gender === "esports" ? COMMON_SUFFIXES.esports : [],
    ...gameAffixes.suffixes || [],
    ...COMMON_SUFFIXES.boy,
    ...COMMON_SUFFIXES.esports
  ];
  const fontPool = [
    "small_caps",
    "bold_gothic",
    "bold_cursive",
    "sans_bold",
    "double_struck",
    "monospace",
    "sans_italic",
    "circled",
    "square",
    "gothic",
    "cursive",
    "serif_bold",
    "spaced",
    "dot_spaced",
    "slash_spaced",
    "normal"
  ];
  let attempts = 0;
  const maxAttempts = count * 20;
  while (generatedPool.length < count * 2 && attempts < maxAttempts) {
    attempts++;
    const stepSeed = attempts + offset;
    let fontKey = "small_caps";
    if (selectedStyle?.configuration?.unicodeFont) {
      fontKey = selectedStyle.configuration.unicodeFont;
    } else if (styleSlug === "gothic-fraktur") {
      fontKey = "bold_gothic";
    } else if (styleSlug === "classic-gothic") {
      fontKey = "gothic";
    } else if (styleSlug === "bold-script") {
      fontKey = "bold_cursive";
    } else if (styleSlug === "cursive-script") {
      fontKey = "cursive";
    } else if (styleSlug === "double-struck") {
      fontKey = "double_struck";
    } else if (styleSlug === "monospace-hacker") {
      fontKey = "monospace";
    } else if (styleSlug === "impact-bold") {
      fontKey = "sans_bold";
    } else if (styleSlug === "clean-italic") {
      fontKey = "sans_italic";
    } else if (styleSlug === "circled-bubble") {
      fontKey = "circled";
    } else if (styleSlug === "square-box") {
      fontKey = "square";
    } else if (styleSlug === "fullwidth-wide") {
      fontKey = "fullwidth";
    } else if (styleSlug === "inverted-flip") {
      fontKey = "inverted";
    } else if (styleSlug === "clean-spaced") {
      fontKey = "spaced";
    } else if (styleSlug === "dot-minimal") {
      fontKey = "dot_spaced";
    } else if (styleSlug === "slash-minimal") {
      fontKey = "slash_spaced";
    } else {
      fontKey = fontPool[Math.floor(rng() * fontPool.length)];
    }
    let styledBase = applyUnicodeFont(rawName, fontKey);
    if (selectedStyle?.configuration?.casing === "uppercase" || styleSlug === "clean-spaced") {
      styledBase = applyUnicodeFont(rawName.toUpperCase(), fontKey);
    } else if (selectedStyle?.configuration?.casing === "lowercase" || styleSlug === "dot-minimal" || styleSlug === "slash-minimal") {
      styledBase = applyUnicodeFont(rawName.toLowerCase(), fontKey);
    }
    let candidate = styledBase;
    if (styleSlug === "boss-crown") {
      const crown = getRandomElement(["亗", "👑", "♛", "☬", "⚜", "♚", "𒆜"], rng);
      const variants = [
        `${crown}${styledBase}${crown}`,
        `亗 ${styledBase} 亗`,
        `👑 ${styledBase} 👑`,
        `亗 OP ${styledBase} 亗`,
        `☬ ${styledBase} ☬`,
        `『${styledBase}』亗`,
        `【${styledBase}】👑`,
        `BOSS • ${styledBase} 亗`,
        `亗 ${styledBase}_VIP`
      ];
      candidate = getRandomElement(variants, rng);
    } else if (styleSlug === "wings") {
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
        `ʚ ${styledBase} ɞ`
      ];
      candidate = getRandomElement(wings, rng);
    } else if (styleSlug === "japanese-katakana") {
      const sfx = getRandomElement(["メ", "々", "么", "〆", "乡", "ッ", "彡"], rng);
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
        `${styledBase}〆`
      ];
      candidate = getRandomElement(variants, rng);
    } else if (styleSlug === "clan-brackets") {
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
        `𓊈${styledBase}𓊉`
      ];
      candidate = getRandomElement(variants, rng);
    } else if (styleSlug === "attitude-cross") {
      const wpn = getRandomElement(["⚔", "☠", "⚡", "☣", "✞", "乂", "†", "✘", "𝕏"], rng);
      candidate = `${wpn}${styledBase}${wpn}`;
    } else if (styleSlug === "esports-pro") {
      const team = getRandomElement(["SOUL", "GODL", "T1", "SEN", "FNC", "PRX", "TSG", "FAZE"], rng);
      const variants = [
        `[${team}] ${styledBase}`,
        `『${team}』${styledBase}`,
        `${team} • ${styledBase}`,
        `PRO • ${styledBase}`,
        `${styledBase} .`,
        `iAm${styledBase}`,
        `${styledBase} 1tap`
      ];
      candidate = getRandomElement(variants, rng);
    } else if (styleSlug === "aesthetic-cute") {
      const sym = getRandomElement(["✿", "♡", "✧", "⋆", "✰", "╰‿╯", "ツ", "🧸"], rng);
      candidate = `${sym} ${styledBase} ${sym}`;
    } else if (styleSlug === "sniper-guns") {
      const sym = getRandomElement(["×", "•", "—", "ø", "†", "🎯"], rng);
      candidate = `${sym} ${styledBase} ${sym}`;
    } else {
      const randPattern = Math.floor(rng() * 22);
      if (randPattern === 0 && gameAffixes.templates.length > 0) {
        const tpl = getRandomElement(gameAffixes.templates, rng);
        candidate = tpl.replace("{name}", styledBase);
      } else if (randPattern === 1) {
        candidate = `亗${styledBase}亗`;
      } else if (randPattern === 2) {
        const pair = getRandomElement(BRACKET_PAIRS, rng);
        const sfx = getRandomElement(["メ", "々", "么", "〆", "★", "⚡", "✿", "亗"], rng);
        candidate = `${pair[0]}${styledBase}${pair[1]}${sfx}`;
      } else if (randPattern === 3) {
        candidate = `꧁༺${styledBase}༻꧂`;
      } else if (randPattern === 4) {
        candidate = `${styledBase}々`;
      } else if (randPattern === 5) {
        candidate = `么${styledBase}么`;
      } else if (randPattern === 6) {
        const pfx = getRandomElement(activePrefixes, rng);
        candidate = `[${pfx}] ${styledBase}`;
      } else if (randPattern === 7) {
        candidate = `乂${styledBase}乂`;
      } else if (randPattern === 8) {
        candidate = `乡${styledBase}乡`;
      } else if (randPattern === 9) {
        const royal = getRandomElement(["👑", "♛", "☬", "⚜", "♚"], rng);
        candidate = `${royal}${styledBase}${royal}`;
      } else if (randPattern === 10) {
        candidate = `${styledBase}࿐`;
      } else if (randPattern === 11) {
        const combat = getRandomElement(["⚔", "☠", "⚡", "✞", "†"], rng);
        candidate = `${combat}${styledBase}${combat}`;
      } else if (randPattern === 12) {
        const kanji = getRandomElement(["神", "鬼", "侍", "竜", "影", "極"], rng);
        candidate = `${kanji}${styledBase}${kanji}`;
      } else if (randPattern === 13) {
        candidate = `• ${styledBase} •`;
      } else if (randPattern === 14) {
        candidate = `× ${styledBase} ×`;
      } else if (randPattern === 15) {
        const soft = getRandomElement(["✿", "♡", "✧", "⋆", "╰‿╯", "ツ", "🧸"], rng);
        candidate = `${soft}${styledBase}${soft}`;
      } else if (randPattern === 16) {
        const sfx = getRandomElement(activeSuffixes, rng);
        candidate = `${styledBase} • ${sfx}`;
      } else if (randPattern === 17) {
        candidate = `𓊈${styledBase}𓊉`;
      } else if (randPattern === 18) {
        candidate = `【${styledBase}】〆`;
      } else if (randPattern === 19) {
        candidate = `V • ${styledBase}`;
      } else if (randPattern === 20) {
        candidate = `『${styledBase}』メ`;
      } else {
        candidate = `༺${styledBase}༻`;
      }
    }
    const val = validateGameRules(candidate, gameRules);
    if (options.lengthCategory === "short" && val.length > 8) continue;
    if (options.lengthCategory === "medium" && (val.length < 7 || val.length > 12)) continue;
    if (options.lengthCategory === "long" && val.length < 11) continue;
    if (!seenNames.has(candidate)) {
      seenNames.add(candidate);
      generatedPool.push({
        id: `gen-${generatedPool.length + 1}-${Date.now().toString(36)}-${stepSeed}`,
        name: candidate,
        plainName: rawName,
        gameName: selectedGame?.name || "All Games",
        styleName: selectedStyle?.name || fontKey.replace(/_/g, " ").toUpperCase(),
        validation: val,
        font: fontKey,
        isPopular: generatedPool.length < 4
      });
    }
  }
  const shuffled = shuffleArray(generatedPool, rng);
  const finalResults = shuffled.slice(0, count);
  return {
    results: finalResults,
    total: finalResults.length,
    inputName: rawName,
    gameName: selectedGame?.name || "General",
    styleName: selectedStyle?.name || "All Styles"
  };
}

const POST = async ({ request }) => {
  const ip = getClientIp(request);
  const rateCheck = checkRateLimit(`gen_${ip}`, 120);
  if (!rateCheck.isAllowed) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Too many requests. Please slow down.",
        retryAfter: rateCheck.resetSeconds
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(rateCheck.resetSeconds),
          "X-RateLimit-Limit": String(rateCheck.limit),
          "X-RateLimit-Remaining": String(rateCheck.remaining)
        }
      }
    );
  }
  try {
    const rawBody = await request.json().catch(() => ({}));
    const parseResult = generateRequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid parameters",
          details: parseResult.error.flatten()
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const { name, game, gameId, gameSlug, style, styleId, styleSlug, gender, language, symbols, length, count, offset, seed } = parseResult.data;
    const result = await generateGamingNames({
      name: name || void 0,
      gameId: gameId || (game && !game.startsWith("/") ? game : void 0),
      gameSlug: gameSlug || (game && !game.startsWith("/") ? game : void 0),
      styleId: styleId || (style && !style.startsWith("/") ? style : void 0),
      styleSlug: styleSlug || (style && !style.startsWith("/") ? style : void 0),
      gender,
      language,
      includeSymbols: symbols,
      lengthCategory: length,
      count,
      offset,
      seed
    });
    if (result.results.length > 0) {
      trackNameUsage(result.results[0].name, gameId, styleId, "generate").catch(() => {
      });
    }
    return new Response(
      JSON.stringify({
        success: true,
        data: result.results,
        meta: {
          total: result.total,
          inputName: result.inputName,
          gameName: result.gameName,
          styleName: result.styleName
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          "X-RateLimit-Limit": String(rateCheck.limit),
          "X-RateLimit-Remaining": String(rateCheck.remaining)
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || "Failed to generate gaming names"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
