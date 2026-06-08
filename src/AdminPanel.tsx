import { useMemo, useState, type ComponentType, type ReactNode } from 'react';
import {
  Activity,
  AlertTriangle,
  Ban,
  Bell,
  BookOpen,
  Building2,
  CalendarClock,
  Car,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  DollarSign,
  Eye,
  EyeOff,
  FileText,
  Gavel,
  History,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  SlidersHorizontal,
  Sparkles,
  UserCheck,
  Users,
  X,
} from 'lucide-react';

type IconType = ComponentType<{ size?: number; color?: string; className?: string }>;
type Page =
  | 'dashboard'
  | 'users'
  | 'rides'
  | 'kyc'
  | 'pricing'
  | 'payments'
  | 'concierge'
  | 'notifications'
  | 'disputes'
  | 'audit'
  | 'security';

const navItems: Array<{ id: Page; label: string; icon: IconType }> = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Users & Roles', icon: Users },
  { id: 'rides', label: 'Ride Control', icon: Car },
  { id: 'kyc', label: 'Driver KYC', icon: ClipboardCheck },
  { id: 'pricing', label: 'Pricing', icon: SlidersHorizontal },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'concierge', label: 'Concierge', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'disputes', label: 'Disputes', icon: Gavel },
  { id: 'audit', label: 'Audit Log', icon: History },
  { id: 'security', label: 'Security', icon: LockKeyhole },
];

const metrics = [
  { title: 'Active rides', value: '31', detail: 'pending, accepted, arrived, in progress', icon: Activity, tone: 'gold' as const },
  { title: 'KYC pending', value: '12', detail: '4 need admin review today', icon: ClipboardCheck, tone: 'warn' as const },
  { title: 'Revenue today', value: '$8,420', detail: 'fare, company billing, invoices', icon: DollarSign, tone: 'green' as const },
  { title: 'Open disputes', value: '7', detail: '3 under review', icon: Gavel, tone: 'red' as const },
];

const rides = [
  { id: 'TX-1048', rider: 'Ivan Garcia', role: 'Passenger', vehicle: 'Luxury SUV · 7 passengers', status: 'pending', fare: '$124', payment: 'pending', owner: 'Passenger app' },
  { id: 'TX-1047', rider: 'Amelia Stone', role: 'Concierge guest', vehicle: 'Executive Sprinter · 8 passengers', status: 'accepted', fare: '$340', payment: 'company invoice', owner: 'Soho House' },
  { id: 'TX-1046', rider: 'Marcus Lee', role: 'Passenger', vehicle: 'Sedan · 4 passengers', status: 'in_progress', fare: '$88', payment: 'paid', owner: 'Passenger app' },
  { id: 'TX-1045', rider: 'Priya Shah', role: 'Concierge guest', vehicle: 'Hourly · Stretch / Limo', status: 'scheduled', fare: '$690 est.', payment: 'manual billing', owner: 'Four Seasons' },
];

const users = [
  { name: 'Ivan Garcia', role: 'Passenger', status: 'active', scope: 'Passenger app', lastAction: 'Booked SUV ride' },
  { name: 'Michael Thompson', role: 'Driver', status: 'online', scope: 'KYC approved', lastAction: 'Accepted TX-1047' },
  { name: 'The Plaza Desk', role: 'Concierge', status: 'active', scope: 'The Plaza Hotel only', lastAction: 'Sent guest link' },
  { name: 'Admin Owner', role: 'Admin', status: 'active', scope: 'Full access', lastAction: 'Adjusted pricing' },
];

const kycQueue = [
  { driver: 'Sarah Martinez', document: 'Insurance certificate', status: 'pending', age: '2h', action: 'Review' },
  { driver: 'James Anderson', document: 'Vehicle registration', status: 'rejected', age: '1d', action: 'Reason required' },
  { driver: 'Emily Roberts', document: 'Driver license', status: 'approved', age: '3d', action: 'Completed' },
];

const pricingRules = [
  { name: 'Base fare', value: '$45', rule: 'Required before booking confirmation' },
  { name: 'Distance charge', value: '$4.25 / mi', rule: 'Final fare calculated server-side' },
  { name: 'Waiting charge', value: '$1.20 / min', rule: 'Applies after grace period' },
  { name: 'Platform commission', value: '18%', rule: 'Deducted after ride completion' },
  { name: 'Cancellation fee', value: 'Configurable', rule: 'Applies after driver accepts/arrives' },
];

