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
    }, [postId])

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
                renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
            />
        </View>
    )
}
export default Comments;

const styles = StyleSheet.create({
    h1: {
        textAlign: "center",
        fontFamily: 'Courier',
        fontSize: 55,
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
        paddingVertical: 30,
        paddingHorizontal: 15,
        borderWidth: 7,
        borderColor: "#64090E",
        borderStyle: "solid",
        borderRadius: 15,
        marginVertical: 20,
        marginLeft: 30,
        color: "#64090E",
        width: 280,
    },
    flatlist: {
        backgroundColor: "#64090E",
        width: "100%",
        flex: 1
    },
    Boton: {
        backgroundColor: "#64090E",
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: "center",
        borderRadius: 15,
        borderStyle: "solid",
        marginLeft: 3,
        marginTop: 14
    },
    BotonText: {
        fontSize: 18,
        color: "#F9D694",
        fontFamily: 'Georgia',
    },
    posts: {
        backgroundColor: "#64090E"
    },
    text: {
        color: "#64090E",
        fontFamily: 'Georgia',
        fontSize: 16,
        marginVertical: 5,
    }
},)
