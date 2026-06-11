import React from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config"
import { useState } from "react";
import { Pressable } from "react-native";

function CreatePost() {
    const [mensaje, setMensaje] = useState("")
    const [descripcion, setDescripcion] = useState("");

    function onSubmit() {
        db.collection("posts").add({
            owner: auth.currentUser.email,
            descripcionPost: descripcion,
            createdAt: Date.now(),
            likes: []
        })
            .then(() => {
                setMensaje("Publicado!")
                setDescripcion("")
            })
            .catch(e => console.log(e))
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image}
                    source={require('../../assets/android-chrome-512x512.png')}
                    resizeMode='cover' />
                <Text style={styles.h1}>Lumíere Rouge</Text>
            </View>
            <Text style={styles.h3}> Crear un nuevo post</Text>
            <TextInput style={styles.descripcion} placeholder="Escribí tu posteo..." value={descripcion}
                onChangeText={(text) => {
                    setMensaje("")
                    setDescripcion(text)
                }} />
            <Pressable style={styles.Boton} onPress={onSubmit}>
                <Text style={styles.BotonText}>Publicar Post</Text>
            </Pressable>
            <Text style={styles.BotonText2}>{mensaje}</Text>

        </View>
    )
}

export default CreatePost;

const styles = StyleSheet.create({
    h1: {
        textAlign: "center",
        fontFamily: 'Courier',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#e5a342',
        marginVertical: 10,
    }, h3: {
        fontFamily: 'Times New Roman',
        fontSize: 26,
        fontStyle: 'italic',
        lineHeight: 26,
        color: '#E5A342',
        paddingLeft: 15,
        alignSelf: "flex-start",
        marginBottom: 12
    },
    container: {
        backgroundColor: "#64090E",
        width: "100%",
        flex: 1,
        alignItems: 'center'
    },
    descripcion: {
        borderColor: "black",
        borderRadius: 22,
        backgroundColor: "#F4C569",
        fontFamily: 'Georgia',
        fontSize: 18,
        marginBottom: 15,
        padding: 55,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 10,
        marginRight: 10,
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
    },
    BotonText2: {
        backgroundColor: "#F4C569",
        padding: 3,
        borderRadius: 6,
        fontFamily: 'Georgia',
        fontSize: 16,
        marginBottom: 3,
        marginTop: 12,
        alignSelf: 'center',
    },
},)