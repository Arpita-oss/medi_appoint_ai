"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface RecentRestockRequestsProps {
  className?: string
  showAll?: boolean
}

export function RecentRestockRequests({ className, showAll = false }: RecentRestockRequestsProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const requests = [
    {
      id: "RR-5678",
      patient: "Alice Thompson",
      medication: "Lisinopril 10mg",
      quantity: "30 tablets",
      date: "2023-04-21",
      status: "pending",
    },
    {
      id: "RR-5679",
      patient: "David Miller",
      medication: "Metformin 500mg",
      quantity: "60 tablets",
      date: "2023-04-21",
      status: "processing",
    },
    {
      id: "RR-5680",
      patient: "Jennifer White",
      medication: "Atorvastatin 20mg",
      quantity: "30 tablets",
      date: "2023-04-22",
      status: "completed",
    },
    {
      id: "RR-5681",
      patient: "Thomas Clark",
      medication: "Levothyroxine 50mcg",
      quantity: "90 tablets",
      date: "2023-04-22",
      status: "pending",
    },
    {
      id: "RR-5682",
      patient: "Patricia Moore",
      medication: "Amlodipine 5mg",
      quantity: "30 tablets",
      date: "2023-04-23",
      status: "processing",
    },
    {
      id: "RR-5683",
      patient: "James Johnson",
      medication: "Omeprazole 20mg",
      quantity: "30 capsules",
      date: "2023-04-23",
      status: "pending",
    },
  ]

  const filteredRequests = requests
    .filter(
      (req) =>
        req.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.medication.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, showAll ? undefined : 4)

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

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
      case "completed":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      default:
        return ""
    }
  }

  return (
    <Card className={`${className} border-none shadow-md`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
              Medicine Restock Requests
            </CardTitle>
            <CardDescription>
              You have {requests.filter((r) => r.status === "pending").length} pending restock requests.
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
              placeholder="Search requests..."
              className="pl-8 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
          {filteredRequests.map((request) => (
            <motion.div
              key={request.id}
              variants={item}
              className="flex items-center justify-between space-x-4 rounded-lg border p-3"
            >
              <div className="flex flex-col space-y-1">
                <p className="font-medium">{request.patient}</p>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {request.medication}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{request.quantity}</span>
                  <span className="mx-1">•</span>
                  <span>{request.date}</span>
                </div>
              </div>
              <div>
                <Badge variant="outline" className={`${getStatusStyles(request.status)} capitalize`}>
                  {request.status}
                </Badge>
              </div>
            </motion.div>
          ))}
          {!showAll && (
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                asChild
                className="w-full bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 dark:hover:from-emerald-900/30 dark:hover:to-green-900/30 border-emerald-100 dark:border-emerald-800"
              >
                <Link href="/restock-requests">View all requests</Link>
              </Button>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  )
}