export function connectWebSocket(
  onMessage: (data: any) => void
) {
  const socket = new WebSocket("ws://127.0.0.1:8000/ws");

  socket.onopen = () => {
    console.log("✅ WebSocket connecté");
  };

  socket.onmessage = (event) => {
    console.log("Message brut :", event.data);
    const data = JSON.parse(event.data);

    console.log("📩 Nouveau message :", data);

    onMessage(data);
  };

  socket.onerror = (error) => {
    console.error("Erreur WebSocket :", error);
  };

  socket.onclose = () => {
    console.log("❌ WebSocket déconnecté");
  };

  return socket;
}