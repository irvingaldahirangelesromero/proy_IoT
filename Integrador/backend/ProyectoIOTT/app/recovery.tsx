// app/recovery.tsx
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
    import { useRouter } from 'expo-router';
    import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

    export default function RecoveryScreen() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    const handleRecovery = () => {
        // Aquí la lógica para "Comenzar recuperación"
        // p. ej. console.log('Recovery data:', { email, username });
        // Podrías mandar un correo, etc.

        // Luego, si deseas, regresas al login:
        router.push('/'); 
        // O si tu login está en "/login", usar: router.push('/login')
    };

    return (
        <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Tarjeta blanca */}
            <View style={styles.cardContainer}>

            {/* Barra Superior */}
            <View style={styles.topBar}>
                <Text style={styles.logo}>Segurix</Text>
                {/* Botón de regreso */}
                <TouchableOpacity onPress={() => router.push('/')}>
                <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
            </View>

            {/* Contenido principal */}
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Recuperación de contraseña</Text>

                {/* Ícono de huella digital */}
                <View style={styles.iconContainer}>
                <FontAwesome6 name="fingerprint" size={120} color="black" />
                </View>

                {/* Formulario */}
                <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Correo electrónico asociado</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nombre del usuario</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Martha Ximena Camargo"
                    value={username}
                    onChangeText={setUsername}
                    />
                </View>

                {/* Botón de recuperación */}
                <TouchableOpacity style={styles.recoveryButton} onPress={handleRecovery}>
                    <Text style={styles.recoveryButtonText}>Comenzar recuperación</Text>
                </TouchableOpacity>

                <Text style={styles.helpText}>
                    Se enviará un enlace de recuperación a tu correo
                </Text>
                </View>

            </View>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    // Fondo azul, igual que en tus otras pantallas
    screen: {
        flex: 1,
        backgroundColor: '#CFE2FF',
    },
    // Centra verticalmente la tarjeta
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    // Tarjeta blanca con sombra, mismo estilo
    cardContainer: {
        margin: 20,
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
    backText: {
        fontSize: 24,
        color: '#1E1E1E',
    },
    // Contenido principal
    contentContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#1E1E1E',
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    form: {
        width: '100%',
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 16,
        color: '#1E1E1E',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#FFF',
    },
    recoveryButton: {
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
    },
    recoveryButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    helpText: {
        textAlign: 'center',
        color: '#666666',
        fontSize: 14,
        marginTop: 10,
    },
});
