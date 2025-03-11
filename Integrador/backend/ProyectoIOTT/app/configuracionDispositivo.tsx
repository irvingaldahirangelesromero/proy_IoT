import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';

export default function ConfiguracionDispositivo() {
    const router = useRouter();

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
                        <Text style={styles.title}>Configuración de mi dispositivo</Text>

                        {/* ID del dispositivo */}
                        <View style={styles.inputRow}>
                            <Text style={styles.label}>ID del dispositivo</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="XXX XXX XXXX"
                                placeholderTextColor="#999"
                            />
                        </View>

                        {/* Desactivar todos los seguros */}
                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleLabel}>Desactivar todos los seguros</Text>
                            <TouchableOpacity onPress={() => console.log('Toggle Seguros')}>
                                <Ionicons name="toggle-outline" size={32} color="#1E1E1E" />
                            </TouchableOpacity>
                        </View>

                        {/* Desactivar alarma sonora */}
                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleLabel}>Desactivar alarma sonora</Text>
                            <TouchableOpacity onPress={() => console.log('Toggle Alarma')}>
                                <Ionicons name="toggle-outline" size={32} color="#1E1E1E" />
                            </TouchableOpacity>
                        </View>

                        {/* Opciones extra */}
                        <TouchableOpacity
                            style={styles.optionRow}
                            onPress={() => router.push('/gestionarUsuarios')}
                        >
                            <Text style={styles.optionText}>Gestionar perfiles del dispositivo IoT</Text>
                            <Ionicons name="chevron-forward-outline" size={20} color="#1E1E1E" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionRow} onPress={() => console.log('Cambiar PIN')}>
                            <Text style={styles.optionText}>Cambiar PIN de seguridad del dispositivo</Text>
                            <Ionicons name="chevron-forward-outline" size={20} color="#1E1E1E" />
                        </TouchableOpacity>

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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 20,
    },
    /* Fila con etiqueta e input */
    inputRow: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#1E1E1E',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        color: '#1E1E1E',
    },
    /* Fila con etiqueta y toggle */
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    toggleLabel: {
        fontSize: 16,
        color: '#1E1E1E',
    },
    /* Opciones extra (con flecha a la derecha) */
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 14,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#1E1E1E',
    },
});