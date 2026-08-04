'use client'

import { useEffect, useRef, useState } from 'react'
import { Activity } from 'lucide-react'

export function ECGMonitor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    // Set canvas size
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.scale(dpr, dpr)

    let offset = 0

    const drawECG = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      const centerY = height / 2

      // Clear canvas
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)

      // Draw grid
      ctx.strokeStyle = '#f1f5f9'
      ctx.lineWidth = 0.5

      // Vertical lines
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(width, i)
        ctx.stroke()
      }

      // Draw ECG waveform
      ctx.strokeStyle = '#0066ff'
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let x = 0; x < width; x += 1) {
        // Simulate ECG pattern with multiple sine waves
        const t = (x + offset) * 0.02
        const wave1 = Math.sin(t * 0.5) * 20
        const wave2 = Math.sin(t * 1.5) * 15
        const wave3 = Math.sin(t * 3) * 10
        const y = centerY - (wave1 + wave2 + wave3)

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()

      // Draw heart rate indicator at the edge
      const heartX = width - 30
      const heartY = centerY
      const beatPhase = (offset * 0.5) % 100
      const heartSize = 10 + (Math.sin(beatPhase * Math.PI / 50) * 3)

      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.arc(heartX, heartY, heartSize, 0, Math.PI * 2)
      ctx.fill()

      offset += 2
      if (offset > 1000) offset = 0

      if (isAnimating) {
        animationFrameId = requestAnimationFrame(drawECG)
      }
    }

    if (isAnimating) {
      drawECG()
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isAnimating])

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-lg font-bold text-slate-900">ECG Monitoring</h2>
            <p className="text-sm text-slate-500">Real-time cardiac rhythm analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-slate-900">Live</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          className="w-full"
          style={{ minHeight: '200px', display: 'block' }}
        />
      </div>

      {/* Info */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs text-slate-600 font-medium">Heart Rate</p>
          <p className="text-lg font-bold text-slate-900">72 bpm</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs text-slate-600 font-medium">Rhythm</p>
          <p className="text-lg font-bold text-emerald-600">Normal Sinus</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs text-slate-600 font-medium">Signal Quality</p>
          <p className="text-lg font-bold text-slate-900">Excellent</p>
        </div>
      </div>
    </div>
  )
}
