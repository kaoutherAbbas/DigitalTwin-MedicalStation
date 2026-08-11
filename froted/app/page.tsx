'use client'


import { useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'

import { connectWebSocket } from '@/lib/websocket'
import { getDigitalTwin, Patient } from '@/lib/api'

import { Sidebar } from '@/components/Sidebar'
import { TopNav } from '@/components/TopNav'
import { PatientCard } from '@/components/PatientCard'
import { PatientForm } from '@/components/PatientForm'
import { PatientSearch } from '@/components/PatientSearch'
import { VitalSigns } from '@/components/VitalSigns'
import { ECGMonitor } from '@/components/ECGMonitor'
import { AlertsPanel } from '@/components/AlertsPanel'
import { DigitalTwin } from '@/components/DigitalTwin'
import { ActivityTimeline } from '@/components/ActivityTimeline'
import { SystemStatus } from '@/components/SystemStatus'

export default function Dashboard() {

 
 const searchParams = useSearchParams()

 const patientFromUrl = searchParams.get('patient')

 const [sidebarOpen, setSidebarOpen] = useState(true)

  // Patient actuellement surveillé
 const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    patientFromUrl ? Number(patientFromUrl) : null
  )


  // Digital Twin
  const [digitalTwin, setDigitalTwin] = useState<any>(null)

  // Affichage du formulaire de nouveau patient
  const [showPatientForm, setShowPatientForm] = useState(false)


  useEffect(() => {
  if (!patientFromUrl) {
    return
  }

  const patientId = Number(patientFromUrl)

  if (!Number.isNaN(patientId)) {
    setSelectedPatientId(patientId)
  }
}, [patientFromUrl])  

  // ==========================================
  // CHARGER LE DIGITAL TWIN
  // ==========================================

  async function loadData(patientId: number) {

    try {

      setDigitalTwin(null)

      const data = await getDigitalTwin(patientId)

      setDigitalTwin(data)

    } catch (error) {

      console.error(
        'Erreur lors du chargement du Digital Twin :',
        error
      )

      setDigitalTwin(null)
    }
  }

  // ==========================================
  // CHARGER LE PATIENT SÉLECTIONNÉ
  // ==========================================

  useEffect(() => {

    if (selectedPatientId === null) {
      return
    }

    loadData(selectedPatientId)

  }, [selectedPatientId])

  // ==========================================
  // WEBSOCKET TEMPS RÉEL
  // ==========================================

  useEffect(() => {

    if (selectedPatientId === null) {
      return
    }

    const socket = connectWebSocket((message) => {

      console.log('📩 Nouvelle mesure :', message)

      // Ignorer les mesures des autres patients
      if (message.patient_id !== selectedPatientId) {
        return
      }

      // Mise à jour instantanée
      setDigitalTwin((prev: any) => {

        if (!prev) {
          return prev
        }

        return {

          ...prev,

          latest_measurements: {

            ...prev.latest_measurements,

            [message.sensor]: message.value

          }

        }

      })

    })

    return () => {
      socket.close()
    }

  }, [selectedPatientId])

  // ==========================================
  // PATIENT SÉLECTIONNÉ
  // ==========================================

  function handlePatientSelected(patient: Patient) {
   console.log('👤 Patient sélectionné :', patient)     
   setShowPatientForm(false)     
   setSelectedPatientId(patient.id)   
  }
  // ==========================================
  // NOUVEAU PATIENT CRÉÉ
  // ==========================================

  function handlePatientCreated(patient: Patient) {     
   console.log('👤 Nouveau patient créé :', patient)     
   setShowPatientForm(false)     // Le nouveau patient devient automatiquement     // le patient actuellement surveillé     
   setSelectedPatientId(patient.id)   
  }
  // ==========================================
  // RETOUR À LA RECHERCHE
  // ==========================================

  function handleNewSearch() {

    setSelectedPatientId(null)

    setDigitalTwin(null)

    setShowPatientForm(false)
  }

  // ==========================================
  // DEBUG
  // ==========================================

  useEffect(() => {

    console.log(
      'Digital Twin reçu :',
      digitalTwin
    )

  }, [digitalTwin])

  // ==========================================
  // PAGE DE RECHERCHE
  // ==========================================

  if (selectedPatientId === null) {

    return (

      <div className="flex h-screen bg-white">

        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col overflow-hidden">

          <TopNav
            onMenuClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
          />

          <div className="flex-1 overflow-auto">

            <div className="p-6 max-w-7xl mx-auto space-y-6">

              <div>

                <h1 className="text-3xl font-bold text-slate-900">
                  Patient
                </h1>

                <p className="text-slate-500 mt-1">
                  Rechercher un patient ou créer un nouveau dossier
                </p>

              </div>

              {!showPatientForm ? (

                <PatientSearch
                  onPatientSelected={handlePatientSelected}
                  onNewPatient={() => setShowPatientForm(true)}
                />

              ) : (

                <div className="space-y-4">

                  <button
                    type="button"
                    onClick={() => setShowPatientForm(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    ← Retour à la recherche
                  </button>

                  <PatientForm
                    onPatientCreated={handlePatientCreated}
                  />

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    )
  }

  // ==========================================
  // CHARGEMENT DU DIGITAL TWIN
  // ==========================================

  if (!digitalTwin) {

    return (

      <div className="flex h-screen bg-white">

        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col overflow-hidden">

          <TopNav
            onMenuClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
          />

          <div className="flex-1 flex items-center justify-center">

            <div className="text-center">

              <div className="text-xl font-semibold text-slate-900">
                Chargement du dossier...
              </div>

              <p className="text-slate-500 mt-2">
                Récupération des données du patient
              </p>

            </div>

          </div>

        </div>

      </div>

    )
  }

  // ==========================================
  // DASHBOARD DU PATIENT
  // ==========================================

  return (

    <div className="flex h-screen bg-white">

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">

        <TopNav
          onMenuClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <div className="flex-1 overflow-auto">

          <div className="p-6 max-w-7xl mx-auto space-y-6">

            {/* =============================== */}
            {/* HEADER */}
            {/* =============================== */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <h1 className="text-3xl font-bold text-slate-900">
                  Dashboard
                </h1>

                <p className="text-slate-500 mt-1">
                  Real-time patient monitoring and vital signs analysis
                </p>

              </div>

              <button
                type="button"
                onClick={handleNewSearch}
                className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50"
              >
                🔎 Changer de patient
              </button>

            </div>

            {/* =============================== */}
            {/* PATIENT + VITAL SIGNS */}
            {/* =============================== */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              <PatientCard
                patient={digitalTwin.patient}
              />

              <div className="lg:col-span-2">

                <VitalSigns
                  measurements={
                    digitalTwin.latest_measurements
                  }
                />

              </div>

            </div>

            {/* =============================== */}
            {/* ECG */}
            {/* =============================== */}

            <div>

              <ECGMonitor />

            </div>

            {/* =============================== */}
            {/* ALERTS + ACTIVITY */}
            {/* =============================== */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              <div className="lg:col-span-2">

                <AlertsPanel />

              </div>

              <div>

                <ActivityTimeline />

              </div>

            </div>

            {/* =============================== */}
            {/* DIGITAL TWIN + SYSTEM STATUS */}
            {/* =============================== */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <DigitalTwin />

              <SystemStatus />

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}
