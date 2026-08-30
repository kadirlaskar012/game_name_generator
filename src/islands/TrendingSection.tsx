import React, { useState, useEffect } from 'react';
import { Flame, Copy, Check, Trophy, Image as ImageIcon } from 'lucide-react';
import { CanvasCardGenerator } from './CanvasCardGenerator';

interface TrendingItem {
  id: string;
  name: string;
  usageCount: number;
  copyCount: number;
  shareCount: number;
  favoriteCount: number;
  score: number;
}

export const TrendingSection: React.FC = () => {
  const [trendingList, setTrendingList] = useState<TrendingItem[]>([]);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/trending?limit=15')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTrendingList(data.data || []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCopy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2000);

      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, action: 'copy' }),
      }).catch(() => {});
    } catch {}
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {trendingList.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-xl p-3 flex items-center justify-between transition shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3 overflow-hidden pr-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs font-mono shrink-0 ${
                    index === 0
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                      : index === 1
                      ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                      : index === 2
                      ? 'bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-500'
                  }`}
                >
                  {index < 3 ? <Trophy className="w-3.5 h-3.5" /> : `#${index + 1}`}
                </div>

                <div className="truncate">
                  <div className="text-base font-bold text-neutral-900 dark:text-white font-gaming truncate select-all">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    {item.copyCount} copies • {item.favoriteCount} likes
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedCard(item.name)}
                  title="Card Banner"
                  className="p-1.5 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 rounded-lg transition"
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
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCard && (
        <CanvasCardGenerator
          name={selectedCard}
          gameName="Trending Gamer"
          styleName="Leaderboard Top Pick"
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};
