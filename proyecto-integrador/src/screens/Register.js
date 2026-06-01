import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config'
import { View, Text, Pressable, StyleSheet, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';

function Register(props) {
    const [Email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [Password, setPassword] = useState("")
    const [RegisterError, setRegisterError] = useState()


    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                props.navigation.navigate("HomeMenu")
            }
        })
    }, [])


    function onSubmit() {
        setRegisterError("")
        if (!userName){
            setRegisterError("Complete los datos correctamente")
            return
        }
        auth.createUserWithEmailAndPassword(Email, Password)
            .then(response => {
                console.log(Email, Password, response)
                props.navigation.navigate('Login', { screen: 'Login' })
            }
            )
            .catch(error => {
                console.log(error)
                setRegisterError("Error: " + error.code)
            })
        console.log(Email, userName, Password)
    }


    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Registro</Text>
            <Text>Email</Text>
            <TextInput style={styles.Input} keyboardType='email-address' placeholder='email' onChangeText={text => setEmail(text)}
                value={Email} />
            <Text>UserName</Text>
            <TextInput style={styles.Input} keyboardType='default' placeholder='UserName' onChangeText={text => setUserName(text)}
                value={userName} />
            <Text>Password</Text>
            <TextInput style={styles.Input} secureTextEntry={true} keyboardType='default' placeholder='Password' onChangeText={text => setPassword(text)}
                value={Password} />
            <Pressable style={styles.Boton} onPress={() => onSubmit()}>
                <Text style={styles.BotonText}>Registrarse</Text>
            </Pressable>
            <Text style={styles.h1}>{RegisterError}</Text>
            <Text  style={styles.h1}>Ya tenes tu cuenta</Text>
            <Pressable  onPress={() => props.navigation.navigate('Login', { screen: 'Login' })}>
                <Text style={styles.irAlLogin}> Ya tengo cuenta</Text>
            </Pressable>
            
        </View>
    )
}

export default Register
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
    irAlLogin: {
        backgroundColor: "#51B9E9",
        padding: 6,
        borderRadius: 6,
        textAlign: "center",
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
