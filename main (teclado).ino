#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Key.h>
#include <Keypad.h>
#include <HardwareSerial.h>
#include <Adafruit_Fingerprint.h>


// Configuración del LCD
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Configuración del teclado
const byte FILAS = 4;
const byte COLUMNAS = 4;
char teclas[FILAS][COLUMNAS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte pinesFilas[FILAS] = {32, 14, 12, 13};  // Pines para las filas (L1 - L4)
byte pinesColumnas[COLUMNAS] = {27, 26, 25, 33};  // Pines para las columnas (C1 - C4)
Keypad teclado = Keypad(makeKeymap(teclas), pinesFilas, pinesColumnas, FILAS, COLUMNAS);

// Configuración de contraseña
const char claveCorrecta[5] = "1234";
char claveIngresada[5];
int indiceClave = 0;
bool estaBloqueado = true;

// Estado del menú
int estadoMenu = 0; // 0: menú principal, 1: ingreso de clave, 2: datos del sensor, 3: huella

// Configuración del sensor PIR, LED y buzzer
const int pinPIR = 34;
const int pinLED = 5;
const int pinBuzzer = 19;
int contadorDetecciones = 0;
unsigned long tiempoUltimaDeteccion = 0;
const unsigned long retrasoDeteccion = 1000;
const unsigned long umbralAlarma = 60000; // 1 minuto
bool estadoLED = false;
bool alarmaActivada = false;

// Configuración del sensor de huella
HardwareSerial mySerial(2);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

// Configuración de WiFi
const char* ssid = "INFINITUMDCB0";
const char* password = "C3X7cdy99W";

// Crear el servidor web en el puerto 80
WebServer server(80);

void setup() {
  Serial.begin(115200);
  lcd.init();
  lcd.backlight();
  pinMode(pinPIR, INPUT);
  pinMode(pinLED, OUTPUT);
  pinMode(pinBuzzer, OUTPUT);
  digitalWrite(pinLED, LOW);
  digitalWrite(pinBuzzer, LOW);

  // Inicialización del sensor de huella
  mySerial.begin(57600, SERIAL_8N1, 16, 17);
  finger.begin(57600);
  if (finger.verifyPassword()) {
    Serial.println("Sensor encontrado correctamente.");
  } else {
    Serial.println("Error al encontrar el sensor de huellas.");
    while (1);
  }

  // Conectar a WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a WiFi");
  Serial.println(WiFi.localIP());

  // Configurar rutas del servidor web
  server.on("/register", HTTP_GET, handleRegister);
  server.on("/list", HTTP_GET, handleList);

  // Iniciar el servidor web
  server.begin();
  Serial.println("Servidor HTTP iniciado");

  mostrarMenuPrincipal();
}

void loop() {
  char tecla = teclado.getKey();
  verificarSensorPIR();

  if (tecla) {
    Serial.println(tecla);
    switch (estadoMenu) {
      case 0:
        if (tecla == '1') {
          if (estaBloqueado) {
            lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print("Ingrese PIN");
            lcd.setCursor(0, 1);
            lcd.print("PIN ");
            indiceClave = 0;
            estadoMenu = 1;
          } else {
            lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print("Ya esta");
            lcd.setCursor(0, 1);
            lcd.print("desbloqueado");
            delay(2000);
            mostrarMenuPrincipal();
          }
        }
        else if (tecla == '2') {
          estadoMenu = 2;
        }
        else if (tecla == '3') {
          // Verificar huella directamente
          verificarHuella();
        }
        break;
      case 1:
        ingresarClave(tecla);
        break;
      case 2:
        if (tecla == 'D') {
          estadoMenu = 0;
          mostrarMenuPrincipal();
        }
        else {
          mostrarDatosSensor();
        }
        break;
    }
  }

  if (estadoMenu == 2) {
    mostrarDatosSensor();
  }

  // Manejar solicitudes del servidor web
  server.handleClient();
}

void mostrarMenuPrincipal() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("1 Acceso 2 Sensor");
  lcd.setCursor(0, 1);
  lcd.print("3 Verificar Huella"); // Cambiar texto de la opción 3
}

