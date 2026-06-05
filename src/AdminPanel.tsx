import { useMemo, useState, type ComponentType } from 'react';
import {
  Activity,
  AlertTriangle,
  Ban,
  Bell,
  BookOpen,
  Building2,
  Car,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  DollarSign,
  FileText,
  Gavel,
  History,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  ShieldCheck,
  SlidersHorizontal,
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
  { title: 'Active rides', value: '31', detail: 'pending, accepted, arrived, in progress', icon: Activity, tone: 'gold' },
  { title: 'KYC pending', value: '12', detail: '4 need admin review today', icon: ClipboardCheck, tone: 'warn' },
  { title: 'Revenue today', value: '$8,420', detail: 'fare, company billing, invoices', icon: DollarSign, tone: 'green' },
  { title: 'Open disputes', value: '7', detail: '3 under review', icon: Gavel, tone: 'red' },
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
    <div className="bt-shell">
      <aside className={`bt-sidebar ${sidebarOpen ? 'bt-sidebar-open' : ''}`}>
        <div className="bt-brand-row">
          <div>
            <TuxedoLogo className="bt-brand-logo" />
            <span>Admin Control Center</span>
          </div>
          <button className="bt-icon-btn bt-mobile-only" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="bt-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`bt-nav-item ${activePage === id ? 'bt-nav-active' : ''}`}
              onClick={() => {
                setActivePage(id);
                setSidebarOpen(false);
              }}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="bt-sidebar-status">
          <ShieldCheck size={18} />
          <div>
            <strong>Controls enabled</strong>
            <span>RBAC · audit · validation</span>
          </div>
        </div>
      </aside>

      <main className="bt-main">
        <header className="bt-topbar">
          <button className="bt-icon-btn bt-mobile-only" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div>
            <p className="bt-eyebrow">Black Tuxedo Platform</p>
            <h1>{pageTitle}</h1>
          </div>
          <div className="bt-top-actions">
            <div className="bt-search">
              <Search size={15} />
              <span>Search rides, users, invoices, audit logs</span>
            </div>
            <button className="bt-icon-btn" aria-label="Notifications">
              <Bell size={17} />
            </button>
            <button className="bt-logout" onClick={() => setIsAuthed(false)}>
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </header>

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
      </main>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="bt-login-page">
      <section className="bt-login-card">
        <TuxedoLogo className="bt-login-logo" />
        <p>Premium Chauffeur Service</p>
        <h1>Admin Management Console</h1>
        <span>Manage rides, KYC, pricing, payments, disputes, notifications, and audit logging from one control center.</span>
        <label>
          Email
          <input defaultValue="admin@tuxedo.com" />
        </label>
        <label>
          Password
          <input defaultValue="password" type="password" />
        </label>
        <button className="bt-primary-btn" onClick={onLogin}>
          Sign in to admin <ChevronRight size={18} />
        </button>
      </section>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="bt-page">
      <div className="bt-metrics">
        {metrics.map((metric) => <Metric key={metric.title} {...metric} />)}
      </div>

      <section className="bt-panel bt-span-2">
        <PanelTitle icon={BookOpen} title="Platform Controls" subtitle="Core operational checks for rides, pricing, access, and admin activity." />
        <div className="bt-rule-grid">
          <RuleCard title="Ride assignment" detail="Server lock prevents duplicate driver acceptance." status="Backend controlled" />
          <RuleCard title="Fare authority" detail="Estimated and final fare must be calculated server-side." status="Pricing module" />
          <RuleCard title="Access control" detail="Each role can access only allowed screens and actions." status="RBAC" />
          <RuleCard title="Audit logging" detail="Every admin correction or sensitive action requires reason." status="Required" />
        </div>
      </section>

      <section className="bt-panel">
        <PanelTitle icon={AlertTriangle} title="Admin Attention" subtitle="Items needing review before operations continue." />
        <div className="bt-attention-list">
          <AttentionRow title="Driver KYC pending" meta="12 documents waiting" tone="warn" />
          <AttentionRow title="Payment failures" meta="3 failed transactions" tone="red" />
          <AttentionRow title="No driver found" meta="2 expired requests" tone="warn" />
          <AttentionRow title="Open disputes" meta="7 active cases" tone="red" />
        </div>
      </section>

      <section className="bt-panel bt-span-3">
        <PanelTitle icon={Car} title="Live Ride Control" subtitle="Admin can monitor ride status, assignment, cancellation, payment, and invoice state." />
        <RideTable />
      </section>
    </div>
  );
}

