import React from "react";

type Propiedades = {
  titulo: string;
  nombre: string;
  imagen: string;
};

const Header = ({ titulo, nombre, imagen }: Propiedades) => {
  return (
    <div >
      <div>
        <img src={imagen} alt="Avatar" style={styles.imagen} />
      </div>
      <div>
        <h1 style={styles.titulo}>{titulo}</h1>
        <p>{nombre}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginBottom: "24px",
  },
  titulo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007bff",
  },
  nombre: {
    fontSize: "16px",
    color: "#ccc",
  },
  imagen: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "2px solid #007bff",
    marginRight: "16px",
  },
};

export default Header;
