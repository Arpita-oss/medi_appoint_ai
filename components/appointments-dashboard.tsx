// components/appointments-dashboard.tsx
'use client'
import { useEffect, useState } from 'react'

interface Appointment {
  _id: string
  date: string
  time: string
  doctor_name: string
  patient_name: string
  status: string
  createdAt: string
}

export function AppointmentsDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments')
      const data = await res.json()
      
      // Handle both real data and demo data
      const processedData = Array.isArray(data) ? data : 
        (data.demoData || [
          {
            _id: "fallback",
            date: "2023-07-15",
            time: "2:00 PM",
            doctor_name: "Dr. Fallback",
            status: "demo"
          }
        ])
      
      setAppointments(processedData)
    } catch (err) {
      setError("Failed to load appointments")
      console.error(err)
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

  if (loading) return <div className="p-4">Loading appointments...</div>

  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Recent Appointments</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map(appt => (
          <div 
            key={appt._id} 
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{appt.doctor_name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                appt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                appt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {appt.status}
              </span>
            </div>
            
            <p className="mt-2">
              <span className="font-medium">{appt.date}</span> at {appt.time}
            </p>
            
            {appt.patient_name && (
              <p className="text-sm text-gray-600 mt-1">
                Patient: {appt.patient_name.replace(/^"|"$/g, '')}
              </p>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              Created: {new Date(appt.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}