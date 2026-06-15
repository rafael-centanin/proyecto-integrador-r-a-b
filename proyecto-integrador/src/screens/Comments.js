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
    const [Posts, setPosts] = useState("")
    const likes = Posts.likes || [] //Agrego esto porque sino se nos rompe todo cuando no hay likes lol -Benja

    useEffect(() => {
        const comentario = db.collection('posts').doc(postId).onSnapshot(doc => {
            const comentarios = doc.data().comentario
            const PostActual = doc.data()
            console.log(PostActual)
            setPosts(PostActual)

            if (comentarios) {
                setArrayComentario(comentarios)
            }
        })
        return comentario
    }, [postId])

    function actualizarDatos() {
        let ComentarioUsuarios = {
            texto: coment,
            owner: auth.currentUser.email //Tenemos que hacer un objeto literal para que aparezca ahora el user que escribio
        }
        db.collection('posts')
            .doc(postId)
            .update({
                comentario: firebase.firestore.FieldValue.arrayUnion(ComentarioUsuarios)
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
            <View style={styles.cajitaOwner}>
                <Text style={styles.textito}>{Posts.owner}</Text>
                <Text style={styles.descri}>{Posts.descripcionPost}</Text>
                <Text style={styles.likes}>{likes.length > 0 ? likes.length : "No hay "} Likes</Text>
            </View>
            <Text style={styles.h2}> Comentarios</Text>
            <TextInput style={styles.Input} placeholder="Comenta!" value={coment} onChangeText={(text) => setComent(text)} />
            <Pressable style={styles.Boton} onPress={() => actualizarDatos()}>
                <Text style={styles.BotonText}>Comentar</Text>
            </Pressable>
            <Text style={styles.h3}>  Comentarios anteriores</Text>
            <FlatList
                data={ArrayComentario}
                keyExtractor={item => item}
                renderItem={({ item }) => (<View style={styles.containerAnt}>
                    <Text style={styles.text}>{item.owner}</Text>
                    <Text style={styles.text3}>{item.texto}</Text>
                </View>)}
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
    h2: {
        textAlign: "center",
        fontFamily: 'Courier',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#64090E',
        marginVertical: 10,
    },
    h3: {
        fontFamily: 'Times New Roman',
        fontSize: 18,
        fontStyle: 'italic',
        lineHeight: 26,
        color: '#64090E',
        paddingLeft: 15
    },
    textito:{
        color: '#e5a342',
        fontFamily: 'Georgia',
        fontSize: 16,
        marginVertical: 5,
        fontWeight: 'bold',
    },
    descri:{
        color: '#F9D694',
        fontFamily: 'Georgia',
        fontSize: 16,
        marginVertical: 5,
        // fontWeight: 'bold',
    },
    likes:{
        color: '#F9D694',
        fontFamily: 'Georgia',
        fontSize: 16,
        marginVertical: 5,
        fontWeight: 'bold',
    },
    container: {
        paddingHorizontal: 10,
        backgroundColor: "#F9D694",
        width: "100%",
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    cajitaOwner:{
        backgroundColor: '#64090E',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginVertical: 6,
        width: 280,
        
    },
    containerAnt: {
        backgroundColor: '#64090E',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginVertical: 6,
        width: 280,
        alignSelf: 'flex-end'
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
        // flex: 1
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
        color: '#e5a342',
        fontFamily: 'Georgia',
        fontSize: 16,
        marginVertical: 5,
        fontWeight: 'bold',
    },
    text3:{
        color:"#F9D694" ,
        fontFamily: 'Georgia',
        fontSize: 16,
        marginVertical: 5,
    }
},)
