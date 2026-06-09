import type { ComponentType } from 'react';

export type IconType = ComponentType<{ size?: number; color?: string; className?: string }>;

export type Page =
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
