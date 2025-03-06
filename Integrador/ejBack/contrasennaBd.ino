#include <WiFi.h>
#include <HTTPClient.h>

// Configuración de WiFi
const char* ssid = "INFINITUMDCB0"; // Capuesta del backend: ERROR
const char* password = "C3X7cdy99W"; // Cambia por tu contraseña de WiFi

// URL del backend
const char* backendUrl = "http://192.168.1.68:3000/compare-password"; // Cambia por la IP de tu backend

void setup() {
  Serial.begin(115200);

  // Conectar a WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a WiFi");
}

void loop() {
  // Verificar si hay datos en el monitor serie
  if (Serial.available()) {
    String inputPassword = Serial.readStringUntil('\n');
    inputPassword.trim(); // Eliminar espacios y saltos de línea

    // Verificar conexión WiFi
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;

      // Iniciar la solicitud HTTP
      http.begin(backendUrl);
      http.addHeader("Content-Type", "application/json");

      // Crear el cuerpo de la solicitud (JSON)
      String jsonPayload = "{\"password\":\"" + inputPassword + "\"}";

      // Enviar la solicitud POST
      int httpResponseCode = http.POST(jsonPayload);

      // Verificar la respuesta
      if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println("Respuesta del backend: " + response);

        if (response == "OK") {
          Serial.println("Contraseña correcta");
          // Aquí puedes encender un LED o realizar otra acción
        } else {
          Serial.println("Contraseña incorrecta");
        }
      } else {
        Serial.println("Error en la solicitud HTTP");
      }

      // Cerrar la conexión
      http.end();
    } else {
      Serial.println("Error de conexión WiFi");
    }
  }
}