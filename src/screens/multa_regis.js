import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, StyleSheet, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const Multa_regis = () => {
  const [cedula, setCedula] = useState('');
  const [placa, setPlaca] = useState('');
  const [motivo, setMotivo] = useState('');
  const [comentario, setComentario] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [fecha, setFecha] = useState(new Date().toLocaleDateString());
  const [hora, setHora] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [motivos, setMotivos] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchMotivos = async () => {
      try {
        const response = await fetch('http://10.0.0.41:8080/api/v1/penalty');
        const data = await response.json();
        setMotivos(data.penalties.map(item => item.id));
      } catch (error) {
        console.error('Error al obtener los motivos:', error.message);
      }
    };

    fetchMotivos();
  }, []);

  const submitPenalty = async () => {
    try {
      const savedID = await AsyncStorage.getItem('userId');
      const id = savedID;

      const penalty = {
        id,
        cedula,
        placa,
        motivo,
        comentario,
        lat,
        lon,
        fecha,
        hora,
        photo,
      };

      const response = await fetch(`http://10.0.0.41:8080/api/v1/penalties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(penalty),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la multa');
      }

      console.log('Multa registrada con éxito');

      // Guardar la imagen en AsyncStorage
      if (photo) {
        await AsyncStorage.setItem(`multa_${id}_image`, photo);
      }

      // Limpiar los campos después de enviar
      setCedula('');
      setPlaca('');
      setMotivo('');
      setComentario('');
      setLat('');
      setLon('');
      setFecha(new Date().toLocaleDateString());
      setHora(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setPhoto(null);

      // Deshabilitar el botón después de enviar
      setIsFormValid(false);
    } catch (error) {
      console.error('Error al registrar la multa:', error.message);
    }
  };

  const handleInputChange = (value, setState) => {
    setState(value);
    validateForm();
  };

  const validateForm = () => {
    if (cedula && placa && motivo && comentario && lat && lon && fecha && hora && photo) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const selectPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if (!pickerResult.cancelled) {
      setPhoto(pickerResult.uri);
      validateForm();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Multas</Text>
      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={(value) => handleInputChange(value, setCedula)}
      />
      <TextInput
        style={styles.input}
        placeholder="Placa del vehículo"
        value={placa}
        onChangeText={(value) => handleInputChange(value, setPlaca)}
      />
      <Picker
        style={styles.picker}
        selectedValue={motivo}
        onValueChange={(itemValue) => handleInputChange(itemValue, setMotivo)}
      >
        {motivos.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Comentario"
        value={comentario}
        onChangeText={(value) => handleInputChange(value, setComentario)}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitud"
        value={lat}
        onChangeText={(value) => handleInputChange(value, setLat)}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitud"
        value={lon}
        onChangeText={(value) => handleInputChange(value, setLon)}
      />
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity onPress={() => validateForm()}>
          <Text style={styles.dateTimeText}>{fecha}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => validateForm()}>
          <Text style={styles.dateTimeText}>{hora}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={selectPhoto}>
        <Text style={styles.dateTimeText}>Seleccionar Foto</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {photo && (
          <Image source={{ uri: photo }} style={styles.image} />
        )}
      </View>
      <Button
        title="Registrar multa"
        onPress={submitPenalty}
        disabled={!isFormValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateTimeText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {
        paddingVertical: 10,
      },
      android: {
        paddingVertical: 0,
      },
    }),
  },
  imageContainer: {
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
});

export default Multa_regis;
