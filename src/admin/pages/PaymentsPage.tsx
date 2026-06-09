import { CreditCard } from 'lucide-react';
import { DataTable, PageGrid, Panel, RuleList, StatusPill } from '../components';
import { payments } from '../data';

export function PaymentsPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={CreditCard} title="Payments, Invoices & Payouts" subtitle="Ride-linked payments, company billing, refunds, and driver payout state.">
        <DataTable
          columns={['Ride', 'Payer', 'Status', 'Method', 'Amount']}
          rows={payments.map((payment) => [
            payment.ride,
            payment.payer,
            <StatusPill key={payment.ride} value={payment.status} />,
            payment.method,
            payment.amount,
          ])}
        />
      </Panel>
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
    </PageGrid>
  );
}
