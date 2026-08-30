import React, { useState, useMemo } from 'react';
import { Copy, Check, Globe, RefreshCw, Sparkles, Heart } from 'lucide-react';

interface LangPreset {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  sampleWords: { word: string; meaning: string }[];
}

const LANGUAGE_PRESETS: LangPreset[] = [
  {
    id: 'hindi',
    name: 'Hindi & Sanskrit',
    nativeName: 'हिन्दी / संस्कृत',
    flag: '🇮🇳',
    sampleWords: [
      { word: 'महाकाल', meaning: 'Lord Shiva / Timeless' },
      { word: 'रुद्र', meaning: 'Fierce Roarer' },
      { word: 'गरुड़', meaning: 'Divine Eagle' },
      { word: 'अग्नि', meaning: 'Fire / Blaze' },
      { word: 'योद्धा', meaning: 'Warrior' },
      { word: 'काल', meaning: 'Death / Time' },
      { word: 'सिंह', meaning: 'Lion' },
      { word: 'असुर', meaning: 'Demon Titan' },
      { word: 'रणवीर', meaning: 'Hero of Battlefield' },
      { word: 'ब्रह्मास्त्र', meaning: 'Ultimate Weapon' },
      { word: 'त्रिशूल', meaning: 'Trident of Shiva' },
      { word: 'कालभैरव', meaning: 'Fierce Guardian' },
    ],
  },
  {
    id: 'japanese',
    name: 'Japanese Kanji & Katakana',
    nativeName: '日本語',
    flag: '🇯🇵',
    sampleWords: [
      { word: '影', meaning: 'Kage / Shadow' },
      { word: '神', meaning: 'Kami / God' },
      { word: '鬼', meaning: 'Oni / Demon' },
      { word: '侍', meaning: 'Samurai / Warrior' },
      { word: '竜', meaning: 'Ryu / Dragon' },
      { word: '死神', meaning: 'Shinigami / Reaper' },
      { word: '無敵', meaning: 'Muteki / Invincible' },
      { word: '狼', meaning: 'Okami / Wolf' },
      { word: '雷神', meaning: 'Raijin / Thunder God' },
      { word: '忍者', meaning: 'Ninja / Shinobi' },
      { word: '覇者', meaning: 'Hasha / Supreme Ruler' },
      { word: '夜叉', meaning: 'Yasha / Demon Spirit' },
    ],
  },
  {
    id: 'bengali',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇧🇩',
    sampleWords: [
      { word: 'তুফান', meaning: 'Cyclone / Storm' },
      { word: 'অগ্নি', meaning: 'Fire / Blaze' },
      { word: 'রুদ্র', meaning: 'Fierce Warrior' },
      { word: 'সিংহ', meaning: 'Lion King' },
      { word: 'বিদ্রোহী', meaning: 'Rebel' },
      { word: 'কালভৈরব', meaning: 'Fierce Deity' },
      { word: 'বজ্র', meaning: 'Thunderbolt' },
      { word: 'শিকারী', meaning: 'Hunter' },
      { word: 'দানব', meaning: 'Titan Demon' },
      { word: 'অধিপতি', meaning: 'Supreme Overlord' },
    ],
  },
  {
    id: 'arabic',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    sampleWords: [
      { word: 'صقر', meaning: 'Falcon / Hunter' },
      { word: 'شبح', meaning: 'Ghost / Phantom' },
      { word: 'سلطان', meaning: 'Sultan / Emperor' },
      { word: 'أسد', meaning: 'Lion of War' },
      { word: 'تنين', meaning: 'Dragon' },
      { word: 'فارس', meaning: 'Knight / Champion' },
      { word: 'عاصفة', meaning: 'Storm' },
      { word: 'صاعقة', meaning: 'Thunderbolt' },
      { word: 'سياف', meaning: 'Master Swordsman' },
    ],
  },
  {
    id: 'russian',
    name: 'Russian Cyrillic',
    nativeName: 'Русский',
    flag: '🇷🇺',
    sampleWords: [
      { word: 'Волк', meaning: 'Wolf' },
      { word: 'Призрак', meaning: 'Ghost / Wraith' },
      { word: 'Тень', meaning: 'Shadow' },
      { word: 'Гром', meaning: 'Thunder' },
      { word: 'Огонь', meaning: 'Fire / Blaze' },
      { word: 'Витязь', meaning: 'Legendary Knight' },
      { word: 'Медведь', meaning: 'Bear' },
      { word: 'Ястреб', meaning: 'Hawk' },
    ],
  },
  {
    id: 'korean',
    name: 'Korean Hangul',
    nativeName: '한국어',
    flag: '🇰🇷',
    sampleWords: [
      { word: '도깨비', meaning: 'Dokkaebi / Goblin God' },
      { word: '용', meaning: 'Yong / Dragon' },
      { word: '그림자', meaning: 'Geurimja / Shadow' },
      { word: '불사조', meaning: 'Phoenix' },
      { word: '황제', meaning: 'Emperor' },
      { word: '무사', meaning: 'Musa / Warrior' },
    ],
  },
];

