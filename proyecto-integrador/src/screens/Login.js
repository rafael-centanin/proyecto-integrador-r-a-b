import React from "react"
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";

function Login(props) {
        const [email, setEmail] = useState("")

        const [password, setPassword] = useState("")
    function onSubmit() {
        props.navigation.navigate('Register')
        props.navigation.navigate('HomeMenu')
        console.log();
    }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput style={styles.field}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => setEmail(text)}
                    value={email} />
                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password} />

                <Pressable style={styles.boton}
                    onPress={() => onSubmit()}>
                    <Text>Login</Text>
                </Pressable>
            </View>
)
}
export default Login;