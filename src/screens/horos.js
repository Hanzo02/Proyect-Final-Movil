import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Horos = () => {
  const [sign, setSign] = useState('');
  const [horoscope, setHoroscope] = useState(null);

  const fetchData = async () => {
    const url = `https://horoscope-api.p.rapidapi.com/pt/${sign}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd6ba7cefdbmsh0368acfed98e1ccp1bddd3jsn53b2795e7efc',
        'X-RapidAPI-Host': 'horoscope-api.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();


      setHoroscope(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horóscopo del Día</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setSign(text)}
        value={sign}
        placeholder="Digite seu signo aqui"
      />
      <Button
        title="Ver Horóscopo"
        onPress={fetchData}
      />
      {horoscope && (
        <View style={styles.horoscopeContainer}>
          <Text style={styles.horoscopeText}>Título: {horoscope.title}</Text>
          <Text style={styles.horoscopeText}>Data: {horoscope.date}</Text>
          <Text style={styles.horoscopeText}>Horóscopo: {horoscope.text}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  horoscopeContainer: {
    marginTop: 20,
  },
  horoscopeText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Horos;
