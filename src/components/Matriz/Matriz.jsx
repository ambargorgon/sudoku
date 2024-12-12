import React, { useEffect, useState } from "react";
import "./matriz.css";
import useNumberGenerator from "../../hooks/useNumberGenerator";
import InputValidator from "./InputValidator";

const Matriz = ({ nivel }) => {
  const matrizInicial = useNumberGenerator(nivel);

  const [estadoLocal, setEstadoLocal] = useState([]);
  const [celdasEditables, setCeldasEditables] = useState([]);

  // Inicializar la matriz y determinar qué celdas son editables
  useEffect(() => {
    if (matrizInicial && matrizInicial.length > 0) {
      setEstadoLocal(matrizInicial);

      // Identificar las celdas vacías como editables
      const editables = matrizInicial.map((fila) =>
        fila.map((celda) => celda === null || celda === "")
      );
      setCeldasEditables(editables);
    }
  }, [matrizInicial]);

  return (
    <div className="matriz-body">
      {estadoLocal.length > 0 ? (
        <InputValidator
          matriz={estadoLocal}
          setMatriz={setEstadoLocal}
          celdasEditables={celdasEditables}
          matrizInicial= {matrizInicial}
        />
      ) : (
        <p>Cargando Sudoku...</p>
      )}
    </div>
  );
};

export default Matriz;
