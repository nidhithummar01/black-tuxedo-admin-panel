import type { ReactNode } from 'react';
import { AlertTriangle, Ban, CheckCircle2, FileText, UserCheck } from 'lucide-react';
import { rides } from './data';
import type { IconType } from './types';
import { cn } from './utils';

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

export function TuxedoLogo({ className }: { className: string }) {
  return <img src={`${import.meta.env.BASE_URL}tuxedo-logo-white.png`} alt="Tuxedo" className={className} draggable={false} />;
}

export function PageGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">{children}</div>;
}

export function Panel({
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

export function Metric({ title, value, detail, icon: Icon, tone }: { title: string; value: string; detail: string; icon: IconType; tone: keyof typeof metricToneStyles }) {
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

export function PanelTitle({ icon: Icon, title, subtitle }: { icon: IconType; title: string; subtitle: string }) {
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

export function RideTable() {
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

export function DataTable({ columns, rows }: { columns: string[]; rows: Array<Array<ReactNode>> }) {
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

export function RuleList({ title, rules }: { title: string; rules: string[] }) {
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

export function RuleCard({ title, detail, status }: { title: string; detail: string; status: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
      <UserCheck size={17} className="text-tux-gold" />
      <p className="mt-3 text-sm font-semibold text-tux-cream">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-white/50">{detail}</p>
      <em className="mt-3 block text-[11px] font-semibold not-italic uppercase tracking-[0.12em] text-tux-gold/80">{status}</em>
    </div>
  );
}

export function AttentionRow({ title, meta, tone }: { title: string; meta: string; tone: 'warn' | 'red' }) {
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

export function StatusPill({ value }: { value: string }) {
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

export function MiniButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-lg border border-tux-gold/30 bg-tux-gold/10 px-3 py-1.5 text-xs font-semibold text-tux-gold transition hover:bg-tux-gold/15"
    >
      {children}
    </button>
  );
}
