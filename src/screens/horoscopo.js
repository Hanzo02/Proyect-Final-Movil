import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const horoscopo = () => {
  const [horoscopo, setHoroscopo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'POST',
          url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
          params: { sign: 'aquarius', day: 'today' },
          headers: {
    'X-RapidAPI-Key': 'd6ba7cefdbmsh0368acfed98e1ccp1bddd3jsn53b2795e7efc',
    'X-RapidAPI-Host': 'horoscopeapi-horoscope-v1.p.rapidapi.com'
          },
        };

        const response = await axios.request(options);
        setHoroscopo(response.data);
      } catch (error) {
        console.error('Error fetching horoscope data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tu Horóscopo del Día</Text>
      <Text style={{ fontSize: 18 }}>{horoscopo.description}</Text>
    </View>
  );
};


