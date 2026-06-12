import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config'
import { db } from '../firebase/config'
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
        if (!userName) {
            setRegisterError("Complete los datos correctamente")
            return
        }
        auth.createUserWithEmailAndPassword(Email, Password)
            .then(response => {
                db.collection('users').add({
                    owner: Email,
                    User: userName,
                    createdAt: Date.now(),
                })

            })
            .then(() => {
                props.navigation.navigate('Login', { screen: 'Login' })

            })
            .catch(error => {
                console.log(error)
                setRegisterError("Error: " + error.code)
            })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Registro</Text>
            <Text style={styles.Texto}>Email</Text>
            <TextInput style={styles.Input} keyboardType='email-address' placeholder='email' onChangeText={text => setEmail(text)}
                value={Email} />
            <Text style={styles.Texto}>Username</Text>
            <TextInput style={styles.Input} keyboardType='default' placeholder='UserName' onChangeText={text => setUserName(text)}
                value={userName} />
            <Text style={styles.Texto}>Password</Text>
            <TextInput style={styles.Input} secureTextEntry={true} keyboardType='default' placeholder='Password' onChangeText={text => setPassword(text)}
                value={Password} />
            <Pressable style={styles.Boton} onPress={() => onSubmit()}>
                <Text style={styles.BotonText}>Registrarse</Text>
            </Pressable>
            <Text style={styles.TextoError}>{RegisterError}</Text>
            <Text style={styles.h2}>¿Ya tenes tu cuenta?</Text>
            <Pressable style={styles.irAlLogin} onPress={() => props.navigation.navigate('Login', { screen: 'Login' })}>
                <Text style={styles.BotonText} > Iniciar sesión </Text>
            </Pressable>
        </View>
    )
}
export default Register
const styles = StyleSheet.create({
    h1: {
        textAlign: "center",
        fontFamily: 'Courier',
        fontSize: 48,
        fontWeight: 'bold',
        color: '#e5a342',
        marginVertical: 10,
    },
    h2: {
        textAlign: "center",
        fontFamily: 'Courier',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e5a342',
        marginVertical: 10,

    },
    container: {
        paddingHorizontal: 10,
        // backgroundColor: "#F9D694",
        backgroundColor: "#64090E",
        width: "100%",
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    irAlLogin: {
        backgroundColor:"#e5a342",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderStyle: "solid",
    },
    Input: {
        height: 30,
         width: 230,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#E5A342",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        color:"#F4C569"
    },
    Texto: {
        fontSize: 18,
        color: "#F4C569",
        fontFamily: 'Georgia',

    },
    TextoError:{
          fontSize: 18,
        color: "#F4C569",
        fontFamily: 'Georgia',
        marginTop: 10,

    },

    Boton: {
        backgroundColor: "#E5A342",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderStyle: "solid",
        marginTop: 14
    },
    BotonText: {
        fontSize: 18,
        color: "#64090E",
        fontFamily: 'Georgia',
    }

},)
