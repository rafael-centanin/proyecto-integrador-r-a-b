import React from "react"
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";

function Login(props) {
        const [email, setEmail] = useState("")

        const [password, setPassword] = useState("")
    function onSubmit() {

        props.navigation.navigate('HomeMenu')
        console.log();
    }

        return (
            <View >
                <Text >Login</Text>
                <TextInput 
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => setEmail(text)}
                    value={email} />
                <TextInput 
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password} />

                <Pressable 
                    onPress={() => onSubmit()}>
                    <Text>Login</Text>
                </Pressable>
            </View>
)
}
export default Login;