const payments = [
  { ride: 'TX-1048', payer: 'Passenger', status: 'pending', method: 'Card hold', amount: '$124' },
  { ride: 'TX-1047', payer: 'Soho House', status: 'invoice', method: 'Monthly company billing', amount: '$340' },
  { ride: 'TX-1046', payer: 'Passenger', status: 'paid', method: 'Apple Pay', amount: '$88' },
  { ride: 'TX-1045', payer: 'Four Seasons', status: 'manual', method: 'Admin billing', amount: '$690 est.' },
];

const notifications = [
  { event: 'Driver assigned', channels: 'Push, SMS, in-app', rule: 'Real-time for passenger and concierge' },
  { event: 'Guest tracking link', channels: 'SMS, WhatsApp', rule: 'Guest can track without app install' },
  { event: 'KYC rejected', channels: 'Push, email', rule: 'Admin rejection reason required' },
  { event: 'Payment failed', channels: 'Push, email', rule: 'Notify passenger and admin' },
];

const disputes = [
  { ride: 'TX-1038', openedBy: 'Passenger', status: 'under_review', issue: 'Waiting charge dispute' },
  { ride: 'TX-1032', openedBy: 'Driver', status: 'open', issue: 'No-show at pickup' },
  { ride: 'TX-1029', openedBy: 'Concierge', status: 'resolved', issue: 'Guest invoice correction' },
];

const auditLogs = [
  { action: 'driver_kyc_approved', actor: 'Admin Owner', role: 'Admin', target: 'Michael Thompson', time: '10:42 AM', reason: 'Documents verified' },
  { action: 'ride_status_changed', actor: 'Michael Thompson', role: 'Driver', target: 'TX-1047', time: '10:31 AM', reason: 'accepted -> on_the_way' },
  { action: 'fare_updated', actor: 'Admin Owner', role: 'Admin', target: 'SUV distance charge', time: 'Yesterday', reason: 'Market pricing update' },
  { action: 'user_blocked', actor: 'Support Admin', role: 'Admin', target: 'Test Passenger', time: 'Yesterday', reason: 'Fraud review' },
];

const securityRules = [
  'Role-based access for Passenger, Driver, Concierge, and Admin.',
  'Server is final authority for ride assignment and fare calculation.',
  'Only one driver can be assigned to one ride through backend lock/transaction.',
  'Concierge can access only their hotel/company guest rides.',
  'Admin corrections, fare edits, KYC decisions, cancellations, and blocks require audit logs.',
  'Sensitive payment data must not be stored in mobile apps.',
];

