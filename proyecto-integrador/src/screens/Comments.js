import firebase from 'firebase';
import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import HomePage from './HomePage';
import Post from '../Components/Post';
function Comments(props) {
    const postId = props.route.params.id
    const [coment, setComent] = useState("")
    const [ArrayComentario, setArrayComentario] = useState([])

    useEffect(() => {
        const comentario = db.collection('posts').doc(postId).onSnapshot(doc => {
            const comentarios = doc.data().comentario
            if (comentarios) {
                setArrayComentario(comentarios)
            }
        })
        return comentario
    }, [postId]) //Antes se nos rompia lol, aca cambia el comentario cuando se entre a otro

    function actualizarDatos() {
        db.collection('posts')
            .doc(postId)
            .update({
                comentario: firebase.firestore.FieldValue.arrayUnion(coment)
            })
            .then(() => {
                setComent("")
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.h1}> Comentarios</Text>
            <TextInput style={styles.Input} placeholder="Comenta!" value={coment} onChangeText={(text) => setComent(text)} />
            <Pressable style={styles.Boton} onPress={() => actualizarDatos()}>
                <Text style={styles.BotonText}>Comentar</Text>
            </Pressable>
            <FlatList
                data={ArrayComentario}
                keyExtractor={item => item}
                renderItem={({ item }) => <Text>{item}</Text>}
            />
        </View>
    )
}
export default Comments;

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
        marginTop: 40
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
        borderColor: "#28a3a7",
    },
    BotonText: {
        color: "#fff",
    }
},)