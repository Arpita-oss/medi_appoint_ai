"use client"

import type React from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Calendar,
  Pill,
  Users,
  Settings,
  LogOut,
  User,
  Activity,
  FileText,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: Calendar,
    },
    {
      title: "Restock Requests",
      href: "/restock-requests",
      icon: Pill,
    },
    {
      title: "Patient Records",
      href: "/patients",
      icon: FileText,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: Activity,
    },
    {
      title: "Users",
      href: "/users",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      href: "/help",
      icon: HelpCircle,
    },
  ]

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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-slate-50 dark:bg-slate-900">
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <MainNav />
            </div>
            <UserNav />
          </div>
        </header>
        <div className="flex flex-1 w-full">
          <Sidebar className="h-[calc(100vh-4rem)] mt-16">
            <SidebarHeader className="flex items-center px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">
                  M
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  MediCare
                </span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <motion.div variants={container} initial="hidden" animate="show">
                  {menuItems.map((item) => (
                    <motion.div key={item.href} variants={item}>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.href}
                          tooltip={item.title}
                          className="transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
                        >
                          <Link href={item.href} className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span className="text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </motion.div>
                  ))}
                </motion.div>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-100 dark:border-blue-800"
                  >
                    <button className="flex items-center gap-3">
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium">Dr. Sarah Johnson</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                  >
                    <button className="flex items-center gap-3">
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 w-full p-4 md:p-6 lg:p-8"
          >
            <div className="w-full max-w-full mx-auto">
              {children}
            </div>
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  )
}