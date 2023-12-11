import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import Registro from './src/screens/Registro';
import Home from './src/screens/home';
import clima from './src/screens/clima';
import multa_regis from './src/screens/multa_regis';
import multa from './src/screens/Multa';
import noticias from './src/screens/noticias';
import Tarifario from './src/screens/Tarifario';
import horos from './src/screens/horos';
import Consultaplaca from './src/screens/Consultaplaca';
import Consultalicencia from './src/screens/Consultalicencia';
import MultasRegistradas from './src/screens/MultasRegistradas';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Registro} />
        <Stack.Screen name="Home"component={Home} options={{headerLeft: null}}/>
        <Stack.Screen name="Clima" component={clima} />
        <Stack.Screen name='Consultas-licencia' component={Consultalicencia} />
        <Stack.Screen name='Consultas-placa' component={Consultaplaca} />
        <Stack.Screen name='Horoscopo' component={horos} />
        <Stack.Screen name='Multa-Regis' component={multa_regis} />
        <Stack.Screen name="MultasRegistradas" component={MultasRegistradas}/>
        <Stack.Screen name='Multa' component={multa} />
        <Stack.Screen name='Noticias' component={noticias} />
        <Stack.Screen name='Tarifario' component={Tarifario} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App



