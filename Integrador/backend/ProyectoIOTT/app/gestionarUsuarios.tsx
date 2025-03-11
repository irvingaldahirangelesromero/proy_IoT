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

    export default function GestionUsuarios() {
    const router = useRouter();

    // Ejemplo estático de usuarios
    const usuarios = [
        { id: '0001', nombre: 'Martha', rfid: '32000320' },
        { id: '0002', nombre: 'Maria', rfid: '32000323' },
        { id: '0003', nombre: 'Modesto', rfid: '32000327' },
        { id: '0004', nombre: 'Jorge', rfid: '32000332' },
    ];

    return (
        <SafeAreaView style={styles.screen}>
        <ScrollView style={{ flex: 1 }}>
            
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

                {/* Encabezado con título y botón “Añadir usuario” */}
                <View style={styles.headerRow}>
                <Text style={styles.title}>Gestión de usuarios</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => console.log('Añadir usuario')}>
                    <Text style={styles.addButtonText}>Añadir usuario</Text>
                </TouchableOpacity>
                </View>

                {/* Grid de tarjetas de usuarios */}
                <View style={styles.usuariosGrid}>
                {usuarios.map((user, index) => (
                    <View key={index} style={styles.userCard}>
                    {/* Editar (esquina superior derecha) */}
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => console.log('Editar usuario', user.id)}
                    >
                        <Text style={styles.editText}>Editar</Text>
                    </TouchableOpacity>

                    {/* Contenido principal del usuario */}
                    <Text style={styles.userId}>ID: {user.id}</Text>
                    <Text style={styles.userName}>Nombre: {user.nombre}</Text>
                    <Text style={styles.userRfid}>RFID: {user.rfid}</Text>

                    {/* Botón eliminar */}
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => console.log('Eliminar usuario', user.id)}
                    >
                        <Text style={styles.deleteButtonText}>Eliminar usuario</Text>
                    </TouchableOpacity>
                    </View>
                ))}
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
    cardContainer: {
        margin: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        // Sombra en iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        // Sombra en Android
        elevation: 6,
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
    addButton: {
        backgroundColor: '#1E1E1E',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    /* Grid de tarjetas */
    usuariosGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 20,
    },
    userCard: {
        width: '45%', // Ajusta según quieras 2 columnas
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        padding: 12,
        margin: 8,
        position: 'relative',
    },
    editButton: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    editText: {
        fontSize: 14,
        color: '#1E1E1E',
        textDecorationLine: 'underline',
    },
    userId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 6,
        marginTop: 8,
    },
    userName: {
        fontSize: 14,
        color: '#2C2C2C',
        marginBottom: 4,
    },
    userRfid: {
        fontSize: 14,
        color: '#2C2C2C',
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: '#000000',
        paddingVertical: 10,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
    },
});
