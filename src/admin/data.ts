import {
  Activity,
  Bell,
  Building2,
  Car,
  ClipboardCheck,
  CreditCard,
  DollarSign,
  Gavel,
  History,
  LayoutDashboard,
  LockKeyhole,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import type { IconType, Page } from './types';

export const navItems: Array<{ id: Page; label: string; icon: IconType }> = [
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

export const metrics = [
  { title: 'Active rides', value: '31', detail: 'pending, accepted, arrived, in progress', icon: Activity, tone: 'gold' as const },
  { title: 'KYC pending', value: '12', detail: '4 need admin review today', icon: ClipboardCheck, tone: 'warn' as const },
  { title: 'Revenue today', value: '$8,420', detail: 'fare, company billing, invoices', icon: DollarSign, tone: 'green' as const },
  { title: 'Open disputes', value: '7', detail: '3 under review', icon: Gavel, tone: 'red' as const },
];

export const rides = [
  { id: 'TX-1048', rider: 'Ivan Garcia', role: 'Passenger', vehicle: 'Luxury SUV · 7 passengers', status: 'pending', fare: '$124', payment: 'pending', owner: 'Passenger app' },
  { id: 'TX-1047', rider: 'Amelia Stone', role: 'Concierge guest', vehicle: 'Executive Sprinter · 8 passengers', status: 'accepted', fare: '$340', payment: 'company invoice', owner: 'Soho House' },
  { id: 'TX-1046', rider: 'Marcus Lee', role: 'Passenger', vehicle: 'Sedan · 4 passengers', status: 'in_progress', fare: '$88', payment: 'paid', owner: 'Passenger app' },
  { id: 'TX-1045', rider: 'Priya Shah', role: 'Concierge guest', vehicle: 'Hourly · Stretch / Limo', status: 'scheduled', fare: '$690 est.', payment: 'manual billing', owner: 'Four Seasons' },
];

export const users = [
  { name: 'Ivan Garcia', role: 'Passenger', status: 'active', scope: 'Passenger app', lastAction: 'Booked SUV ride' },
  { name: 'Michael Thompson', role: 'Driver', status: 'online', scope: 'KYC approved', lastAction: 'Accepted TX-1047' },
  { name: 'The Plaza Desk', role: 'Concierge', status: 'active', scope: 'The Plaza Hotel only', lastAction: 'Sent guest link' },
  { name: 'Admin Owner', role: 'Admin', status: 'active', scope: 'Full access', lastAction: 'Adjusted pricing' },
];

export const kycQueue = [
  { driver: 'Sarah Martinez', document: 'Insurance certificate', status: 'pending', age: '2h', action: 'Review' },
  { driver: 'James Anderson', document: 'Vehicle registration', status: 'rejected', age: '1d', action: 'Reason required' },
  { driver: 'Emily Roberts', document: 'Driver license', status: 'approved', age: '3d', action: 'Completed' },
];

export const pricingRules = [
  { name: 'Base fare', value: '$45', rule: 'Required before booking confirmation' },
  { name: 'Distance charge', value: '$4.25 / mi', rule: 'Final fare calculated server-side' },
  { name: 'Waiting charge', value: '$1.20 / min', rule: 'Applies after grace period' },
  { name: 'Platform commission', value: '18%', rule: 'Deducted after ride completion' },
  { name: 'Cancellation fee', value: 'Configurable', rule: 'Applies after driver accepts/arrives' },
];

export const payments = [
  { ride: 'TX-1048', payer: 'Passenger', status: 'pending', method: 'Card hold', amount: '$124' },
  { ride: 'TX-1047', payer: 'Soho House', status: 'invoice', method: 'Monthly company billing', amount: '$340' },
  { ride: 'TX-1046', payer: 'Passenger', status: 'paid', method: 'Apple Pay', amount: '$88' },
  { ride: 'TX-1045', payer: 'Four Seasons', status: 'manual', method: 'Admin billing', amount: '$690 est.' },
];

export const notifications = [
  { event: 'Driver assigned', channels: 'Push, SMS, in-app', rule: 'Real-time for passenger and concierge' },
  { event: 'Guest tracking link', channels: 'SMS, WhatsApp', rule: 'Guest can track without app install' },
  { event: 'KYC rejected', channels: 'Push, email', rule: 'Admin rejection reason required' },
  { event: 'Payment failed', channels: 'Push, email', rule: 'Notify passenger and admin' },
];

export const disputes = [
  { ride: 'TX-1038', openedBy: 'Passenger', status: 'under_review', issue: 'Waiting charge dispute' },
  { ride: 'TX-1032', openedBy: 'Driver', status: 'open', issue: 'No-show at pickup' },
  { ride: 'TX-1029', openedBy: 'Concierge', status: 'resolved', issue: 'Guest invoice correction' },
];

export const auditLogs = [
  { action: 'driver_kyc_approved', actor: 'Admin Owner', role: 'Admin', target: 'Michael Thompson', time: '10:42 AM', reason: 'Documents verified' },
  { action: 'ride_status_changed', actor: 'Michael Thompson', role: 'Driver', target: 'TX-1047', time: '10:31 AM', reason: 'accepted -> on_the_way' },
  { action: 'fare_updated', actor: 'Admin Owner', role: 'Admin', target: 'SUV distance charge', time: 'Yesterday', reason: 'Market pricing update' },
  { action: 'user_blocked', actor: 'Support Admin', role: 'Admin', target: 'Test Passenger', time: 'Yesterday', reason: 'Fraud review' },
];

export const securityRules = [
  'Role-based access for Passenger, Driver, Concierge, and Admin.',
  'Server is final authority for ride assignment and fare calculation.',
  'Only one driver can be assigned to one ride through backend lock/transaction.',
  'Concierge can access only their hotel/company guest rides.',
  'Admin corrections, fare edits, KYC decisions, cancellations, and blocks require audit logs.',
  'Sensitive payment data must not be stored in mobile apps.',
];
