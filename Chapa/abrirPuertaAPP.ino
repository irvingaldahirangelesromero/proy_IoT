#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "UTHH-Alumnos";      // 🔹 Cambia por el nombre de tu red WiFi
const char* password = "";  // 🔹 Cambia por tu contraseña

WebServer server(80);  // Servidor HTTP en el puerto 80
const int relayPin = 14;  // 🔹 Pin donde está conectado el relé

// Estado de la puerta: true = abierta, false = cerrada
bool isDoorOpen = false;

void setup() {
  Serial.begin(115200);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH);  // 🔹 Mantener la cerradura cerrada inicialmente

  WiFi.begin(ssid, password);
  Serial.print("Conectando a WiFi...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("\n✅ Conectado a WiFi");
  Serial.print("📡 Dirección IP de la ESP32: ");
  Serial.println(WiFi.localIP());  // 🔹 Muestra la IP en el Monitor Serial

  // 📌 Ruta para alternar el estado de la puerta (abrir/cerrar)
  server.on("/abrir-cerrar", []() {
    if (!isDoorOpen) {
      // Si la puerta está cerrada, la abrimos
      Serial.println("🔓 ¡Puerta Abierta!");
      digitalWrite(relayPin, LOW);  // 🔹 Activa el relé para abrir la puerta
      delay(5000);  // 🔹 Mantener la puerta abierta por 5 segundos
      digitalWrite(relayPin, HIGH);  // 🔹 Cerrar la puerta automáticamente
      isDoorOpen = true;
      server.send(200, "text/plain", "Puerta abierta y cerrada automáticamente.");
    } else {
      // Si la puerta está abierta, la cerramos
      Serial.println("🔒 ¡Puerta Cerrada!");
      digitalWrite(relayPin, HIGH);  // 🔹 Cierra la puerta
      isDoorOpen = false;
      server.send(200, "text/plain", "Puerta cerrada.");
    }
  });

  server.begin();
  Serial.println("🚀 Servidor HTTP iniciado");
}

void loop() {
  server.handleClient();  // 📌 Necesario para manejar las solicitudes entrantes
}
