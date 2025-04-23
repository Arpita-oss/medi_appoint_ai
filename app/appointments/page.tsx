import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { AppointmentsTable } from "@/components/appointments-table"
import { AppointmentsFilter } from "@/components/appointments-filter"

export default function AppointmentsPage() {
  return (
    <DashboardShell>
      <div className="w-full space-y-4">
        <DashboardHeader heading="Appointments" text="Manage patient appointment requests" />
        <AppointmentsFilter />
        <AppointmentsTable />
      </div>
    </DashboardShell>
  )
}