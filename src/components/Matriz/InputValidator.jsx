import React, { useState, useEffect } from "react";
import "./matriz.css";

const ValidacionesSudoku = ({
  matriz,
  setMatriz,
  celdasEditables,
  matrizInicial,
}) => {
  const [errores, setErrores] = useState([]);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);
  const [numeroSeleccionado, setNumeroSeleccionado] = useState(null);

  // Validar si la celda tiene conflictos
  const validarCelda = (fila, columna, numero) => {
    if (!numero) return false;
  
    const repetidoEnFila = matriz[fila].some(
      (celda, idx) => idx !== columna && celda === numero
    );
  
    const repetidoEnColumna = matriz.some(
      (filaActual, idx) => idx !== fila && filaActual[columna] === numero
    );
  
    const inicioFila = Math.floor(fila / 3) * 3;
    const inicioColumna = Math.floor(columna / 3) * 3;
  
    const repetidoEnSubmatriz = matriz
      .slice(inicioFila, inicioFila + 3)
      .some((subFila, i) =>
        subFila
          .slice(inicioColumna, inicioColumna + 3)
          .some(
            (celda, j) =>
              celda === numero &&
              (inicioFila + i !== fila || inicioColumna + j !== columna)
          )
      );
  
    return repetidoEnFila || repetidoEnColumna || repetidoEnSubmatriz;
  };
  

  // Validar toda la matriz
  const validarMatrizCompleta = () => {
    for (let fila = 0; fila < 9; fila++) {
      for (let columna = 0; columna < 9; columna++) {
        const numero = matriz[fila][columna];
        if (!numero || validarCelda(fila, columna, numero)) {
          return false;
        }
      }
    }
    return true;
  };

  const manejarClick = (fila, columna) => {
    const numeroActual = matriz[fila][columna];
    setNumeroSeleccionado(numeroActual || null);
    setFilaSeleccionada(fila);
    setColumnaSeleccionada(columna);
  };

  // Manejar cambios en la celda
  const manejarCambio = (fila, columna, valor) => {
    if (celdasEditables[fila][columna]) {
      const nuevoValor =
        valor === "" || (/^[1-9]$/.test(valor) ? parseInt(valor, 10) : null);

      const nuevaMatriz = matriz.map((filaActual, filaIdx) =>
        filaIdx === fila
          ? filaActual.map((celda, colIdx) =>
              colIdx === columna ? nuevoValor : celda
            )
          : filaActual
      );

      setMatriz(nuevaMatriz);

      // Validar y actualizar errores
      setErrores((prevErrores) => {
        const nuevosErrores = prevErrores.filter(
          (error) => error.fila !== fila || error.columna !== columna
        );

        if (nuevoValor !== null && validarCelda(fila, columna, nuevoValor)) {
          nuevosErrores.push({ fila, columna });
        }

        return nuevosErrores;
      });
    }
  };

  return (
    <div className="sudoku-validaciones">
      <table>
        <tbody>
          {matriz.map((fila, indexFila) => (
            <tr key={indexFila}>
              {fila.map((numero, indexColumna) => (
                <td
                  key={indexColumna}
                  className={`matriz-cell 
               ${
                 indexFila === filaSeleccionada ||
                 indexColumna === columnaSeleccionada
                   ? "highlight-line"
                   : ""
               } 
               ${numeroSeleccionado === numero && numero ? "highlight" : ""} 
               ${indexFila % 3 === 0 ? "top-border" : ""} 
               ${indexColumna % 3 === 0 ? "left-border" : ""} 
               ${indexFila === 8 ? "bottom-border" : ""} 
               ${indexColumna === 8 ? "right-border" : ""} 
               ${
                 errores.some(
                   (error) =>
                     error.fila === indexFila && error.columna === indexColumna
                 )
                   ? "error-cell"
                   : ""
               }`}
                >
                  <button
                    className="cell-button"
                    onClick={() => manejarClick(indexFila, indexColumna)}
                    style={{
                      backgroundColor:
                        numeroSeleccionado === numero && numero
                          ? "#AD91BD"
                          : "",
                      border:
                        numeroSeleccionado === numero && "1px solid #FFAFCC",
                    }}
                  >
                    {celdasEditables[indexFila][indexColumna] ? (
                      <input
                        key={`${indexFila}-${indexColumna}`}
                        type="number"
                        value={
                          matriz[indexFila][indexColumna] !== null &&
                          matriz[indexFila][indexColumna] !== undefined
                            ? matriz[indexFila][indexColumna]
                            : ""
                        }
                        onChange={(e) =>
                          manejarCambio(indexFila, indexColumna, e.target.value)
                        }
                        maxLength={1}
                        className="cell-input"
                        style={{
                          width: "40px",
                          height: "40px",
                          textAlign: "center",
                          color: "#e6e6e6",
                        }}
                      />
                    ) : (
                      matrizInicial[indexFila][indexColumna]
                    )}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {juegoTerminado && (
        <div className="juego-terminado">
          <p>¡Felicidades! Has completado el Sudoku correctamente.</p>
        </div>
      )}
    </div>
  );
};

export default ValidacionesSudoku;
