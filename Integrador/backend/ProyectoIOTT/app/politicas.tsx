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

export default function PoliticasScreen() {
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
                            <TouchableOpacity onPress={() => console.log('Ver productos')}>
                                <Text style={styles.navText}>Ver productos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Sección Hero (opcional) */}
                    <View style={styles.heroSection}>
                        <Image
                            source={require('../assets/images/icon.png')} // Ajusta la ruta o usa otra imagen
                            style={styles.heroImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Contenido principal: Políticas */}
                    <View style={styles.mainContent}>
                        <Text style={styles.title}>Políticas</Text>
                        <Text style={styles.parrafo}>
                            Nuestra misión es brindar soluciones IoT de alta calidad que permitan a
                            nuestros clientes asegurar y controlar sus dispositivos de forma confiable.
                        </Text>
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
    /* Hero */
    heroSection: {
        marginTop: 10,
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        height: 200,
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