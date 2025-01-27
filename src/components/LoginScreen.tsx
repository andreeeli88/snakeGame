import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';

import { signInWithEmailAndPassword } from "firebase/auth";
import RegistroScreen from './RegistroScreen';

import { getAuth } from 'firebase/auth';
export default function LoginScreen({ navigation }: any) {

    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    const auth = getAuth();

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                    navigation.navigate("Game", { username: user.displayName });
                } else {
                    console.error("No se encontró el nombre de usuario en el objeto user.");
                }
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
                onChangeText={(texto: any) => setCorreo(texto)}
                value={correo}
            />
            <TextInput
                style={styles.input}
                placeholder='Ingresar contraseña'
                secureTextEntry
                onChangeText={(texto: any) => setContrasenia(texto)}
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
});
