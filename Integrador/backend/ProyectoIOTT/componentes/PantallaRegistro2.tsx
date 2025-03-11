// components/PantallaRegistro2.tsx
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
    } from 'react-native';
    import Feather from '@expo/vector-icons/Feather';

    type Props = {
    onFinish: () => void; // Función que se llama al presionar "Registrarse"
    };

    export default function PantallaRegistro2({ onFinish }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        // Lógica de registro, validaciones, etc.
        console.log('Registrarse con:', email, password, confirmPassword);
        onFinish();
    };

    return (
        <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Tarjeta blanca */}
            <View style={styles.cardContainer}>

            {/* Barra Superior (igual que en PantallaRegistro1) */}
            <View style={styles.topBar}>
                <Text style={styles.logo}>Segurix</Text>
            </View>

            {/* Contenido principal */}
            <View style={styles.contentContainer}>
                <Feather name="user" size={80} color="black" style={styles.icon} />
                <Text style={styles.title}>Registrarse</Text>

                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                style={styles.input}
                placeholder="ejemplo@correo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                />

                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                style={styles.input}
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                />

                <Text style={styles.requisitos}>Requisitos:</Text>
                <Text style={styles.requirements}>• Al menos 8 caracteres</Text>
                <Text style={styles.requirements}>• Una letra mayúscula</Text>
                <Text style={styles.requirements}>• Un número</Text>
                <Text style={styles.requirements}>• Un carácter especial</Text>

                <Text style={styles.label}>Confirmar contraseña</Text>
                <TextInput
                style={styles.input}
                placeholder="********"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                />

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>

            </View>
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    // Mismo fondo azul
    screen: {
        flex: 1,
        backgroundColor: '#CFE2FF',
    },
    // Centra verticalmente la tarjeta
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    // Tarjeta blanca con sombra, sin maxWidth, 
    // para que se vea ancha como PantallaRegistro1
    cardContainer: {
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        // Sombra iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        // Sombra Android
        elevation: 6,
    },
    // Barra Superior
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginBottom: 20,
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
        marginTop: 10,
        marginBottom: 5,
        color: '#1E1E1E',
    },
    input: {
        width: '100%',
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        fontSize: 16,
    },
    requisitos: {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#1E1E1E',
    },
    requirements: {
        width: '100%',
        fontSize: 14,
        color: 'gray',
    },
    registerButton: {
        width: '100%',
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        paddingVertical: 12,
        marginTop: 10,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
});
