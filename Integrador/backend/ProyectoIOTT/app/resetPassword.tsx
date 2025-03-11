// app/resetPassword.tsx
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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ResetPasswordScreen() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSave = () => {
        // Aquí tu lógica para guardar la nueva contraseña
        // p. ej. console.log('Nueva contraseña:', password);

        // Luego navegas a la pantalla de login
        router.push('/'); 
        // O si tu login está en app/index.tsx, usarías router.push('/')
    };

    return (
        <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/* Tarjeta blanca */}
            <View style={styles.cardContainer}>

            {/* Barra Superior */}
            <View style={styles.topBar}>
                <Text style={styles.logo}>Segurix</Text>
            </View>

            {/* Contenido principal */}
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Restablecimiento de contraseña</Text>

                {/* Icono de escudo */}
                <View style={styles.iconContainer}>
                <View style={styles.iconBackground}>
                    <MaterialIcons name="verified-user" size={120} color="black" />
                </View>
                </View>

                {/* Formulario */}
                <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Coloca tu nueva contraseña</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Nueva Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    />
                </View>

                {/* Requisitos de contraseña */}
                <View style={styles.requirementsContainer}>
                    <Text style={styles.requirementsTitle}>Requisitos:</Text>
                    <View style={styles.requirementsList}>
                    <Text style={styles.requirementItem}>• Al menos 8 caracteres</Text>
                    <Text style={styles.requirementItem}>• Una letra minúscula</Text>
                    <Text style={styles.requirementItem}>• Una letra Mayúscula</Text>
                    <Text style={styles.requirementItem}>• Un número</Text>
                    <Text style={styles.requirementItem}>• Un caracter especial</Text>
                    </View>
                </View>

                {/* Botón de guardar */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Guardar nueva contraseña</Text>
                </TouchableOpacity>
                </View>
            </View>

            </View>
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#CFE2FF',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    cardContainer: {
        margin: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
    },
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
    contentContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#1E1E1E',
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    iconBackground: {
        alignItems: 'center',
        justifyContent: 'center',
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
    requirementsContainer: {
        marginTop: 10,
    },
    requirementsTitle: {
        fontSize: 16,
        color: '#1E1E1E',
        marginBottom: 8,
        fontWeight: 'bold',
    },
    requirementsList: {
        gap: 4,
    },
    requirementItem: {
        fontSize: 14,
        color: '#666666',
    },
    saveButton: {
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        padding: 15,
        marginTop: 20,
    },
    saveButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
});
