import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ConsultaVehiculo = () => {
  const [plate, setPlate] = useState('');
  const [vehicle, setVehicle] = useState(null);

  const fetchVehicleData = async () => {
    try {
      const response = await fetch(`http:///10.0.0.41:8080/api/v1/vehicle/${plate}`);
      const json = await response.json();
      if (json.ok) {
        setVehicle(json.vehicle);
      } else {
        throw new Error('Error al obtener los datos del vehículo');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de vehículo por placa</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPlate(text)}
        value={plate}
        placeholder="Ingrese la placa aquí"
      />
      <Button
        title="Confirmar"
        onPress={fetchVehicleData}
      />
      {vehicle && (
        <View style={styles.vehicleContainer}>
          <Text style={styles.vehicleTitle}>Datos del Vehículo</Text>

          <Text style={styles.vehicleText}><Text style={styles.bold}>Modelo:</Text> {vehicle.model}</Text>
          <Text style={styles.vehicleText}><Text style={styles.bold}>Año:</Text> {vehicle.year}</Text>
          <Text style={styles.vehicleText}><Text style={styles.bold}>Color:</Text> {vehicle.color}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#AAA',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  vehicleContainer: {
    marginTop: 20,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 5,
  },
  vehicleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  vehicleText: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ConsultaVehiculo;
