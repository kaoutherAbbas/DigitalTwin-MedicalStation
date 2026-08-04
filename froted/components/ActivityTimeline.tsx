'use client'

import { Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

export function ActivityTimeline() {
  const activities = [
    {
      id: 1,
      type: 'measurement',
      message: 'Heart rate measured',
      value: '72 bpm',
      timestamp: 'Just now',
      icon: TrendingUp,
    },
    {
      id: 2,
      type: 'alert',
      message: 'Temperature alert',
      value: '98.6°F',
      timestamp: '1 min ago',
      icon: AlertCircle,
    },
    {
      id: 3,
      type: 'measurement',
      message: 'SpO₂ reading',
      value: '98%',
      timestamp: '2 min ago',
      icon: CheckCircle,
    },
    {
      id: 4,
      type: 'measurement',
      message: 'Blood pressure check',
      value: '120/80 mmHg',
      timestamp: '4 min ago',
      icon: TrendingUp,
    },
    {
      id: 5,
      type: 'measurement',
      message: 'Temperature scan',
      value: '98.4°F',
      timestamp: '6 min ago',
      icon: CheckCircle,
    },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-in flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-blue-600" />
        <h2 className="text-lg font-bold text-slate-900">Live Activity</h2>
      </div>

      {/* Timeline */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          const isAlert = activity.type === 'alert'

          return (
            <div
              key={activity.id}
              className="flex gap-3 pb-3 border-b border-slate-100 last:border-b-0 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Icon */}
              <div className="flex-shrink-0 pt-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isAlert ? 'bg-orange-100' : 'bg-blue-100'
                }`}>
                  <Icon className={`w-4 h-4 ${isAlert ? 'text-orange-600' : 'text-blue-600'}`} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                <p className={`text-xs font-semibold mt-0.5 ${isAlert ? 'text-orange-600' : 'text-blue-600'}`}>
                  {activity.value}
                </p>
                <p className="text-xs text-slate-500 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          View Full History
        </button>
      </div>
    </div>
  )
}
