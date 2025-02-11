#include <Key.h>
#include <Keypad.h>

const byte ROWS = 4; // 4 FILAS
const byte COLS = 4; // 4 COLUMNAS

// Definición del Keypad
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte rowPins[ROWS] = {32, 33, 25, 26}; // Pines de las filas en la ESP32
byte colPins[COLS] = {27, 14, 12, 13}; // Pines de las columnas en la ESP32

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

String password = "1234";  // Contraseña definida
String inputPassword = ""; // Almacena la entrada del usuario
int relayPin = 16; // Pin donde está conectado el relé

void setup() {
    Serial.begin(115200);
    pinMode(relayPin, OUTPUT);
    digitalWrite(relayPin, HIGH); // Inicia con el solenoide BLOQUEADO

    Serial.println("Ingresa la contraseña con el keypad:");
}

void loop() {
    char key = keypad.getKey();  // Leer tecla presionada

    if (key) {
        Serial.print("Tecla presionada: ");
        Serial.println(key);

        if (key == '*' || key == '#') {  
            // Reinicia la entrada si se presiona '*' o '#'
            inputPassword = "";
            Serial.println("Entrada reiniciada.");
        } 
        else {
            inputPassword += key;
            if (inputPassword == password) {  
                // Si la contraseña es correcta, desbloquear la puerta
                Serial.println("Contraseña correcta. ¡Puerta desbloqueada!");
                digitalWrite(relayPin, LOW); // Desbloquea (el solenoide se retrae)
                delay(3000);                 // Mantener abierto 3 segundos
                digitalWrite(relayPin, HIGH); // Vuelve a bloquear la puerta
                Serial.println("Puerta bloqueada nuevamente.");
                inputPassword = ""; // Reiniciar contraseña
            }
        }
    }
}