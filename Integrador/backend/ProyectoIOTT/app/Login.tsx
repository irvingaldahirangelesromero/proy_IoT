// app/login.tsx
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function LoginScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Función para iniciar sesión
    const handleLogin = () => {
        console.log('Iniciar sesión con:', email, password);
        // Podrías hacer un fetch a tu backend, etc.
        // router.push('/pantallaPrincipal') // Por ejemplo, si quieres navegar a la pantalla principal
    };

    // Función para ir a registro
    const handleRegister = () => {
        // Llamamos a otra ruta, por ejemplo '/register1'
        // (Asegúrate de tener un archivo register1.tsx en app/)
        router.push('/register1' as any);
    };

    return (
        <SafeAreaView style={styles.screen}>
        <ScrollView style={{ flex: 1 }}>
            
            {/* Tarjeta principal */}
            <View style={styles.cardContainer}>

            {/* Barra Superior */}
            <View style={styles.topBar}>
                <Text style={styles.logo}>Segurix</Text>
                {/* Si deseas, puedes agregar tus botones "Empresa", "Productos", etc. */}
            </View>

            {/* Contenido principal */}
            <View style={styles.contentContainer}>
                <Feather name="user" size={80} color="black" style={styles.icon} />
                <Text style={styles.title}>Inicio de sesión</Text>

                {/* Email */}
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                style={styles.input}
                placeholder="ejemplo@correo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                />

                {/* Contraseña */}
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                style={styles.input}
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                />

                {/* Botón Iniciar Sesión */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                {/* Botón Registrarse */}
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>

            </View>
        </ScrollView>
        </SafeAreaView>
    );
    }

    // Estilos adaptados a tu diseño
    const styles = StyleSheet.create({
    // Fondo azul
    screen: {
        flex: 1,
        backgroundColor: '#CFE2FF',
    },
    // Tarjeta blanca
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
    // Barra Superior (simplificada)
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 10,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E1E1E',
    },
    // Contenido principal
    contentContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    icon: {
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1E1E1E',
    },
    label: {
        width: '100%',
        fontSize: 16,
        color: '#1E1E1E',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        color: '#1E1E1E',
        marginBottom: 10,
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        paddingVertical: 12,
        marginTop: 10,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    registerButton: {
        width: '100%',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 12,
        marginTop: 10,
    },
    registerButtonText: {
        color: '#1E1E1E',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
});
