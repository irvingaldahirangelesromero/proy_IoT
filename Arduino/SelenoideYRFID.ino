#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 4   // Pin SS del RFID
#define RST_PIN 15 // Pin RST del RFID
#define LED_PIN 13 // LED en el pin 13
#define RELAY_PIN 16 // Pin del solenoide

MFRC522 mfrc522(SS_PIN, RST_PIN); // Crear la instancia del lector RFID

void setup() {
    Serial.begin(115200);
    SPI.begin();        
    mfrc522.PCD_Init(); 
    
    pinMode(LED_PIN, OUTPUT);
    pinMode(RELAY_PIN, OUTPUT);
    
    digitalWrite(LED_PIN, LOW);    // Apagar LED al inicio
    digitalWrite(RELAY_PIN, HIGH); // Bloquear el solenoide al inicio

    Serial.println("Acerque una tarjeta RFID...");
}

void loop() {
    // Verifica si hay una tarjeta cerca
    if (!mfrc522.PICC_IsNewCardPresent()) {
        return;
    }

    // Intenta leer la tarjeta
    if (!mfrc522.PICC_ReadCardSerial()) {
        return;
    }

    Serial.print("UID de la tarjeta: ");
    String tagID = "";

    // Leer el UID de la tarjeta
    for (byte i = 0; i < mfrc522.uid.size; i++) {
        Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
        Serial.print(mfrc522.uid.uidByte[i], HEX);
        tagID += String(mfrc522.uid.uidByte[i], HEX);
    }
    Serial.println(); // Nueva línea en la salida serial

    // Encender LED y activar el solenoide cuando se detecta una tarjeta
    Serial.println("Tarjeta detectada. Desbloqueando puerta...");
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(RELAY_PIN, LOW); // Desbloquea la puerta (solenoide retraído)

    delay(5000); // Mantener la puerta abierta por 5 segundos

    // Apagar LED y volver a bloquear el solenoide
    Serial.println("Bloqueando puerta nuevamente...");
    digitalWrite(LED_PIN, LOW);
    digitalWrite(RELAY_PIN, HIGH); // Bloquear la puerta

    Serial.println("Esperando otra tarjeta...");
}
