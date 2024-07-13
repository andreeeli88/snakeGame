import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';
import RegistroScreen from './RegistroScreen';

export default function LoginScreen({navigation}: any) {

    const [correo, setcorreo] = useState('')
    const [contrasenia, setcontrasenia] = useState('')

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate("Game")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
        } 

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder='Ingresar email'
                keyboardType='email-address'
                onChangeText={(texto: any) => setcorreo(texto)}
                value={correo}
            />
            <TextInput
                style={styles.input}
                placeholder='Ingresar contraseña'
                secureTextEntry
                onChangeText={(texto: any) => setcontrasenia(texto)}
                value={contrasenia}
            />
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20,
        backgroundColor: '#FFB6C1',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        backgroundColor: '#333',
        padding: 12,
        alignItems: 'center',
        borderRadius: 40,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})
