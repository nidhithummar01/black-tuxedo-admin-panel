import { Gavel } from 'lucide-react';
import { DataTable, PageGrid, Panel, RuleList, StatusPill } from '../components';
import { disputes } from '../data';

export function DisputesPage() {
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
