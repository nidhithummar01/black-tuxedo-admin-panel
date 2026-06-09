import { useMemo, useState } from 'react';
import {
  Bell,
  CalendarClock,
  Car,
  ChevronRight,
  Crown,
  DollarSign,
  Hotel,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
} from 'lucide-react';

type Page = 'dashboard' | 'rides' | 'chauffeurs' | 'concierge' | 'membership' | 'settings';

const navItems: Array<{ id: Page; label: string; icon: typeof LayoutDashboard }> = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'rides', label: 'Rides', icon: Car },
  { id: 'chauffeurs', label: 'Chauffeurs', icon: UserCheck },
  { id: 'concierge', label: 'Concierge', icon: Hotel },
  { id: 'membership', label: 'Membership', icon: Crown },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const rides = [
  { id: 'TX-1048', guest: 'Priya Shah', pickup: 'The Plaza Hotel', type: 'SUV · 7 passengers', status: 'Awaiting guest', amount: '$124', time: 'Now' },
  { id: 'TX-1047', guest: 'Amelia Stone', pickup: 'Soho House', type: 'Sprinter · Executive · 8 passengers', status: 'Assigned', amount: '$340', time: '06:30 PM' },
  { id: 'TX-1046', guest: 'Marcus Lee', pickup: 'One Hotel South Beach', type: 'Sedan · 4 passengers', status: 'In progress', amount: '$88', time: '05:45 PM' },
  { id: 'TX-1045', guest: 'Priya Shah', pickup: 'Four Seasons', type: 'Hourly · 5h · Stretch / Limo', status: 'Scheduled', amount: '$690', time: 'Tomorrow' },
];

const chauffeurs = [
  { name: 'Michael Thompson', vehicle: 'Mercedes S-Class', status: 'Online', amenities: ['Wi-Fi', 'Water', 'Fast charging'], rating: '4.9' },
  { name: 'Sarah Martinez', vehicle: 'Cadillac Escalade', status: 'Online', amenities: ['Wi-Fi', 'Child seat', 'Water'], rating: '4.8' },
  { name: 'James Anderson', vehicle: 'Executive Sprinter', status: 'Offline', amenities: ['Security', 'Rear media', 'Beverage cooler'], rating: '5.0' },
  { name: 'Emily Roberts', vehicle: 'Maybach S680', status: 'On ride', amenities: ['Quiet mode', 'Wi-Fi', 'Grooming kit'], rating: '4.9' },
];

const conciergeRequests = [
  { hotel: 'The Plaza Hotel', requests: 18, pending: 4, conversion: '82%' },
  { hotel: 'One Hotel South Beach', requests: 12, pending: 2, conversion: '76%' },
  { hotel: 'Four Seasons', requests: 9, pending: 1, conversion: '88%' },
];

function TuxedoLogo({ className }: { className: string }) {
  return <img src={`${import.meta.env.BASE_URL}tuxedo-logo-white.png`} alt="Tuxedo" className={className} draggable={false} />;
}

