import React from "react";

type Propiedades = {
  fecha: string;
  grupo: string;
};

const Footer = ({ fecha, grupo }: Propiedades) => {
  return (
    <div> 
      <p>Fecha: {fecha}</p>
      <p>Grupo: {grupo}</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginTop: "24px",
  },
  text: {
    margin: "4px 0",
    fontSize: "14px",
    color: "#ccc",
  },
};

export default Footer;
