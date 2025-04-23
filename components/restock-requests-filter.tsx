"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ArrowDownAZ } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function RestockRequestsFilter() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
        <div className="grid gap-2 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medication or patient..."
              className="pl-9 h-10 bg-white dark:bg-slate-800 border-none shadow-sm"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="h-10 w-full md:w-[180px] bg-white dark:bg-slate-800 border-none shadow-sm">
              <SelectValue placeholder="Medication" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Medications</SelectItem>
              <SelectItem value="lisinopril">Lisinopril</SelectItem>
              <SelectItem value="metformin">Metformin</SelectItem>
              <SelectItem value="atorvastatin">Atorvastatin</SelectItem>
              <SelectItem value="levothyroxine">Levothyroxine</SelectItem>
              <SelectItem value="amlodipine">Amlodipine</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="h-10 w-full md:w-[150px] bg-white dark:bg-slate-800 border-none shadow-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button className="h-10 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transition-all duration-300">
            <Filter className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10 bg-white dark:bg-slate-800 border-none shadow-sm">
            <ArrowDownAZ className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
            >
              {filter}
              <button className="ml-2 text-emerald-500" onClick={() => removeFilter(filter)}>
                ×
              </button>
            </Badge>
          ))}
          <Button variant="link" size="sm" className="text-sm h-auto p-0" onClick={() => setActiveFilters([])}>
            Clear all
          </Button>
        </div>
      )}
    </motion.div>
  )
}
