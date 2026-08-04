'use client'

import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
import {
  Thermometer,
  Heart,
  Wind,
  Gauge,
  Activity,
} from 'lucide-react'

interface VitalSignsProps {
  measurements: {
    Temperature: number
    "Heart Rate": number
    SpO2: number
    "Blood Pressure": number
    ECG: number
  }
}

export function VitalSigns({ measurements }: VitalSignsProps) {

  const vitalSigns = [
    {
      id: 'temperature',
      label: 'Temperature',
      value: measurements?.Temperature ?? 0,
      unit: '°C',
      icon: Thermometer,
      color: 'from-orange-100 to-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200',
    },
    {
      id: 'heart-rate',
      label: 'Heart Rate',
      value: measurements?.["Heart Rate"] ?? 0,
      unit: 'bpm',
      icon: Heart,
      color: 'from-red-100 to-red-50',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
    },
    {
      id: 'spo2',
      label: 'SpO₂',
      value: measurements?.SpO2 ?? 0,
      unit: '%',
      icon: Wind,
      color: 'from-blue-100 to-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      id: 'blood-pressure',
      label: 'Blood Pressure',
      value: measurements?.["Blood Pressure"] ?? 0,
      unit: 'mmHg',
      icon: Gauge,
      color: 'from-purple-100 to-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
    },
    {
      id: 'ecg',
      label: 'ECG',
      value: measurements?.ECG ?? 0,
      unit: 'mV',
      icon: Activity,
      color: 'from-emerald-100 to-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
    },
  ]

  return (
    <div className="space-y-4">

      <h2 className="text-lg font-bold text-slate-900">
        Vital Signs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

        {vitalSigns.map((vital) => {

          const Icon = vital.icon

          const chartData = [
            { value: vital.value - 1 },
            { value: vital.value },
            { value: vital.value + 0.3 },
            { value: vital.value },
            { value: vital.value + 0.2 },
          ]

          return (

            <div
              key={vital.id}
              className={`bg-gradient-to-br ${vital.color} border ${vital.borderColor} rounded-lg p-4 shadow-sm hover:shadow-md transition-all`}
            >

              <div className="flex justify-between items-center mb-3">

                <span className="text-xs font-semibold text-slate-600 uppercase">

                  {vital.label}

                </span>

                <Icon className={`w-5 h-5 ${vital.iconColor}`} />

              </div>

              <div className="mb-3">

                <div className="text-3xl font-bold text-slate-900">

                  {vital.value}

                </div>

                <div className="text-sm text-slate-500">

                  {vital.unit}

                </div>

              </div>

              <ResponsiveContainer width="100%" height={40}>

                <LineChart data={chartData}>

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />

                </LineChart>

              </ResponsiveContainer>

              <div className="text-xs text-slate-500 mt-2">

                Live

              </div>

            </div>

          )

        })}

      </div>

    </div>
  )
}