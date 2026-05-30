import React from "react"
import { View, Text, FlatList, Pressable, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { auth } from 'ruta/a/firebase/config';

function Register(props) {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    function onSubmit() {
        props.navigation.navigate('Login')
        console.log();

    }
    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <TextInput style={styles.field}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => setEmail(text)}
                value={email} />
            <TextInput style={styles.field}
                keyboardType='user-name'
                placeholder='name'
                onChangeText={text => setName(text)}
                value={name} />
            <TextInput style={styles.field}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password} />
            <Pressable style={styles.boton}
                onPress={() => onSubmit()}>
                <Text>Registrarse</Text>
            </Pressable>
        </View>
    )
}
export default Register;