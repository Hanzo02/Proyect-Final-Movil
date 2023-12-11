import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { View, Text } from 'react-native';

const Multa = () => {
  const [multas, setMultas] = useState([]);
  const [selectedMulta, setSelectedMulta] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.11:8080/api/v1/penalties')
      .then(response => response.json())
      .then(data => setMultas(data))
      .catch(error => console.error(error));
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
        {multas.map((multa, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: multa.latitud, longitude: multa.longitud }}
            onPress={() => handleMarkerPress(multa)}
          >
            <Callout>
              <Text>Código: {multa.codigo}</Text>
              <Text>Nombre: {multa.nombre}</Text>
              <Text>Motivo: {multa.motivo}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {selectedMulta && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: 'white' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Detalles de la Multa</Text>
          <Text>ID: {selectedMulta.id}</Text>
          <Text>Nombre: {selectedMulta.nombre}</Text>
          <Text>Motivo: {selectedMulta.motivo}</Text>
          {/* Agrega aquí cualquier otro detalle que quieras mostrar */}
        </View>
      )}
    </View>
  );
};

export default Multa;
``