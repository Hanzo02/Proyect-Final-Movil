import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MultasRegistradas = () => {
  const [multas, setMultas] = useState([]);
  const [selectedMulta, setSelectedMulta] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const fetchData = async () => {
    const savedID = await AsyncStorage.getItem('userId');
    fetch(`http://10.0.0.41:8080/api/v1/penalties/${savedID}`)
      .then(response => response.json())
      .then(data => setMultas(data["penalties"]))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMulta) {
      AsyncStorage.getItem(`multa_${selectedMulta.id}_image`)
        .then(uri => setImageUri(uri))
        .catch(error => console.error('Error al obtener la imagen:', error));
    } else {
      setImageUri(null);
    }
  }, [selectedMulta]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedMulta(item)}>
      <View style={styles.multa}>
        <Text style={styles.codigo}>{item.data.placa}</Text>
        <Text style={styles.nombre}>{item.data.cedula}</Text>
        <Text style={styles.motivo}>{item.data.motivo}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={multas}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {selectedMulta && (
        <ScrollView style={styles.detailContainer}>
          <Text style={styles.detailText}>Placa: {selectedMulta.data.placa}</Text>
          <Text style={styles.detailText}>Cédula: {selectedMulta.data.cedula}</Text>
          <Text style={styles.detailText}>Motivo: {selectedMulta.data.motivo}</Text>
          <Text style={styles.detailText}>Fecha: {selectedMulta.data.fecha}</Text>
          <Text style={styles.detailText}>Hora: {selectedMulta.data.hora}</Text>
          <Text style={styles.detailText}>Comentario: {selectedMulta.data.comentario}</Text>
          <Text style={styles.detailText}>Latitud: {selectedMulta.data.lat}</Text>
          <Text style={styles.detailText}>Longitud: {selectedMulta.data.lon}</Text>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  multa: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#eee',
    padding: 10,
  },
  codigo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nombre: {
    fontSize: 16,
  },
  motivo: {
    fontSize: 14,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});

export default MultasRegistradas;
