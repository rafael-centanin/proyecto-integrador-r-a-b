import React from "react"
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { auth } from '../firebase/config';

function Login(props) {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [LoginError, setLoginError] = useState()

    function onSubmit() {
        if (Email === "" || Password === "") {
            setLoginError("Debe completar email y contraseña");
            return;
        }

        auth.signInWithEmailAndPassword(Email, Password)
            .then(response => {
                console.log(Email, Password, response)
                props.navigation.navigate('HomeMenu', { screen: 'HomePage' })
            }
            )
            .catch(error => {
                console.log(error)
                setLoginError("Error: " + error.code)
            })
        console.log(Email, Password)
    }

    return (
        <View style={styles.container} >
            <Text style={styles.h1}>Login</Text>
            <Text>Email</Text>
            <TextInput style={styles.Input}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => setEmail(text)}
                value={Email} />
            <Text>Password</Text>
            <TextInput style={styles.Input}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={Password} />
            {LoginError ? (
                <Text style={{ color: 'red' }}>
                    {LoginError}
                </Text>
            ) : null}
            <Pressable style={styles.Boton}
                onPress={() => onSubmit()}>
                <Text style={styles.BotonText}>Ingresar</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Register', { screen: 'Register' })}>
                <Text> No tengo cuenta</Text>
            </Pressable>
        </View>
    )
}
export default Login;

const styles = StyleSheet.create({
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        marginVertical: 10,
    },
    container: {
        marginTop: 20,
        paddingHorizontal: 10
    },
    Input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
    },
    Boton: {
        backgroundColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745",
    },
    BotonText: {
        color: "#fff"
    }
},)