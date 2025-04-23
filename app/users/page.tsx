import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { UsersTable } from "@/components/users-table"

export default function UsersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="User Management" text="Manage system users and permissions" />
      <div className="space-y-4">
        <UsersTable />
      </div>
    </DashboardShell>
  )
}
