import { AlertTriangle, BookOpen, CalendarClock, Car, Sparkles } from 'lucide-react';
import { AttentionRow, Metric, PanelTitle, RideTable, RuleCard } from '../components';
import { metrics } from '../data';

export function DashboardPage() {
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
