import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MultasRegistradas = () => {
  const [multas, setMultas] = useState([]);
  const [selectedMulta, setSelectedMulta] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.11:8080/api/v1/penalties/')
      .then(response => response.json())
      .then(data => setMultas(data))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedMulta(item)}>
      <Text style={styles.codigo}>{item.codigo}</Text>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.motivo}>{item.motivo}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={multas}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {selectedMulta && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 18.544109,
            longitude: -69.9070168,
            latitudeDelta: 2.0922,
            longitudeDelta: 2.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: selectedMulta.latitud, longitude: selectedMulta.longitud }}
            title={selectedMulta.nombre}
            description={selectedMulta.motivo}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  multa: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#eee',
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
  map: {
    flex: 1,
  },
});

export default MultasRegistradas;