void actualizarClave() {
  lcd.setCursor(0, 1);
  lcd.print("PIN ");
  for(int i = 0; i < 12; i++) {
    lcd.setCursor(5 + i, 1);
    lcd.print(" ");
  }
  for(int i = 0; i < indiceClave; i++) {
    lcd.setCursor(5 + i, 1);
    lcd.print("*");
  }
}

void ingresarClave(char tecla) {
  if (tecla == 'D' && indiceClave > 0) {
    indiceClave--;
    actualizarClave();
  }
  else if (tecla >= '0' && tecla <= '9' && indiceClave < 4) {
    claveIngresada[indiceClave] = tecla;
    indiceClave++;
    actualizarClave();
    if (indiceClave == 4) {
      claveIngresada[4] = '\0';
      if (strcmp(claveIngresada, claveCorrecta) == 0) {
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Acceso");
        lcd.setCursor(0, 1);
        lcd.print("Concedido");
        delay(2000);
        estaBloqueado = false;
        estadoMenu = 0;
        mostrarMenuPrincipal();
      } else {
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("PIN");
        lcd.setCursor(0, 1);
        lcd.print("Incorrecto");
        delay(2000);
        estadoMenu = 0;
        mostrarMenuPrincipal();
      }
      indiceClave = 0;
    }
  }
}

void verificarSensorPIR() {
  if (digitalRead(pinPIR) == HIGH) {
    if (millis() - tiempoUltimaDeteccion >= retrasoDeteccion) {
      contadorDetecciones++;
      tiempoUltimaDeteccion = millis();
      Serial.println("Movimiento detectado");
      Serial.println("Contador " + String(contadorDetecciones));
      if (contadorDetecciones >= 3 && !estadoLED) {
        digitalWrite(pinLED, HIGH);
        estadoLED = true;
      }
      if (contadorDetecciones >= 20 && !alarmaActivada) {
        digitalWrite(pinBuzzer, HIGH);
        alarmaActivada = true;
        Serial.println("Alarma activada");
      }
    }
  } else {
    if (alarmaActivada && (millis() - tiempoUltimaDeteccion > 30000)) {
      digitalWrite(pinBuzzer, LOW);
      alarmaActivada = false;
      Serial.println("Alarma desactivada");
    }
    if (estadoLED && (millis() - tiempoUltimaDeteccion > 30000)) {
      digitalWrite(pinLED, LOW);
      estadoLED = false;
    }
    if (millis() - tiempoUltimaDeteccion > 30000) {
      contadorDetecciones = 0;
      Serial.println("Contador reiniciado");
    }
  }
}

void mostrarDatosSensor() {
  verificarSensorPIR();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Detecciones ");
  lcd.print(contadorDetecciones);
  lcd.setCursor(0, 1);
  lcd.print(estadoLED ? "Alerta" : "Normal");
  lcd.print(" D Menu");
  delay(500);
}

void mostrarMensajeHuella(const char* mensaje) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(mensaje);
}

