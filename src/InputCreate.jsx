import { useState } from "react";

const InputCreate = ({ onTaskCreated }) => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const urlApi = "http://localhost:3000/create"; // Endpoint correcto
    const payload = { title: task };

    try {
      const response = await fetch(urlApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error al crear la tarea");
      }

      setTask(""); // Limpiar input después de enviar
      onTaskCreated(); // Recargar lista de tareas
    } catch (error) {
      console.error("Hubo un error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Escribe tu tarea"
      />
      <button type="submit">Añadir tarea</button>
    </form>
  );
};

export default InputCreate;
