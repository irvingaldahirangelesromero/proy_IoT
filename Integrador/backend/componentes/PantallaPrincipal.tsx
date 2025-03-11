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

    export default function PantallaPrincipal() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.screen}>
        <ScrollView style={{ flex: 1 }}>
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
                {/* Nuevo botón en la barra superior */}
                <TouchableOpacity onPress={() => router.push('/puerta')}>
                    <Text style={styles.navText}>Dispositivo IOT</Text>
                </TouchableOpacity>
                </View>
            </View>

            {/* Sección Hero (sin el botón Dispositivo IOT) */}
            <View style={styles.heroSection}>
                <Image
                source={require('../assets/images/puertaIOT-pantallaPrincipal.jpg')}
                style={styles.heroImage}
                resizeMode="cover"
                />
                <Text style={styles.heroTitle}>Bienvenido a Segurix</Text>
                <Text style={styles.heroSubtitle}>
                La solución inteligente para controlar y asegurar tus dispositivos IoT.
                </Text>
            </View>

            {/* Sección de Preguntas Frecuentes */}
            <View style={styles.faqSection}>
                <View style={styles.faqItem}>
                <Text style={[styles.faqText, { fontSize: 20, fontWeight: 'bold' }]}>
                    Preguntas Frecuentes
                </Text>
                <Text style={styles.faqText}>¿Para qué sirve Segurix?</Text>
                </View>
                <View style={styles.faqItem}>
                <Text style={styles.faqText}>¿Cómo conectar mi dispositivo IoT?</Text>
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
                <Text style={[styles.footerText, styles.footerTitle]}>Contáctanos</Text>
                <Text style={styles.footerText}>Col. Horacio Camargo</Text>
                <Text style={styles.footerText}>segurix@mail.com</Text>
                <Text style={styles.footerText}>+52 774 545 8510</Text>
                
                <Text style={[styles.footerText, styles.footerTitle]}>Redes sociales</Text>
                <View style={styles.socialIcons}>
                    <TouchableOpacity onPress={() => console.log('Instagram')}>
                    <Entypo
                        name="instagram-with-circle"
                        size={28}
                        color="#1E1E1E"
                        style={styles.socialIcon}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Facebook')}>
                    <Entypo
                        name="facebook-with-circle"
                        size={28}
                        color="#1E1E1E"
                        style={styles.socialIcon}
                    />
                    </TouchableOpacity>
                </View>
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
        backgroundColor: '#CFE2FF', // Fondo azul
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
    /* Sección Hero */
    heroSection: {
        marginTop: 10,
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginTop: 15,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#2C2C2C',
        marginTop: 8,
        textAlign: 'center',
        marginBottom: 10,
    },
    /* Sección FAQ */
    faqSection: {
        marginTop: 30,
    },
    faqItem: {
        backgroundColor: '#F9F9F9',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 6,
    },
    faqText: {
        fontSize: 16,
        color: '#1E1E1E',
    },
    /* Footer */
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 10,
    },
    footerLeft: {
        flex: 1,
    },
    footerRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    footerText: {
        fontSize: 14,
        color: '#1E1E1E',
        marginBottom: 4,
    },
    footerTitle: {
        fontWeight: 'bold',
        marginTop: 8,
    },
    socialIcons: {
        flexDirection: 'row',
        marginTop: 8,
    },
    socialIcon: {
        marginRight: 15,
    },
});