int capturarHuella() {
  int p = -1;
  mostrarMensajeHuella("Esperando huella...");

  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    if (p == FINGERPRINT_NOFINGER) {
      delay(100);
    } else if (p != FINGERPRINT_OK) {
      mostrarMensajeHuella("Error al capturar");
      delay(2000);
      return -1;
    }
  }
  mostrarMensajeHuella("Huella detectada");
  delay(1000);
  p = finger.image2Tz(1);
  if (p != FINGERPRINT_OK) {
    mostrarMensajeHuella("Error al convertir");
    delay(2000);
    return -1;
  }
  mostrarMensajeHuella("Retira tu dedo");
  delay(2000);
  while (finger.getImage() != FINGERPRINT_NOFINGER) {
    delay(100);
  }
  mostrarMensajeHuella("Coloca de nuevo");
  delay(1000);
  p = -1;
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    delay(100);
  }
  mostrarMensajeHuella("Huella detectada");
  delay(1000);
  p = finger.image2Tz(2);
  if (p != FINGERPRINT_OK) {
    mostrarMensajeHuella("Error en 2da captura");
    delay(2000);
    return -1;
  }
  mostrarMensajeHuella("Creando modelo");
  delay(1000);
  p = finger.createModel();
  if (p != FINGERPRINT_OK) {
    mostrarMensajeHuella("Error al crear");
    delay(2000);
    return -1;
  }
  mostrarMensajeHuella("Ingresa ID (1-127)");
  char idStr[4] = {0};
  int i = 0;
  while (i < 3) {
    char tecla = teclado.waitForKey();
    if (tecla >= '0' && tecla <= '9') {
      idStr[i++] = tecla;
      lcd.setCursor(i + 10, 1);
      lcd.print(tecla);
    } else if (tecla == 'D' && i > 0) {
      idStr[--i] = 0;
      lcd.setCursor(i + 10, 1);
      lcd.print(" ");
    } else if (tecla == '#') {
      break;
    }
  }
  int id = atoi(idStr);
  if (id < 1 || id > 127) {
    mostrarMensajeHuella("ID invalido");
    delay(2000);
    return -1;
  }
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    mostrarMensajeHuella("Huella almacenada");
    delay(2000);
    return id;
  } else {
    mostrarMensajeHuella("Error al almacenar");
    delay(2000);
    return -1;
  }
}

void verificarHuella() {
  unsigned long tiempoInicio = millis();
  mostrarMensajeHuella("Coloca tu dedo");
  while (millis() - tiempoInicio < 15000) {
    int p = finger.getImage();
    if (p == FINGERPRINT_OK) {
      mostrarMensajeHuella("Huella detectada");
      delay(1000);
      p = finger.image2Tz(1);
      if (p != FINGERPRINT_OK) {
        mostrarMensajeHuella("Error al convertir");
        delay(2000);
        estadoMenu = 0;
        mostrarMenuPrincipal();
        return;
      }
      p = finger.fingerFastSearch();
      if (p == FINGERPRINT_OK) {
        mostrarMensajeHuella("Huella reconocida");
        delay(2000);
        estaBloqueado = false;
        estadoMenu = 0;
        mostrarMenuPrincipal();
        return;
      } else {
        mostrarMensajeHuella("No reconocida");
        delay(2000);
        estadoMenu = 0;
        mostrarMenuPrincipal();
        return;
      }
    } else if (p != FINGERPRINT_NOFINGER) {
      mostrarMensajeHuella("Error al capturar");
      delay(2000);
      return;
    }
    delay(100);
  }
  mostrarMensajeHuella("Tiempo agotado");
  delay(2000);
  estadoMenu = 0;
  mostrarMenuPrincipal();
}

void handleRegister() {
  int id = capturarHuella();
  if (id > 0) {
    server.sendHeader("Access-Control-Allow-Origin", "*"); // Permitir CORS
    server.send(200, "text/plain", "Huella registrada con ID: " + String(id));
    delay(500);
    // Regresar al menú principal
    estadoMenu = 0; // Cambiar el estado del menú a "menú principal"
    mostrarMenuPrincipal(); // Mostrar el menú principal en el LCD
  } else {
    server.sendHeader("Access-Control-Allow-Origin", "*"); // Permitir CORS
    server.send(500, "text/plain", "Error al registrar huella");
    delay(500);
    // Regresar al menú principal
    estadoMenu = 0; // Cambiar el estado del menú a "menú principal"
    mostrarMenuPrincipal(); // Mostrar el menú principal en el LCD
  }
}

void handleList() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  String response = "";
  uint8_t p = finger.getTemplateCount();
  if (p == FINGERPRINT_OK) {
    for (int id = 1; id <= 127; id++) {
      uint8_t result = finger.loadModel(id);
      if (result == FINGERPRINT_OK) {
        // Format: "huella N: ID; dd/mm/yyyy hh:mm:ss"
        response += "huella con ID: " + String(id) + "\n";
      }
    }
  }
  server.send(200, "text/plain", response);
} 
