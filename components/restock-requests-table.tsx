"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Truck, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RestockRequestsTable() {
  const requests = [
    {
      id: "RR-5678",
      patient: "Alice Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AT",
      phone: "+1 (555) 123-4567",
      medication: "Lisinopril 10mg",
      quantity: "30 tablets",
      date: "2023-04-21",
      status: "pending",
    },
    {
      id: "RR-5679",
      patient: "David Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DM",
      phone: "+1 (555) 234-5678",
      medication: "Metformin 500mg",
      quantity: "60 tablets",
      date: "2023-04-21",
      status: "processing",
    },
    {
      id: "RR-5680",
      patient: "Jennifer White",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JW",
      phone: "+1 (555) 345-6789",
      medication: "Atorvastatin 20mg",
      quantity: "30 tablets",
      date: "2023-04-22",
      status: "completed",
    },
    {
      id: "RR-5681",
      patient: "Thomas Clark",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TC",
      phone: "+1 (555) 456-7890",
      medication: "Levothyroxine 50mcg",
      quantity: "90 tablets",
      date: "2023-04-22",
      status: "pending",
    },
    {
      id: "RR-5682",
      patient: "Patricia Moore",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PM",
      phone: "+1 (555) 567-8901",
      medication: "Amlodipine 5mg",
      quantity: "30 tablets",
      date: "2023-04-23",
      status: "processing",
    },
    {
      id: "RR-5683",
      patient: "James Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JJ",
      phone: "+1 (555) 678-9012",
      medication: "Omeprazole 20mg",
      quantity: "30 capsules",
      date: "2023-04-23",
      status: "pending",
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
    <div className="rounded-xl border-none shadow-md overflow-hidden bg-white dark:bg-slate-800">
      <motion.div variants={container} initial="hidden" animate="show">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900">
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <motion.tr
                key={request.id}
                variants={item}
                className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.patient} />
                      <AvatarFallback>{request.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{request.patient}</div>
                      <div className="text-xs text-muted-foreground">{request.phone}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-emerald-600 dark:text-emerald-400">
                  {request.medication}
                </TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusStyles(request.status)} capitalize`}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    {request.status === "pending" && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <Truck className="h-4 w-4" />
                        <span className="sr-only">Process</span>
                      </Button>
                    )}
                    {request.status === "processing" && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span className="sr-only">Complete</span>
                      </Button>
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
                        <DropdownMenuItem>Contact patient</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Cancel request</DropdownMenuItem>
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
