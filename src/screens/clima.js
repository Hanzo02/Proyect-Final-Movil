import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const Clima = () => {
  const [markers, setMarkers] = useState([]);
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [clima, setClima] = useState(null);

  const obtenerDatosClima = async (lat, lon) => {
    try {
      const apiKey = '68cdbdd2dd9593d96707fbf5754452de';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      if (response.ok && data.main) {
        const temperatura = data.main.temp;
        const humedad = data.main.humidity;
        const viento = data.wind ? data.wind.speed : 0;

        setClima({ temperatura, humedad, viento });
      } else {
        console.warn('Advertencia: Los datos del clima no tienen el formato esperado.');
      }
    } catch (error) {
      console.error('Error al obtener datos del clima:', error);
      console.warn('Advertencia: Hubo un error al obtener los datos del clima. Por favor, inténtalo de nuevo.');
    }
  };

  const handleMarkerPress = (marker) => {
    console.log('Marker pressed:', marker);
    obtenerDatosClima(marker.coordinate.latitude, marker.coordinate.longitude);
  };

  const handleAddMarker = () => {
    if (!latitud || !longitud) {
      alert('Latitud y Longitud son obligatorios');
      return;
    }

    const newMarker = {
      id: markers.length + 1,
      coordinate: {
        latitude: parseFloat(latitud),
        longitude: parseFloat(longitud),
      },
    };

    setMarkers([...markers, newMarker]);
    setLatitud('');
    setLongitud('');
  };

  useEffect(() => {
    if (markers.length > 0) {
      const lastMarker = markers[markers.length - 1];
      const { latitude, longitude } = lastMarker.coordinate;

      obtenerDatosClima(latitude, longitude);
    }
  }, [markers]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 18.544109,
          longitude: -69.9070168,
          latitudeDelta: 2.0922,
          longitudeDelta: 2.0421,
        }}
        onPress={(event) => {
          const { coordinate } = event.nativeEvent;
          setLatitud(coordinate.latitude.toString());
          setLongitud(coordinate.longitude.toString());
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            onPress={() => handleMarkerPress(marker)}
          >
            <Callout>
              <View>
                <Text>{`Latitud: ${marker.coordinate.latitude}`}</Text>
                <Text>{`Longitud: ${marker.coordinate.longitude}`}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Latitud"
          value={latitud}
          onChangeText={setLatitud}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Longitud"
          value={longitud}
          onChangeText={setLongitud}
          keyboardType="numeric"
        />
        <Button title="Agregar Marcador" onPress={handleAddMarker} />
      </View>

      <View style={styles.climaContainer}>
        {clima ? (
          <>
            <Text style={styles.titulo}>Clima en la ubicación seleccionada</Text>
            <Text style={styles.temperatura}>Temperatura: {clima.temperatura}°C</Text>
            <Text style={styles.humedad}>Humedad: {clima.humedad}%</Text>
            <Text style={styles.viento}>Velocidad del Viento: {clima.viento} m/s</Text>
          </>
        ) : (
          <Text style={styles.cargando}>Cargando datos del clima...</Text>
        )}
      </View>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  climaContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  temperatura: {
    fontSize: 15,
    marginBottom: 8,
  },
  humedad: {
    fontSize: 15,
    marginBottom: 8,
  },
  viento: {
    fontSize: 15,
  },
  cargando: {
    fontSize: 18,
    color: 'gray',
  },
});

export default Clima