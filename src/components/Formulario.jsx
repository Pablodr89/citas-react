import { useState, useEffect } from "react";
import Error from "./Error";

function Formulario({ setPacientes, pacientes, paciente, setPaciente }) {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [alta, setAlta] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setAlta(paciente.alta);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const id = Math.random().toString(36).substring(2);

    return id;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, propietario, email, alta, sintomas].includes("")) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    //Objeto de pacientes
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      alta,
      sintomas,
    };

    if (paciente.id) {
      //Editando registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );
      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      //Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }
    //Reiniciar el formulario
    setNombre("");
    setPropietario("");
    setEmail("");
    setAlta("");
    setSintomas("");
  };

  return (
    <>
      <div className="md:w-1/2 lg:w-2/5">
        <h2 className="font-black text-3xl text-center">
          Seguimiento de Pacientes
        </h2>

        <p className="text-lg mt-5 text-center">
          Añade Pacientes y {""}
          <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form
          className="bg-white shadow-md rounded-lg py-10 px-5 my-10"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label
              htmlFor="mascota"
              className="block text-gray-700 uppercase font-bold"
            >
              Nombre Mascota
            </label>
            <input
              id="mascota"
              type="text"
              placeholder="Nombre de la Mascota"
              className="border-2 w-full p-2 mt-2 
              placeholder-gray-400 rounded-md"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="propietario"
              className="block text-gray-700 uppercase font-bold"
            >
              Nombre Propietario
            </label>
            <input
              id="propietario"
              type="text"
              placeholder="Nombre del Propietario"
              className="border-2 w-full p-2 mt-2 
              placeholder-gray-400 rounded-md"
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 uppercase font-bold"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email Contacto Propietario"
              className="border-2 w-full p-2 mt-2 
              placeholder-gray-400 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="alta"
              className="block text-gray-700 uppercase font-bold"
            >
              Alta
            </label>
            <input
              id="alta"
              type="date"
              className="border-2 w-full p-2 mt-2 
              placeholder-gray-400 rounded-md"
              value={alta}
              onChange={(e) => setAlta(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="sintomas"
              className="block text-gray-700 uppercase font-bold"
            >
              Síntomas
            </label>
            <textarea
              id="sintomas"
              className="border-2 w-full p-2 mt-2 
              placeholder-gray-400 rounded-md"
              placeholder="Describe los Síntomas"
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            />
          </div>

          <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
          />
          {error && (
            <div>
              <Error mensaje="Todos los campos son obligatorios" />
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default Formulario;
