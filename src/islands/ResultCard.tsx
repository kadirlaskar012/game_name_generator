import React, { useState, memo } from 'react';
import { Copy, Check, Heart, Share2, Image as ImageIcon } from 'lucide-react';
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
      <div className="group relative bg-white dark:bg-[#111620] border border-neutral-200/90 dark:border-[#1c2333] hover:border-sky-500/50 dark:hover:border-sky-500/50 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-150">
        {/* Header Tag Info */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 truncate bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-md border border-sky-100 dark:border-sky-900/30">
            {styleName}
          </span>
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shrink-0 ${
              validation.isValid
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50'
            }`}
          >
            {validation.length}/{validation.maxLength} {validation.isValid ? '✓' : '⚠️'}
          </span>
        </div>

        {/* Big Crisp Name Display */}
        <div
          onClick={handleCopy}
          title="Click to copy name"
          className="my-2.5 py-3.5 px-2.5 bg-neutral-50/90 dark:bg-[#0b0e14] border border-neutral-100 dark:border-[#171e2c] rounded-xl text-center cursor-pointer select-all group-hover:border-sky-500/30 dark:group-hover:border-sky-500/30 group-hover:bg-sky-50/20 dark:group-hover:bg-sky-950/10 transition-colors"
        >
          <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-gaming tracking-wider break-all select-all drop-shadow-sm">
            {name}
          </span>
        </div>

        {/* Eye-Catchy Actions Bar */}
        <div className="flex items-center justify-between gap-2 mt-2 pt-2.5 border-t border-neutral-100 dark:border-[#1c2333]">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex-1 min-h-[40px] py-2 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/40'
                : 'bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 hover:from-sky-500 hover:via-indigo-500 hover:to-sky-600 text-white shadow-sky-600/20 hover:shadow-md'
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
            className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-colors cursor-pointer active:scale-95 ${
              favorited
                ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/50 text-red-500 shadow-sm'
                : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#151b27] text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#1c2333]'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setShowCardModal(true)}
            title="Download Card Banner"
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#151b27] text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#1c2333] transition-colors cursor-pointer active:scale-95"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleShare}
            title="Share"
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#151b27] text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#1c2333] transition-colors cursor-pointer active:scale-95"
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
