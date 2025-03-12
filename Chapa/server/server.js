const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const ESP32_IP = "http://172.31.98.207"; // Asegúrate de que esta IP es la correcta de la ESP32

app.use(express.json());

// Ruta para abrir o cerrar la puerta
app.get('/abrir-cerrar', async (req, res) => {
  try {
    // Hacemos la solicitud GET a la ESP32 para abrir o cerrar la puerta
    const response = await axios.get(`${ESP32_IP}/abrir-cerrar`, {
      timeout: 20000,  // Aumentamos el tiempo de espera
    });
    res.send(response.data);  // Retorna la respuesta de la ESP32
  } catch (error) {
    console.log("Error al abrir o cerrar la puerta:", error);
    res.status(500).send("Error al abrir o cerrar la puerta");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://172.31.98.206:${PORT}`);  // Verifica que esta IP es la de tu PC
});