const STYLING_WRAPPERS = [
  (w: string) => `亗 ${w} 亗`,
  (w: string) => `『${w}』メ`,
  (w: string) => `【${w}】〆`,
  (w: string) => `꧁༺${w}༻꧂`,
  (w: string) => `𓊈${w}𓊉`,
  (w: string) => `👑 ${w} 👑`,
  (w: string) => `☠ ${w} ☠`,
  (w: string) => `⚡ ${w} ⚡`,
  (w: string) => `• ${w} •`,
  (w: string) => `BOSS • ${w}`,
  (w: string) => `${w}々`,
  (w: string) => `么${w}么`,
  (w: string) => `[ ${w} ]`,
  (w: string) => `PRO • ${w}`,
  (w: string) => `神 • ${w} • 鬼`,
  (w: string) => `${w} 007`,
];

export const MultilingualApp: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [customWord, setCustomWord] = useState<string>('');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const activePresets = useMemo(() => {
    if (selectedLang === 'all') return LANGUAGE_PRESETS;
    return LANGUAGE_PRESETS.filter((p) => p.id === selectedLang);
  }, [selectedLang]);

  const generatedList = useMemo(() => {
    const list: { id: string; name: string; meaning: string; lang: string }[] = [];

    // If custom word is entered
    if (customWord.trim()) {
      const word = customWord.trim();
      STYLING_WRAPPERS.forEach((wrap, idx) => {
        list.push({
          id: `custom-${idx}`,
          name: wrap(word),
          meaning: 'Custom Input Name',
          lang: 'Custom',
        });
      });
      return list;
    }

    // Default curated words
    activePresets.forEach((preset) => {
      preset.sampleWords.forEach((item, itemIdx) => {
        const wrap = STYLING_WRAPPERS[itemIdx % STYLING_WRAPPERS.length];
        list.push({
          id: `${preset.id}-${itemIdx}`,
          name: wrap(item.word),
          meaning: item.meaning,
          lang: preset.name,
        });
      });
    });

    return list;
  }, [activePresets, customWord]);

  const handleCopy = async (nameText: string) => {
    try {
      await navigator.clipboard.writeText(nameText);
      setCopiedName(nameText);
      setTimeout(() => setCopiedName(null), 1500);

      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameText, action: 'copy' }),
      }).catch(() => {});
    } catch {}
  };

  return (
    <div className="w-full">
      {/* Controls Bar */}
      <div className="mb-6 space-y-4">
        {/* Custom Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
              placeholder="Type any word in any language (e.g. महाकाल, 影, তুফান, صقر)..."
              className="w-full px-4 py-2.5 bg-white dark:bg-[#111622] border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 text-sm outline-none focus:border-sky-500 transition"
            />
            {customWord && (
              <button
                type="button"
                onClick={() => setCustomWord('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setSelectedLang('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
              selectedLang === 'all'
                ? 'bg-sky-600 text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            🌐 All Languages ({LANGUAGE_PRESETS.length})
          </button>

          {LANGUAGE_PRESETS.map((lang) => (
            <button
              key={lang.id}
              type="button"
              onClick={() => setSelectedLang(lang.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                selectedLang === lang.id
                  ? 'bg-sky-600 text-white font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between py-2 border-b border-neutral-200 dark:border-neutral-800 mb-2">
        <h2 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
          Multi-Language Gamer Tags ({generatedList.length})
        </h2>
        <span className="text-xs text-neutral-500">100% In-Game Compatible UTF-8</span>
      </div>

      {/* Clean Flat Results List */}
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
        {generatedList.map((item) => {
          const isCopied = copiedName === item.name;
          return (
            <div
              key={item.id}
              onClick={() => handleCopy(item.name)}
              className="group flex items-center justify-between py-3 px-3 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex-1 pr-3 overflow-hidden">
                <div className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-gaming select-all truncate group-hover:text-sky-500 transition-colors">
                  {item.name}
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-400">
                  <span className="font-medium text-sky-600 dark:text-sky-400">{item.lang}</span>
                  <span>•</span>
                  <span>{item.meaning}</span>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(item.name)}
                  className={`py-1.5 px-3.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-sky-600 hover:bg-sky-500 text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
