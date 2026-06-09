import { AlertTriangle, BookOpen, Car } from 'lucide-react';
import { AttentionRow, Metric, PanelTitle, RideTable, RuleCard } from '../components';
import { metrics } from '../data';

export function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
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
