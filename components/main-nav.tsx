"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export function MainNav() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/appointments", label: "Appointments" },
    { href: "/restock-requests", label: "Restock Requests" },
    { href: "/patients", label: "Patients" },
  ]

  return (
    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
      {links.map((link) => {
        const isActive = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative text-sm font-medium transition-colors hover:text-primary ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {link.label}
            {isActive && (
              <motion.div
                layoutId="activeNav"
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
