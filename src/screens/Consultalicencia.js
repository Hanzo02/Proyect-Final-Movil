import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

const Consultalicencia = () => {
  const [license, setLicense] = useState('');
  const [driver, setDriver] = useState(null);

  const fetchDriverData = async () => {
    try {
      const response = await fetch(`http://10.0.0.41:8080/api/v1/conductor/${license}`);
      const json = await response.json();
      if (json.ok) {
        setDriver(json.conductor);
      } else {
        throw new Error('Error al obtener los datos del conductor');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de conductor por licencia</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setLicense(text)}
        value={license}
        placeholder="Ingrese la licencia aquí"
      />
      <Button
        title="Confirmar"
        onPress={fetchDriverData}
      />
      {driver && (
        <View style={styles.driverContainer}>
          <Image
            style={styles.driverImage}
            source={{ uri: driver.photo }}
          />
          <Text style={styles.driverText}><Text style={styles.bold}>Nombre:</Text> {driver.name}</Text>
          <Text style={styles.driverText}><Text style={styles.bold}>Apellido:</Text> {driver.last}</Text>
          <Text style={styles.driverText}><Text style={styles.bold}>Fecha de nacimiento:</Text> {driver.birth}</Text>
          <Text style={styles.driverText}><Text style={styles.bold}>Dirección:</Text> {driver.address}</Text>
          <Text style={styles.driverText}><Text style={styles.bold}>Teléfono:</Text> {driver.phone}</Text>
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
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#AAA',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  driverContainer: {
    marginTop: 20,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 5,
  },
  driverImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center', 
  },
  driverText: {
    fontSize: 18,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Consultalicencia;
