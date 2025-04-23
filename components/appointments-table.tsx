"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppointmentsTable() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Fetch appointments from API
  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments')
      const data = await res.json()
      
      // Transform API data to match the table format
      const formattedData = data.map(appt => ({
        id: appt._id || `AP-${Math.floor(Math.random() * 10000)}`,
        patient: appt.patient_name || "Walk-in Patient",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: getInitials(appt.patient_name || "Walk-in Patient"),
        phone: appt.phone || "+1 (555) 123-4567",
        date: appt.date || "2023-04-22",
        time: appt.time || "10:30 AM",
        reason: appt.reason || "Consultation",
        status: appt.status || "pending", 
        doctor: appt.doctor_name || "Dr. General"
      }))
      
      // Add mock data for empty slots if needed
      if (formattedData.length === 0) {
        // Use the mock data
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
      phone: "+1 (555) 123-4567",
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
      phone: "+1 (555) 234-5678",
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
      phone: "+1 (555) 345-6789",
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
      phone: "+1 (555) 456-7890",
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
      phone: "+1 (555) 567-8901",
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
      phone: "+1 (555) 678-9012",
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
      phone: "+1 (555) 789-0123",
      date: "2023-04-24",
      time: "4:45 PM",
      reason: "Skin rash",
      status: "confirmed",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  if (loading) return <div className="p-8 text-center">Loading appointments...</div>

  return (
    <div className="rounded-xl border-none shadow-md overflow-hidden bg-white dark:bg-slate-800">
      <motion.div variants={container} initial="hidden" animate="show">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900">
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <motion.tr
                key={appointment.id}
                variants={item}
                className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.patient} />
                      <AvatarFallback>{appointment.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{appointment.patient}</div>
                      <div className="text-xs text-muted-foreground">{appointment.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{appointment.phone}</TableCell>
                <TableCell>
                  <div className="font-medium">{appointment.date}</div>
                  <div className="text-xs text-muted-foreground">{appointment.time}</div>
                </TableCell>
                <TableCell>{appointment.doctor || "Unassigned"}</TableCell>
                <TableCell>
                  {appointment.status === "pending" && (
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                    >
                      Pending
                    </Badge>
                  )}
                  {appointment.status === "confirmed" && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      Confirmed
                    </Badge>
                  )}
                  {appointment.status === "cancelled" && (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                    >
                      Cancelled
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    {appointment.status === "pending" && (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Confirm</span>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Cancel</span>
                        </Button>
                      </>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit appointment</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Cancel appointment</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  )
}