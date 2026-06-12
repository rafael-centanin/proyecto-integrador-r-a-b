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
            <Text style={styles.Texto}>Email</Text>
            <TextInput style={styles.Input}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => setEmail(text)}
                value={Email} />
            <Text style={styles.Texto} >Password</Text>
            <TextInput style={styles.Input}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={Password} />
            {LoginError ? (
                <Text style={styles.TextoError}>
                    {LoginError}
                </Text>
            ) : null}
            <Pressable style={styles.Boton}
                onPress={() => onSubmit()}>
                <Text style={styles.BotonText}>Ingresar</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Register', { screen: 'Register' })}>
                <Text style={styles.Texto}> No tengo cuenta</Text>
            </Pressable>
        </View>
    )
}
export default Login;

const styles = StyleSheet.create({
    h1: {
        textAlign: "center",
        fontFamily: 'Courier',
        fontSize: 50,
        fontWeight: 'bold',
        color: '#64090E',
        marginVertical: 10,
    },
    container: {
        paddingHorizontal: 10,
        backgroundColor: "#F9D694",
        width: "100%",
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"

    },
    Input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#64090E",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        color:"#64090E",
          width: 230,
    },
    Boton: {
        backgroundColor: "#64090E",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderStyle: "solid",
        marginTop: 14
    },
    BotonText: {
        fontSize: 18,
        color: "#F9D694",
        fontFamily: 'Georgia',
    },
    Texto: {
        fontSize: 18,
        color: "#64090E",
        fontFamily: 'Georgia',

    },
       TextoError:{
          fontSize: 18,
        color: "#64090E",
        fontFamily: 'Georgia',
        marginTop: 10,

    },

},)