"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Pill, UserCheck } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function Overview() {
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    restock: 0,
    active: 0,
  })
  const [actualTotal, setActualTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  // Fetch real appointment count from API
  useEffect(() => {
    const fetchAppointmentCount = async () => {
      try {
        const res = await fetch('/api/appointments')
        const data = await res.json()
        // Get the actual count of appointments
        setActualTotal(data.length)
      } catch (error) {
        console.error("Failed to fetch appointment count:", error)
        // Use a default value on error
        setActualTotal(128)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointmentCount()
    // Refresh every minute
    const interval = setInterval(fetchAppointmentCount, 60000)
    return () => clearInterval(interval)
  }, [])

  // Animate the counts up from 0
  useEffect(() => {
    if (loading) return

    // Start animation once data is loaded
    const interval = setInterval(() => {
      setCounts((prev) => ({
        total: Math.min(prev.total + Math.ceil(actualTotal / 20), actualTotal),
        pending: Math.min(prev.pending + 1, 23),
        restock: Math.min(prev.restock + 2, 42),
        active: Math.min(prev.active + 20, 573),
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [loading, actualTotal])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const cards = [
    {
      title: "Total Appointments",
      value: counts.total,
      change: `${actualTotal > 114 ? '+' : ''}${Math.round(((actualTotal - 114) / 114) * 100)}% from last month`,
      icon: Calendar,
      color: "from-blue-600 to-indigo-600",
     
    },
    {
      title: "Pending Appointments",
      value: counts.pending,
      change: "Needs confirmation",
      icon: Clock,
      color: "from-amber-500 to-orange-500",
     
    },
    {
      title: "Restock Requests",
      value: counts.restock,
      change: "+18% from last week",
      icon: Pill,
      color: "from-emerald-500 to-green-500",
      
    },
    {
      title: "Active Patients",
      value: counts.active,
      change: "+6% from last month",
      icon: UserCheck,
      
      
    },
  ]

  return (
    <>
      {cards.map((card, i) => (
        <motion.div key={card.title} custom={i} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.lightColor} dark:${card.darkColor} opacity-50`}
            ></div>
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`rounded-full p-2 bg-gradient-to-r ${card.color} text-white`}>
                <card.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold">
                {loading && card.title === "Total Appointments" ? (
                  <div className="h-8 w-16 animate-pulse bg-gray-200 dark:bg-gray-700 rounded"></div>
                ) : (
                  card.value.toLocaleString()
                )}
              </div>
              <p className="text-xs text-muted-foreground">{card.change}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </>
  )
}