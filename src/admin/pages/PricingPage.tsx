import { SlidersHorizontal } from 'lucide-react';
import { DataTable, PageGrid, Panel, RuleList } from '../components';
import { pricingRules } from '../data';

export function PricingPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={SlidersHorizontal} title="Pricing & Commission" subtitle="Admin-controlled fare components and platform commission.">
        <DataTable columns={['Component', 'Current value', 'Control']} rows={pricingRules.map((rule) => [rule.name, rule.value, rule.rule])} />
      </Panel>
      <RuleList
        title="Fare Calculation"
        rules={[
          'final_fare = base_fare + distance + time + waiting + surge + extra charges + tax - discount.',
          'Estimated fare is shown before booking.',
          'Final fare is calculated after ride completion.',
          'Passenger, driver, and concierge cannot manually edit fare.',
          'Any admin fare adjustment must be audit logged.',
        ]}
      />
    </PageGrid>
  );
}