const metricToneStyles = {
  gold: 'border-tux-gold/25 from-tux-gold/10 to-transparent [&_.metric-icon]:bg-tux-gold/15 [&_.metric-icon]:text-tux-gold [&_em]:text-tux-gold',
  warn: 'border-amber-500/25 from-amber-500/10 to-transparent [&_.metric-icon]:bg-amber-500/15 [&_.metric-icon]:text-amber-400 [&_em]:text-amber-400',
  green: 'border-emerald-500/25 from-emerald-500/10 to-transparent [&_.metric-icon]:bg-emerald-500/15 [&_.metric-icon]:text-emerald-400 [&_em]:text-emerald-400',
  red: 'border-rose-500/25 from-rose-500/10 to-transparent [&_.metric-icon]:bg-rose-500/15 [&_.metric-icon]:text-rose-400 [&_em]:text-rose-400',
};

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-500/12 text-emerald-300 border-emerald-500/25',
  online: 'bg-sky-500/12 text-sky-300 border-sky-500/25',
  pending: 'bg-amber-500/12 text-amber-300 border-amber-500/25',
  accepted: 'bg-sky-500/12 text-sky-300 border-sky-500/25',
  'in-progress': 'bg-violet-500/12 text-violet-300 border-violet-500/25',
  scheduled: 'bg-indigo-500/12 text-indigo-300 border-indigo-500/25',
  approved: 'bg-emerald-500/12 text-emerald-300 border-emerald-500/25',
  rejected: 'bg-rose-500/12 text-rose-300 border-rose-500/25',
  paid: 'bg-emerald-500/12 text-emerald-300 border-emerald-500/25',
  invoice: 'bg-violet-500/12 text-violet-300 border-violet-500/25',
  manual: 'bg-zinc-500/12 text-zinc-300 border-zinc-500/25',
  open: 'bg-amber-500/12 text-amber-300 border-amber-500/25',
  'under-review': 'bg-orange-500/12 text-orange-300 border-orange-500/25',
  resolved: 'bg-emerald-500/12 text-emerald-300 border-emerald-500/25',
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function TuxedoLogo({ className }: { className: string }) {
  return <img src={`${import.meta.env.BASE_URL}tuxedo-logo-white.png`} alt="Tuxedo" className={className} draggable={false} />;
}

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
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <TuxedoLogo className="h-auto w-[118px] select-none object-contain" />
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">Admin Control Center</p>
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 lg:hidden"
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
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-tux-gold/80">Black Tuxedo Platform</p>
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
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'users' && <UsersPage />}
          {activePage === 'rides' && <RidesPage />}
          {activePage === 'kyc' && <KycPage />}
          {activePage === 'pricing' && <PricingPage />}
          {activePage === 'payments' && <PaymentsPage />}
          {activePage === 'concierge' && <ConciergePage />}
          {activePage === 'notifications' && <NotificationsPage />}
          {activePage === 'disputes' && <DisputesPage />}
          {activePage === 'audit' && <AuditPage />}
          {activePage === 'security' && <SecurityPage />}
        </div>
      </main>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
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

function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      <section className="relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-tux-surface-2 via-tux-surface to-tux-black p-6 shadow-[0_16px_48px_rgba(0,0,0,0.35)] xl:col-span-3 xl:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,183,93,0.14),transparent_38%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-tux-gold/25 bg-tux-gold/10 px-3 py-1 text-xs font-semibold text-tux-gold">
              <Sparkles size={14} />
              Premium admin workspace
            </span>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold leading-tight tracking-tight text-tux-cream sm:text-3xl">
              Command every ride, account, and payment from one refined control center.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-[15px]">
              Monitor live chauffeur operations, approve sensitive actions, and keep the Black Tuxedo platform audit-ready.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <CalendarClock size={18} className="text-tux-gold" />
              <span>Next priority</span>
            </div>
            <p className="mt-3 text-lg font-bold text-tux-cream">Driver KYC review</p>
            <p className="mt-2 text-sm leading-relaxed text-white/50">4 documents require admin decision before drivers can go online.</p>
            <button type="button" className="mt-4 inline-flex items-center rounded-lg border border-tux-gold/30 bg-tux-gold/10 px-3.5 py-2 text-sm font-semibold text-tux-gold transition hover:bg-tux-gold/15">
              Open queue
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:col-span-3 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Metric key={metric.title} {...metric} />
        ))}
      </div>

      <section className="rounded-[20px] border border-white/10 bg-tux-surface/70 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-sm xl:col-span-2">
        <PanelTitle icon={BookOpen} title="Platform Controls" subtitle="Core operational checks for rides, pricing, access, and admin activity." />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <RuleCard title="Ride assignment" detail="Server lock prevents duplicate driver acceptance." status="Backend controlled" />
          <RuleCard title="Fare authority" detail="Estimated and final fare must be calculated server-side." status="Pricing module" />
          <RuleCard title="Access control" detail="Each role can access only allowed screens and actions." status="RBAC" />
          <RuleCard title="Audit logging" detail="Every admin correction or sensitive action requires reason." status="Required" />
        </div>
      </section>

      <section className="rounded-[20px] border border-white/10 bg-tux-surface/70 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-sm">
        <PanelTitle icon={AlertTriangle} title="Admin Attention" subtitle="Items needing review before operations continue." />
        <div className="mt-5 space-y-3">
          <AttentionRow title="Driver KYC pending" meta="12 documents waiting" tone="warn" />
          <AttentionRow title="Payment failures" meta="3 failed transactions" tone="red" />
          <AttentionRow title="No driver found" meta="2 expired requests" tone="warn" />
          <AttentionRow title="Open disputes" meta="7 active cases" tone="red" />
        </div>
      </section>

      <section className="rounded-[20px] border border-white/10 bg-tux-surface/70 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-sm xl:col-span-3">
        <PanelTitle icon={Car} title="Live Ride Control" subtitle="Admin can monitor ride status, assignment, cancellation, payment, and invoice state." />
        <RideTable />
      </section>
    </div>
  );
}

function UsersPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={Users} title="Users & Role Access" subtitle="Passenger, Driver, Concierge, and Admin users with role-scoped permissions.">
        <DataTable
          columns={['Name', 'Role', 'Status', 'Access scope', 'Last action']}
          rows={users.map((user) => [user.name, user.role, <StatusPill key={user.name} value={user.status} />, user.scope, user.lastAction])}
        />
      </Panel>
      <RuleList
        title="Role Access Controls"
        rules={[
          'Passenger cannot book if blocked, suspended, deleted, or already has an active ride.',
          'Driver cannot accept rides until KYC is approved.',
          'Concierge can only view and manage rides under their own hotel/company account.',
          'Admin can block/unblock users only with a saved reason and audit log.',
        ]}
      />
    </PageGrid>
  );
}

function RidesPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={Car} title="Ride Booking & Matching" subtitle="Track ride lifecycle from pending to completed, cancelled, expired, or no_driver_found.">
        <RideTable />
      </Panel>
      <RuleList
        title="Allowed Status Flow"
        rules={[
          'Successful flow: pending -> accepted -> driver_arrived -> in_progress -> completed.',
          'Cancellation allowed from pending, accepted, or driver_arrived before ride starts.',
          'Ride status must never move backwards.',
          'Completed ride can be corrected only by admin with audit log.',
        ]}
      />
      <RuleList
        title="Driver Matching Controls"
        rules={[
          'Find online, KYC-approved, not busy drivers within service radius.',
          'Filter by requested vehicle type and account status.',
          'Nearest driver first, then rating, cancellation rate, and availability time.',
          'Backend must lock assignment so two drivers are never assigned to one ride.',
        ]}
      />
    </PageGrid>
  );
}

function KycPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={ClipboardCheck} title="Driver KYC Review" subtitle="Approve, reject, and request re-upload with rejection reason.">
        <DataTable
          columns={['Driver', 'Document', 'Status', 'Age', 'Admin action']}
          rows={kycQueue.map((item) => [
            item.driver,
            item.document,
            <StatusPill key={item.driver} value={item.status} />,
            item.age,
            <MiniButton key={item.action}>{item.action}</MiniButton>,
          ])}
        />
      </Panel>
      <RuleList
        title="KYC Requirements"
        rules={[
          'New driver starts with kyc_pending status.',
          'Driver can go online only if KYC is approved.',
          'Rejected KYC requires admin rejection reason.',
          'Driver must re-upload correct documents after rejection.',
        ]}
      />
    </PageGrid>
  );
}

function PricingPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={SlidersHorizontal} title="Pricing & Commission" subtitle="Admin-controlled fare components and platform commission.">
        <DataTable columns={['Component', 'Current value', 'Control']} rows={pricingRules.map((rule) => [rule.name, rule.value, rule.rule])} />
      </Panel>
      <RuleList
        title="Fare Calculation"
        rules={[
          'final_fare = base_fare + distance + time + waiting + surge + extra charges + tax - discount.',
          'Estimated fare is shown before booking.',
          'Final fare is calculated after ride completion.',
          'Passenger, driver, and concierge cannot manually edit fare.',
          'Any admin fare adjustment must be audit logged.',
        ]}
      />
    </PageGrid>
  );
}

function PaymentsPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={CreditCard} title="Payments, Invoices & Payouts" subtitle="Ride-linked payments, company billing, refunds, and driver payout state.">
        <DataTable
          columns={['Ride', 'Payer', 'Status', 'Method', 'Amount']}
          rows={payments.map((payment) => [
            payment.ride,
            payment.payer,
            <StatusPill key={payment.ride} value={payment.status} />,
            payment.method,
            payment.amount,
          ])}
        />
      </Panel>
      <RuleList
        title="Payment Controls"
        rules={[
          'Payment must be linked to a ride.',
          'Payment status can be pending, paid, failed, or refunded.',
          'Passenger receives invoice after successful payment.',
          'Concierge/company billing is handled separately when enabled.',
          'Driver payout happens only after completed and paid ride unless company billing allows delay.',
        ]}
      />
    </PageGrid>
  );
}

