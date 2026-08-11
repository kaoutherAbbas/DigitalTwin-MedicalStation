"use client";

import { useParams, useRouter } from "next/navigation";

import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { MedicalRecordForm } from "@/components/MedicalRecordForm";

export default function MedicalRecordPage() {
const params = useParams();
const router = useRouter();

const patientId = Number(params.patientId);

if (!patientId || Number.isNaN(patientId)) {
return ( <div className="flex h-screen bg-white">
<Sidebar isOpen={true} setIsOpen={() => {}} />

```
    <div className="flex-1 flex flex-col">
      <TopNav onMenuClick={() => {}} />

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-red-600">
            Patient invalide
          </h1>

          <p className="text-slate-500 mt-2">
            L'identifiant du patient est incorrect.
          </p>
        </div>
      </div>
    </div>
  </div>
);

}

return ( <div className="flex h-screen bg-white">
<Sidebar
isOpen={true}
setIsOpen={() => {}}
/>

  <div className="flex-1 flex flex-col overflow-hidden">
    <TopNav onMenuClick={() => {}} />

    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Dossier médical
            </h1>

            <p className="text-slate-500 mt-1">
              Consultation et gestion des informations médicales
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push(`/?patient=${patientId}`)}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            ← Retour
          </button>
        </div>

        {/* DOSSIER MÉDICAL */}
        <MedicalRecordForm
          patientId={patientId}
        />

      </div>
    </div>
  </div>
</div>


);
}
