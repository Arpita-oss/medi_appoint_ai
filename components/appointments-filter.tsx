"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Search, Filter, ArrowDownAZ } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function AppointmentsFilter() {
  const [date, setDate] = useState<Date>()
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
              placeholder="Search appointments..."
              className="pl-9 h-10 bg-white dark:bg-slate-800 border-none shadow-sm"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "h-10 justify-start text-left font-normal md:w-[180px] bg-white dark:bg-slate-800 border-none shadow-sm",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="h-10 w-full md:w-[150px] bg-white dark:bg-slate-800 border-none shadow-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button className="h-10 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
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
              className="px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
            >
              {filter}
              <button className="ml-2 text-blue-500" onClick={() => removeFilter(filter)}>
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
