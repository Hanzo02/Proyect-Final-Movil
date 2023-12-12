import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Registro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleRegister = async () => {
    // Validaciones
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      console.log('Enviando solicitud de registro...');
      const response = await fetch('http://10.0.0.41:8080/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Verificar la respuesta de la API
      if (response.ok) {
        console.log('Registro exitoso.');
        setRegistroExitoso(true);
      } else {
        const errorData = await response.json();
        console.error('Error en el registro:', errorData);
        Alert.alert('Error', `Error en el registro: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
      Alert.alert('Error', 'Hubo un problema al intentar registrarse. Por favor, inténtalo de nuevo.');
    }
  };

  const handleAceptar = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {registroExitoso ? (
        <>
          <Text style={styles.title}>¡Registro Exitoso!</Text>
          <TouchableOpacity style={styles.button} onPress={handleAceptar}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Registro</Text>
          <TextInput
            style={styles.input}
            placeholder="Gmail"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Registro;
