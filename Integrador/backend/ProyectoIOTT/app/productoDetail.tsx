// app/productDetail.tsx
import React from 'react';
import { useRoute } from '@react-navigation/native';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet
    } from 'react-native';

    // Ajusta la ruta donde tengas tu array de productos
    import { products } from '@/app/navigation/AppNavigator';

    type Product = {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    };

    export default function ProductDetail() {
    // Leemos productId desde route.params (react-navigation)
    const route = useRoute<{ key: string; name: string; params: { productId: string } }>();
    const { productId } = route.params;

    // Busca el producto según el productId
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Tarjeta blanca */}
            <View style={styles.cardContainer}>
                {/* Barra Superior */}
                <View style={styles.topBar}>
                <Text style={styles.logo}>Segurix</Text>
                </View>

                <View style={styles.contentContainer}>
                <Text style={styles.errorText}>Producto no encontrado</Text>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
        );
    }

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
                <Text style={styles.title}>Detalle de {product.name}</Text>
                
                <Image source={{ uri: product.image }} style={styles.image} />
                
                <View style={styles.detailsRow}>
                <Text style={styles.label}>Precio:</Text>
                <Text style={styles.value}>${product.price}</Text>
                </View>
                
                <View style={styles.detailsRow}>
                <Text style={styles.label}>Descripción:</Text>
                <Text style={styles.value}>
                    {product.description || 'Sin descripción disponible.'}
                </Text>
                </View>
            </View>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    // Fondo azul (igual que en tus otras pantallas)
    screen: {
        flex: 1,
        backgroundColor: '#CFE2FF',
    },
    // Centra verticalmente la tarjeta si lo deseas
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
        // Sombra en iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        // Sombra en Android
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
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 15,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    detailsRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E1E1E',
    },
    value: {
        fontSize: 18,
        color: '#2C2C2C',
        maxWidth: '60%',
        textAlign: 'right',
    },
});
