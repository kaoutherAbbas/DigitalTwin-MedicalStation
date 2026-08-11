'use client'

import { FormEvent, useEffect, useState } from "react";

import {
getMedicalRecord,
saveMedicalRecord,
MedicalRecord,
MedicalRecordCreate,
} from "@/lib/api";

interface MedicalRecordFormProps {
patientId: number;
}

export function MedicalRecordForm({
patientId,
}: MedicalRecordFormProps) {

const [bloodGroup, setBloodGroup] = useState("");
const [allergies, setAllergies] = useState("");
const [medicalHistory, setMedicalHistory] = useState("");
const [surgicalHistory, setSurgicalHistory] = useState("");
const [chronicConditions, setChronicConditions] = useState("");
const [currentMedications, setCurrentMedications] = useState("");
const [familyHistory, setFamilyHistory] = useState("");
const [notes, setNotes] = useState("");

const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);

const [error, setError] = useState("");
const [success, setSuccess] = useState("");

// Permet de savoir si le patient possède déjà un dossier
const [hasMedicalRecord, setHasMedicalRecord] = useState(false);

/* =========================
CHARGER LE DOSSIER
========================= */

useEffect(() => {


async function loadMedicalRecord() {

  try {

    setLoading(true);
    setError("");
    setSuccess("");

    const record: MedicalRecord | null =
      await getMedicalRecord(patientId);

    if (record) {

      // Le dossier existe
      setHasMedicalRecord(true);

      setBloodGroup(record.blood_group || "");
      setAllergies(record.allergies || "");
      setMedicalHistory(record.medical_history || "");
      setSurgicalHistory(record.surgical_history || "");
      setChronicConditions(record.chronic_conditions || "");
      setCurrentMedications(record.current_medications || "");
      setFamilyHistory(record.family_history || "");
      setNotes(record.notes || "");

    } else {

      // Aucun dossier → on prépare la création
      setHasMedicalRecord(false);

      setBloodGroup("");
      setAllergies("");
      setMedicalHistory("");
      setSurgicalHistory("");
      setChronicConditions("");
      setCurrentMedications("");
      setFamilyHistory("");
      setNotes("");

    }

  } catch (error) {

    console.error(error);

    setError(
      "Impossible de charger le dossier médical."
    );

  } finally {

    setLoading(false);

  }

}

loadMedicalRecord();


}, [patientId]);

/* =========================
ENREGISTRER / CRÉER
========================= */

async function handleSubmit(
event: FormEvent<HTMLFormElement>
) {


event.preventDefault();

setError("");
setSuccess("");

try {

  setSaving(true);

  const data: MedicalRecordCreate = {

    blood_group: bloodGroup || null,
    allergies: allergies || null,
    medical_history: medicalHistory || null,
    surgical_history: surgicalHistory || null,
    chronic_conditions: chronicConditions || null,
    current_medications: currentMedications || null,
    family_history: familyHistory || null,
    notes: notes || null,

  };

  await saveMedicalRecord(
    patientId,
    data
  );

  // Après sauvegarde, le dossier existe forcément
  setHasMedicalRecord(true);

  setSuccess(
    hasMedicalRecord
      ? "Dossier médical mis à jour avec succès."
      : "Dossier médical créé avec succès."
  );

} catch (error) {

  console.error(error);

  setError(
    error instanceof Error
      ? error.message
      : "Impossible d'enregistrer le dossier médical."
  );

} finally {

  setSaving(false);

}

}

/* =========================
CHARGEMENT
========================= */

if (loading) {


return (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

    <div className="flex items-center justify-center py-10">

      <div className="text-center">

        <div className="text-lg font-semibold text-slate-900">
          Chargement du dossier médical...
        </div>

        <p className="text-sm text-slate-500 mt-2">
          Vérification des informations médicales du patient
        </p>

      </div>

    </div>

  </div>
);

}

/* =========================
INTERFACE
========================= */

return (


<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

  {/* HEADER */}

  <div className="mb-6">

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

      <div>

        <h2 className="text-xl font-bold text-slate-900">
          Dossier médical
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Informations médicales du patient
        </p>

      </div>

      {/* STATUT */}

      {hasMedicalRecord ? (

        <span className="inline-flex items-center w-fit px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-200">

          <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />

          Dossier existant

        </span>

      ) : (

        <span className="inline-flex items-center w-fit px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-medium border border-amber-200">

          <span className="w-2 h-2 bg-amber-500 rounded-full mr-2" />

          Nouveau dossier

        </span>

      )}

    </div>

  </div>

  <form
    onSubmit={handleSubmit}
    className="space-y-6"
  >

    {/* =========================
        GROUPE SANGUIN
    ========================= */}

    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        Groupe sanguin
      </label>

      <select
        value={bloodGroup}
        onChange={(e) =>
          setBloodGroup(e.target.value)
        }
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
      >

        <option value="">
          Non renseigné
        </option>

        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>

      </select>

    </div>

    {/* =========================
        ALLERGIES
    ========================= */}

    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        Allergies
      </label>

      <textarea
        value={allergies}
        onChange={(e) =>
          setAllergies(e.target.value)
        }
        placeholder="Ex : pénicilline, arachides, aucune allergie connue..."
        rows={3}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

    {/* =========================
        ANTÉCÉDENTS MÉDICAUX
    ========================= */}

    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        Antécédents médicaux
      </label>

      <textarea
        value={medicalHistory}
        onChange={(e) =>
          setMedicalHistory(e.target.value)
        }
        placeholder="Maladies ou problèmes médicaux antérieurs..."
        rows={4}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

    {/* =========================
        ANTÉCÉDENTS CHIRURGICAUX
    ========================= */}

    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        Antécédents chirurgicaux
      </label>

      <textarea
        value={surgicalHistory}
        onChange={(e) =>
          setSurgicalHistory(e.target.value)
        }
        placeholder="Ex : appendicectomie en 2020..."
        rows={3}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

    {/* =========================
        MALADIES CHRONIQUES
    ========================= */}

    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        Maladies chroniques
      </label>

      <textarea
        value={chronicConditions}
        onChange={(e) =>
          setChronicConditions(e.target.value)
        }
        placeholder="Ex : diabète, hypertension, asthme..."
        rows={3}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

    {/* =========================
        MÉDICAMENTS
    ========================= */}

    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        Médicaments actuels
      </label>

      <textarea
        value={currentMedications}
        onChange={(e) =>
          setCurrentMedications(e.target.value)
        }
        placeholder="Nom des médicaments, dosage et fréquence..."
        rows={3}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

    {/* =========================
        ANTÉCÉDENTS FAMILIAUX
    ========================= */}

    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        Antécédents familiaux
      </label>

      <textarea
        value={familyHistory}
        onChange={(e) =>
          setFamilyHistory(e.target.value)
        }
        placeholder="Informations médicales importantes dans la famille..."
        rows={3}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

    {/* =========================
        NOTES
    ========================= */}

    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        Notes médicales
      </label>

      <textarea
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        placeholder="Informations complémentaires..."
        rows={4}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

    {/* =========================
        MESSAGES
    ========================= */}

    {error && (

      <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">

        {error}

      </div>

    )}

    {success && (

      <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">

        {success}

      </div>

    )}

    {/* =========================
        BOUTON
    ========================= */}

    <div className="flex justify-end">

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >

        {saving
          ? "Enregistrement..."
          : hasMedicalRecord
            ? "Mettre à jour le dossier"
            : "Créer le dossier médical"
        }

      </button>

    </div>

  </form>

</div>

);

}
