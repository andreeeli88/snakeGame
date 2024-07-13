import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/LoginScreen';
import RegistroScreen from '../components/RegistroScreen';
import { NavigationContainer } from '@react-navigation/native';
import Game from '../components/Game';

const Stack = createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Registro' component={RegistroScreen}/>
            <Stack.Screen name='Game' component={Game}/>
        </Stack.Navigator>
    )
} 



export default function MainNavegador() {
  return (
    <NavigationContainer>
        <MyStack/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})