
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from './src/components/Game';
import LoginScreen from './src/components/LoginScreen';
import RegistroScreen from './src/components/RegistroScreen';
import MainNavegador from './src/navigators/MainNavigator';

export default function App(): JSX.Element {
  return <MainNavegador/>;
}

