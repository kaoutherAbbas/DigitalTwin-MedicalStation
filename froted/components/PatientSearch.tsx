'use client'

import { useState } from "react";
import { searchPatients, Patient } from "@/lib/api";

interface PatientSearchProps {
  onPatientSelected: (patient: Patient) => void;
  onNewPatient: () => void;
}

export function PatientSearch({
  onPatientSelected,
  onNewPatient,
}: PatientSearchProps) {

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {

    setError("");
    setSearched(false);

    if (!lastName && !firstName) {
      setError("Entrez au moins un nom ou un prénom.");
      return;
    }

    try {

      setLoading(true);

      // Recherche avec le nom ou le prénom
      const query = lastName || firstName;

      const results = await searchPatients(query);

      // Filtrage supplémentaire par prénom
      let filteredResults = results;

      if (firstName) {
        filteredResults = filteredResults.filter(
          (patient) =>
            patient.first_name.toLowerCase() ===
            firstName.trim().toLowerCase()
        );
      }

      // Filtrage par date de naissance
      if (dateOfBirth) {
        filteredResults = filteredResults.filter(
          (patient) =>
            patient.date_of_birth === dateOfBirth
        );
      }

      setPatients(filteredResults);
      setSearched(true);

    } catch (error) {

      console.error(error);
      setError("Impossible d'effectuer la recherche.");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

      <h2 className="text-xl font-bold text-slate-900 mb-2">
        Rechercher un patient
      </h2>

      <p className="text-sm text-slate-500 mb-6">
        Recherchez le patient avant de créer un nouveau dossier.
      </p>

      {/* Champs de recherche */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Nom */}

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nom
          </label>

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Nom du patient"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Prénom */}

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Prénom
          </label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Prénom du patient"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Date de naissance */}

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Date de naissance
          </label>

          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Boutons */}

      <div className="flex flex-wrap gap-3 mt-5">

        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Recherche..." : "🔎 Rechercher"}
        </button>

        <button
          type="button"
          onClick={onNewPatient}
          className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50"
        >
          + Nouveau patient
        </button>

      </div>

      {/* Erreur */}

      {error && (
        <div className="mt-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Résultats */}

      {searched && patients.length === 0 && !error && (

        <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-5">

          <p className="font-semibold text-amber-900">
            Aucun patient trouvé.
          </p>

          <p className="text-sm text-amber-700 mt-1">
            Vérifiez les informations ou créez un nouveau dossier.
          </p>

          <button
            type="button"
            onClick={onNewPatient}
            className="mt-4 px-5 py-2.5 rounded-lg bg-slate-900 text-white font-medium"
          >
            + Créer un nouveau patient
          </button>

        </div>

      )}

      {/* Patients trouvés */}

      {patients.length > 0 && (

        <div className="mt-6 space-y-3">

          <h3 className="font-semibold text-slate-900">
            Patients trouvés
          </h3>

          {patients.map((patient) => (

            <div
              key={patient.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-slate-200 rounded-lg p-4 hover:bg-slate-50"
            >

              <div>

                <p className="font-bold text-slate-900">
                  {patient.first_name} {patient.last_name}
                </p>

                <p className="text-sm text-slate-500">
                  Dossier : {patient.patient_code}
                </p>

                <p className="text-sm text-slate-500">
                  Date de naissance : {patient.date_of_birth}
                </p>

                <p className="text-sm text-slate-500">
                  Téléphone : {patient.phone || "Non renseigné"}
                </p>

              </div>

              <button
                type="button"
                onClick={() => onPatientSelected(patient)}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
              >
                Ouvrir le dossier
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}