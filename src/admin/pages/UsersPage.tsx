import { Users } from 'lucide-react';
import { DataTable, PageGrid, Panel, RuleList, StatusPill } from '../components';
import { users } from '../data';

export function UsersPage() {
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