function UsersPage() {
  return (
    <div className="bt-page">
      <section className="bt-panel bt-span-3">
        <PanelTitle icon={Users} title="Users & Role Access" subtitle="Passenger, Driver, Concierge, and Admin users with role-scoped permissions." />
        <DataTable
          columns={['Name', 'Role', 'Status', 'Access scope', 'Last action']}
          rows={users.map((user) => [user.name, user.role, <StatusPill key={user.name} value={user.status} />, user.scope, user.lastAction])}
        />
      </section>
      <RuleList
        title="Role Access Controls"
        rules={[
          'Passenger cannot book if blocked, suspended, deleted, or already has an active ride.',
          'Driver cannot accept rides until KYC is approved.',
          'Concierge can only view and manage rides under their own hotel/company account.',
          'Admin can block/unblock users only with a saved reason and audit log.',
        ]}
      />
    </div>
  );
}

function RidesPage() {
  return (
    <div className="bt-page">
      <section className="bt-panel bt-span-3">
        <PanelTitle icon={Car} title="Ride Booking & Matching" subtitle="Track ride lifecycle from pending to completed, cancelled, expired, or no_driver_found." />
        <RideTable />
      </section>
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
    </div>
  );
}

function KycPage() {
  return (
    <div className="bt-page">
      <section className="bt-panel bt-span-3">
        <PanelTitle icon={ClipboardCheck} title="Driver KYC Review" subtitle="Approve, reject, and request re-upload with rejection reason." />
        <DataTable
          columns={['Driver', 'Document', 'Status', 'Age', 'Admin action']}
          rows={kycQueue.map((item) => [item.driver, item.document, <StatusPill key={item.driver} value={item.status} />, item.age, <button key={item.action} className="bt-mini-btn">{item.action}</button>])}
        />
      </section>
      <RuleList
        title="KYC Requirements"
        rules={[
          'New driver starts with kyc_pending status.',
          'Driver can go online only if KYC is approved.',
          'Rejected KYC requires admin rejection reason.',
          'Driver must re-upload correct documents after rejection.',
        ]}
      />
    </div>
  );
}

function PricingPage() {
  return (
    <div className="bt-page">
      <section className="bt-panel bt-span-3">
        <PanelTitle icon={SlidersHorizontal} title="Pricing & Commission" subtitle="Admin-controlled fare components and platform commission." />
        <DataTable
          columns={['Component', 'Current value', 'Control']}
          rows={pricingRules.map((rule) => [rule.name, rule.value, rule.rule])}
        />
      </section>
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
    </div>
  );
}

function PaymentsPage() {
  return (
    <div className="bt-page">
      <section className="bt-panel bt-span-3">
        <PanelTitle icon={CreditCard} title="Payments, Invoices & Payouts" subtitle="Ride-linked payments, company billing, refunds, and driver payout state." />
        <DataTable
          columns={['Ride', 'Payer', 'Status', 'Method', 'Amount']}
          rows={payments.map((payment) => [payment.ride, payment.payer, <StatusPill key={payment.ride} value={payment.status} />, payment.method, payment.amount])}
        />
      </section>
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
    </div>
  );
}

function ConciergePage() {
  return (
    <div className="bt-page">
      <section className="bt-panel bt-span-3">
        <PanelTitle icon={Building2} title="Concierge Account Control" subtitle="Hotel/company guest rides, guest links, tracking, cancellation, and billing responsibility." />
        <DataTable
          columns={['Account', 'Requests today', 'Pending', 'Billing mode', 'Access scope']}
          rows={[
            ['The Plaza Hotel', '18', '4', 'Monthly invoice', 'Own hotel rides only'],
            ['Soho House', '12', '2', 'Guest pays', 'Own company rides only'],
            ['Four Seasons', '9', '1', 'Admin/manual billing', 'Own hotel rides only'],
          ]}
        />
      </section>
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
    </div>
  );
}

