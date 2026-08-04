'use client'

import { Heart } from 'lucide-react'

interface Patient {
  id: number
  first_name: string
  last_name: string
  age: number
  gender: string
}

interface PatientCardProps {
  patient: Patient
}

export function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 animate-fade-in">
      {/* Patient Avatar */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center border-3 border-blue-200">
          <span className="text-4xl">
            {patient.gender === "Female" ? "👩‍⚕️" : "👨‍⚕️"}
          </span>
        </div>
      </div>

      {/* Patient Info */}
      <div className="space-y-4">

        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-900">
            {patient.first_name} {patient.last_name}
          </h3>

          <p className="text-slate-500 text-sm">
            Patient ID : #{patient.id}
          </p>
        </div>

        {/* Demographics */}
        <div className="grid grid-cols-2 gap-4">

          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 font-medium">Age</p>
            <p className="text-lg font-bold text-slate-900">
              {patient.age}
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-500 font-medium">Gender</p>
            <p className="text-lg font-bold text-slate-900">
              {patient.gender}
            </p>
          </div>

        </div>

        {/* Status */}
        <div className="flex items-center gap-2 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
          <Heart className="w-5 h-5 text-emerald-600 flex-shrink-0" />

          <div>
            <p className="text-xs text-emerald-600 font-medium">
              Status
            </p>

            <p className="text-sm font-semibold text-emerald-900">
              Stable
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}