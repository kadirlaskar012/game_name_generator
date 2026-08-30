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
      setTimeout(() => setCopied(false), 1500);

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
      setTimeout(() => setShared(false), 1500);
    } catch {}
  };

  const handleOpenBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCardModal(true);
  };

  return (
    <>
      {/* Simple Clean HTML Row (No Box/Card Wrapping) */}
      <div
        onClick={handleCopy}
        className="group flex items-center justify-between py-3 px-3 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 rounded-lg transition-colors cursor-pointer border-b border-neutral-100 dark:border-neutral-800/80"
      >
        {/* Left: Name and Style Subtitle */}
        <div className="flex-1 pr-3 overflow-hidden">
          <div className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-gaming select-all truncate group-hover:text-sky-500 transition-colors">
            {name}
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-400">
            <span>{styleName}</span>
            <span>•</span>
            <span className={validation.isValid ? 'text-emerald-500' : 'text-amber-500'}>
              {validation.length}/{validation.maxLength} {validation.isValid ? '✓' : '⚠️'}
            </span>
          </div>
        </div>

        {/* Right: Simple Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className={`py-1.5 px-3.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-sky-600 hover:bg-sky-500 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied
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
            title={favorited ? 'Favorited' : 'Add to Favorites'}
            className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleOpenBanner}
            title="Download Card Banner"
            className="hidden sm:block p-1.5 text-neutral-400 hover:text-sky-500 transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleShare}
            title="Share"
            className="hidden sm:block p-1.5 text-neutral-400 hover:text-neutral-200 transition-colors"
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