function NotificationsPage() {
  return (
    <div className="bt-page">
      <section className="bt-panel bt-span-3">
        <PanelTitle icon={MessageSquare} title="Notification Center" subtitle="Real-time ride, payment, KYC, reminder, and guest tracking notifications." />
        <DataTable
          columns={['Event', 'Channels', 'Rule']}
          rows={notifications.map((item) => [item.event, item.channels, item.rule])}
        />
      </section>
      <RuleList
        title="Notification Requirements"
        rules={[
          'Important notifications should be sent in real time.',
          'Driver receives ride request notification only when online.',
          'Concierge receives guest ride status updates.',
          'Notification failures should be logged.',
        ]}
      />
    </div>
  );
}

function DisputesPage() {
  return (
    <div className="bt-page">
      <section className="bt-panel bt-span-3">
        <PanelTitle icon={Gavel} title="Disputes & Complaints" subtitle="Ride-linked complaints from passenger, driver, or concierge." />
        <DataTable
          columns={['Ride', 'Opened by', 'Status', 'Issue']}
          rows={disputes.map((item) => [item.ride, item.openedBy, <StatusPill key={item.ride} value={item.status} />, item.issue])}
        />
      </section>
      <RuleList
        title="Dispute Workflow"
        rules={[
          'Dispute must be linked to a ride.',
          'Status can be open, under_review, resolved, or rejected.',
          'Admin resolution should be saved with notes.',
        ]}
      />
    </div>
  );
}

function AuditPage() {
  return (
    <div className="bt-page">
      <section className="bt-panel bt-span-3">
        <PanelTitle icon={History} title="Audit Log" subtitle="Every business-critical action stores actor, role, target, old/new value, timestamp, and reason." />
        <DataTable
          columns={['Action', 'Actor', 'Role', 'Target', 'Time', 'Reason']}
          rows={auditLogs.map((log) => [log.action, log.actor, log.role, log.target, log.time, log.reason])}
        />
      </section>
    </div>
  );
}

function SecurityPage() {
  return (
    <div className="bt-page">
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
    </div>
  );
}

function Metric({ title, value, detail, icon: Icon, tone }: { title: string; value: string; detail: string; icon: IconType; tone: string }) {
  return (
    <div className={`bt-metric bt-tone-${tone}`}>
      <div className="bt-metric-icon"><Icon size={18} /></div>
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function PanelTitle({ icon: Icon, title, subtitle }: { icon: IconType; title: string; subtitle: string }) {
  return (
    <div className="bt-panel-title">
      <div className="bt-panel-icon"><Icon size={18} /></div>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function RideTable() {
  return (
    <DataTable
      columns={['Ride', 'Rider / Guest', 'Vehicle', 'Status', 'Payment', 'Owner']}
      rows={rides.map((ride) => [
        <strong key={ride.id}>{ride.id}</strong>,
        <span key={ride.rider}>{ride.rider}<small>{ride.role}</small></span>,
        ride.vehicle,
        <StatusPill key={ride.status} value={ride.status} />,
        <span key={ride.payment}>{ride.fare}<small>{ride.payment}</small></span>,
        ride.owner,
      ])}
    />
  );
}

function DataTable({ columns, rows }: { columns: string[]; rows: Array<Array<React.ReactNode>> }) {
  return (
    <div className="bt-table-wrap">
      <table className="bt-table">
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RuleList({ title, rules }: { title: string; rules: string[] }) {
  return (
    <section className="bt-panel bt-span-3">
      <PanelTitle icon={FileText} title={title} subtitle="Controls this admin module must enforce or monitor." />
      <div className="bt-rule-list">
        {rules.map((rule) => (
          <div className="bt-rule-row" key={rule}>
            <CheckCircle2 size={16} />
            <span>{rule}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RuleCard({ title, detail, status }: { title: string; detail: string; status: string }) {
  return (
    <div className="bt-rule-card">
      <strong>{title}</strong>
      <span>{detail}</span>
      <em>{status}</em>
    </div>
  );
}

function AttentionRow({ title, meta, tone }: { title: string; meta: string; tone: 'warn' | 'red' }) {
  const Icon = tone === 'red' ? Ban : AlertTriangle;
  return (
    <div className={`bt-attention-row bt-attention-${tone}`}>
      <Icon size={16} />
      <div>
        <strong>{title}</strong>
        <span>{meta}</span>
      </div>
    </div>
  );
}

function StatusPill({ value }: { value: string }) {
  const normalized = value.toLowerCase().replace(/\s|_/g, '-');
  return <span className={`bt-status bt-status-${normalized}`}>{value.replace(/_/g, ' ')}</span>;
}
