import React, { useState } from 'react';
import { Copy, Check, Heart, Share2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { CanvasCardGenerator } from './CanvasCardGenerator';

export interface ResultCardProps {
  id: string;
  name: string;
  plainName: string;
  gameName: string;
  styleName: string;
  validation: {
    isValid: boolean;
    length: number;
    maxLength: number;
    minLength: number;
    issues: string[];
    score: number;
  };
  onGenerateSimilar?: (styleName: string) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (name: string, isFav: boolean) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  name,
  gameName,
  styleName,
  validation,
  onGenerateSimilar,
  isFavorited = false,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [favorited, setFavorited] = useState(isFavorited);
  const [showCardModal, setShowCardModal] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, action: 'copy' }),
      }).catch(() => {});
    } catch {}
  };

  const handleFavorite = () => {
    const nextFav = !favorited;
    setFavorited(nextFav);

    if (onToggleFavorite) {
      onToggleFavorite(name, nextFav);
    }

    try {
      const stored = JSON.parse(localStorage.getItem('gtp_favorites') || '[]');
      let updated;
      if (nextFav) {
        updated = [...stored, { name, gameName, styleName, createdAt: new Date() }];
      } else {
        updated = stored.filter((item: any) => item.name !== name);
      }
      localStorage.setItem('gtp_favorites', JSON.stringify(updated));
    } catch {}

    fetch('/api/favorites', {
      method: nextFav ? 'POST' : 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, gameName, styleName }),
    }).catch(() => {});
  };

  const handleShare = async () => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, action: 'share' }),
    }).catch(() => {});

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Gamer Tag: ${name}`,
          text: `Check out my gaming nickname "${name}" on GamerTag Pro!`,
          url: window.location.href,
        });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(`${name}`);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {}
  };

  return (
    <>
      <div className="group relative bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-xl p-4 transition-all duration-150 flex flex-col justify-between shadow-sm hover:shadow-md">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
            {styleName}
          </span>
          <span
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              validation.isValid
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
            }`}
          >
            {validation.length}/{validation.maxLength} {validation.isValid ? '✓' : '⚠️'}
          </span>
        </div>

        {/* Clean Name Display */}
        <div
          onClick={handleCopy}
          title="Click to copy name"
          className="my-2 py-3 px-2 bg-neutral-50 dark:bg-neutral-900/60 rounded-lg text-center cursor-pointer select-all group-hover:bg-neutral-100 dark:group-hover:bg-neutral-900 transition"
        >
          <span className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white font-gaming tracking-wide break-all">
            {name}
          </span>
        </div>

        {/* Minimal Actions Bar */}
        <div className="flex items-center justify-between gap-1.5 mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleFavorite}
            title={favorited ? 'Remove from favorites' : 'Save to favorites'}
            className={`p-2 rounded-lg border transition ${
              favorited
                ? 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 text-red-500'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setShowCardModal(true)}
            title="Download Card Banner"
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleShare}
            title="Share"
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            {shared ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>

          {onGenerateSimilar && (
            <button
              type="button"
              onClick={() => onGenerateSimilar(styleName)}
              title="Generate similar names"
              className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {showCardModal && (
        <CanvasCardGenerator
          name={name}
          gameName={gameName}
          styleName={styleName}
          onClose={() => setShowCardModal(false)}
        />
      )}
    </>
  );
};
