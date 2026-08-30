import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

export const AdminAuth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Successful login
      window.location.href = '/admin/';
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gaming-card border border-gaming-border rounded-2xl p-8 shadow-neon-cyan backdrop-blur-md">
      <div className="text-center mb-6">
        <div className="inline-flex p-3 bg-gaming-accent/10 border border-gaming-accent/40 rounded-2xl text-gaming-accent mb-3 shadow-glow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white font-gaming">Admin Login</h1>
        <p className="text-xs text-gray-400 mt-1">
          Authorized personnel only. Access platform control center.
        </p>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-mono text-gray-400 block mb-1">Email / Admin Username</label>
          <div className="relative flex items-center">
            <Mail className="w-4 h-4 text-gray-500 absolute left-3" />
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gamertagpro.com"
              className="w-full pl-9 pr-3 py-2.5 bg-gaming-darker border border-gaming-border rounded-xl text-white text-xs outline-none focus:border-gaming-accent"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-gray-400 block mb-1">Password</label>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-gray-500 absolute left-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-9 pr-3 py-2.5 bg-gaming-darker border border-gaming-border rounded-xl text-white text-xs outline-none focus:border-gaming-accent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-gaming-accent hover:bg-gaming-neon text-black font-bold text-xs rounded-xl shadow-neon-cyan hover:shadow-neon-green transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In to Admin Panel'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-gaming-border/60 text-center text-[11px] text-gray-500 font-mono">
        Default developer password: <span className="text-gaming-accent">admin123</span> or Supabase User
      </div>
    </div>
  );
};
