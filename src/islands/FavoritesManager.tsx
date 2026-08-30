import React, { useState, useEffect } from 'react';
import { Heart, Trash2, Copy, Check, Download, Image as ImageIcon } from 'lucide-react';
import { CanvasCardGenerator } from './CanvasCardGenerator';

interface FavoriteItem {
  name: string;
  gameName?: string;
  styleName?: string;
  createdAt?: string;
}

export const FavoritesManager: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('gtp_favorites') || '[]');
      setFavorites(stored);
    } catch {}
  }, []);

  const handleRemove = (nameToRemove: string) => {
    const updated = favorites.filter((f) => f.name !== nameToRemove);
    setFavorites(updated);
    try {
      localStorage.setItem('gtp_favorites', JSON.stringify(updated));
    } catch {}

    fetch('/api/favorites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameToRemove }),
    }).catch(() => {});
  };

  const handleClearAll = () => {
    if (!confirm('Are you sure you want to remove all saved favorites?')) return;
    setFavorites([]);
    try {
      localStorage.removeItem('gtp_favorites');
    } catch {}
  };

  const handleCopy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2000);
    } catch {}
  };

  const handleCopyAll = async () => {
    if (favorites.length === 0) return;
    const text = favorites.map((f) => f.name).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {}
  };

  const handleExportTxt = () => {
    if (favorites.length === 0) return;
    const text = favorites.map((f) => `${f.name} (${f.gameName || 'General'})`).join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gamertag_favorites_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full">
      {favorites.length > 0 ? (
        <div>
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span className="text-sm font-bold text-neutral-900 dark:text-white font-gaming">
                {favorites.length} Saved Nicknames
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyAll}
                className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                Copy All
              </button>

              <button
                type="button"
                onClick={handleExportTxt}
                className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                Export TXT
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="px-3 py-1.5 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
          </div>

          {/* Favorites List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favorites.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-xl p-3.5 flex items-center justify-between transition shadow-sm hover:shadow-md"
              >
                <div className="truncate pr-2">
                  <div className="text-base font-bold text-neutral-900 dark:text-white font-gaming truncate select-all">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    {item.gameName || 'Gamer'} • {item.styleName || 'Custom'}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedCard(item.name)}
                    title="Download Banner"
                    className="p-1.5 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg transition"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.name)}
                    className={`py-1 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                      copiedName === item.name
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90'
                    }`}
                  >
                    {copiedName === item.name ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedName === item.name ? 'Done' : 'Copy'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.name)}
                    title="Remove"
                    className="p-1.5 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-surface-dark border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
          <Heart className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
          <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-1">
            No Favorites Saved Yet
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm mx-auto">
            Click the heart icon on any generated nickname to save it to your collection.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs rounded-xl shadow-sm hover:opacity-90 transition"
          >
            Start Generating Names
          </a>
        </div>
      )}

      {selectedCard && (
        <CanvasCardGenerator
          name={selectedCard}
          gameName="Saved Favorite"
          styleName="My Tag"
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};
