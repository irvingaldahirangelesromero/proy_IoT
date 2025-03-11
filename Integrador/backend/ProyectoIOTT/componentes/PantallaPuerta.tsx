import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PantallaPuerta() {
    const router = useRouter();

    // Estado para saber si la puerta está abierta (true) o cerrada (false)
    const [puertaAbierta, setPuertaAbierta] = useState(false);

    // Alternar el estado de la puerta
    const handleTogglePuerta = () => {
        setPuertaAbierta(!puertaAbierta);
    };

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Tarjeta principal */}
                <View style={styles.cardContainer}>

                    {/* Barra Superior */}
                    <View style={styles.topBar}>
                        <Text style={styles.logo}>Segurix</Text>
                        <View style={styles.nav}>
                            {/* Empresa */}
                            <TouchableOpacity onPress={() => router.push('/empresa')}>
                                <Text style={styles.navText}>Empresa</Text>
                            </TouchableOpacity>
                            {/* Productos */}
                            <TouchableOpacity onPress={() => console.log('Ver productos')}>
                                <Text style={styles.navText}>Productos</Text>
                            </TouchableOpacity>
                            {/* Dispositivo IOT (ya sin negritas) */}
                            <TouchableOpacity onPress={() => router.push('/puerta')}>
                                <Text style={styles.navText}>Dispositivo IOT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Contenido principal */}
                    <View style={styles.contentContainer}>
                        <Text style={styles.encabezado}>Dispositivo IOT</Text>

                        {/* Ícono de la puerta */}
                        <FontAwesome5
                            name={puertaAbierta ? "door-open" : "door-closed"}
                            size={150}
                            color="#1E1E1E"
                            style={{ marginBottom: 30 }}
                        />

                        {/* Botón para abrir/cerrar */}
                        <TouchableOpacity style={styles.botonPuerta} onPress={handleTogglePuerta}>
                            <Text style={styles.textoBoton}>
                                {puertaAbierta ? "Cerrar puerta" : "Abrir puerta"}
                            </Text>
                        </TouchableOpacity>

                        {/* Botones de Configuración y Registros */}
                        <View style={styles.bottomButtons}>
                            <TouchableOpacity style={styles.configButton} onPress={() => router.push('/configuracionDispositivo')}>
                                <FontAwesome5 name="file-alt" size={20} color="#1E1E1E" style={styles.buttonIcon} />
                                <Text style={styles.configButtonText}>Configuración</Text>
                            </TouchableOpacity>

                            {/* Boton Registros */}
                            <TouchableOpacity style={styles.configButton} onPress={() => router.push('/registros')}>
                                <FontAwesome5 name="file-alt" size={20} color="#1E1E1E" style={styles.buttonIcon} />
                                <Text style={styles.configButtonText}>Registros</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    /* Fondo azul suave */
    screen: {
        flex: 1,
        backgroundColor: '#CFE2FF',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
        height: '100%',
    },
    /* Barra Superior */
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 10,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E1E1E',
    },
    nav: {
        flexDirection: 'row',
    },
    navText: {
        fontSize: 16,
        color: '#1E1E1E',
        marginLeft: 20,
    },
    /* Contenido principal */
    contentContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    encabezado: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 20,
    },
    /* Botón para abrir/cerrar la puerta */
    botonPuerta: {
        backgroundColor: '#1E1E1E', // Botón en negro
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 30,
    },
    textoBoton: {
        color: '#FFFFFF', // Texto blanco
        fontSize: 16,
        fontWeight: '600',
    },
    /* Botones de Configuración y Registros */
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    configButton: {
        backgroundColor: '#E0E0E0',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '40%',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 8,
    },
    configButtonText: {
        fontSize: 16,
        color: '#1E1E1E',
        fontWeight: '500',
    },
});