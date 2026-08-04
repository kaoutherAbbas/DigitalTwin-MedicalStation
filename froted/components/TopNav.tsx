'use client'

import { useState, useEffect } from 'react'
import { Menu, Wifi, Radio, Clock, User } from 'lucide-react'

interface TopNavProps {
  onMenuClick: () => void
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900">Digital Twin Medical Station</h1>
        </div>
      </div>

      {/* Center section */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-slate-500" />
          <div>
            <span className="font-semibold text-slate-900">{currentTime}</span>
            <span className="text-slate-500 ml-2">{currentDate}</span>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Status Indicators */}
        <div className="hidden sm:flex items-center gap-4">
          {/* MQTT Status */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-slate-600">MQTT</span>
          </div>

          {/* WebSocket Status */}
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-medium text-slate-600">WebSocket</span>
          </div>
        </div>

        {/* User Profile */}
        <button className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:inline text-sm font-medium text-slate-900">Dr. Martinez</span>
        </button>
      </div>
    </header>
  )
}
