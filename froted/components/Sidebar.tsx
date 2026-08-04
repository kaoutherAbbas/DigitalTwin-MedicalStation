'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Activity, Users, Zap, BarChart3, AlertCircle, Bot, Settings, X, Menu } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'sensors', label: 'Sensors', icon: Zap },
    { id: 'measurements', label: 'Measurements', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertCircle },
    { id: 'twin', label: 'Digital Twin', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out flex flex-col overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-between p-6 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900">MediTwin</span>
          </div>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Logo for desktop */}
        <div className="hidden lg:flex items-center gap-2 p-6 pb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900">MediTwin</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer info */}
        <div className="p-6 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">MH</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900">Dr. Martinez</p>
              <p className="text-xs text-slate-500 truncate">Cardiologist</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
