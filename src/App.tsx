import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.emit("citas");

    setSocket(socket);
  }, []);

  useEffect(() => {
    socket?.on("citas", (data) => {
      console.log(data);
    });

    socket?.on("respuestaCitas", (data) => {
      console.log(data);
    });

    socket?.on("citaAsignada", (data) => {
      console.log("Cita Obtenida", data);
    });

    socket?.on("mensaje", (data) => {
      console.log(data);
    });

    socket?.on("citas", (data) => {
      console.log(data);
    });
  }, [socket]);

  const [cita, setCita] = useState("");
  const [sala, setSala] = useState(1);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((value) => {
            return (
              <span
                key={value}
                className="px-2 flex items-center justify-center bg-gray-500 cursor-pointer"
                onClick={() => {
                  socket?.emit("unirse", value.toString());
                  setSala(value);
                }}
              >
                {value}
              </span>
            );
          })}
        </div>
        <div>
          <button
            onClick={() => {
              socket?.emit("obtenerCita", sala.toString());
            }}
          >
            Obtener Cita
          </button>
        </div>
      </div>

      <div className="px-20">
        <button
          onClick={() => {
            socket?.emit("citas");
          }}
          className="bg-slate-400 px-2"
        >
          Pedir Citas
        </button>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setCita(e.target.value);
            }}
            value={cita}
            className="bg-white text-black"
          />

          <button
            onClick={() => {
              socket?.emit(
                "agregarCita",
                JSON.stringify({ numeroCita: parseInt(cita) })
              );
            }}
          >
            Agregar Cita
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
