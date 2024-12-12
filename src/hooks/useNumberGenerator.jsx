import { useEffect, useState } from "react";

const useNumberGenerator = (nivel) => {
  const [matriz, setMatriz] = useState([]);

  useEffect(() => {
    const generarSudoku = () => {
      const matriz = Array(9)
        .fill(null)
        .map(() => Array(9).fill(null)); // Matriz inicial 9x9 con null

      const esValido = (matriz, fila, columna, numero) => {
        // Verificar la fila
        if (matriz[fila].includes(numero)) return false;

        // Verificar la columna
        if (matriz.some((row) => row[columna] === numero)) return false;

        // Verificar la submatriz 3x3
        const inicioFila = Math.floor(fila / 3) * 3;
        const inicioColumna = Math.floor(columna / 3) * 3;
        for (let i = inicioFila; i < inicioFila + 3; i++) {
          for (let j = inicioColumna; j < inicioColumna + 3; j++) {
            if (matriz[i][j] === numero) return false;
          }
        }

        return true; // Si pasa todas las verificaciones, el número es válido
      };

      const llenarMatriz = (matriz, fila = 0, columna = 0) => {
        // Si completamos todas las filas, el Sudoku está listo
        if (fila === 9) return true;

        // Pasar a la siguiente fila si terminamos con la actual
        const siguienteFila = columna === 8 ? fila + 1 : fila;
        const siguienteColumna = columna === 8 ? 0 : columna + 1;

        // Probar números del 1 al 9
        const numeros = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5); // Mezclar números
        for (const numero of numeros) {
          if (esValido(matriz, fila, columna, numero)) {
            matriz[fila][columna] = numero; // Asignar número
            if (llenarMatriz(matriz, siguienteFila, siguienteColumna)) {
              return true; // Continuar llenando si el número es válido
            }
            matriz[fila][columna] = null; // Backtracking: deshacer si no funciona
          }
        }

        return false; // Si ningún número funciona, retroceder
      };

      llenarMatriz(matriz); // Llenar la matriz usando backtracking
      return matriz;
    };

    const eliminarNumeros = (matriz, cantidad) => {
      const posiciones = [];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          posiciones.push([i, j]);
        }
      }

      // Mezclar posiciones y seleccionar las primeras 'cantidad' posiciones
      posiciones.sort(() => Math.random() - 0.5);
      for (let k = 0; k < cantidad; k++) {
        const [fila, columna] = posiciones[k];
        matriz[fila][columna] = null; // Eliminar el número en esta posición
      }

      return matriz;
    };

    const cantidadNumerosAEliminar = {
      facil: 40,
      medio: 50,
      dificil: 55,
    };

    const matrizInicial = generarSudoku();
    const matrizConHuecos = eliminarNumeros(
      matrizInicial,
      cantidadNumerosAEliminar[nivel] || 40
    ); // Por defecto, usar nivel fácil

    setMatriz(matrizConHuecos); // Guardar la matriz con huecos
  }, [nivel]);

  return matriz; // Devolver la matriz generada
};

export default useNumberGenerator;
