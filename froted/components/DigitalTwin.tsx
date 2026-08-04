'use client'

import { Bot, AlertCircle } from 'lucide-react'

export function DigitalTwin() {
  const bodyRegions = [
    { name: 'Heart', status: 'warning', percentage: 85 },
    { name: 'Lungs', status: 'normal', percentage: 95 },
    { name: 'Liver', status: 'normal', percentage: 90 },
    { name: 'Kidneys', status: 'normal', percentage: 92 },
    { name: 'Brain', status: 'normal', percentage: 98 },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Bot className="w-6 h-6 text-blue-600" />
        <div>
          <h2 className="text-lg font-bold text-slate-900">Digital Twin</h2>
          <p className="text-sm text-slate-500">Virtual patient model with organ status</p>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="flex justify-center mb-8">
        <div className="relative w-32 h-48 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center border-2 border-blue-200">
          {/* Body outline */}
          <div className="text-6xl">🧑‍⚕️</div>
          
          {/* Heart indicator - warning */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-400 rounded-full animate-pulse flex items-center justify-center">
            <div className="w-2 h-2 bg-orange-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Organ Status */}
      <div className="space-y-3">
        {bodyRegions.map((organ) => {
          const isWarning = organ.status === 'warning'
          const color = isWarning ? 'bg-orange-500' : 'bg-emerald-500'
          const bgColor = isWarning ? 'bg-orange-50' : 'bg-emerald-50'

          return (
            <div key={organ.name} className={`${bgColor} rounded-lg p-3`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-slate-900">{organ.name}</span>
                <span className={`text-xs font-semibold ${isWarning ? 'text-orange-700' : 'text-emerald-700'}`}>
                  {organ.percentage}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className={`${color} h-full rounded-full transition-all duration-500`} style={{ width: `${organ.percentage}%` }} />
              </div>
              {isWarning && (
                <div className="flex items-center gap-1 mt-2">
                  <AlertCircle className="w-3 h-3 text-orange-600" />
                  <p className="text-xs text-orange-700 font-medium">Requires monitoring</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-600 mb-2">
          <span className="font-semibold">Overall Status:</span> 93% Healthy
        </p>
        <div className="flex gap-2">
          <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full" />
          <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full" />
          <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full" />
          <span className="inline-block w-3 h-3 bg-orange-500 rounded-full" />
          <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full" />
        </div>
      </div>
    </div>
  )
}
