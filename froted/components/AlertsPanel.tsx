'use client'

import { AlertCircle, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

export function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      severity: 'normal',
      title: 'Blood Pressure Normal',
      message: 'BP reading within normal parameters',
      timestamp: '2 minutes ago',
      icon: CheckCircle,
    },
    {
      id: 2,
      severity: 'warning',
      title: 'Slightly Elevated Temperature',
      message: 'Body temperature 0.4°F above baseline',
      timestamp: '15 minutes ago',
      icon: AlertTriangle,
    },
    {
      id: 3,
      severity: 'normal',
      title: 'Oxygen Saturation Stable',
      message: 'SpO₂ maintained at optimal levels',
      timestamp: '5 minutes ago',
      icon: CheckCircle,
    },
    {
      id: 4,
      severity: 'critical',
      title: 'Irregular Heartbeat Detected',
      message: 'Possible arrhythmia in ECG waveform',
      timestamp: '1 minute ago',
      icon: AlertCircle,
    },
  ]

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          badge: 'bg-red-100 text-red-700',
          text: 'text-red-900',
        }
      case 'warning':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          badge: 'bg-orange-100 text-orange-700',
          text: 'text-orange-900',
        }
      default:
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          badge: 'bg-emerald-100 text-emerald-700',
          text: 'text-emerald-900',
        }
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-in">
      {/* Header */}
      <h2 className="text-lg font-bold text-slate-900 mb-6">System Alerts</h2>

      {/* Alerts */}
      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon
          const styles = getSeverityStyles(alert.severity)

          return (
            <div
              key={alert.id}
              className={`${styles.bg} ${styles.border} border rounded-lg p-4 hover:shadow-md transition-all duration-200 animate-fade-in`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 pt-0.5">
                  <Icon className={`w-5 h-5 ${
                    alert.severity === 'critical' ? 'text-red-600' :
                    alert.severity === 'warning' ? 'text-orange-600' :
                    'text-emerald-600'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-semibold text-sm ${styles.text}`}>{alert.title}</h3>
                    <span className={`${styles.badge} text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0`}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{alert.message}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {alert.timestamp}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-3 gap-3">
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-600">2</p>
          <p className="text-xs text-slate-600">Normal</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">1</p>
          <p className="text-xs text-slate-600">Warning</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">1</p>
          <p className="text-xs text-slate-600">Critical</p>
        </div>
      </div>
    </div>
  )
}
