'use client'

import { connectWebSocket } from "@/lib/websocket";
import { getDigitalTwin } from "@/lib/api";
import { useEffect, useState } from 'react'

import { Sidebar } from '@/components/Sidebar'
import { TopNav } from '@/components/TopNav'
import { PatientCard } from '@/components/PatientCard'
import { VitalSigns } from '@/components/VitalSigns'
import { ECGMonitor } from '@/components/ECGMonitor'
import { AlertsPanel } from '@/components/AlertsPanel'
import { DigitalTwin } from '@/components/DigitalTwin'
import { ActivityTimeline } from '@/components/ActivityTimeline'
import { SystemStatus } from '@/components/SystemStatus'


export default function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [digitalTwin, setDigitalTwin] = useState<any>(null)


  // Chargement initial du Digital Twin
  useEffect(() => {

    loadData();

  }, []);



  // Connexion WebSocket temps réel
  useEffect(() => {

    const socket = connectWebSocket((message) => {

      console.log("Nouvelle mesure :", message);


      setDigitalTwin((prev: any) => {

        if (!prev) return prev;


        return {
          ...prev,

          latest_measurements: {

            ...prev.latest_measurements,

            [message.sensor]: message.value

          }

        };

      });


    });


    return () => socket.close();


  }, []);



  useEffect(() => {

    console.log("Digital Twin reçu :", digitalTwin);

  }, [digitalTwin]);



  async function loadData() {

    try {

      const data = await getDigitalTwin(1);

      setDigitalTwin(data);


    } catch (error) {

      console.error(error);

    }

  }



  if (!digitalTwin) {

    return (

      <div className="flex items-center justify-center h-screen">

        <h1>Chargement des données...</h1>

      </div>

    );

  }



  return (

    <div className="flex h-screen bg-white">


      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />



      <div className="flex-1 flex flex-col overflow-hidden">


        <TopNav 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        />



        <div className="flex-1 overflow-auto">


          <div className="p-6 max-w-7xl mx-auto space-y-6">


            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Dashboard
              </h1>

              <p className="text-slate-500 mt-1">
                Real-time patient monitoring and vital signs analysis
              </p>

            </div>




            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


              <PatientCard 
                patient={digitalTwin.patient} 
              />



              <div className="lg:col-span-2">

                <VitalSigns 
                  measurements={digitalTwin.latest_measurements}
                />

              </div>


            </div>




            <div>

              <ECGMonitor />

            </div>





            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


              <div className="lg:col-span-2">

                <AlertsPanel />

              </div>



              <div>

                <ActivityTimeline />

              </div>


            </div>






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