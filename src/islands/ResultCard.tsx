import React, { useState, memo } from 'react';
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
  isFavorited?: boolean;
  onToggleFavorite?: (name: string, isFav: boolean) => void;
}

const ResultCardComponent: React.FC<ResultCardProps> = ({
  name,
  gameName,
  styleName,
  validation,
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
      setTimeout(() => setCopied(false), 1800);

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
      setTimeout(() => setShared(false), 1800);
    } catch {}
  };

  return (
    <>
      <div className="group relative glass-panel rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10 animate-floatCard">
        {/* Top Meta Info (Fluid Pill Badges) */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-2.5 py-0.5 rounded-full border border-sky-100 dark:border-sky-900/30">
            {styleName}
          </span>
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
              validation.isValid
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40'
                : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40'
            }`}
          >
            {validation.length}/{validation.maxLength} {validation.isValid ? '✓' : '⚠️'}
          </span>
        </div>

        {/* Clean, Non-Boxy Floating Name Center */}
        <div
          onClick={handleCopy}
          title="Click to copy name"
          className="my-3 py-3 px-2 text-center cursor-pointer select-all group-hover:scale-[1.02] transition-transform"
        >
          <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-gaming tracking-wide break-all select-all drop-shadow-sm">
            {name}
          </span>
        </div>

        {/* Floating Organic Actions Bar */}
        <div className="flex items-center justify-between gap-2 mt-1 pt-3 border-t border-neutral-200/40 dark:border-white/5">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex-1 min-h-[40px] py-2 px-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95 ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/40'
                : 'bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 hover:from-sky-500 hover:via-indigo-500 hover:to-sky-600 text-white shadow-sky-600/25 hover:shadow-lg'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 stroke-[2.5]" /> Copy Name
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleFavorite}
            title={favorited ? 'Remove favorite' : 'Save favorite'}
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all cursor-pointer active:scale-95 ${
              favorited
                ? 'border-red-300 dark:border-red-800/80 bg-red-50 dark:bg-red-950/40 text-red-500 shadow-sm'
                : 'border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setShowCardModal(true)}
            title="Download Card Banner"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-all cursor-pointer active:scale-95"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleShare}
            title="Share"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-all cursor-pointer active:scale-95"
          >
            {shared ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>
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

export const ResultCard = memo(ResultCardComponent);
