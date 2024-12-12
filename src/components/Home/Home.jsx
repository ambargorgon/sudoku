import React, { useState } from "react";
import Matriz from "../Matriz/Matriz";
import "./home.css"

const Home = () => {
const [nivel, setNivel] = useState('facil')

    const handleButtons = (nivel) => {
        setNivel(nivel)
        
    }

  return (
    <div className="home-body">
        <h1>sudoku</h1>
        <div className="botones">
            <button onClick={() => handleButtons('facil')}>Facil</button>
            <button onClick={() => handleButtons('medio')}>Medio</button>
            <button onClick={() => handleButtons('dificil')}>Dificil</button>
        </div>
      <Matriz nivel={nivel}/>
    </div>
  );
};

export default Home;
