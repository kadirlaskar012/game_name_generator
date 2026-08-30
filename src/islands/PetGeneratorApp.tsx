import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, RefreshCw, Heart, Dog, Cat, Bird, Shield, Flame } from 'lucide-react';

interface PetProfile {
  id: string;
  name: string;
  category: 'ff-pet' | 'companion';
  species: string;
  icon: string;
  defaultNames: string[];
}

const PET_PROFILES: PetProfile[] = [
  {
    id: 'falco',
    name: 'Falco (Falcon)',
    category: 'ff-pet',
    species: 'Bird / Raptor',
    icon: '🦅',
    defaultNames: ['SkyLord', 'AeroStrike', 'Zephyr', 'Talon', 'Valkyrie', 'ShadowWing', 'ThunderBird', 'FalconX', 'Gale'],
  },
  {
    id: 'beaston',
    name: 'Beaston (Baboon)',
    category: 'ff-pet',
    species: 'Ape / Beast',
    icon: '🦍',
    defaultNames: ['KingKong', 'Goliath', 'Titan', 'Rampage', 'Kong', 'Brutus', 'Primal', 'BeastMode', 'Apex'],
  },
  {
    id: 'ottero',
    name: 'Ottero (Otter)',
    category: 'ff-pet',
    species: 'Aquatic / Cute',
    icon: '🦦',
    defaultNames: ['Bubbles', 'Aqua', 'Splash', 'Milo', 'Nugget', 'Hydro', 'Pebble', 'Oreo', 'Pip'],
  },
  {
    id: 'waggor',
    name: 'Mr. Waggor (Penguin)',
    category: 'ff-pet',
    species: 'Penguin / Cool',
    icon: '🐧',
    defaultNames: ['GlooMaster', 'Frosty', 'Chilly', 'Pingu', 'Blizzard', 'IceCube', 'WaggorX', 'Freeze', 'Snowball'],
  },
  {
    id: 'rockie',
    name: 'Rockie (Raccoon)',
    category: 'ff-pet',
    species: 'Rockstar Raccoon',
    icon: '🦝',
    defaultNames: ['Bandit', 'Rocket', 'Rocker', 'Punk', 'Ziggy', 'Riff', 'Slash', 'Rebel', 'Gizmo'],
  },
  {
    id: 'spirit-fox',
    name: 'Spirit Fox',
    category: 'ff-pet',
    species: 'Mythical Fox',
    icon: '🦊',
    defaultNames: ['Kitsune', 'Kyubi', 'Inari', 'Blaze', 'Mystic', 'Vulpix', 'Foxy', 'Solaris', 'Ember'],
  },
  {
    id: 'panda',
    name: 'Detective Panda',
    category: 'ff-pet',
    species: 'Panda / Detective',
    icon: '🐼',
    defaultNames: ['Sherlock', 'Bambu', 'Po', 'Shadow', 'PandaPro', 'Chubby', 'AgentP', 'Noir', 'Ninja'],
  },
  {
    id: 'night-panther',
    name: 'Night Panther',
    category: 'ff-pet',
    species: 'Feline / Cybernetic',
    icon: '🐆',
    defaultNames: ['Bagheera', 'ShadowClaw', 'Phantom', 'Midnight', 'Eclipse', 'Venom', 'Nyx', 'Prowler', 'Stealth'],
  },
  {
    id: 'wolf',
    name: 'Dire Wolf / Hound',
    category: 'companion',
    species: 'Canine Beast',
    icon: '🐺',
    defaultNames: ['Fenrir', 'Ghost', 'Fang', 'Alpha', 'Blizzard', 'Storm', 'Rex', 'Lobo', 'Ragnar'],
  },
  {
    id: 'dragon',
    name: 'Drake / Dragon',
    category: 'companion',
    species: 'Mythical Reptile',
    icon: '🐉',
    defaultNames: ['Draco', 'Smaug', 'Bahamut', 'Ignis', 'Pyre', 'Viper', 'Shenron', 'Alduin', 'Ryujin'],
  },
];

