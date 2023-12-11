import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
  
const Home = ({ navigation }) => {
    //Boton del login
const goToLogin = () => {
  Alert.alert('Cerrar Sesión', '¿Estás seguro que deseas cerrar sesión?', [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Sí', onPress: () => navigation.navigate('Login') },
  ]);
};

//Boton del clima
const goToclima = () => {
  navigation.navigate('Clima');
}
//Boton de las Consultas placa
const goToconsultasplaca = () => {
  navigation.navigate('Consultas-placa');
}
//Boton de las Consultas
const goToconsultaslicencia = () => {
  navigation.navigate('Consultas-licencia');
}
//Boton de las Consultas
const goToconsultasregistradas = () => {
  navigation.navigate('MultasRegistradas');
}
//Boton del Horoscopo
const goToHoroscopo = () => {
  navigation.navigate('Horoscopo');
}
//Boton de la Multa-regis
const goToMulta_regis = () => {
  navigation.navigate('Multa-Regis');
}
//Boton de la multa
const goTomulta = () => {
  navigation.navigate('Multa');
}
//Boton de Noticias
const goToNoticias = () => {
  navigation.navigate('Noticias');
}
//Boton de tarifario
const goToTarifario = () => {
  navigation.navigate('Tarifario');
}


  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Menu de Funciones</Text>
      {/* Cuadro de botones */}
      <View style={styles.buttonContainer}>
        {/* Filas de botones */}
        <View style={styles.row}>
          <View style={styles.button}>
            <Button title="Tarifario" onPress={goToTarifario} color="#3498db" />
          </View>
          <View style={styles.button}>
            <Button title="Consultas de placa" onPress={goToconsultasplaca} color="#2ecc71" />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.button}>
            <Button title="Consultas de licencia" onPress={goToconsultaslicencia} color="#2ecc71" />
          </View>
          <View style={styles.button}>
            <Button title="Registro de Multas" onPress={goToMulta_regis} color="#e74c3c" />
          </View>
        </View>
        <View style={styles.row}>
        <View style={styles.button}>
            <Button title="MultaRegistradas" onPress={goToconsultasregistradas} color="#e67e22" />
          </View>
        </View>
        <View style={styles.row}>
        <View style={styles.button}>
            <Button title="Mapa de Multas" onPress={goTomulta} color="#f39c12" />
          </View>
          <View style={styles.button}>
            <Button title="Noticias" onPress={goToNoticias} color="#9b59b6" />
          </View>
        </View>
        <View style={styles.row}>
        <View style={styles.button}>
            <Button title="Clima" onPress={goToclima} color="#34495e" />
          </View>
          <View style={styles.button}>
            <Button title="Horóscopo" onPress={goToHoroscopo} color="#e67e22" />
          </View>
        </View>
        
      </View>
      {/* Botón de cierre de sesión más pequeño, de otro color y más abajo */}
      <View style={styles.loginButton}>
        <Button title="Cerrar Sesión" onPress={goToLogin} color="#d35400" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    margin: 10,
    borderRadius: 16,
  },
  loginButton: {
    marginTop: 32,
    borderRadius: 12,
    alignSelf: 'center',
  },
});

export default Home;
  