import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { RefreshCw, SlidersHorizontal, Check, Copy, Layers, X, Dices, ChevronDown, ChevronUp, Palette, Sparkles } from 'lucide-react';
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
  const [showAllStylesDesktop, setShowAllStylesDesktop] = useState(false);
  const [showMobileStyleModal, setShowMobileStyleModal] = useState(false);

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

  const activeStyleName = useMemo(() => {
    if (selectedStyleSlug === 'all') return '✨ All Styles (Mixed)';
    const found = initialStyles.find((s) => s.slug === selectedStyleSlug);
    return found ? found.name : 'Custom Style';
  }, [selectedStyleSlug, initialStyles]);

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

  // Style select handler
  const handleSelectStyle = (slug: string) => {
    setSelectedStyleSlug(slug);
    setShowMobileStyleModal(false);
    executeGenerate({ styleVal: slug, offsetVal: 0 });
  };

  // Game change
  const handleGameChange = (newGameSlug: string) => {
    setSelectedGameSlug(newGameSlug);
    executeGenerate({ gameVal: newGameSlug, offsetVal: 0 });
  };

  // Category / Gender change
  const handleGenderChange = (newGender: any) => {
    setGender(newGender);
    executeGenerate({ genderVal: newGender, offsetVal: 0 });
  };

  // Symbols toggle
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

  // Desktop visible styles (first 10 when collapsed, all 32 when expanded)
  const visibleStylesDesktop = useMemo(() => {
    if (showAllStylesDesktop) return initialStyles;
    return initialStyles.slice(0, 11);
  }, [initialStyles, showAllStylesDesktop]);

  return (
    <div className="w-full">
      {/* Seamless Floating Glass Spotlight Bar (Non-Boxy) */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 mb-8 shadow-xl shadow-sky-500/5 relative overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Floating Input Strip */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center relative z-10">
          {/* 1. Name Input (Pill Shaped) */}
          <div className="md:col-span-6 relative flex items-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name (e.g. Kadir, Ghost, Shadow...)"
              maxLength={25}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              className="w-full pl-5 pr-20 py-3.5 bg-white/70 dark:bg-black/40 border border-neutral-200/80 dark:border-white/10 focus:border-sky-500 dark:focus:border-sky-500 rounded-full text-neutral-900 dark:text-white placeholder-neutral-400 text-sm sm:text-base outline-none transition-all shadow-inner backdrop-blur-sm"
            />
            <div className="absolute right-3 flex items-center gap-1.5">
              {name && (
                <button
                  type="button"
                  onClick={() => setName('')}
                  title="Clear text"
                  className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-white rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleRandomDice}
                title="Random Name Idea"
                className="p-1.5 text-neutral-500 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 rounded-full hover:bg-neutral-200/50 dark:hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
              >
                <Dices className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 2. Game Selector Pill */}
          <div className="md:col-span-4">
            <select
              value={selectedGameSlug}
              onChange={(e) => handleGameChange(e.target.value)}
              className="w-full px-5 py-3.5 bg-white/70 dark:bg-black/40 border border-neutral-200/80 dark:border-white/10 focus:border-sky-500 dark:focus:border-sky-500 rounded-full text-neutral-900 dark:text-white text-xs sm:text-sm font-semibold outline-none transition-all cursor-pointer shadow-inner backdrop-blur-sm"
            >
              {initialGames.map((game) => (
                <option key={game.id} value={game.slug}>
                  {game.logo} {game.name} ({game.rules?.maxLength || 14} Chars)
                </option>
              ))}
            </select>
          </div>

          {/* 3. Generate Button (Floating Pill) */}
          <div className="md:col-span-2 flex">
            <button
              type="button"
              onClick={() => executeGenerate({ offsetVal: 0 })}
              disabled={loading}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 hover:from-sky-500 hover:via-indigo-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg shadow-sky-600/30 active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Synthesizing...' : 'Generate'}</span>
            </button>
          </div>
        </div>

        {/* Styles & Filters Row (Organic Pill Capsules) */}
        <div className="mt-5 pt-4 border-t border-neutral-200/40 dark:border-white/5 relative z-10">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span className="text-neutral-800 dark:text-neutral-200 font-bold text-xs sm:text-sm">
                Styles & Fonts ({initialStyles.length + 1})
              </span>
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 hidden sm:inline">
                • Active: <strong className="text-sky-600 dark:text-sky-400 font-bold">{activeStyleName}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors text-xs font-bold cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {showAdvanced ? 'Less Options' : 'More Options'}
              </button>
            </div>
          </div>

          {/* Mobile Screen: Dedicated Floating Style Drawer Button */}
          <div className="block sm:hidden mb-2">
            <button
              type="button"
              onClick={() => setShowMobileStyleModal(true)}
              className="w-full py-3 px-4 bg-white/70 dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 border border-neutral-200/80 dark:border-white/10 rounded-full text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center justify-between transition-colors shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-sky-500" />
                <span>Selected: {activeStyleName}</span>
              </span>
              <span className="text-sky-600 dark:text-sky-400 font-bold flex items-center gap-1">
                Choose Style <ChevronDown className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Desktop & Tablet: Floating Organic Pill Chips */}
          <div className="hidden sm:block">
            <div className="flex flex-wrap gap-1.5 max-w-full">
              <button
                type="button"
                onClick={() => handleSelectStyle('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedStyleSlug === 'all'
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-600/30'
                    : 'bg-white/70 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-white/10 border border-neutral-200/60 dark:border-white/5'
                }`}
              >
                ✨ All Styles (Mixed)
              </button>
              {visibleStylesDesktop.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => handleSelectStyle(style.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedStyleSlug === style.slug
                      ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-600/30'
                      : 'bg-white/70 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-white/10 border border-neutral-200/60 dark:border-white/5'
                  }`}
                >
                  {style.name}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setShowAllStylesDesktop(!showAllStylesDesktop)}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-950/70 border border-sky-200 dark:border-sky-900/40 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {showAllStylesDesktop ? (
                  <>
                    Show Less <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    + {initialStyles.length - visibleStylesDesktop.length} More Styles <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Advanced Options */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-neutral-200/40 dark:border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs animate-fadeInFast relative z-10">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] sm:text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Category</label>
              <select
                value={gender}
                onChange={(e) => handleGenderChange(e.target.value)}
                className="px-3.5 py-2 bg-white/70 dark:bg-black/40 border border-neutral-200/80 dark:border-white/10 rounded-full text-neutral-800 dark:text-neutral-200 text-xs font-semibold outline-none cursor-pointer"
              >
                <option value="all">All Genders & Squads</option>
                <option value="boy">Boys / Kings</option>
                <option value="girl">Girls / Queens</option>
                <option value="clan">Clan / Squad</option>
                <option value="esports">Esports Pro</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] sm:text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Length</label>
              <select
                value={lengthCategory}
                onChange={(e) => {
                  setLengthCategory(e.target.value as any);
                  executeGenerate({ lengthVal: e.target.value, offsetVal: 0 });
                }}
                className="px-3.5 py-2 bg-white/70 dark:bg-black/40 border border-neutral-200/80 dark:border-white/10 rounded-full text-neutral-800 dark:text-neutral-200 text-xs font-semibold outline-none cursor-pointer"
              >
                <option value="all">Any Length</option>
                <option value="short">Short (&le; 8 chars)</option>
                <option value="medium">Medium (8 - 12 chars)</option>
                <option value="long">Long (12+ chars)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] sm:text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Batch Size</label>
              <select
                value={count}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCount(val);
                  executeGenerate({ countVal: val, offsetVal: 0 });
                }}
                className="px-3.5 py-2 bg-white/70 dark:bg-black/40 border border-neutral-200/80 dark:border-white/10 rounded-full text-neutral-800 dark:text-neutral-200 text-xs font-semibold outline-none cursor-pointer"
              >
                <option value={24}>24 Names</option>
                <option value={36}>36 Names</option>
                <option value={48}>48 Names</option>
                <option value={60}>60 Names</option>
              </select>
            </div>

            <div className="flex flex-col justify-center gap-1">
              <label className="text-[10px] sm:text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Special Symbols</label>
              <button
                type="button"
                onClick={handleSymbolsToggle}
                className={`py-2 px-3.5 rounded-full border text-xs font-bold flex items-center justify-center transition-colors cursor-pointer ${
                  includeSymbols
                    ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                    : 'border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 text-neutral-500'
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
        <div className="p-3.5 mb-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-2xl text-red-600 dark:text-red-400 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
            ✕
          </button>
        </div>
      )}

      {/* Results Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-xl font-bold text-neutral-900 dark:text-white font-gaming">
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
            className="px-3.5 py-1.5 bg-white/70 dark:bg-white/5 border border-neutral-200/80 dark:border-white/10 rounded-full text-neutral-900 dark:text-white text-xs outline-none focus:border-sky-500 w-32 sm:w-44 shadow-sm backdrop-blur-sm"
          />

          <button
            type="button"
            onClick={handleCopyAll}
            className="px-3.5 py-1.5 bg-white/70 dark:bg-white/5 hover:bg-neutral-200/50 dark:hover:bg-white/10 border border-neutral-200/80 dark:border-white/10 text-neutral-700 dark:text-neutral-200 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
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
            className="p-2 bg-white/70 dark:bg-white/5 border border-neutral-200/80 dark:border-white/10 text-neutral-600 dark:text-neutral-300 rounded-full hover:bg-neutral-200/50 dark:hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Results Feed (Completely Non-Boxy, Seamless Stream) */}
      {loading && results.length === 0 ? (
        <div className="space-y-2.5 py-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-full bg-white/40 dark:bg-white/[0.02] animate-pulse"
            />
          ))}
        </div>
      ) : filteredResults.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
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
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-full shadow-lg shadow-sky-600/30 hover:shadow-sky-600/40 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${loadingMore ? 'animate-spin' : ''}`} />
              <span>{loadingMore ? 'Synthesizing 24 More Names...' : '✨ Load 24 More Names (Infinite)'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 glass-panel rounded-3xl p-6">
          <Layers className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">No Matching Names Found</h3>
          <p className="text-xs text-neutral-500 mb-4 max-w-sm mx-auto">
            Try adjusting your search query or picking a different style pack.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchFilter('');
              setSelectedStyleSlug('all');
              executeGenerate({ styleVal: 'all', offsetVal: 0 });
            }}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-full transition-colors cursor-pointer shadow-md"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Mobile Styles Bottom Sheet Modal */}
      {showMobileStyleModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0 animate-fadeInFast">
          <div className="w-full max-h-[80vh] bg-white dark:bg-[#111620] rounded-t-3xl border-t border-neutral-200 dark:border-white/10 p-5 flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200/40 dark:border-white/5">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-sky-500" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-white font-gaming">
                  Choose Style & Font ({initialStyles.length + 1})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMobileStyleModal(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Styles List (Scrollable) */}
            <div className="overflow-y-auto py-3 space-y-1.5 flex-1 smooth-scroll no-scrollbar">
              <button
                type="button"
                onClick={() => handleSelectStyle('all')}
                className={`w-full p-3 rounded-2xl text-left text-xs font-bold flex items-center justify-between transition-colors ${
                  selectedStyleSlug === 'all'
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-600/30'
                    : 'bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>✨</span>
                  <span>All Styles (Mixed Infinite Variety)</span>
                </span>
                {selectedStyleSlug === 'all' && <Check className="w-4 h-4" />}
              </button>

              {initialStyles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectStyle(s.slug)}
                  className={`w-full p-3 rounded-2xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                    selectedStyleSlug === s.slug
                      ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold shadow-md shadow-sky-600/30'
                      : 'bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200'
                  }`}
                >
                  <span>{s.name}</span>
                  {selectedStyleSlug === s.slug && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
