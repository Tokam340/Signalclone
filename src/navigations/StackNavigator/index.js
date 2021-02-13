import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen/index';
import RegisterScreen from '../../screens/RegisterScreen/index';
import HomeScreen from '../../screens/HomeScreen/index';

const Stack = createStackNavigator();
const globalHeaderStyle = {
    headerStyle: {backgroundColor: '#2c6bed'},
    headerTitleStyle: {color: '#fff',},
    headerTintColor: '#fff'
}

export function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={globalHeaderStyle} />
      <Stack.Screen name="Register" component={RegisterScreen} options={globalHeaderStyle} />
      <Stack.Screen name="Home" component={HomeScreen} options={globalHeaderStyle} />
    </Stack.Navigator>
  );
}