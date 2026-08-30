import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { RefreshCw, SlidersHorizontal, Check, Copy, Layers, X, Dices, ChevronDown, ChevronUp, Palette } from 'lucide-react';
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
    if (selectedStyleSlug === 'all') return 'All Styles (Mixed)';
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
      setTimeout(() => setCopiedAll(false), 1500);
    } catch {}
  };

  // Filtered results
  const filteredResults = useMemo(() => {
    if (!searchFilter.trim()) return results;
    const q = searchFilter.toLowerCase();
    return results.filter((r) => r.name.toLowerCase().includes(q) || r.styleName?.toLowerCase().includes(q));
  }, [results, searchFilter]);

  // Desktop visible styles
  const visibleStylesDesktop = useMemo(() => {
    if (showAllStylesDesktop) return initialStyles;
    return initialStyles.slice(0, 10);
  }, [initialStyles, showAllStylesDesktop]);

  return (
    <div className="w-full">
      {/* Simple Clean Input Controls (No Heavy Box Wrappers) */}
      <div className="mb-6 space-y-4">
        {/* Main Input Row */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* 1. Name Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name (e.g. Kadir, Ghost...)"
              maxLength={25}
              className="w-full pl-4 pr-16 py-2.5 bg-white dark:bg-[#111622] border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 text-sm outline-none focus:border-sky-500 transition"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {name && (
                <button
                  type="button"
                  onClick={() => setName('')}
                  title="Clear text"
                  className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={handleRandomDice}
                title="Random Name"
                className="p-1 text-neutral-500 hover:text-sky-500 transition"
              >
                <Dices className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Game Selector */}
          <div className="sm:w-56">
            <select
              value={selectedGameSlug}
              onChange={(e) => handleGameChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-white dark:bg-[#111622] border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white text-xs sm:text-sm font-medium outline-none focus:border-sky-500 cursor-pointer"
            >
              {initialGames.map((game) => (
                <option key={game.id} value={game.slug}>
                  {game.logo} {game.name}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Generate Button */}
          <button
            type="button"
            onClick={() => executeGenerate({ offsetVal: 0 })}
            disabled={loading}
            className="py-2.5 px-5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm rounded-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Generating...' : 'Generate'}</span>
          </button>
        </div>

        {/* Styles Row */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              Styles: <span className="text-sky-500">{activeStyleName}</span>
            </span>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sky-500 hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <SlidersHorizontal className="w-3 h-3" />
              {showAdvanced ? 'Fewer options' : 'More filters'}
            </button>
          </div>

          {/* Style Buttons List */}
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => handleSelectStyle('all')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                selectedStyleSlug === 'all'
                  ? 'bg-sky-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              All Styles
            </button>
            {visibleStylesDesktop.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => handleSelectStyle(style.slug)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                  selectedStyleSlug === style.slug
                    ? 'bg-sky-600 text-white font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {style.name}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setShowAllStylesDesktop(!showAllStylesDesktop)}
              className="px-2.5 py-1 text-xs text-sky-500 hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
            >
              {showAllStylesDesktop ? (
                <>Less ▴</>
              ) : (
                <>+ {initialStyles.length - visibleStylesDesktop.length} more ▾</>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Filters */}
        {showAdvanced && (
          <div className="p-3 bg-neutral-50 dark:bg-[#111622] rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="flex flex-col gap-1">
              <label className="text-neutral-500 font-medium">Category</label>
              <select
                value={gender}
                onChange={(e) => handleGenderChange(e.target.value)}
                className="px-2.5 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-800 dark:text-neutral-200 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="boy">Boys</option>
                <option value="girl">Girls</option>
                <option value="clan">Clan</option>
                <option value="esports">Esports</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-neutral-500 font-medium">Length</label>
              <select
                value={lengthCategory}
                onChange={(e) => {
                  setLengthCategory(e.target.value as any);
                  executeGenerate({ lengthVal: e.target.value, offsetVal: 0 });
                }}
                className="px-2.5 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-800 dark:text-neutral-200 outline-none"
              >
                <option value="all">Any</option>
                <option value="short">Short (&le; 8)</option>
                <option value="medium">Medium (8-12)</option>
                <option value="long">Long (12+)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-neutral-500 font-medium">Batch</label>
              <select
                value={count}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCount(val);
                  executeGenerate({ countVal: val, offsetVal: 0 });
                }}
                className="px-2.5 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-800 dark:text-neutral-200 outline-none"
              >
                <option value={24}>24</option>
                <option value={36}>36</option>
                <option value={48}>48</option>
              </select>
            </div>

            <div className="flex flex-col justify-center gap-1">
              <label className="text-neutral-500 font-medium">Symbols</label>
              <button
                type="button"
                onClick={handleSymbolsToggle}
                className={`py-1.5 px-3 rounded text-xs font-medium border transition ${
                  includeSymbols
                    ? 'border-sky-600 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400'
                    : 'border-neutral-300 dark:border-neutral-700 text-neutral-500'
                }`}
              >
                {includeSymbols ? '✓ Symbols ON' : 'Letters Only'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 mb-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-md text-red-600 dark:text-red-400 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-500">✕</button>
        </div>
      )}

      {/* Results Header Bar */}
      <div className="flex items-center justify-between py-2 border-b border-neutral-200 dark:border-neutral-800 mb-2">
        <h2 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
          Generated Names ({filteredResults.length})
        </h2>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search in list..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="px-2.5 py-1 bg-white dark:bg-[#111622] border border-neutral-300 dark:border-neutral-700 rounded text-neutral-900 dark:text-white text-xs outline-none focus:border-sky-500 w-32 sm:w-40"
          />

          <button
            type="button"
            onClick={handleCopyAll}
            className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded text-xs font-medium transition cursor-pointer"
          >
            {copiedAll ? 'Copied' : 'Copy All'}
          </button>
        </div>
      </div>

      {/* Results Simple List (No Boxes) */}
      {loading && results.length === 0 ? (
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60 py-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-neutral-100 dark:bg-neutral-800/40 animate-pulse my-1 rounded" />
          ))}
        </div>
      ) : filteredResults.length > 0 ? (
        <div>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
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

          {/* Load More Button */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold text-xs sm:text-sm rounded-lg transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loadingMore ? 'animate-spin' : ''}`} />
              <span>{loadingMore ? 'Loading more...' : 'Load 24 More Names'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-neutral-500 text-xs">
          No names found. Try adjusting your input.
        </div>
      )}
    </div>
  );
};
