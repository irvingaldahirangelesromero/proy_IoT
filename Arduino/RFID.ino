#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 4   // Pin SS del RFID
#define RST_PIN 15 // Pin RST del RFID
#define LED_PIN 13  // LED en el pin 2

MFRC522 mfrc522(SS_PIN, RST_PIN); // Crear la instancia del lector RFID

void setup() {
    Serial.begin(115200);
    SPI.begin();        // Iniciar SPI
    mfrc522.PCD_Init(); // Iniciar RFID
    
    pinMode(LED_PIN, OUTPUT);
    digitalWrite(LED_PIN, LOW); // Apagar LED al inicio

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

    // Encender LED cuando se lea una tarjeta
    Serial.println("Tarjeta detectada, encendiendo LED...");
    digitalWrite(LED_PIN, HIGH);
    delay(2000);  // Mantener el LED encendido por 2 segundos
    digitalWrite(LED_PIN, LOW);
    Serial.println("Esperando otra tarjeta...");
}
