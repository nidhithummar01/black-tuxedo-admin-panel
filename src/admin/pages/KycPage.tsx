import { ClipboardCheck } from 'lucide-react';
import { DataTable, MiniButton, PageGrid, Panel, RuleList, StatusPill } from '../components';
import { kycQueue } from '../data';

export function KycPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={ClipboardCheck} title="Driver KYC Review" subtitle="Approve, reject, and request re-upload with rejection reason.">
        <DataTable
          columns={['Driver', 'Document', 'Status', 'Age', 'Admin action']}
          rows={kycQueue.map((item) => [
            item.driver,
            item.document,
            <StatusPill key={item.driver} value={item.status} />,
            item.age,
            <MiniButton key={item.action}>{item.action}</MiniButton>,
          ])}
        />
      </Panel>
      <RuleList
        title="KYC Requirements"
        rules={[
          'New driver starts with kyc_pending status.',
          'Driver can go online only if KYC is approved.',
          'Rejected KYC requires admin rejection reason.',
          'Driver must re-upload correct documents after rejection.',
        ]}
      />
    </PageGrid>
  );
}
