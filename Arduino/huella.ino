#include <HardwareSerial.h>
#include <Adafruit_Fingerprint.h>

// Configuración de los pines UART2 en ESP32 (TX=17, RX=16)
HardwareSerial mySerial(2);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

void setup() {
    Serial.begin(115200);
    delay(1000);

    mySerial.begin(57600, SERIAL_8N1, 16, 17);  // Comunicación con el sensor

    Serial.println("Inicializando sensor de huellas...");
    
    finger.begin(57600);  // ✅ Se requiere la velocidad en baudios

    if (finger.verifyPassword()) {
        Serial.println("Sensor encontrado correctamente.");
    } else {
        Serial.println("Error al encontrar el sensor de huellas.");
        while (1);
    }
}

void loop() {
    Serial.println("\nOpciones:");
    Serial.println("1. Registrar nueva huella (presiona 'r')");
    Serial.println("2. Verificar huella (presiona 'v')");
    Serial.println("3. Borrar una huella específica (presiona 'b')");
    Serial.println("4. Borrar todas las huellas (presiona 'c')");
    
    while (!Serial.available());
    char opcion = Serial.read();
    Serial.read(); // Limpiar buffer
    
    if (opcion == 'r') {
        int id = capturarHuella();
        if (id > 0) {
            Serial.print("Huella almacenada con ID: ");
            Serial.println(id);
        } else {
            Serial.println("No se pudo registrar la huella.");
        }
    } 
    else if (opcion == 'v') {
        verificarHuella();
    } 
    else if (opcion == 'b') {
        Serial.println("Ingresa el ID de la huella a borrar (1-127):");
        while (!Serial.available());
        int id = Serial.parseInt();
        Serial.read();
        borrarHuella(id);
    }
    else if (opcion == 'c') {
        borrarTodasHuellas();
    }
}

// 🚀 Función para capturar y almacenar una huella
int capturarHuella() {
    int p = -1;
    Serial.println("Esperando huella...");

    while (p != FINGERPRINT_OK) {
        p = finger.getImage();
        if (p == FINGERPRINT_NOFINGER) {
            Serial.print(".");
        } else if (p != FINGERPRINT_OK) {
            Serial.println("Error al capturar huella.");
            return -1;
        }
    }

    Serial.println("\nHuella detectada.");
    p = finger.image2Tz(1);
    if (p != FINGERPRINT_OK) {
        Serial.println("Error al convertir imagen.");
        return -1;
    }

    Serial.println("Retira tu dedo...");
    delay(1000);
    while (finger.getImage() != FINGERPRINT_NOFINGER);

    Serial.println("Coloca el mismo dedo otra vez...");
    p = -1;
    while (p != FINGERPRINT_OK) {
        p = finger.getImage();
    }

    Serial.println("Huella detectada por segunda vez.");
    p = finger.image2Tz(2);
    if (p != FINGERPRINT_OK) {
        Serial.println("Error en la segunda captura.");
        return -1;
    }

    Serial.println("Creando modelo de huella...");
    p = finger.createModel();
    if (p != FINGERPRINT_OK) {
        Serial.println("Error al crear modelo.");
        return -1;
    }

    Serial.println("Ingrese un ID para almacenar la huella (1-127):");
    while (!Serial.available());
    int id = Serial.parseInt();
    Serial.read();

    p = finger.storeModel(id);
    if (p == FINGERPRINT_OK) {
        return id;
    } else {
        Serial.println("Error al almacenar huella.");
        return -1;
    }
}

// 🔍 Función para verificar huellas almacenadas
void verificarHuella() {
    Serial.println("Coloca tu dedo para verificar...");
    int p = finger.getImage();
    if (p != FINGERPRINT_OK) {
        Serial.println("No se detectó una huella.");
        return;
    }

    p = finger.image2Tz(1);
    if (p != FINGERPRINT_OK) {
        Serial.println("Error al convertir la huella.");
        return;
    }

    p = finger.fingerFastSearch();
    if (p == FINGERPRINT_OK) {
        Serial.print("Huella reconocida con ID: ");
        Serial.println(finger.fingerID);
    } else {
        Serial.println("Huella no reconocida.");
    }
}

// 🗑 Borrar una huella por ID
void borrarHuella(int id) {
    if (id < 1 || id > 127) {
        Serial.println("ID inválido. Debe estar entre 1 y 127.");
        return;
    }

    int p = finger.deleteModel(id);
    if (p == FINGERPRINT_OK) {
        Serial.print("Huella con ID ");
        Serial.print(id);
        Serial.println(" eliminada correctamente.");
    } else {
        Serial.println("Error al eliminar la huella.");
    }
}

// 🗑 Borrar todas las huellas almacenadas
void borrarTodasHuellas() {
    int p = finger.emptyDatabase();
    if (p == FINGERPRINT_OK) {
        Serial.println("Todas las huellas han sido eliminadas.");
    } else {
        Serial.println("Error al borrar la base de datos.");
    }
}
