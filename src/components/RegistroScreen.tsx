import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/Config'

export default function RegistroScreen( {navigation}: any ) {
    const [correo, setcorreo] = useState('')
    const [contrasenia, setcontrasenia] = useState('')
    const [nick, setNick] = useState('')
    const [edad, setedad] = useState('')
  
    const [userId, setuserId] = useState('')
  
    function registro() {
        createUserWithEmailAndPassword(auth, correo, contrasenia)
        .then((userCredential) => {
            const user = userCredential.user;
            navigation.navigate('Login')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
  
    return (
        <View style={styles.container} >
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.input}
                placeholder='Ingrese email'
                onChangeText={(texto) => setcorreo(texto)}
                value={correo}
            />
            <TextInput
                style={styles.input}
                placeholder='Ingrese contraseña'
                secureTextEntry
                onChangeText={(texto) => setcontrasenia(texto)}
                value={contrasenia}
            />
            <TextInput 
                style={styles.input}
                placeholder='Ingrese un nick'
                onChangeText={(texto) => setNick(texto)}
                value={nick}
            />
            <TextInput 
                style={styles.input}
                placeholder='Edad'
                onChangeText={(texto) => setedad(texto)}
                value={edad}
            />
            <TouchableOpacity style={styles.button} onPress={registro}>
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
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})
