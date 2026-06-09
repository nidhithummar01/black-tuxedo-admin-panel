import { Building2 } from 'lucide-react';
import { DataTable, PageGrid, Panel, RuleList } from '../components';

export function ConciergePage() {
  return (
    <PageGrid>
      <Panel
        span={3}
        icon={Building2}
        title="Concierge Account Control"
        subtitle="Hotel/company guest rides, guest links, tracking, cancellation, and billing responsibility."
      >
        <DataTable
          columns={['Account', 'Requests today', 'Pending', 'Billing mode', 'Access scope']}
          rows={[
            ['The Plaza Hotel', '18', '4', 'Monthly invoice', 'Own hotel rides only'],
            ['Soho House', '12', '2', 'Guest pays', 'Own company rides only'],
            ['Four Seasons', '9', '1', 'Admin/manual billing', 'Own hotel rides only'],
          ]}
        />
      </Panel>
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
    </PageGrid>
  );
}
