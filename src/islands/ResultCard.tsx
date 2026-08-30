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

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleOpenBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCardModal(true);
  };

  return (
    <>
      {/* Seamless Floating Row / Capsule Strip (Completely Non-Boxy) */}
      <div
        onClick={handleCopy}
        className="group relative w-full p-3.5 sm:p-4 rounded-2xl sm:rounded-full bg-white/60 dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.08] backdrop-blur-md transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-xl hover:shadow-cyan-500/10 active:scale-[0.99] border-b border-neutral-200/40 dark:border-white/5"
      >
        {/* Left: Style Pill Tag & Length Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            {styleName}
          </span>
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
              validation.isValid
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                : 'text-amber-600 dark:text-amber-400 bg-amber-500/10'
            }`}
          >
            {validation.length}/{validation.maxLength}
          </span>
        </div>

        {/* Center: Vibrant Glowing Name (Seamless & Borderless) */}
        <div className="flex-1 text-center sm:text-left sm:px-4">
          <span className="text-xl sm:text-2xl font-black font-gaming text-neutral-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-indigo-400 group-hover:to-purple-400 transition-all drop-shadow-sm select-all">
            {name}
          </span>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          {/* Vibrant Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`py-2 px-4 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95 ${
              copied
                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 stroke-[2.5]" /> Copy
              </>
            )}
          </button>

          {/* Favorite Heart */}
          <button
            type="button"
            onClick={handleFavorite}
            title={favorited ? 'Favorited' : 'Add to Favorites'}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
              favorited
                ? 'bg-red-500/15 text-red-500'
                : 'text-neutral-400 hover:text-red-500 hover:bg-red-500/10'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          {/* Banner Card Generator */}
          <button
            type="button"
            onClick={handleOpenBanner}
            title="Download Card Banner"
            className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors cursor-pointer"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            title="Share Nickname"
            className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors cursor-pointer"
          >
            {shared ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
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
