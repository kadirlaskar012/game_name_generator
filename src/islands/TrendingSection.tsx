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
    fetch('/api/trending?limit=12')
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
      setTimeout(() => setCopiedName(null), 1800);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 rounded-full bg-white/40 dark:bg-white/[0.02] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {trendingList.map((item, index) => (
            <div
              key={item.id || index}
              onClick={() => handleCopy(item.name)}
              className="group relative p-3 sm:p-3.5 rounded-full bg-white/60 dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.08] backdrop-blur-md transition-all duration-200 cursor-pointer flex items-center justify-between gap-2.5 border-b border-neutral-200/40 dark:border-white/5 hover:shadow-lg hover:shadow-amber-500/10 active:scale-[0.99]"
            >
              <div className="flex items-center gap-2.5 overflow-hidden pr-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs font-mono shrink-0 ${
                    index === 0
                      ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                      : index === 1
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : index === 2
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'bg-neutral-100 dark:bg-white/5 text-neutral-400'
                  }`}
                >
                  {index < 3 ? <Trophy className="w-3.5 h-3.5" /> : `#${index + 1}`}
                </div>

                <div className="truncate">
                  <div className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white font-gaming truncate select-all group-hover:text-amber-500 transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    {item.copyCount} copies
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCard(item.name);
                  }}
                  title="Card Banner"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(item.name);
                  }}
                  className={`py-1.5 px-3 rounded-full text-xs font-bold flex items-center gap-1 transition-all shadow-sm ${
                    copiedName === item.name
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-400 hover:to-orange-500'
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