function ConciergePage() {
  return (
    <PageGrid>
      <Panel
        span={3}
        icon={Building2}
        title="Concierge Account Control"
        subtitle="Hotel/company guest rides, guest links, tracking, cancellation, and billing responsibility."
      >
        <DataTable
          columns={['Account', 'Requests today', 'Pending', 'Billing mode', 'Access scope']}
          rows={[
            ['The Plaza Hotel', '18', '4', 'Monthly invoice', 'Own hotel rides only'],
            ['Soho House', '12', '2', 'Guest pays', 'Own company rides only'],
            ['Four Seasons', '9', '1', 'Admin/manual billing', 'Own hotel rides only'],
          ]}
        />
      </Panel>
      <RuleList
        title="Concierge Controls"
        rules={[
          'Guest does not need passenger app account.',
          'Guest phone number must include correct country code.',
          'Guest can track driver through SMS/WhatsApp link without installing app.',
          'Concierge cannot edit ride after driver starts trip.',
          'Payment responsibility must be saved with the ride.',
        ]}
      />
    </PageGrid>
  );
}

function NotificationsPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={MessageSquare} title="Notification Center" subtitle="Real-time ride, payment, KYC, reminder, and guest tracking notifications.">
        <DataTable columns={['Event', 'Channels', 'Rule']} rows={notifications.map((item) => [item.event, item.channels, item.rule])} />
      </Panel>
      <RuleList
        title="Notification Requirements"
        rules={[
          'Important notifications should be sent in real time.',
          'Driver receives ride request notification only when online.',
          'Concierge receives guest ride status updates.',
          'Notification failures should be logged.',
        ]}
      />
    </PageGrid>
  );
}

function DisputesPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={Gavel} title="Disputes & Complaints" subtitle="Ride-linked complaints from passenger, driver, or concierge.">
        <DataTable
          columns={['Ride', 'Opened by', 'Status', 'Issue']}
          rows={disputes.map((item) => [item.ride, item.openedBy, <StatusPill key={item.ride} value={item.status} />, item.issue])}
        />
      </Panel>
      <RuleList
        title="Dispute Workflow"
        rules={[
          'Dispute must be linked to a ride.',
          'Status can be open, under_review, resolved, or rejected.',
          'Admin resolution should be saved with notes.',
        ]}
      />
    </PageGrid>
  );
}

function AuditPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={History} title="Audit Log" subtitle="Every business-critical action stores actor, role, target, old/new value, timestamp, and reason.">
        <DataTable
          columns={['Action', 'Actor', 'Role', 'Target', 'Time', 'Reason']}
          rows={auditLogs.map((log) => [log.action, log.actor, log.role, log.target, log.time, log.reason])}
        />
      </Panel>
    </PageGrid>
  );
}

function SecurityPage() {
  return (
    <PageGrid>
      <RuleList title="Security & Validation" rules={securityRules} />
      <RuleList
        title="Final Platform Authority"
        rules={[
          'Server must be the final authority for ride assignment.',
          'Mobile app should not decide final driver assignment.',
          'Mobile app should not calculate final fare alone.',
          'Every business-critical action should have validation, permission check, and logging.',
        ]}
      />
    </PageGrid>
  );
}

function PageGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">{children}</div>;
}

