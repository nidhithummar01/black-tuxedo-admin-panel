import { MessageSquare } from 'lucide-react';
import { DataTable, PageGrid, Panel, RuleList } from '../components';
import { notifications } from '../data';

export function NotificationsPage() {
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
