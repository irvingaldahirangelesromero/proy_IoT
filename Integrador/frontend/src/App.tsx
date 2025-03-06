import React from "react";
import Header from "./components/Header";
import Contenido from "./components/Contenido";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Header
        titulo="Smart Door"
        nombre="Equipo 1"
        imagen={require("./img/myAvatar.png")}
      />
      <Contenido />
      <Footer fecha="febrero 2025" grupo="B" />
    </div>
  );
};

export default App;
