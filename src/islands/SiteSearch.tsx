import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Gamepad2, Sparkles, FileText, Flame, ArrowRight } from 'lucide-react';

export const SiteSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    games: any[];
    styles: any[];
    seoPages: any[];
    names: any[];
  }>({ games: [], styles: [], seoPages: [], names: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' && document.activeElement?.tagName !== 'INPUT') || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults({ games: [], styles: [], seoPages: [], names: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ games: [], styles: [], seoPages: [], names: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.data);
        }
      } catch {}
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const hasResults =
    results.games.length > 0 ||
    results.styles.length > 0 ||
    results.seoPages.length > 0 ||
    results.names.length > 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white text-xs shadow-sm transition"
        title="Search Games, Styles, and Nicknames"
      >
        <Search className="w-3.5 h-3.5 text-neutral-400" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-400">
          /
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="flex items-center px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
              <Search className="w-4 h-4 text-neutral-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search games, styles, keywords..."
                className="w-full bg-transparent text-neutral-900 dark:text-white placeholder-neutral-400 text-sm outline-none"
              />
              {loading && <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin mr-2" />}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 space-y-4">
              {!query.trim() && (
                <div className="text-center py-8 text-neutral-400 text-xs">
                  Type to search across Games, Styles, Guides, and Popular Names.
                </div>
              )}

              {query.trim() && !loading && !hasResults && (
                <div className="text-center py-8 text-neutral-400 text-sm">
                  No matching results found for "{query}".
                </div>
              )}

              {results.games.length > 0 && (
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400 mb-2 flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5" /> Games ({results.games.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.games.map((g, i) => (
                      <a
                        key={i}
                        href={g.slug}
                        className="p-2.5 bg-neutral-50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl flex items-center justify-between group transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{g.icon}</span>
                          <div>
                            <div className="text-xs font-bold text-neutral-900 dark:text-white font-gaming">
                              {g.title}
                            </div>
                            <div className="text-[11px] text-neutral-500 line-clamp-1">{g.description}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {results.names.length > 0 && (
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400 mb-2 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" /> Popular Names
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {results.names.map((n, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(n.title);
                          setIsOpen(false);
                        }}
                        className="px-3 py-1.5 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-gaming text-sm rounded-lg transition"
                        title="Click to copy name"
                      >
                        {n.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.seoPages.length > 0 && (
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Guides
                  </div>
                  <div className="space-y-1.5">
                    {results.seoPages.map((p, i) => (
                      <a
                        key={i}
                        href={p.slug}
                        className="p-2.5 bg-neutral-50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl flex items-center justify-between group transition"
                      >
                        <div>
                          <div className="text-xs font-bold text-neutral-900 dark:text-white">
                            {p.title}
                          </div>
                          <div className="text-[11px] text-neutral-500 line-clamp-1">{p.description}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 py-2.5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <span>Press <kbd className="px-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded">ESC</kbd> to close</span>
              <span>GamerTag Pro</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
