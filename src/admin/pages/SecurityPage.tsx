import { PageGrid, RuleList } from '../components';
import { securityRules } from '../data';

export function SecurityPage() {
  return (
    <PageGrid>
      <RuleList title="Security & Validation" rules={securityRules} />
      <RuleList
        title="Final Platform Authority"
        rules={[
          'Server must be the final authority for ride assignment.',
          'Mobile app should not decide final driver assignment.',
          'Mobile app should not calculate final fare alone.',
          'Every business-critical action should have validation, permission check, and logging.',
        ]}
      />
    </PageGrid>
  );
}
