import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Multa = () => {
  const [multas, setMultas] = useState([]);
  const [selectedMulta, setSelectedMulta] = useState(null);


  const fetchData = async () => {
    const savedID = await AsyncStorage.getItem('userId');
    fetch(`http://10.0.0.41:8080/api/v1/penalties/${savedID}`)
      .then(response => response.json())
      .then(data => setMultas(data["penalties"]))
      .catch(error => console.error(error));
      console.log(multas)
  };

  useEffect(() => {

fetchData()

  }, []);

  const handleMarkerPress = multa => {
    setSelectedMulta(multa);
    
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 18.544109,
          longitude: -69.9070168,
          latitudeDelta: 2.0922,
          longitudeDelta: 2.0421,
        }}
      >
        {multas.map(multa => (
          <Marker
            key={multa.id}
            coordinate={{ latitude: parseFloat(multa.data.lat), longitude: parseFloat(multa.data.lon) }}
            onPress={() => handleMarkerPress(multa)}
          >
            <Callout>
              <Text>Placa: {multa.data.placa}</Text>
              <Text>Fecha: {multa.data.fecha}</Text>
              <Text>Hora: {multa.data.hora}</Text>
              <Text>Motivo: {multa.data.motivo}</Text>
              <Text>Comentario: {multa.data.comentario}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {selectedMulta && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: 'white' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Detalles de la Multa</Text>
          <Text>ID: {selectedMulta.id}</Text>
          <Text>Nombre: {selectedMulta.data.nombre}</Text>
          <Text>Motivo: {selectedMulta.data.motivo}</Text>
          {/* Agrega aquí cualquier otro detalle que quieras mostrar */}
        </View>
      )}
    </View>
  );
};

export default Multa;
