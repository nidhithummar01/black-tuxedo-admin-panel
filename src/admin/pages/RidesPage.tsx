import { Car } from 'lucide-react';
import { PageGrid, Panel, RideTable, RuleList } from '../components';

export function RidesPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={Car} title="Ride Booking & Matching" subtitle="Track ride lifecycle from pending to completed, cancelled, expired, or no_driver_found.">
        <RideTable />
      </Panel>
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
    </PageGrid>
  );
}
