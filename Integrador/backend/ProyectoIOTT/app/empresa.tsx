// app/empresa.tsx
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
    } from 'react-native';
    import { useRouter } from 'expo-router';
    import { Entypo } from '@expo/vector-icons';

    export default function EmpresaScreen() {
    const router = useRouter();

    // Funciones para cada apartado
    // app/empresa.tsx (fragmento)
    const handleMision = () => {
        router.push('/mision');
    };
    const handleVision = () => {
        router.push('/vision');
    };
    const handleValores = () => {
        router.push('/valores');
    };
    const handlePoliticas = () => {
        router.push('/politicas');
    };

    return (
        <SafeAreaView style={styles.screen}>
        <ScrollView style={{ flex: 1 }}>
            
            {/* Tarjeta principal */}
            <View style={styles.cardContainer}>

            {/* Barra Superior */}
            <View style={styles.topBar}>
                <Text style={styles.logo}>Segurix</Text>
                <View style={styles.nav}>
                <TouchableOpacity onPress={() => console.log('Ver productos')}>
                    <Text style={styles.navText}>Ver productos</Text>
                </TouchableOpacity>
                </View>
            </View>

            {/* Sección Hero con imagen */}
            <View style={styles.heroSection}>
                <Image
                source={require('../assets/images/puertaIOT-empresa.png')} // Ajusta la ruta de tu imagen
                style={styles.heroImage}
                resizeMode="contain" // Muestra la imagen completa sin recortarla
                />
            </View>

            {/* Contenido principal */}
            <View style={styles.mainContent}>
                <Text style={styles.title}>¿Quiénes somos?</Text>
                <Text style={styles.parrafo}>
                Lorem ipsum is simply dummy text of the printing and typesetting industry.
                Lorem ipsum is simply dummy text of the printing and typesetting industry.
                </Text>

                {/* Botones Misión, Visión, Valores, Políticas */}
                <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.bigButton} onPress={handleMision}>
                    <Text style={styles.bigButtonText}>Misión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bigButton} onPress={handleVision}>
                    <Text style={styles.bigButtonText}>Visión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bigButton} onPress={handleValores}>
                    <Text style={styles.bigButtonText}>Valores</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bigButton} onPress={handlePoliticas}>
                    <Text style={styles.bigButtonText}>Políticas</Text>
                </TouchableOpacity>
                </View>
            </View>

            {/* Sección inferior: Preguntas Frecuentes y contacto */}
            <View style={styles.bottomSection}>
                <View style={styles.faq}>
                <Text style={styles.faqTitle}>Preguntas frecuentes</Text>
                <Text style={styles.faqItem}>¿Para qué sirve?</Text>
                <Text style={styles.faqItem}>¿Cómo conectar mi dispositivo IoT?</Text>
                </View>

                <View style={styles.contact}>
                <Text style={styles.contactTitle}>Contáctanos</Text>
                <Text style={styles.contactItem}>Col. Horacio Camargo</Text>
                <Text style={styles.contactItem}>segurix@mail.com</Text>
                <Text style={styles.contactItem}>+52 774 545 8510</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.footerLeft}>
                <TouchableOpacity onPress={() => console.log('Términos y condiciones')}>
                    <Text style={styles.footerText}>Términos y condiciones</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Privacidad')}>
                    <Text style={styles.footerText}>Privacidad</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.footerRight}>
                <TouchableOpacity onPress={() => console.log('Instagram')}>
                    <Entypo name="instagram-with-circle" size={24} color="#1E1E1E" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Facebook')}>
                    <Entypo name="facebook-with-circle" size={24} color="#1E1E1E" style={styles.icon} />
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
    /* Contenido scroll */
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
    /* Hero con imagen */
    heroSection: {
        marginTop: 10,
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        height: 250, // Imagen más grande
        borderRadius: 10,
    },
    /* Contenido principal */
    mainContent: {
        marginTop: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 10,
        textAlign: 'center',
    },
    parrafo: {
        fontSize: 16,
        color: '#2C2C2C',
        lineHeight: 22,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    bigButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginVertical: 8,
        width: '40%',
        alignItems: 'center',
        // Sombra
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    bigButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    /* Sección inferior: Preguntas Frecuentes y contacto */
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    faq: {
        flex: 1,
        marginRight: 10,
    },
    faqTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 10,
    },
    faqItem: {
        fontSize: 16,
        color: '#2C2C2C',
        marginBottom: 4,
    },
    contact: {
        flex: 1,
        alignItems: 'flex-end',
        marginLeft: 10,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 10,
    },
    contactItem: {
        fontSize: 16,
        color: '#2C2C2C',
        marginBottom: 4,
    },
    /* Footer final */
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 10,
    },
    footerLeft: {
        flexDirection: 'row',
    },
    footerRight: {
        flexDirection: 'row',
    },
    footerText: {
        fontSize: 14,
        color: '#1E1E1E',
        marginRight: 20,
    },
    icon: {
        marginRight: 15,
    },
});
