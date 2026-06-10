import React from 'react';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { useState, useEffect } from "react";
import Comments from '../screens/Comments';
import HomePage from '../screens/HomePage';

function Post(props) {
    const [Likes, setLikes] = useState(props.post.data.likes || [])
    const UsuarioLike = Likes.includes(auth.currentUser.email)

    function darLike() {
        let emailUsuarioYa = auth.currentUser.email
        db.collection('posts')
            .doc(props.post.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(emailUsuarioYa)
            })
            .then(() => {
                setLikes(Likes.concat(emailUsuarioYa))
            })
    }
    function sacarLike() {
        let emailUsuarioYa = auth.currentUser.email

        db.collection('posts')
            .doc(props.post.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(emailUsuarioYa)
            })
            .then(() => {
                setLikes(Likes.filter(MailUsers => MailUsers !== emailUsuarioYa))
            })
    }
    // function irCommets(props) {
    //         props.navigation.navigate('Comments');
    // }

    return (
        <View style={styles.postContainer}>
            <Text style={styles.email}>{props.post.data.owner}</Text>
            <Text style={styles.descripcion}>{props.post.data.descripcionPost}</Text>
            <Text>{Likes.length} likes</Text>
            {!UsuarioLike? <Pressable style={styles.Boton} onPress={darLike}>
                        <Text style={styles.BotonText}>Dar like</Text>
                        </Pressable>
                :   <Pressable style={styles.Boton} onPress={sacarLike}>
                    <Text style={styles.BotonText}>Quitar like</Text>
                    </Pressable>
            }
            <Pressable onPress={()=> props.navigation.navigate('Comments', { id: props.post.id })}>
                <Text>Comentar</Text>
            </Pressable>
        </View>
    )
}
export default Post;
const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 20,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 15,
    },
    email: {
        fontSize: 12,
        color: "gray",
        marginBottom: 8,

    },
    descripcion: {
        fontSize: 18,
        marginBottom: 15,
    },
})