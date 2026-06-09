import { useState } from 'react';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';
import { TuxedoLogo } from './components';

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-tux-black px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,93,0.12),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_30%)]" />

      <section className="relative w-full max-w-[440px] rounded-[24px] border border-white/10 bg-tux-surface/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="mb-8 text-center">
          <TuxedoLogo className="mx-auto h-auto w-[200px] select-none object-contain" />
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Premium Chauffeur Service</p>
        </div>

        <div className="mb-6">
          <h1 className="text-center text-2xl font-bold tracking-tight text-tux-cream">Admin Login</h1>
          <p className="mt-2 text-center text-sm text-white/50">Sign in to manage platform operations securely.</p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">Email</span>
            <input
              defaultValue="admin@tuxedo.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-tux-cream outline-none transition placeholder:text-white/30 focus:border-tux-gold/40 focus:ring-4 focus:ring-tux-gold/10"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">Password</span>
            <div className="relative">
              <input
                defaultValue="admin@123"
                type={showPassword ? 'text' : 'password'}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-tux-cream outline-none transition focus:border-tux-gold/40 focus:ring-4 focus:ring-tux-gold/10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/45 transition hover:bg-white/10 hover:text-white/80"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </label>
        </div>

        <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-tux-gold-light to-tux-gold px-4 py-3.5 text-sm font-bold text-black shadow-[0_10px_30px_rgba(216,183,93,0.25)] transition hover:brightness-105"
          onClick={onLogin}
        >
          Sign in to admin
          <ChevronRight size={18} />
        </button>
      </section>
    </div>
  );
}
