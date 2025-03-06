import React, { useState } from "react";

const Contenido = () => {
  const [fingerprints, setFingerprints] = useState<
    { id: number; date: string }[]
  >([]);

  const registerFingerprint = async () => {
    try {
      const response = await fetch(
        "http://localhost:8082/api/fingerprints/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: fingerprints.length + 1 }),
        }
      );
      const data = await response.json();
      setFingerprints([...fingerprints, data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const listFingerprints = async () => {
    try {
      const response = await fetch(
        "http://localhost:8082/api/fingerprints/list"
      );
      const data = await response.json();
      setFingerprints(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={registerFingerprint}>Registrar Huella</button>
      <button onClick={listFingerprints}>Listar Huellas</button>
      <ul>
        {fingerprints.map((item, index) => (
          <li key={index} style={styles.fingerprintItem}>
            <span style={styles.fingerprintText}>
              <span style={styles.fingerprintId}>ID: {item.id}</span>
              <span style={styles.fingerprintDate}>
                {" "}
                - {new Date(item.date).toLocaleString()}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  },
  fingerprintItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    width: "100%",
  },
  fingerprintText: {
    fontSize: "16px",
  },
  fingerprintId: {
    fontWeight: "bold",
  },
  fingerprintDate: {
    color: "#666",
    marginLeft: "8px",
  },
};

export default Contenido;
