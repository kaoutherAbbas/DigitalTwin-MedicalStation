const API_URL = "http://127.0.0.1:8000";

export async function getDigitalTwin(patientId: number) {
  const response = await fetch(`${API_URL}/twin/${patientId}`);

  if (!response.ok) {
    throw new Error("Erreur API");
  }

  return response.json();
}