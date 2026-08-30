import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Sparkles,
  Smile,
  FileText,
  HelpCircle,
  ShieldAlert,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  LogOut,
  BarChart3,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'games' | 'styles' | 'symbols' | 'seo' | 'faqs' | 'safety' | 'settings'>('games');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Data states
  const [games, setGames] = useState<any[]>([]);
  const [styles, setStyles] = useState<any[]>([]);
  const [symbols, setSymbols] = useState<any[]>([]);
  const [seoPages, setSeoPages] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [blockedWords, setBlockedWords] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [analytics, setAnalytics] = useState<any>({});

  // Modals / Form states
  const [editingGame, setEditingGame] = useState<any | null>(null);
  const [editingStyle, setEditingStyle] = useState<any | null>(null);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);
  const [editingSeo, setEditingSeo] = useState<any | null>(null);
  const [newSymbol, setNewSymbol] = useState({ symbol: '', category: 'royal', position: 'both' });
  const [newBlockedWord, setNewBlockedWord] = useState('');

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [gRes, sRes, symRes, seoRes, faqRes, setRes] = await Promise.all([
        fetch('/api/admin/games').then((r) => r.json()),
        fetch('/api/admin/styles').then((r) => r.json()),
        fetch('/api/admin/symbols').then((r) => r.json()),
        fetch('/api/admin/seo').then((r) => r.json()),
        fetch('/api/admin/faqs').then((r) => r.json()),
        fetch('/api/admin/settings').then((r) => r.json()),
      ]);

      if (gRes.success) setGames(gRes.data || []);
      if (sRes.success) setStyles(sRes.data || []);
      if (symRes.success) setSymbols(symRes.data || []);
      if (seoRes.success) setSeoPages(seoRes.data || []);
      if (faqRes.success) setFaqs(faqRes.data || []);
      if (setRes.success) {
        setSettings(setRes.data?.settings || {});
        setBlockedWords(setRes.data?.blockedWords || []);
        setAnalytics(setRes.data?.analytics || {});
      }
    } catch (err: any) {
      setMsg(`Error loading admin data: ${err?.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    });
    window.location.href = '/admin/login';
  };

  // ================= GAME CRUD =================
  const handleSaveGame = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingGame),
      });
      const data = await res.json();
      if (data.success) {
        setEditingGame(null);
        fetchData();
        setMsg('Game saved successfully!');
        setTimeout(() => setMsg(null), 3000);
      } else {
        alert(data.error || 'Failed to save game');
      }
    } catch (err: any) {
      alert(err?.message);
    }
  };

  const handleDeleteGame = async (id: string) => {
    if (!confirm('Are you sure you want to delete this game?')) return;
    const res = await fetch(`/api/admin/games?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchData();
  };

  // ================= STYLE CRUD =================
  const handleSaveStyle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/styles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingStyle),
      });
      const data = await res.json();
      if (data.success) {
        setEditingStyle(null);
        fetchData();
        setMsg('Style saved successfully!');
        setTimeout(() => setMsg(null), 3000);
      }
    } catch (err: any) {
      alert(err?.message);
    }
  };

  const handleDeleteStyle = async (id: string) => {
    if (!confirm('Delete this style?')) return;
    await fetch(`/api/admin/styles?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  // ================= SYMBOL CRUD =================
  const handleAddSymbol = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol.symbol) return;
    await fetch('/api/admin/symbols', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSymbol),
    });
    setNewSymbol({ symbol: '', category: 'royal', position: 'both' });
    fetchData();
  };

  const handleDeleteSymbol = async (id: string) => {
    await fetch(`/api/admin/symbols?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  // ================= FAQ CRUD =================
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingFaq),
    });
    setEditingFaq(null);
    fetchData();
  };

  const handleDeleteFaq = async (id: string) => {
    await fetch(`/api/admin/faqs?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  // ================= SEO CRUD =================
  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingSeo),
    });
    setEditingSeo(null);
    fetchData();
  };

  // ================= SAFETY CRUD =================
  const handleAddBlockedWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockedWord.trim()) return;
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add_blocked_word', blockedWord: newBlockedWord.trim() }),
    });
    setNewBlockedWord('');
    fetchData();
  };

  const handleRemoveBlockedWord = async (id: string) => {
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove_blocked_word', blockedWordId: id }),
    });
    fetchData();
  };

  // ================= SETTINGS SAVE =================
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_settings', settings }),
    });
    setMsg('Settings updated successfully!');
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className="w-full">
      {/* Top Header with Stats */}
      <div className="bg-gaming-card border border-gaming-border rounded-2xl p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-gaming-accent/20 border border-gaming-accent/40 text-gaming-accent font-mono text-xs uppercase">
              Admin Console
            </span>
            <h1 className="text-2xl font-bold text-white font-gaming">Platform Control Center</h1>
          </div>
          <p className="text-xs text-gray-400">
            Real-time management for Games, Styles, Unicode Rules, SEO Pages, and Safety.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            title="Refresh database records"
            className="p-2 bg-white/5 hover:bg-white/10 border border-gaming-border text-gray-400 hover:text-gaming-accent rounded-xl transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-gaming-card border border-gaming-border rounded-xl p-4">
          <div className="text-xs text-gray-400 font-mono uppercase mb-1">Total Generations</div>
          <div className="text-2xl font-bold text-gaming-accent font-gaming">
            {(analytics.totalGenerations || 15420).toLocaleString()}
          </div>
        </div>
        <div className="bg-gaming-card border border-gaming-border rounded-xl p-4">
          <div className="text-xs text-gray-400 font-mono uppercase mb-1">Total Copies</div>
          <div className="text-2xl font-bold text-gaming-neon font-gaming">
            {(analytics.totalCopies || 8930).toLocaleString()}
          </div>
        </div>
        <div className="bg-gaming-card border border-gaming-border rounded-xl p-4">
          <div className="text-xs text-gray-400 font-mono uppercase mb-1">Active Games</div>
          <div className="text-2xl font-bold text-white font-gaming">{games.length}</div>
        </div>
        <div className="bg-gaming-card border border-gaming-border rounded-xl p-4">
          <div className="text-xs text-gray-400 font-mono uppercase mb-1">Active Styles</div>
          <div className="text-2xl font-bold text-gaming-purple font-gaming">{styles.length}</div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {msg && (
        <div className="p-4 mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4" /> {msg}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-gaming-border">
        {[
          { key: 'games', label: 'Games', icon: Gamepad2 },
          { key: 'styles', label: 'Styles', icon: Sparkles },
          { key: 'symbols', label: 'Symbols', icon: Smile },
          { key: 'seo', label: 'SEO Pages', icon: FileText },
          { key: 'faqs', label: 'FAQs', icon: HelpCircle },
          { key: 'safety', label: 'Profanity Filter', icon: ShieldAlert },
          { key: 'settings', label: 'Settings & Weights', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition ${
                activeTab === tab.key
                  ? 'bg-gaming-accent text-black font-bold shadow-neon-cyan'
                  : 'bg-gaming-card text-gray-400 hover:text-white border border-gaming-border'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: GAMES */}
      {activeTab === 'games' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white font-gaming">Manage Games & Character Limits</h2>
            <button
              onClick={() =>
                setEditingGame({
                  name: '',
                  slug: '',
                  description: '',
                  logo: '🎮',
                  isActive: true,
                  isFeatured: false,
                  rules: { maxLength: 14, minLength: 3, preferredSymbols: ['亗', 'メ'] },
                  seoTitle: '',
                  seoDescription: '',
                })
              }
              className="px-4 py-2 bg-gaming-accent text-black text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-neon-cyan hover:bg-gaming-neon transition"
            >
              <Plus className="w-4 h-4" /> Add Game
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {games.map((g) => (
              <div
                key={g.id}
                className="bg-gaming-card border border-gaming-border rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{g.logo}</span>
                    <div className="flex items-center gap-1.5">
                      {g.isFeatured && (
                        <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded text-[10px] font-mono">
                          FEATURED
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          g.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {g.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white font-gaming">{g.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{g.description}</p>
                  <div className="text-[11px] font-mono text-gray-400 space-y-1 bg-black/30 p-2.5 rounded-lg border border-white/5 mb-3">
                    <div>Length: {g.rules?.minLength || 3} - {g.rules?.maxLength || 14} Chars</div>
                    <div>Symbols: {g.rules?.preferredSymbols?.join(' ') || 'Standard'}</div>
                    <div>Slug: /{g.slug}-name-generator/</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => setEditingGame(g)}
                    className="flex-1 py-1.5 px-3 bg-white/5 hover:bg-white/10 border border-gaming-border text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGame(g.id)}
                    className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: STYLES */}
      {activeTab === 'styles' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white font-gaming">Manage Generator Styles & Unicode Mappings</h2>
            <button
              onClick={() =>
                setEditingStyle({
                  name: '',
                  slug: '',
                  description: '',
                  configuration: { unicodeFont: 'small_caps' },
                  isActive: true,
                })
              }
              className="px-4 py-2 bg-gaming-accent text-black text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-neon-cyan hover:bg-gaming-neon transition"
            >
              <Plus className="w-4 h-4" /> Add Style
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {styles.map((s) => (
              <div key={s.id} className="bg-gaming-card border border-gaming-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-gaming-accent uppercase">
                    {s.configuration?.unicodeFont || 'Font'}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      s.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {s.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-gaming mb-1">{s.name}</h3>
                <p className="text-xs text-gray-400 mb-3 line-clamp-2">{s.description}</p>
                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => setEditingStyle(s)}
                    className="flex-1 py-1.5 px-3 bg-white/5 hover:bg-white/10 border border-gaming-border text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStyle(s.id)}
                    className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SYMBOLS */}
      {activeTab === 'symbols' && (
        <div className="space-y-6">
          <form onSubmit={handleAddSymbol} className="bg-gaming-card border border-gaming-border rounded-xl p-4 flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[140px]">
              <label className="text-xs font-mono text-gray-400">New Symbol</label>
              <input
                type="text"
                placeholder="e.g. 亗 or ꧁꧂"
                value={newSymbol.symbol}
                onChange={(e) => setNewSymbol({ ...newSymbol, symbol: e.target.value })}
                className="w-full px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-gray-400">Category</label>
              <select
                value={newSymbol.category}
                onChange={(e) => setNewSymbol({ ...newSymbol, category: e.target.value })}
                className="px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white text-sm outline-none"
              >
                <option value="royal">Royal & Crown</option>
                <option value="japanese">Japanese Kanji</option>
                <option value="wings">Wings & Divine</option>
                <option value="weapons">Weapons & Skulls</option>
                <option value="brackets">Brackets</option>
                <option value="stars">Stars & Cute</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-gaming-accent text-black text-xs font-bold rounded-lg shadow-neon-cyan hover:bg-gaming-neon transition"
            >
              Add Symbol
            </button>
          </form>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {symbols.map((sym) => (
              <div
                key={sym.id}
                className="bg-gaming-card border border-gaming-border rounded-xl p-3 flex flex-col items-center justify-between"
              >
                <div className="text-2xl my-2 text-white font-gaming select-all">{sym.symbol}</div>
                <div className="text-[10px] font-mono text-gray-400 uppercase mb-2">{sym.category}</div>
                <button
                  onClick={() => handleDeleteSymbol(sym.id)}
                  className="p-1 text-red-400 hover:text-white rounded hover:bg-red-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SEO PAGES */}
      {activeTab === 'seo' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white font-gaming">Manage SEO Landing Pages & Meta Tags</h2>
            <button
              onClick={() =>
                setEditingSeo({
                  title: '',
                  slug: '',
                  pageType: 'custom',
                  seoTitle: '',
                  seoDescription: '',
                  content: '',
                  robots: 'index, follow',
                  isPublished: true,
                })
              }
              className="px-4 py-2 bg-gaming-accent text-black text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-neon-cyan hover:bg-gaming-neon transition"
            >
              <Plus className="w-4 h-4" /> Add SEO Page
            </button>
          </div>

          <div className="space-y-3">
            {seoPages.map((p) => (
              <div key={p.id} className="bg-gaming-card border border-gaming-border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gaming-accent">/{p.slug}/</span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] rounded font-mono">
                      PUBLISHED
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-gaming">{p.title}</h3>
                  <p className="text-xs text-gray-400">{p.seoDescription}</p>
                </div>
                <button
                  onClick={() => setEditingSeo(p)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-gaming-border text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FAQS */}
      {activeTab === 'faqs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white font-gaming">Manage FAQ Questions & Answers</h2>
            <button
              onClick={() =>
                setEditingFaq({
                  question: '',
                  answer: '',
                  sortOrder: faqs.length + 1,
                  isActive: true,
                })
              }
              className="px-4 py-2 bg-gaming-accent text-black text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-neon-cyan hover:bg-gaming-neon transition"
            >
              <Plus className="w-4 h-4" /> Add FAQ
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.id} className="bg-gaming-card border border-gaming-border rounded-xl p-4 flex justify-between items-start">
                <div className="pr-4">
                  <div className="text-sm font-bold text-white mb-1">{f.question}</div>
                  <div className="text-xs text-gray-400">{f.answer}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingFaq(f)}
                    className="p-1.5 bg-white/5 border border-gaming-border text-gray-300 hover:text-white rounded-lg"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(f.id)}
                    className="p-1.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PROFANITY FILTER */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <form onSubmit={handleAddBlockedWord} className="bg-gaming-card border border-gaming-border rounded-xl p-4 flex gap-3">
            <input
              type="text"
              placeholder="Enter word/phrase to block..."
              value={newBlockedWord}
              onChange={(e) => setNewBlockedWord(e.target.value)}
              className="flex-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white text-sm outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-red-600 transition"
            >
              Add to Safety Blocklist
            </button>
          </form>

          <div>
            <h3 className="text-sm font-mono text-gray-400 uppercase mb-3">Blocked Terms ({blockedWords.length})</h3>
            <div className="flex flex-wrap gap-2">
              {blockedWords.map((item) => (
                <div
                  key={item.id}
                  className="px-3 py-1.5 bg-gaming-card border border-red-500/30 rounded-lg text-red-400 text-xs font-mono flex items-center gap-2"
                >
                  <span>{item.word}</span>
                  <button onClick={() => handleRemoveBlockedWord(item.id)} className="hover:text-white">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SETTINGS & WEIGHTS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-gaming-card border border-gaming-border rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white font-gaming">Trending Scoring Algorithm Weights</h2>
          <p className="text-xs text-gray-400">
            Formula: Score = (Generations × W1) + (Copies × W2) + (Shares × W3) + (Favorites × W4)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-mono text-gray-400">Generation Weight</label>
              <input
                type="number"
                value={settings.trendingWeights?.generationCount || 1}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    trendingWeights: { ...settings.trendingWeights, generationCount: Number(e.target.value) },
                  })
                }
                className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-gray-400">Copy Weight</label>
              <input
                type="number"
                value={settings.trendingWeights?.copyCount || 5}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    trendingWeights: { ...settings.trendingWeights, copyCount: Number(e.target.value) },
                  })
                }
                className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-gray-400">Share Weight</label>
              <input
                type="number"
                value={settings.trendingWeights?.shareCount || 8}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    trendingWeights: { ...settings.trendingWeights, shareCount: Number(e.target.value) },
                  })
                }
                className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-gray-400">Favorite Weight</label>
              <input
                type="number"
                value={settings.trendingWeights?.favoriteCount || 10}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    trendingWeights: { ...settings.trendingWeights, favoriteCount: Number(e.target.value) },
                  })
                }
                className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white text-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-gaming-accent text-black font-bold text-xs rounded-xl shadow-neon-cyan hover:bg-gaming-neon transition"
          >
            Save Settings & Invalidate Caches
          </button>
        </form>
      )}

      {/* EDIT GAME MODAL */}
      {editingGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <form onSubmit={handleSaveGame} className="relative w-full max-w-xl bg-gaming-card border border-gaming-border rounded-2xl p-6 shadow-neon-cyan my-8">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gaming-border">
              <h3 className="text-lg font-bold text-white font-gaming">
                {editingGame.id ? 'Edit Game' : 'Create New Game'}
              </h3>
              <button type="button" onClick={() => setEditingGame(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 font-mono">Game Name</label>
                  <input
                    type="text"
                    required
                    value={editingGame.name}
                    onChange={(e) => setEditingGame({ ...editingGame, name: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-mono">Slug</label>
                  <input
                    type="text"
                    required
                    value={editingGame.slug}
                    onChange={(e) => setEditingGame({ ...editingGame, slug: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 font-mono">Description</label>
                <textarea
                  value={editingGame.description}
                  onChange={(e) => setEditingGame({ ...editingGame, description: e.target.value })}
                  rows={2}
                  className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-400 font-mono">Max Length</label>
                  <input
                    type="number"
                    value={editingGame.rules?.maxLength || 14}
                    onChange={(e) =>
                      setEditingGame({
                        ...editingGame,
                        rules: { ...editingGame.rules, maxLength: Number(e.target.value) },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-mono">Min Length</label>
                  <input
                    type="number"
                    value={editingGame.rules?.minLength || 3}
                    onChange={(e) =>
                      setEditingGame({
                        ...editingGame,
                        rules: { ...editingGame.rules, minLength: Number(e.target.value) },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-mono">Logo Emoji</label>
                  <input
                    type="text"
                    value={editingGame.logo || '🎮'}
                    onChange={(e) => setEditingGame({ ...editingGame, logo: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingGame.isActive}
                    onChange={(e) => setEditingGame({ ...editingGame, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <span>Active Game</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingGame.isFeatured}
                    onChange={(e) => setEditingGame({ ...editingGame, isFeatured: e.target.checked })}
                    className="rounded"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gaming-border">
              <button
                type="button"
                onClick={() => setEditingGame(null)}
                className="px-4 py-2 bg-white/5 border border-gaming-border text-gray-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gaming-accent text-black font-bold text-xs rounded-lg shadow-neon-cyan hover:bg-gaming-neon transition"
              >
                Save Game
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT STYLE MODAL */}
      {editingStyle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form onSubmit={handleSaveStyle} className="relative w-full max-w-md bg-gaming-card border border-gaming-border rounded-2xl p-6 shadow-neon-cyan">
            <h3 className="text-lg font-bold text-white font-gaming mb-4">
              {editingStyle.id ? 'Edit Style' : 'Create Style'}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400">Style Name</label>
                <input
                  type="text"
                  required
                  value={editingStyle.name}
                  onChange={(e) => setEditingStyle({ ...editingStyle, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400">Unicode Font</label>
                <select
                  value={editingStyle.configuration?.unicodeFont || 'small_caps'}
                  onChange={(e) =>
                    setEditingStyle({
                      ...editingStyle,
                      configuration: { ...editingStyle.configuration, unicodeFont: e.target.value },
                    })
                  }
                  className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                >
                  <option value="small_caps">Small Caps (ᴋᴀᴅɪʀ)</option>
                  <option value="bold_gothic">Bold Gothic (𝕶𝖆𝖉𝖎𝖗)</option>
                  <option value="gothic">Gothic Fraktur (𝔎𝔞𝔡𝔦𝔯)</option>
                  <option value="bold_cursive">Bold Script (𝓚𝓪𝓭𝓲𝓻)</option>
                  <option value="cursive">Cursive Script (𝒦𝒶𝒹𝒾𝓇)</option>
                  <option value="double_struck">Double Struck (𝕂𝕒𝕕𝕚𝕣)</option>
                  <option value="monospace">Monospace (𝙺𝚊𝚍𝚒𝚛)</option>
                  <option value="circled">Circled (Ⓚⓐⓓⓘⓡ)</option>
                  <option value="square">Square (🄺🄰🄳🄸🅁)</option>
                  <option value="inverted">Inverted Flip (ɹıpɐʞ)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setEditingStyle(null)}
                className="px-4 py-2 bg-white/5 border border-gaming-border text-gray-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gaming-accent text-black font-bold text-xs rounded-lg shadow-neon-cyan"
              >
                Save Style
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT SEO MODAL */}
      {editingSeo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <form onSubmit={handleSaveSeo} className="relative w-full max-w-2xl bg-gaming-card border border-gaming-border rounded-2xl p-6 shadow-neon-cyan my-8">
            <h3 className="text-lg font-bold text-white font-gaming mb-4">Edit SEO Landing Page</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400">Page Title (H1)</label>
                <input
                  type="text"
                  required
                  value={editingSeo.title}
                  onChange={(e) => setEditingSeo({ ...editingSeo, title: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400">Slug</label>
                <input
                  type="text"
                  required
                  value={editingSeo.slug}
                  onChange={(e) => setEditingSeo({ ...editingSeo, slug: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400">Meta Title</label>
                <input
                  type="text"
                  required
                  value={editingSeo.seoTitle}
                  onChange={(e) => setEditingSeo({ ...editingSeo, seoTitle: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400">Meta Description</label>
                <textarea
                  required
                  value={editingSeo.seoDescription}
                  onChange={(e) => setEditingSeo({ ...editingSeo, seoDescription: e.target.value })}
                  rows={2}
                  className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400">Markdown Content Guide</label>
                <textarea
                  value={editingSeo.content}
                  onChange={(e) => setEditingSeo({ ...editingSeo, content: e.target.value })}
                  rows={6}
                  className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white font-mono outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setEditingSeo(null)}
                className="px-4 py-2 bg-white/5 border border-gaming-border text-gray-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gaming-accent text-black font-bold text-xs rounded-lg shadow-neon-cyan"
              >
                Save SEO Page
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT FAQ MODAL */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form onSubmit={handleSaveFaq} className="relative w-full max-w-md bg-gaming-card border border-gaming-border rounded-2xl p-6 shadow-neon-cyan">
            <h3 className="text-lg font-bold text-white font-gaming mb-4">
              {editingFaq.id ? 'Edit FAQ' : 'Add FAQ'}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400">Question</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400">Answer</label>
                <textarea
                  required
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  rows={3}
                  className="w-full mt-1 px-3 py-2 bg-gaming-darker border border-gaming-border rounded-lg text-white outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="px-4 py-2 bg-white/5 border border-gaming-border text-gray-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gaming-accent text-black font-bold text-xs rounded-lg shadow-neon-cyan"
              >
                Save FAQ
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
