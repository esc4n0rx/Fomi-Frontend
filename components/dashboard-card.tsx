"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface DashboardCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
  delay?: number
}

export function DashboardCard({ title, value, change, changeType, icon: Icon, delay = 0 }: DashboardCardProps) {
  const changeColor = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-600",
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon size={24} className="text-primary" />
        </div>
        <motion.div
          className={`text-sm font-medium ${changeColor[changeType]}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {change}
        </motion.div>
      </div>

      <motion.h3
        className="text-2xl font-bold text-gray-900 mb-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.1 }}
      >
        {value}
      </motion.h3>

      <p className="text-gray-600 text-sm">{title}</p>
    </motion.div>
  )
}
