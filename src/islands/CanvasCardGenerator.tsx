import React, { useRef, useEffect, useState } from 'react';
import { Download, X, Check, RefreshCw } from 'lucide-react';

interface CanvasCardGeneratorProps {
  name: string;
  gameName?: string;
  styleName?: string;
  onClose: () => void;
}

export const CanvasCardGenerator: React.FC<CanvasCardGeneratorProps> = ({
  name,
  gameName = 'Esports Gaming',
  styleName = 'Pro Tag',
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [theme, setTheme] = useState<'cyber' | 'obsidian' | 'cleanLight' | 'sunset'>('obsidian');
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;

    // Background themes
    if (theme === 'cyber') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#0a0d14');
      grad.addColorStop(0.5, '#0e1626');
      grad.addColorStop(1, '#080a10');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else if (theme === 'obsidian') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#000000');
      grad.addColorStop(1, '#111318');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else if (theme === 'cleanLight') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#f8fafc');
      grad.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#1c0f18');
      grad.addColorStop(1, '#090a10');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    // Border Frame
    ctx.strokeStyle = theme === 'cleanLight' ? 'rgba(0,0,0,0.1)' : 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // Header Tag
    ctx.font = '600 24px Inter, sans-serif';
    ctx.fillStyle = theme === 'cleanLight' ? '#64748b' : '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText(`${gameName.toUpperCase()} • ${styleName.toUpperCase()}`, width / 2, 180);

    // Main Gamer Tag
    ctx.font = 'bold 72px Rajdhani, Inter, sans-serif';
    ctx.fillStyle = theme === 'cleanLight' ? '#0f172a' : '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, width / 2, height / 2 + 10);

    // Footer Watermark
    ctx.font = '500 20px Inter, sans-serif';
    ctx.fillStyle = theme === 'cleanLight' ? '#94a3b8' : '#64748b';
    ctx.fillText('GAMERTAG PRO • VERIFIED IGN', width / 2, height - 120);
  };

  useEffect(() => {
    drawCard();
  }, [name, gameName, styleName, theme]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setDownloading(true);
    const link = document.createElement('a');
    link.download = `${name.replace(/[^a-zA-Z0-9]/g, '_')}_banner.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white font-gaming">
            Gamer Tag Banner (1200x630)
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Canvas Preview Container */}
        <div className="relative w-full aspect-[1200/630] bg-neutral-950 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full object-contain" />
        </div>

        {/* Theme Picker & Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-neutral-400 mr-1">Theme:</span>
            {[
              { id: 'obsidian', label: 'Obsidian' },
              { id: 'cyber', label: 'Navy' },
              { id: 'cleanLight', label: 'Light' },
              { id: 'sunset', label: 'Ruby' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  theme === t.id
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="px-4 py-2 bg-neutral-900 dark:bg-white hover:opacity-90 text-white dark:text-neutral-900 font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Download className="w-3.5 h-3.5" />}
              {downloaded ? 'Downloaded' : 'Download PNG'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
