'use client'

import { Server, Database, Radio, Wifi, Bot, Check } from 'lucide-react'

export function SystemStatus() {
  const systemStatuses = [
    {
      id: 'backend',
      name: 'Backend',
      status: 'online',
      icon: Server,
      uptime: '99.8%',
    },
    {
      id: 'database',
      name: 'Database',
      status: 'online',
      icon: Database,
      uptime: '99.9%',
    },
    {
      id: 'mqtt',
      name: 'MQTT Broker',
      status: 'online',
      icon: Radio,
      uptime: '100%',
    },
    {
      id: 'websocket',
      name: 'WebSocket',
      status: 'online',
      icon: Wifi,
      uptime: '99.7%',
    },
    {
      id: 'twin',
      name: 'Digital Twin',
      status: 'online',
      icon: Bot,
      uptime: '98.9%',
    },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-in flex flex-col h-full">
      {/* Header */}
      <h2 className="text-lg font-bold text-slate-900 mb-6">System Status</h2>

      {/* Status List */}
      <div className="flex-1 space-y-3">
        {systemStatuses.map((sys, index) => {
          const Icon = sys.icon
          const isOnline = sys.status === 'online'

          return (
            <div
              key={sys.id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{sys.name}</p>
                  <p className="text-xs text-slate-500">{sys.uptime} uptime</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-700">Online</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-xs font-semibold text-red-700">Offline</span>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Overall Health */}
      <div className="mt-6 pt-4 border-t border-slate-200 bg-emerald-50 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <Check className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold text-emerald-900">All Systems Operational</span>
        </div>
        <p className="text-xs text-emerald-700">
          Last check: 2 seconds ago
        </p>
      </div>
    </div>
  )
}
