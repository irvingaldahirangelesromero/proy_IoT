import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

export default function PantallaRegistros() {
    const router = useRouter();

    // Ejemplo estático de registros (en el futuro vendrán de la BD)
    const registrosEjemplo = [
        {
            tipo: 'Acceso al dispositivo',
            usuario: 'Pedro',
            metodo: 'RFID',
            fecha: '00/00/0000',
            hora: '00:00:00'
        },
        {
            tipo: 'Acceso al dispositivo',
            usuario: 'Maria',
            metodo: 'RFID',
            fecha: '00/00/0000',
            hora: '00:00:00'
        },
        {
            tipo: 'Alerta',
            descripcion: 'Intentos repetidos fallidos',
            fecha: '00/00/0000',
            hora: '00:00:00'
        },
        {
            tipo: 'Alerta',
            descripcion: 'Detección sospechosa',
            fecha: '00/00/0000',
            hora: '00:00:00'
        },
    ];

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Tarjeta principal */}
                <View style={styles.cardContainer}>

                    {/* Barra Superior */}
                    <View style={styles.topBar}>
                        <Text style={styles.logo}>Segurix</Text>
                        <View style={styles.nav}>
                            <TouchableOpacity onPress={() => router.push('/empresa')}>
                                <Text style={styles.navText}>Empresa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Ver productos')}>
                                <Text style={styles.navText}>Productos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/puerta')}>
                                <Text style={styles.navText}>Dispositivo IOT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Contenido principal */}
                    <View style={styles.mainContent}>

                        {/* Encabezado: Registro de actividad */}
                        <View style={styles.headerRow}>
                            <Text style={styles.title}>Registro de actividad</Text>
                            <View style={styles.actionsRow}>
                                <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Exportar registros')}>
                                    <Text style={styles.actionButtonText}>Exportar registros</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Vaciar registros')}>
                                    <Text style={styles.actionButtonText}>Vaciar registros</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Lista de registros */}
                        {registrosEjemplo.map((reg, index) => (
                            <View key={index} style={styles.registroItem}>
                                {/* Tipo de registro */}
                                <Text style={styles.registroTipo}>
                                    {reg.tipo || 'Evento'}
                                </Text>

                                {/* Dependiendo del tipo: acceso o alerta */}
                                {reg.usuario && (
                                    <Text style={styles.registroDetalle}>
                                        Usuario: {reg.usuario}{"\n"}
                                        Método: {reg.metodo}
                                    </Text>
                                )}
                                {reg.descripcion && (
                                    <Text style={styles.registroDetalle}>
                                        {reg.descripcion}
                                    </Text>
                                )}

                                {/* Fecha y hora */}
                                <Text style={styles.registroFecha}>
                                    Fecha: {reg.fecha}{"  "}Hora: {reg.hora}
                                </Text>
                            </View>
                        ))}

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
    mainContent: {
        marginTop: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E1E1E',
    },
    actionsRow: {
        flexDirection: 'row',
    },
    actionButton: {
        backgroundColor: '#1E1E1E',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginLeft: 10,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    /* Cada registro */
    registroItem: {
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        padding: 12,
        marginTop: 15,
    },
    registroTipo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 6,
    },
    registroDetalle: {
        fontSize: 14,
        color: '#2C2C2C',
        marginBottom: 4,
    },
    registroFecha: {
        fontSize: 13,
        color: '#666666',
        marginTop: 4,
        textAlign: 'right',
    },
});