function App() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitle = useMemo(
    () => navItems.find((item) => item.id === activePage)?.label ?? 'Dashboard',
    [activePage],
  );

  if (!isAuthed) {
    return <LoginScreen onLogin={() => setIsAuthed(true)} />;
  }

  return (
    <div className="admin-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-row">
          <div>
            <TuxedoLogo className="brand-logo" />
            <div className="brand-sub">Admin Control Panel</div>
          </div>
          <button className="icon-btn mobile-only" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="nav-list">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${activePage === id ? 'nav-active' : ''}`}
              onClick={() => {
                setActivePage(id);
                setSidebarOpen(false);
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <ShieldCheck size={18} />
          <div>
            <strong>System healthy</strong>
            <span>Passenger, Driver, Concierge</span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="icon-btn mobile-only" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div>
            <p className="eyebrow">Black Tuxedo Operations</p>
            <h1>{pageTitle}</h1>
          </div>
          <div className="topbar-actions">
            <div className="search-pill">
              <Search size={16} />
              <span>Search rides, guests, chauffeurs</span>
            </div>
            <button className="icon-btn" aria-label="Notifications"><Bell size={18} /></button>
            <button className="logout-btn" onClick={() => setIsAuthed(false)}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'rides' && <Rides />}
        {activePage === 'chauffeurs' && <Chauffeurs />}
        {activePage === 'concierge' && <Concierge />}
        {activePage === 'membership' && <Membership />}
        {activePage === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="login-page">
      <section className="login-card">
        <div className="ornament">
          <span />
          <i />
          <i className="bright" />
          <i />
          <span />
        </div>
        <TuxedoLogo className="login-logo-img" />
        <p className="login-tag">Premium Chauffeur Service</p>
        <div className="login-copy">
          <h1>Admin Panel</h1>
          <p>Manage rides, chauffeurs, concierge requests, memberships, and app settings from one place.</p>
        </div>
        <label>
          Email
          <input defaultValue="admin@tuxedo.com" />
        </label>
        <label>
          Password
          <input defaultValue="password" type="password" />
        </label>
        <button className="gold-btn" onClick={onLogin}>
          Sign in to admin
          <ChevronRight size={18} />
        </button>
      </section>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="page-grid">
      <div className="metrics-grid">
        <Metric title="Today rides" value="47" delta="+12%" icon={Car} />
        <Metric title="Revenue" value="$8,420" delta="+18%" icon={DollarSign} />
        <Metric title="Online chauffeurs" value="28" delta="6 pending" icon={UserCheck} />
        <Metric title="Gold members" value="316" delta="+9 this week" icon={Crown} />
      </div>

      <section className="panel span-2">
        <PanelTitle icon={CalendarClock} title="Operations overview" subtitle="Live booking and dispatch summary" />
        <div className="ops-grid">
          <OpsItem label="Awaiting guest" value="8" detail="Web portal links sent" />
          <OpsItem label="Needs chauffeur" value="5" detail="Ready for dispatch" />
          <OpsItem label="In progress" value="14" detail="Currently active rides" />
          <OpsItem label="Scheduled today" value="20" detail="Later and hourly bookings" />
        </div>
        <div className="timeline-card">
          <div>
            <strong>Next pickup</strong>
            <span>Sprinter · Executive · Soho House</span>
          </div>
          <em>06:30 PM</em>
        </div>
      </section>

      <section className="panel">
        <PanelTitle icon={ShieldCheck} title="Fleet availability" subtitle="Vehicle readiness by category" />
        <div className="progress-list">
          <ProgressRow label="Sedan" value="12 online" percent={82} />
          <ProgressRow label="Luxury SUV" value="9 online" percent={64} />
          <ProgressRow label="Sprinter" value="5 online" percent={42} />
          <ProgressRow label="Stretch / Limo" value="2 online" percent={28} />
        </div>
      </section>

      <section className="panel span-3">
        <PanelTitle icon={CalendarClock} title="Recent rides" subtitle="Latest concierge and passenger requests" />
        <RideTable />
      </section>
    </div>
  );
}

function Rides() {
  return (
    <section className="panel">
      <PanelTitle icon={Car} title="Ride management" subtitle="Track, assign, cancel, and review all ride requests" />
      <RideTable />
    </section>
  );
}

function Chauffeurs() {
  return (
    <section className="panel">
      <PanelTitle icon={UserCheck} title="Chauffeur management" subtitle="Availability, vehicle capacity, and amenities" />
      <div className="cards-list">
        {chauffeurs.map((driver) => (
          <div className="driver-card" key={driver.name}>
            <div className="avatar">{driver.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div>
            <div className="grow">
              <strong>{driver.name}</strong>
              <span>{driver.vehicle} · Rating {driver.rating}</span>
              <div className="chips">{driver.amenities.map((item) => <em key={item}>{item}</em>)}</div>
            </div>
            <span className={`status ${driver.status.toLowerCase().replace(' ', '-')}`}>{driver.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Concierge() {
  return (
    <section className="panel">
      <PanelTitle icon={Hotel} title="Concierge portal" subtitle="Hotel request activity and guest link status" />
      <div className="hotel-grid">
        {conciergeRequests.map((row) => (
          <div className="hotel-card" key={row.hotel}>
            <Hotel size={22} />
            <h3>{row.hotel}</h3>
            <p>{row.requests} requests today</p>
            <div>
              <span>{row.pending} pending</span>
              <strong>{row.conversion} conversion</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Membership() {
  return (
    <section className="panel">
      <PanelTitle icon={Crown} title="Gold membership" subtitle="Premium filters, ride credits, and subscription status" />
      <div className="membership-grid">
        <Metric title="Active Gold" value="316" delta="$31,600 total" icon={Crown} />
        <Metric title="Premium filters" value="1,248" delta="Most used: Wi-Fi" icon={Sparkles} />
        <Metric title="Ride credit issued" value="$9,800" delta="42% redeemed" icon={DollarSign} />
      </div>
    </section>
  );
}

function SettingsPage() {
  return (
    <section className="panel">
      <PanelTitle icon={Settings} title="Admin settings" subtitle="Roles, integration status, and platform configuration" />
      <div className="settings-list">
        <SettingsRow title="SMS provider" value="Twilio setup pending" />
        <SettingsRow title="Map provider" value="Static map now, Google API later" />
        <SettingsRow title="Admin roles" value="Owner, Manager, Support" />
        <SettingsRow title="Apps connected" value="Passenger, Driver, Concierge" />
      </div>
    </section>
  );
}

function Metric({ title, value, delta, icon: Icon }: { title: string; value: string; delta: string; icon: typeof Car }) {
  return (
    <div className="metric-card">
      <div className="metric-icon"><Icon size={19} /></div>
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{delta}</small>
    </div>
  );
}

function PanelTitle({ icon: Icon, title, subtitle }: { icon: typeof Car; title: string; subtitle: string }) {
  return (
    <div className="panel-title">
      <div className="panel-icon"><Icon size={18} /></div>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function OpsItem({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="ops-item">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function ProgressRow({ label, value, percent }: { label: string; value: string; percent: number }) {
  return (
    <div className="progress-row">
      <div>
        <strong>{label}</strong>
        <span>{value}</span>
      </div>
      <div className="progress-track">
        <i style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function RideTable() {
  return (
    <div className="ride-table">
      <div className="table-head">
        <span>Ride</span>
        <span>Guest</span>
        <span>Vehicle</span>
        <span>Status</span>
        <span>Amount</span>
      </div>
      {rides.map((ride) => (
        <div className="table-row" key={ride.id}>
          <span><strong>{ride.id}</strong><small>{ride.time}</small></span>
          <span><strong>{ride.guest}</strong><small>{ride.pickup}</small></span>
          <span>{ride.type}</span>
          <span><i className="status-dot" />{ride.status}</span>
          <span>{ride.amount}</span>
        </div>
      ))}
    </div>
  );
}

function SettingsRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="settings-row">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
