// components/appointments-list.tsx
"use client"
import { useEffect, useState } from 'react'

interface Appointment {
  _id: string
  date: string
  time: string
  doctorName: string
  patientName: string
  phone: string
  createdAt: string
}

export function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments')
      const data = await res.json()
      setAppointments(data)
    } catch (error) {
      console.error("Failed to fetch:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
    // Refresh every 10 seconds
    const interval = setInterval(fetchAppointments, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div>Loading appointments...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Recent Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments scheduled yet</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map(appt => (
            <div key={appt._id} className="p-4 border rounded-lg">
              <h3 className="font-medium">{appt.doctorName}</h3>
              <p>{appt.date} at {appt.time}</p>
              <p className="text-sm text-gray-600">{appt.patientName}</p>
              <p className="text-sm text-gray-500">
                {new Date(appt.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}