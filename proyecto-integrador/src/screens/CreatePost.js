import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config"
import { useState } from "react";
import { Pressable } from "react-native";

function CreatePost() {

    const [descripcion, setDescripcion] = useState("");

    function onSubmit() {
        db.collection("posts").add({
            owner: auth.currentUser.email,
            descripcionPost: descripcion,
            createdAt: Date.now(),
            likes: []
        })
            .then()
            .catch(e => console.log(e))
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.h1}> Crear nuevo post</Text>
            <TextInput style={styles.Input} placeholder="Escribí tu posteo..." value={descripcion} onChangeText={(text) => setDescripcion(text)} />
            <Pressable style={styles.Boton} onPress={onSubmit}>
                <Text style={styles.BotonText}>Publicar Post</Text>
            </Pressable>
            
        </View>
    )
}

export default CreatePost;

const styles = StyleSheet.create({
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        marginVertical: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop:40
    },
    Input: {
        height: 20,
        paddingVertical: 50,
        paddingHorizontal: 50,
        borderWidth: 1,
        borderStyle: "solid",
        marginVertical: 10,
    },
    Boton: {
        backgroundColor: "#28a3a7",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor:"#28a3a7",
    },
    BotonText: {
        color: "#fff",
    }
},)