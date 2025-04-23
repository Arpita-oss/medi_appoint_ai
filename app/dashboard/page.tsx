// app/dashboard/page.tsx
import { AppointmentsDashboard } from '@/components/appointments-dashboard'

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Medical Appointments Dashboard</h1>
      <AppointmentsDashboard />
    </div>
  )
}