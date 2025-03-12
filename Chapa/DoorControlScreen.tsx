import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Feather from '@expo/vector-icons/Feather';

// Definir los tipos de navegación
type RootStackParamList = {
  Configuracion: undefined;
  Registros: undefined;
};

const DoorControlScreen = () => {
  // Usar StackNavigationProp con los nombres de las pantallas
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Estado para saber si la puerta está abierta o cerrada
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  // ✅ Función para abrir o cerrar la puerta
  const toggleDoor = async () => {
    try {
      // Llamada al servidor para abrir o cerrar la puerta
      const response = await axios.get("http://172.31.98.206:3000/abrir-cerrar");  // Cambia la IP según corresponda
      alert(response.data);  // Muestra la respuesta del servidor

      // Alterna el estado de la puerta (abierta o cerrada)
      setIsDoorOpen(!isDoorOpen);
    } catch (error) {
      console.log("Error al controlar la puerta:", error);  
      alert('Error al controlar la puerta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispositivo IOT</Text>

      {/* Icono de la puerta */}
      <View style={styles.iconContainer}>
        <Feather name="lock" size={80} color="black" style={styles.lockIcon} />
        <Feather name={isDoorOpen ? "unlock" : "lock"} size={120} color="black" />
      </View>

      {/* Botón de Abrir/Cerrar Puerta */}
      <TouchableOpacity style={styles.openButton} onPress={toggleDoor}>
        <Text style={styles.openButtonText}>{isDoorOpen ? 'Cerrar puerta' : 'Abrir puerta'}</Text>
      </TouchableOpacity>

      {/* Botones de Configuración y Registros */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Configuracion')}>
          <Feather name="settings" size={24} color="black" />
          <Text style={styles.buttonText}>Configuración</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Registros')}>
          <Feather name="file-text" size={24} color="black" />
          <Text style={styles.buttonText}>Registros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  lockIcon: {
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
  },
  openButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    justifyContent: 'center',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DoorControlScreen;
