// components/PantallaRegistro1.tsx
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
    onNext: () => void; // Función que se llama al presionar "Siguiente"
    };

    export default function PantallaRegistro1({ onNext }: Props) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');

    const handleNext = () => {
        // Aquí podrías guardar los datos, etc.
        onNext();
    };

    return (
        <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

            {/* Tarjeta blanca */}
            <View style={styles.cardContainer}>

            {/* Barra Superior (mismo estilo que en PantallaLogin) */}
            <View style={styles.topBar}>
                <Text style={styles.logo}>Segurix</Text>
            </View>

            {/* Contenido principal */}
            <View style={styles.contentContainer}>
                <Feather name="user" size={80} color="black" style={styles.icon} />
                <Text style={styles.title}>Registrarse</Text>

                <Text style={styles.label}>Nombre</Text>
                <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre"
                value={name}
                onChangeText={setName}
                />

                <Text style={styles.label}>Apellido paterno</Text>
                <TextInput
                style={styles.input}
                placeholder="Ingresa tu apellido paterno"
                value={lastName}
                onChangeText={setLastName}
                />

                <Text style={styles.label}>Apellido materno</Text>
                <TextInput
                style={styles.input}
                placeholder="Ingresa tu apellido materno"
                value={surname}
                onChangeText={setSurname}
                />

                <Text style={styles.label}>Número de teléfono</Text>
                <TextInput
                style={styles.input}
                placeholder="Ej. 5551234567"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                />

                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Siguiente →</Text>
                </TouchableOpacity>
            </View>

            </View>
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    // Fondo azul (igual que en PantallaLogin)
    screen: {
        flex: 1,
        backgroundColor: '#CFE2FF',
    },
    // Centra verticalmente la tarjeta
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    // Tarjeta blanca con sombra, igual que en PantallaLogin
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
    // Contenido
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
        marginBottom: 10,
    },
    nextButton: {
        width: '100%',
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        paddingVertical: 12,
        marginTop: 10,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
});
