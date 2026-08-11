'use client'

import { FormEvent, useState } from 'react'
import { createPatient, Patient } from '@/lib/api'

interface PatientFormProps {
onPatientCreated: (patient: Patient) => void
}

export function PatientForm({ onPatientCreated }: PatientFormProps) {
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [dateOfBirth, setDateOfBirth] = useState('')
const [age, setAge] = useState<number | null>(null)
const [gender, setGender] = useState('Male')
const [phone, setPhone] = useState('')

const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
const [success, setSuccess] = useState('')

// Calcul automatique de l'âge
function calculateAge(date: string) {
if (!date) {
setAge(null)
return
}


const birthDate = new Date(date)
const today = new Date()

let calculatedAge =
  today.getFullYear() - birthDate.getFullYear()

const monthDifference =
  today.getMonth() - birthDate.getMonth()

if (
  monthDifference < 0 ||
  (
    monthDifference === 0 &&
    today.getDate() < birthDate.getDate()
  )
) {
  calculatedAge--
}

setAge(calculatedAge)

}

async function handleSubmit(
event: FormEvent<HTMLFormElement>
) {
event.preventDefault()

setError('')
setSuccess('')

// Vérification des champs obligatoires
if (
  !firstName.trim() ||
  !lastName.trim() ||
  !dateOfBirth ||
  age === null ||
  !gender
) {
  setError(
    'Veuillez remplir tous les champs obligatoires.'
  )
  return
}

// Vérification de l'âge
if (age < 0 || age > 120) {
  setError('Veuillez vérifier la date de naissance.')
  return
}

try {
  setLoading(true)

  const patient = await createPatient({
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    date_of_birth: dateOfBirth,
    age: age,
    gender: gender,
    phone: phone.trim() || null,
  })

  setSuccess(
    `Patient enregistré avec succès. Dossier : ${patient.patient_code}`
  )

  // Réinitialisation
  setFirstName('')
  setLastName('')
  setDateOfBirth('')
  setAge(null)
  setGender('Male')
  setPhone('')

  // Le patient créé devient le patient surveillé
  onPatientCreated(patient)

} catch (error: any) {
  console.error(error)

  setError(
    error?.message ||
    "Impossible d'enregistrer le patient. Vérifiez les informations saisies."
  )
} finally {
  setLoading(false)
}

}

return ( <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

```
  <div className="mb-6">
    <h2 className="text-xl font-bold text-slate-900">
      Nouveau patient
    </h2>

    <p className="text-sm text-slate-500 mt-1">
      Enregistrement des informations administratives du patient
    </p>
  </div>

  <form
    onSubmit={handleSubmit}
    className="space-y-6"
  >

    {/* Identité */}
    <div>
      <h3 className="text-sm font-semibold text-slate-800 mb-4">
        Identité du patient
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Prénom */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Prénom *
          </label>

          <input
            type="text"
            value={firstName}
            onChange={(e) =>
              setFirstName(e.target.value)
            }
            placeholder="Ex : Kaouther"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nom *
          </label>

          <input
            type="text"
            value={lastName}
            onChange={(e) =>
              setLastName(e.target.value)
            }
            placeholder="Ex : Abbas"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date de naissance */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Date de naissance *
          </label>

          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value)
              calculateAge(e.target.value)
            }}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Âge automatique */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Âge
          </label>

          <input
            type="number"
            value={age ?? ''}
            readOnly
            placeholder="Calculé automatiquement"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-600 outline-none"
          />

          <p className="text-xs text-slate-400 mt-1">
            Calculé automatiquement à partir de la date de naissance
          </p>
        </div>

        {/* Sexe */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Sexe *
          </label>

          <select
            value={gender}
            onChange={(e) =>
              setGender(e.target.value)
            }
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Male">
              Homme
            </option>

            <option value="Female">
              Femme
            </option>
          </select>
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Téléphone
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="Ex : 0550 12 34 56"
            maxLength={30}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>
    </div>

    {/* Information sur le dossier */}
    <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
      <p className="text-sm text-blue-800">
        <span className="font-semibold">
          Numéro de dossier :
        </span>{' '}
        Il sera généré automatiquement par le système après
        l'enregistrement du patient.
      </p>
    </div>

    {/* Erreur */}
    {error && (
      <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    )}

    {/* Succès */}
    {success && (
      <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
        {success}
      </div>
    )}

    {/* Bouton */}
    <div className="flex justify-end">

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? 'Enregistrement...'
          : 'Enregistrer le patient'}
      </button>

    </div>

  </form>
</div>
)
}
