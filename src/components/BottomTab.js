import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/home'

const Tab = createBottomTabNavigator

const BottomTab = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  )
}

export default BottomTab