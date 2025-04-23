"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, Search, Filter } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecentAppointmentsProps {
  className?: string
  showAll?: boolean
}

export function RecentAppointments({ className, showAll = false }: RecentAppointmentsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch appointments from API
  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments')
      const data = await res.json()
      
      // Transform API data to match the component format
      const formattedData = data.map(appt => ({
        id: appt._id || `AP-${Math.floor(Math.random() * 10000)}`,
        patient: appt.patient_name || "Walk-in Patient",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: getInitials(appt.patient_name || "Walk-in Patient"),
        date: appt.date || "2023-04-22",
        time: appt.time || "10:30 AM",
        reason: appt.reason || "Consultation",
        status: appt.status || "pending",
        doctor: appt.doctor_name || "Unassigned"
      }))
      
      // Add mock data for empty slots if needed
      if (formattedData.length === 0) {
        setAppointments(getMockAppointments())
      } else {
        setAppointments(formattedData)
      }
    } catch (error) {
      console.error("Failed to fetch:", error)
      setAppointments(getMockAppointments())
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchAppointments()
    // Refresh every 30 seconds
    const interval = setInterval(fetchAppointments, 30000)
    return () => clearInterval(interval)
  }, [])
  
  // Helper function to get initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  const getMockAppointments = () => [
    {
      id: "AP-1234",
      patient: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      date: "2023-04-22",
      time: "10:30 AM",
      reason: "Annual checkup",
      status: "pending",
    },
    {
      id: "AP-1235",
      patient: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EJ",
      date: "2023-04-22",
      time: "11:45 AM",
      reason: "Flu symptoms",
      status: "confirmed",
    },
    {
      id: "AP-1236",
      patient: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
      date: "2023-04-22",
      time: "2:15 PM",
      reason: "Back pain",
      status: "pending",
    },
    {
      id: "AP-1237",
      patient: "Sarah Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SD",
      date: "2023-04-23",
      time: "9:00 AM",
      reason: "Vaccination",
      status: "confirmed",
    },
    {
      id: "AP-1238",
      patient: "Robert Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RW",
      date: "2023-04-23",
      time: "3:30 PM",
      reason: "Blood test",
      status: "pending",
    },
    {
      id: "AP-1239",
      patient: "Jennifer Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JT",
      date: "2023-04-24",
      time: "1:00 PM",
      reason: "Headache",
      status: "cancelled",
    },
    {
      id: "AP-1240",
      patient: "William Anderson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "WA",
      date: "2023-04-24",
      time: "4:45 PM",
      reason: "Skin rash",
      status: "confirmed",
    },
  ]

  const filteredAppointments = appointments
    .filter((app) => app.patient.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, showAll ? undefined : 5)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (loading) {
    return (
      <Card className={`${className} border-none shadow-md`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Recent Appointments
          </CardTitle>
          <CardDescription>Loading appointments...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-pulse h-6 w-6 rounded-full bg-blue-400"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`${className} border-none shadow-md`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Recent Appointments
            </CardTitle>
            <CardDescription>
              You have {appointments.filter((a) => a.status === "pending").length} pending appointments.
            </CardDescription>
          </div>
          {showAll && (
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </Button>
          )}
        </div>
        {showAll && (
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search appointments..."
              className="pl-8 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                variants={item}
                className="flex items-center justify-between space-x-4 rounded-lg border p-3"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.patient} />
                    <AvatarFallback>{appointment.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium">{appointment.patient}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{appointment.date}</span>
                      <span className="mx-1">•</span>
                      <span>{appointment.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {appointment.status === "pending" ? (
                    <>
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                      >
                        Pending
                      </Badge>
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  ) : appointment.status === "confirmed" ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      Confirmed
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                    >
                      Cancelled
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No appointments found
            </div>
          )}
          {!showAll && (
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                asChild
                className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 border-blue-100 dark:border-blue-800"
              >
                <Link href="/appointments">View all appointments</Link>
              </Button>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  )
}