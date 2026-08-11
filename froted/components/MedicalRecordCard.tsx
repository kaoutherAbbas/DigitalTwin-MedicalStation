'use client'

import { useEffect, useState } from "react";

import {
  getMedicalRecord,
  MedicalRecord,
} from "@/lib/api";


interface MedicalRecordCardProps {
  patientId: number;
}


function InfoBlock({
  title,
  value,
}: {
  title: string;
  value?: string | null;
}) {

  return (

    <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">

      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
        {title}
      </p>

      <p className="text-sm text-slate-800 whitespace-pre-wrap">

        {value && value.trim()
          ? value
          : "Non renseigné"
        }

      </p>

    </div>

  );

}


export function MedicalRecordCard({
  patientId,
}: MedicalRecordCardProps) {

  const [record, setRecord] =
    useState<MedicalRecord | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    async function loadRecord() {

      try {

        setLoading(true);
        setError("");

        const data =
          await getMedicalRecord(patientId);

        setRecord(data);

      } catch (error) {

        console.error(error);

        setError(
          "Impossible de charger le dossier médical."
        );

      } finally {

        setLoading(false);

      }

    }

    loadRecord();

  }, [patientId]);


  if (loading) {

    return (

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

        <p className="text-slate-500">
          Chargement du dossier médical...
        </p>

      </div>

    );

  }


  if (error) {

    return (

      <div className="bg-white rounded-xl border border-red-200 shadow-sm p-6">

        <p className="text-sm text-red-600">
          {error}
        </p>

      </div>

    );

  }


  if (!record) {

    return (

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Dossier médical
        </h2>

        <p className="text-sm text-slate-500">
          Aucun dossier médical n'a encore été créé
          pour ce patient.
        </p>

      </div>

    );

  }


  return (

    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">


      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Dossier médical
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Informations cliniques du patient
          </p>

        </div>

        <div className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
          Dossier #{record.id}
        </div>

      </div>


      {/* =========================
          INFORMATIONS
      ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


        <InfoBlock
          title="Groupe sanguin"
          value={record.blood_group}
        />


        <InfoBlock
          title="Allergies"
          value={record.allergies}
        />


        <InfoBlock
          title="Antécédents médicaux"
          value={record.medical_history}
        />


        <InfoBlock
          title="Antécédents chirurgicaux"
          value={record.surgical_history}
        />


        <InfoBlock
          title="Maladies chroniques"
          value={record.chronic_conditions}
        />


        <InfoBlock
          title="Médicaments actuels"
          value={record.current_medications}
        />


        <InfoBlock
          title="Antécédents familiaux"
          value={record.family_history}
        />


        <InfoBlock
          title="Notes médicales"
          value={record.notes}
        />

      </div>


      {/* =========================
          DATE DE MISE À JOUR
      ========================= */}

      <div className="mt-6 pt-4 border-t border-slate-200">

        <p className="text-xs text-slate-400">

          Dernière mise à jour :{" "}

          {new Date(
            record.updated_at
          ).toLocaleString("fr-FR")}

        </p>

      </div>

    </div>

  );

}