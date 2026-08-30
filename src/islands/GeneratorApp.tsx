import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { RefreshCw, SlidersHorizontal, Check, Copy, Layers, X, Dices } from 'lucide-react';
import { ResultCard } from './ResultCard';

interface GameOption {
  id: string;
  name: string;
  slug: string;
  logo: string;
  rules?: {
    maxLength: number;
    minLength: number;
    preferredSymbols?: string[];
  };
}

interface StyleOption {
  id: string;
  name: string;
  slug: string;
}

interface GeneratorAppProps {
  initialGames?: GameOption[];
  initialStyles?: StyleOption[];
  defaultGameSlug?: string;
  defaultStyleSlug?: string;
  defaultName?: string;
}

const SAMPLE_NAMES = ['Kadir', 'Ghost', 'Shadow', 'Viper', 'Titan', 'Reaper', 'Blade', 'Storm', 'Phoenix', 'Hunter', 'Samurai', 'Valkyrie', 'Rogue', 'Raven', 'Wolf', 'Apex'];

export const GeneratorApp: React.FC<GeneratorAppProps> = ({
  initialGames = [],
  initialStyles = [],
  defaultGameSlug,
  defaultStyleSlug,
  defaultName = '',
}) => {
  // State
  const [name, setName] = useState(defaultName);
  const [selectedGameSlug, setSelectedGameSlug] = useState(defaultGameSlug || (initialGames[0]?.slug || 'free-fire'));
  const [selectedStyleSlug, setSelectedStyleSlug] = useState(defaultStyleSlug || 'all');
  const [gender, setGender] = useState<'all' | 'boy' | 'girl' | 'clan' | 'esports'>('all');
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [lengthCategory, setLengthCategory] = useState<'all' | 'short' | 'medium' | 'long'>('all');
  const [count, setCount] = useState(24);
  const [pageOffset, setPageOffset] = useState(0);

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Favorites tracking
  const [favoritedNames, setFavoritedNames] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('gtp_favorites') || '[]');
      setFavoritedNames(new Set(stored.map((item: any) => item.name)));
    } catch {}
  }, []);

  const selectedGame = useMemo(() => {
    return initialGames.find((g) => g.slug === selectedGameSlug) || initialGames[0];
  }, [initialGames, selectedGameSlug]);

  // Core generator fetcher
  const executeGenerate = useCallback(
    async (params: {
      nameVal?: string;
      styleVal?: string;
      gameVal?: string;
      genderVal?: string;
      symbolsVal?: boolean;
      lengthVal?: string;
      countVal?: number;
      append?: boolean;
      offsetVal?: number;
    } = {}) => {
      const isAppend = params.append === true;
      if (isAppend) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const targetName = params.nameVal !== undefined ? params.nameVal : name;
      const targetStyle = params.styleVal !== undefined ? params.styleVal : selectedStyleSlug;
      const targetGame = params.gameVal !== undefined ? params.gameVal : selectedGameSlug;
      const targetGender = params.genderVal !== undefined ? params.genderVal : gender;
      const targetSymbols = params.symbolsVal !== undefined ? params.symbolsVal : includeSymbols;
      const targetLength = params.lengthVal !== undefined ? params.lengthVal : lengthCategory;
      const targetCount = params.countVal !== undefined ? params.countVal : count;
      const targetOffset = params.offsetVal !== undefined ? params.offsetVal : (isAppend ? pageOffset + targetCount : 0);

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: targetName.trim(),
            gameSlug: targetGame,
            styleSlug: targetStyle === 'all' ? undefined : targetStyle,
            gender: targetGender,
            symbols: targetSymbols,
            length: targetLength,
            count: targetCount,
            offset: targetOffset,
          }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to generate names');
        }

        if (isAppend) {
          setResults((prev) => [...prev, ...(data.data || [])]);
          setPageOffset(targetOffset);
        } else {
          setResults(data.data || []);
          setPageOffset(0);
        }
      } catch (err: any) {
        setError(err?.message || 'Error generating names');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [name, selectedGameSlug, selectedStyleSlug, gender, includeSymbols, lengthCategory, count, pageOffset]
  );

  // Initial load
  useEffect(() => {
    executeGenerate();
  }, []);

  // Debounced auto-generate when typing name
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      executeGenerate({ nameVal: name, offsetVal: 0 });
    }, 150);
    return () => clearTimeout(timer);
  }, [name]);

  // Style click: Immediately auto-updates results
  const handleStyleClick = (styleSlug: string) => {
    setSelectedStyleSlug(styleSlug);
    executeGenerate({ styleVal: styleSlug, offsetVal: 0 });
  };

  // Game change: Immediately auto-updates results
  const handleGameChange = (newGameSlug: string) => {
    setSelectedGameSlug(newGameSlug);
    executeGenerate({ gameVal: newGameSlug, offsetVal: 0 });
  };

  // Category / Gender change: Immediately auto-updates results
  const handleGenderChange = (newGender: any) => {
    setGender(newGender);
    executeGenerate({ genderVal: newGender, offsetVal: 0 });
  };

  // Symbols toggle: Immediately auto-updates results
  const handleSymbolsToggle = () => {
    const next = !includeSymbols;
    setIncludeSymbols(next);
    executeGenerate({ symbolsVal: next, offsetVal: 0 });
  };

  // Random dice pick
  const handleRandomDice = () => {
    const random = SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)];
    setName(random);
    executeGenerate({ nameVal: random, offsetVal: 0 });
  };

  // Load more for infinite generation
  const handleLoadMore = () => {
    executeGenerate({ append: true });
  };

  // Copy all results to clipboard
  const handleCopyAll = async () => {
    if (results.length === 0) return;
    const text = results.map((r) => r.name).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1800);
    } catch {}
  };

  // Filtered results
  const filteredResults = useMemo(() => {
    if (!searchFilter.trim()) return results;
    const q = searchFilter.toLowerCase();
    return results.filter((r) => r.name.toLowerCase().includes(q) || r.styleName?.toLowerCase().includes(q));
  }, [results, searchFilter]);

  return (
    <div className="w-full">
      {/* Sleek Minimalist Generator Controls */}
      <div className="bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-2xl p-3.5 sm:p-5 shadow-sm mb-6 sm:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 items-center">
          {/* 1. Name Input */}
          <div className="md:col-span-6 relative flex items-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type nickname (e.g. Kadir, Ghost, Shadow...)"
              maxLength={25}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              className="w-full pl-3.5 pr-20 py-2.5 sm:py-3 bg-neutral-50 dark:bg-[#0b0e14] border border-neutral-200 dark:border-[#1c2333] focus:border-sky-500 dark:focus:border-sky-500 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 text-sm sm:text-base outline-none transition-colors"
            />
            <div className="absolute right-2 flex items-center gap-1">
              {name && (
                <button
                  type="button"
                  onClick={() => setName('')}
                  title="Clear"
                  className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleRandomDice}
                title="Random Name Idea"
                className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-200/60 dark:hover:bg-[#1c2333] transition-colors cursor-pointer"
              >
                <Dices className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Game Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedGameSlug}
              onChange={(e) => handleGameChange(e.target.value)}
              className="w-full px-3.5 py-2.5 sm:py-3 bg-neutral-50 dark:bg-[#0b0e14] border border-neutral-200 dark:border-[#1c2333] focus:border-sky-500 dark:focus:border-sky-500 rounded-xl text-neutral-900 dark:text-white text-xs sm:text-sm outline-none transition-colors cursor-pointer"
            >
              {initialGames.map((game) => (
                <option key={game.id} value={game.slug}>
                  {game.logo} {game.name} ({game.rules?.maxLength || 14} Chars Max)
                </option>
              ))}
            </select>
          </div>

          {/* 3. Refresh / Generate Action */}
          <div className="md:col-span-2 flex">
            <button
              type="button"
              onClick={() => executeGenerate({ offsetVal: 0 })}
              disabled={loading}
              className="w-full py-2.5 sm:py-3 px-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Generating...' : 'Generate'}</span>
            </button>
          </div>
        </div>

        {/* 31+ Style Filter Pills Bar with Smooth Touch Scroll */}
        <div className="mt-3.5 pt-3.5 border-t border-neutral-100 dark:border-[#1c2333]">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-neutral-400 dark:text-neutral-500 font-medium text-[10px] sm:text-[11px] uppercase tracking-wider">
              Styles & Fonts ({initialStyles.length + 1}):
            </span>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors text-xs font-medium cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {showAdvanced ? 'Fewer Filters' : 'More Filters'}
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 max-w-full no-scrollbar smooth-scroll">
            <button
              type="button"
              onClick={() => handleStyleClick('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                selectedStyleSlug === 'all'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold shadow-sm'
                  : 'bg-neutral-100 dark:bg-[#151b27] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#1c2333]'
              }`}
            >
              ✨ All Styles
            </button>
            {initialStyles.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => handleStyleClick(style.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
                  selectedStyleSlug === style.slug
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold shadow-sm'
                    : 'bg-neutral-100 dark:bg-[#151b27] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#1c2333]'
                }`}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {/* Expandable Advanced Options */}
        {showAdvanced && (
          <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-[#1c2333] grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs animate-fadeInFast">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase">Category</label>
              <select
                value={gender}
                onChange={(e) => handleGenderChange(e.target.value)}
                className="px-2.5 py-2 bg-neutral-50 dark:bg-[#0b0e14] border border-neutral-200 dark:border-[#1c2333] rounded-lg text-neutral-800 dark:text-neutral-200 text-xs outline-none cursor-pointer"
              >
                <option value="all">All Genders & Squads</option>
                <option value="boy">Boys / Kings</option>
                <option value="girl">Girls / Queens</option>
                <option value="clan">Clan / Squad</option>
                <option value="esports">Esports Pro</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase">Length</label>
              <select
                value={lengthCategory}
                onChange={(e) => {
                  setLengthCategory(e.target.value as any);
                  executeGenerate({ lengthVal: e.target.value, offsetVal: 0 });
                }}
                className="px-2.5 py-2 bg-neutral-50 dark:bg-[#0b0e14] border border-neutral-200 dark:border-[#1c2333] rounded-lg text-neutral-800 dark:text-neutral-200 text-xs outline-none cursor-pointer"
              >
                <option value="all">Any Length</option>
                <option value="short">Short (&le; 8 chars)</option>
                <option value="medium">Medium (8 - 12 chars)</option>
                <option value="long">Long (12+ chars)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase">Batch Size</label>
              <select
                value={count}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCount(val);
                  executeGenerate({ countVal: val, offsetVal: 0 });
                }}
                className="px-2.5 py-2 bg-neutral-50 dark:bg-[#0b0e14] border border-neutral-200 dark:border-[#1c2333] rounded-lg text-neutral-800 dark:text-neutral-200 text-xs outline-none cursor-pointer"
              >
                <option value={24}>24 Names</option>
                <option value={36}>36 Names</option>
                <option value={48}>48 Names</option>
                <option value={60}>60 Names</option>
              </select>
            </div>

            <div className="flex flex-col justify-center gap-1">
              <label className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase">Special Symbols</label>
              <button
                type="button"
                onClick={handleSymbolsToggle}
                className={`py-2 px-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                  includeSymbols
                    ? 'border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#151b27] text-neutral-500'
                }`}
              >
                {includeSymbols ? '✓ Symbols (亗, ꧁꧂)' : 'Letters Only'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 mb-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
            ✕
          </button>
        </div>
      )}

      {/* Results Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 sm:mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm sm:text-lg font-bold text-neutral-900 dark:text-white font-gaming">
            Generated Names ({filteredResults.length})
          </h2>
          {selectedGame && (
            <span className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
              for {selectedGame.name} (max {selectedGame.rules?.maxLength || 14})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Filter list..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-lg text-neutral-900 dark:text-white text-xs outline-none focus:border-sky-500 w-32 sm:w-44"
          />

          <button
            type="button"
            onClick={handleCopyAll}
            className="px-2.5 sm:px-3 py-1.5 bg-neutral-100 dark:bg-[#151b27] hover:bg-neutral-200 dark:hover:bg-[#1c2333] border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy All
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => executeGenerate({ offsetVal: 0 })}
            disabled={loading}
            title="Refresh Batch"
            className="p-1.5 bg-neutral-100 dark:bg-[#151b27] border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-[#1c2333] transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Results Grid */}
      {loading && results.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 py-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-white dark:bg-[#111620] border border-neutral-200 dark:border-[#1c2333] rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredResults.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
            {filteredResults.map((item) => (
              <ResultCard
                key={item.id}
                id={item.id}
                name={item.name}
                plainName={item.plainName}
                gameName={item.gameName}
                styleName={item.styleName}
                validation={item.validation}
                isFavorited={favoritedNames.has(item.name)}
                onToggleFavorite={(name, isFav) => {
                  const next = new Set(favoritedNames);
                  if (isFav) next.add(name);
                  else next.delete(name);
                  setFavoritedNames(next);
                }}
              />
            ))}
          </div>

          {/* Infinite Load More Button */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#111620] hover:bg-neutral-100 dark:hover:bg-[#151b27] border border-neutral-200 dark:border-[#1c2333] text-neutral-900 dark:text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${loadingMore ? 'animate-spin' : ''}`} />
              <span>{loadingMore ? 'Generating 24 More Names...' : '✨ Load 24 More Names (Infinite)'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-[#111620] border border-dashed border-neutral-200 dark:border-[#1c2333] rounded-2xl p-6">
          <Layers className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">No Matching Names</h3>
          <p className="text-xs text-neutral-500 mb-4 max-w-sm mx-auto">
            Try adjusting your search filter or clicking a different style above.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchFilter('');
              setSelectedStyleSlug('all');
              executeGenerate({ styleVal: 'all', offsetVal: 0 });
            }}
            className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