function Panel({
  icon,
  title,
  subtitle,
  span = 1,
  children,
}: {
  icon: IconType;
  title: string;
  subtitle: string;
  span?: 1 | 2 | 3;
  children: ReactNode;
}) {
  const spanClass = span === 3 ? 'xl:col-span-3' : span === 2 ? 'xl:col-span-2' : '';
  return (
    <section className={cn('rounded-[20px] border border-white/10 bg-tux-surface/70 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-sm', spanClass)}>
      <PanelTitle icon={icon} title={title} subtitle={subtitle} />
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Metric({ title, value, detail, icon: Icon, tone }: { title: string; value: string; detail: string; icon: IconType; tone: keyof typeof metricToneStyles }) {
  return (
    <div className={cn('rounded-[20px] border bg-gradient-to-br p-5 shadow-[0_8px_28px_rgba(0,0,0,0.24)]', metricToneStyles[tone])}>
      <div className="mb-4 flex items-center justify-between">
        <div className="metric-icon flex h-10 w-10 items-center justify-center rounded-xl">
          <Icon size={18} />
        </div>
        <em className="text-[11px] font-semibold not-italic uppercase tracking-[0.14em]">Live</em>
      </div>
      <p className="text-sm text-white/55">{title}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-tux-cream">{value}</p>
      <p className="mt-2 text-xs leading-relaxed text-white/45">{detail}</p>
    </div>
  );
}

function PanelTitle({ icon: Icon, title, subtitle }: { icon: IconType; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-tux-gold/20 bg-tux-gold/10 text-tux-gold">
        <Icon size={18} />
      </div>
      <div>
        <h2 className="text-lg font-bold tracking-tight text-tux-cream">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-white/50">{subtitle}</p>
      </div>
    </div>
  );
}

function RideTable() {
  return (
    <DataTable
      columns={['Ride', 'Rider / Guest', 'Vehicle', 'Status', 'Payment', 'Owner']}
      rows={rides.map((ride) => [
        <strong key={ride.id} className="font-semibold text-tux-cream">
          {ride.id}
        </strong>,
        <span key={ride.rider} className="block">
          {ride.rider}
          <small className="mt-0.5 block text-xs text-white/45">{ride.role}</small>
        </span>,
        ride.vehicle,
        <StatusPill key={ride.status} value={ride.status} />,
        <span key={ride.payment} className="block">
          {ride.fare}
          <small className="mt-0.5 block text-xs text-white/45">{ride.payment}</small>
        </span>,
        ride.owner,
      ])}
    />
  );
}

function DataTable({ columns, rows }: { columns: string[]; rows: Array<Array<ReactNode>> }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/8">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-white/8 bg-white/[0.03]">
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white/45">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-white/5 transition last:border-0 hover:bg-white/[0.02]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3.5 align-middle text-white/75">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RuleList({ title, rules }: { title: string; rules: string[] }) {
  return (
    <Panel span={3} icon={FileText} title={title} subtitle="Controls this admin module must enforce or monitor.">
      <div className="space-y-2.5">
        {rules.map((rule) => (
          <div key={rule} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-tux-gold" />
            <span className="text-sm leading-relaxed text-white/70">{rule}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function RuleCard({ title, detail, status }: { title: string; detail: string; status: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
      <UserCheck size={17} className="text-tux-gold" />
      <p className="mt-3 text-sm font-semibold text-tux-cream">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-white/50">{detail}</p>
      <em className="mt-3 block text-[11px] font-semibold not-italic uppercase tracking-[0.12em] text-tux-gold/80">{status}</em>
    </div>
  );
}

function AttentionRow({ title, meta, tone }: { title: string; meta: string; tone: 'warn' | 'red' }) {
  const Icon = tone === 'red' ? Ban : AlertTriangle;
  const toneClass = tone === 'red' ? 'border-rose-500/20 bg-rose-500/8 text-rose-300' : 'border-amber-500/20 bg-amber-500/8 text-amber-300';

  return (
    <div className={cn('flex items-start gap-3 rounded-xl border px-4 py-3', toneClass)}>
      <Icon size={16} className="mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-tux-cream">{title}</p>
        <p className="mt-0.5 text-xs text-white/50">{meta}</p>
      </div>
    </div>
  );
}

function StatusPill({ value }: { value: string }) {
  const normalized = value.toLowerCase().replace(/\s|_/g, '-');
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize',
        statusStyles[normalized] ?? 'border-white/15 bg-white/8 text-white/70',
      )}
    >
      {value.replace(/_/g, ' ')}
    </span>
  );
}

function MiniButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-lg border border-tux-gold/30 bg-tux-gold/10 px-3 py-1.5 text-xs font-semibold text-tux-gold transition hover:bg-tux-gold/15"
    >
      {children}
    </button>
  );
}
