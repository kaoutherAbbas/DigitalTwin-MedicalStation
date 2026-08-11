const API_URL = "http://127.0.0.1:8000";

/* =========================
   TYPES - PATIENT
========================= */

export interface PatientCreate {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  age: number;
  gender: string;
  phone?: string | null;
}

export interface Patient {
  id: number;
  patient_code: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  age: number;
  gender: string;
  phone?: string | null;
}

/* =========================
   TYPES - MEDICAL RECORD
========================= */

export interface MedicalRecordCreate {
  blood_group?: string | null;
  allergies?: string | null;
  medical_history?: string | null;
  surgical_history?: string | null;
  chronic_conditions?: string | null;
  current_medications?: string | null;
  family_history?: string | null;
  notes?: string | null;
}

export interface MedicalRecord {
  id: number;
  patient_id: number;
  blood_group?: string | null;
  allergies?: string | null;
  medical_history?: string | null;
  surgical_history?: string | null;
  chronic_conditions?: string | null;
  current_medications?: string | null;
  family_history?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

/* =========================
   DIGITAL TWIN
========================= */

export async function getDigitalTwin(patientId: number) {
  const response = await fetch(
    `${API_URL}/twin/${patientId}`
  );

  if (!response.ok) {
    throw new Error("Erreur API");
  }

  return response.json();
}

/* =========================
   PATIENTS
========================= */

export async function createPatient(
  patient: PatientCreate
): Promise<Patient> {
  const response = await fetch(
    `${API_URL}/patients/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail ||
      "Erreur lors de la création du patient"
    );
  }

  return response.json();
}

export async function getPatients(): Promise<Patient[]> {
  const response = await fetch(
    `${API_URL}/patients/`
  );

  if (!response.ok) {
    throw new Error(
      "Erreur lors de la récupération des patients"
    );
  }

  return response.json();
}

export async function searchPatients(
  query: string
): Promise<Patient[]> {
  const response = await fetch(
    `${API_URL}/patients/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(
      "Erreur lors de la recherche des patients"
    );
  }

  return response.json();
}

/* =========================
   MEDICAL RECORD
========================= */

/**
 * Récupérer le dossier médical d'un patient
 */

export async function getMedicalRecord(
patientId: number
): Promise<MedicalRecord | null> {

const response = await fetch(
`${API_URL}/medical-records/patient/${patientId}`
);

// Aucun dossier médical n'existe encore
if (response.status === 404) {
return null;
}

if (!response.ok) {
const errorData = await response.json().catch(() => null);


throw new Error(
  errorData?.detail ||
  "Erreur lors de la récupération du dossier médical"
);

}

return response.json();
}



/**
 * Créer ou modifier le dossier médical
 */
export async function saveMedicalRecord(
  patientId: number,
  data: MedicalRecordCreate
): Promise<MedicalRecord> {

  const response = await fetch(
    `${API_URL}/medical-records/${patientId}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail ||
      "Erreur lors de l'enregistrement du dossier médical"
    );
  }

  return response.json();
}