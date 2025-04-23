"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, MoreHorizontal } from "lucide-react"
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

export function UsersTable() {
  const users = [
    {
      id: "USR-001",
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
      email: "sarah.johnson@medicare.com",
      role: "Doctor",
      department: "Cardiology",
      status: "active",
    },
    {
      id: "USR-002",
      name: "Dr. Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
      email: "michael.chen@medicare.com",
      role: "Doctor",
      department: "Neurology",
      status: "active",
    },
    {
      id: "USR-003",
      name: "Nurse Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EW",
      email: "emma.wilson@medicare.com",
      role: "Nurse",
      department: "Pediatrics",
      status: "active",
    },
    {
      id: "USR-004",
      name: "Admin John Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      email: "john.davis@medicare.com",
      role: "Admin",
      department: "Management",
      status: "active",
    },
    {
      id: "USR-005",
      name: "Dr. Robert Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RB",
      email: "robert.brown@medicare.com",
      role: "Doctor",
      department: "Orthopedics",
      status: "inactive",
    },
    {
      id: "USR-006",
      name: "Nurse Lisa Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LM",
      email: "lisa.martinez@medicare.com",
      role: "Nurse",
      department: "Emergency",
      status: "active",
    },
    {
      id: "USR-007",
      name: "Pharmacist David Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DL",
      email: "david.lee@medicare.com",
      role: "Pharmacist",
      department: "Pharmacy",
      status: "active",
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

  return (
    <div className="rounded-xl border-none shadow-md overflow-hidden bg-white dark:bg-slate-800">
      <motion.div variants={container} initial="hidden" animate="show">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900">
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <motion.tr
                key={user.id}
                variants={item}
                className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === "Doctor" && (
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                    >
                      {user.role}
                    </Badge>
                  )}
                  {user.role === "Nurse" && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      {user.role}
                    </Badge>
                  )}
                  {user.role === "Admin" && (
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
                    >
                      {user.role}
                    </Badge>
                  )}
                  {user.role === "Pharmacist" && (
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                    >
                      {user.role}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  {user.status === "active" ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
                    >
                      Inactive
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit permissions</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Deactivate account</DropdownMenuItem>
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
