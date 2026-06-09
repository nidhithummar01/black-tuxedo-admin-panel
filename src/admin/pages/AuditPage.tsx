import { History } from 'lucide-react';
import { DataTable, PageGrid, Panel } from '../components';
import { auditLogs } from '../data';

export function AuditPage() {
  return (
    <PageGrid>
      <Panel span={3} icon={History} title="Audit Log" subtitle="Every business-critical action stores actor, role, target, old/new value, timestamp, and reason.">
        <DataTable
          columns={['Action', 'Actor', 'Role', 'Target', 'Time', 'Reason']}
          rows={auditLogs.map((log) => [log.action, log.actor, log.role, log.target, log.time, log.reason])}
        />
      </Panel>
    </PageGrid>
  );
}
