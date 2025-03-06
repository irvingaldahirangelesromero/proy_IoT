#include <Arduino.h>

int relayPin = 16; // Pin donde está conectado el relé

void setup() {
    Serial.begin(115200);
    pinMode(relayPin, OUTPUT);
    digitalWrite(relayPin, HIGH); // Inicia con el solenoide BLOQUEADO

    Serial.println("Sistema inicializado. Abriendo puerta...");
}

void loop() {
    // Desbloquear la puerta
    Serial.println("Puerta desbloqueada.");
    digitalWrite(relayPin, LOW); // Desbloquea (el solenoide se retrae)

    delay(5000); // Mantener abierta durante 5 segundos

    // Bloquear la puerta nuevamente
    Serial.println("Puerta bloqueada.");
    digitalWrite(relayPin, HIGH); // Vuelve a bloquear la puerta

    delay(5000); // Espera 5 segundos antes de volver a abrirla
}
