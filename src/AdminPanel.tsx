import { useMemo, useState } from 'react';
import { Bell, LogOut, Menu, Search, X } from 'lucide-react';
import { TuxedoLogo } from './admin/components';
import { navItems } from './admin/data';
import { LoginScreen } from './admin/LoginScreen';
import {
  AuditPage,
  ConciergePage,
  DashboardPage,
  DisputesPage,
  KycPage,
  NotificationsPage,
  PaymentsPage,
  PricingPage,
  RidesPage,
  SecurityPage,
  UsersPage,
} from './admin/pages';
import type { Page } from './admin/types';
import { cn } from './admin/utils';

export default function AdminPanel() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitle = useMemo(() => navItems.find((item) => item.id === activePage)?.label ?? 'Dashboard', [activePage]);

  if (!isAuthed) return <LoginScreen onLogin={() => setIsAuthed(true)} />;

  return (
    <div className="min-h-screen bg-tux-black font-sans text-tux-cream lg:grid lg:grid-cols-[272px_minmax(0,1fr)]">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-white/8 bg-tux-surface/95 px-4 py-5 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="relative mb-6 flex justify-center">
          <div className="flex flex-col items-center text-center">
            <TuxedoLogo className="h-auto w-[132px] select-none object-contain" />
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">Admin Control Center</p>
          </div>
          <button
            type="button"
            className="absolute right-0 top-0 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activePage === id;
            return (
              <button
                key={id}
                type="button"
                className={cn(
                  'flex min-h-[42px] items-center gap-3 rounded-xl px-3 text-left text-[13px] font-semibold transition',
                  isActive
                    ? 'border border-tux-gold/25 bg-tux-gold/10 text-tux-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
                    : 'border border-transparent text-white/55 hover:bg-white/5 hover:text-white/85',
                )}
                onClick={() => {
                  setActivePage(id);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={17} className={isActive ? 'text-tux-gold' : 'text-white/45'} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-white/8 bg-tux-black/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-tux-cream sm:text-[28px]">{pageTitle}</h1>
              <p className="mt-1 hidden max-w-2xl text-sm text-white/50 sm:block">
                Executive operations console for rides, access, billing, and platform control.
              </p>
            </div>

            <div className="flex w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto">
              <div className="hidden min-w-[260px] items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white/40 xl:flex">
                <Search size={15} className="shrink-0 text-white/35" />
                <span>Search rides, users, invoices, audit logs</span>
              </div>

              <button
                type="button"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10"
                aria-label="Notifications"
              >
                <Bell size={17} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-tux-gold ring-2 ring-tux-black" />
              </button>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-tux-gold-light to-tux-gold text-xs font-bold text-black">
                  AO
                </span>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-tux-cream">Admin Owner</p>
                  <p className="text-xs text-white/45">Super admin</p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm font-semibold text-white/70 transition hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-300"
                onClick={() => setIsAuthed(false)}
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <ActivePage page={activePage} />
        </div>
      </main>
    </div>
  );
}

function ActivePage({ page }: { page: Page }) {
  switch (page) {
    case 'dashboard':
      return <DashboardPage />;
    case 'users':
      return <UsersPage />;
    case 'rides':
      return <RidesPage />;
    case 'kyc':
      return <KycPage />;
    case 'pricing':
      return <PricingPage />;
    case 'payments':
      return <PaymentsPage />;
    case 'concierge':
      return <ConciergePage />;
    case 'notifications':
      return <NotificationsPage />;
    case 'disputes':
      return <DisputesPage />;
    case 'audit':
      return <AuditPage />;
    case 'security':
      return <SecurityPage />;
  }
}
