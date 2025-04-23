import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { RestockRequestsTable } from "@/components/restock-requests-table"
import { RestockRequestsFilter } from "@/components/restock-requests-filter"

export default function RestockRequestsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Medicine Restock Requests" text="Manage patient medicine restock requests" />
      <div className="space-y-4">
        <RestockRequestsFilter />
        <RestockRequestsTable />
      </div>
    </DashboardShell>
  )
}