const PET_STYLE_TEMPLATES = [
  { label: 'Boss Crown', wrap: (n: string) => `亗 ${n} 亗` },
  { label: 'Angel Wings', wrap: (n: string) => `꧁༺${n}༻꧂` },
  { label: 'Japanese Katakana', wrap: (n: string) => `『${n}』メ` },
  { label: 'Esports Squad', wrap: (n: string) => `【${n}】〆` },
  { label: 'Cute Aesthetic', wrap: (n: string) => `✿ ${n} ✿` },
  { label: 'Combat Cross', wrap: (n: string) => `⚔ ${n} ⚔` },
  { label: 'Royal King', wrap: (n: string) => `👑 ${n} 👑` },
  { label: 'Sparkle Star', wrap: (n: string) => `✧ ${n} ✧` },
  { label: 'Lenticular Bracket', wrap: (n: string) => `𓊈${n}𓊉` },
  { label: 'Heart Cute', wrap: (n: string) => `♡ ${n} ♡` },
  { label: 'Minimal Spaced', wrap: (n: string) => `• ${n} •` },
  { label: 'Pro Clan', wrap: (n: string) => `PRO • ${n}` },
];

export const PetGeneratorApp: React.FC = () => {
  const [selectedPetId, setSelectedPetId] = useState<string>('falco');
  const [customPetName, setCustomPetName] = useState<string>('');
  const [styleFilter, setStyleFilter] = useState<string>('all');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const selectedPet = useMemo(() => {
    return PET_PROFILES.find((p) => p.id === selectedPetId) || PET_PROFILES[0];
  }, [selectedPetId]);

  const petResults = useMemo(() => {
    const namesPool = customPetName.trim()
      ? [customPetName.trim()]
      : selectedPet.defaultNames;

    const list: { id: string; name: string; styleName: string; petIcon: string }[] = [];

    namesPool.forEach((baseName, baseIdx) => {
      PET_STYLE_TEMPLATES.forEach((tmpl, tmplIdx) => {
        list.push({
          id: `pet-${baseIdx}-${tmplIdx}`,
          name: tmpl.wrap(baseName),
          styleName: tmpl.label,
          petIcon: selectedPet.icon,
        });
      });
    });

    return list;
  }, [selectedPet, customPetName]);

  const handleCopy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 1500);

      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, action: 'copy' }),
      }).catch(() => {});
    } catch {}
  };

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="mb-6 space-y-4">
        {/* Custom Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={customPetName}
              onChange={(e) => setCustomPetName(e.target.value)}
              placeholder={`Enter pet name or pick a pet below (e.g. ${selectedPet.defaultNames[0]})...`}
              className="w-full px-4 py-2.5 bg-white dark:bg-[#111622] border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 text-sm outline-none focus:border-sky-500 transition"
            />
            {customPetName && (
              <button
                type="button"
                onClick={() => setCustomPetName('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Pet Profiles Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
            Select Game Pet / Companion:
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            {PET_PROFILES.map((pet) => (
              <button
                key={pet.id}
                type="button"
                onClick={() => {
                  setSelectedPetId(pet.id);
                  setCustomPetName('');
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  selectedPetId === pet.id
                    ? 'bg-sky-600 text-white font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                <span>{pet.icon}</span>
                <span>{pet.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between py-2 border-b border-neutral-200 dark:border-neutral-800 mb-2">
        <h2 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <span>{selectedPet.icon}</span>
          <span>{selectedPet.name} Stylish Nicknames ({petResults.length})</span>
        </h2>
        <span className="text-xs text-neutral-500">100% Free Fire & BGMI Safe</span>
      </div>

      {/* Results List */}
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
        {petResults.map((item) => {
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
                  <span className="text-sky-600 dark:text-sky-400 font-medium">{item.styleName}</span>
                  <span>•</span>
                  <span>Companion Tag</span>
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
