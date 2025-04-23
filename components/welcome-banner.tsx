"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Calendar } from "lucide-react"
import { motion } from "framer-motion"

export function WelcomeBanner() {
  const [currentTime, setCurrentTime] = useState("")
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))

      const hour = now.getHours()
      if (hour < 12) setGreeting("Good morning")
      else if (hour < 18) setGreeting("Good afternoon")
      else setGreeting("Good evening")
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg"
    >
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{greeting}, Dr. Sarah</h1>
          <p className="mt-2 text-blue-100">
            <Calendar className="inline-block mr-2 h-4 w-4" />
            {currentDate} • <span className="font-medium">{currentTime}</span>
          </p>
          <p className="mt-1 text-blue-100">
            You have <span className="font-bold">23</span> pending appointments and{" "}
            <span className="font-bold">12</span> restock requests today
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button className="bg-white text-blue-600 hover:bg-blue-50">View Schedule</Button>
        </div>
      </div>
    </motion.div>
  )
}