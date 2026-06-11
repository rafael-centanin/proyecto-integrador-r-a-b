import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import Post from '../Components/Post';


function HomePage(props) {
    const [posts, setPosteos] = useState([]);

    useEffect(() => {
        db.collection("posts").orderBy("createdAt", "desc").onSnapshot(docs => {
            let posts = [];

            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })

            })
            setPosteos(posts)
        })

    }, [])
    console.log(auth.currentUser.email)

    return (
        <View style={styles.flatlist}>
            <View style={styles.header}>
                <Image style={styles.image}
                    source={require('../../assets/android-chrome-512x512.png')}
                    resizeMode='cover' />
                <Text style={styles.h1}>Lumíere Rouge</Text>
            </View>
            <Text style={styles.h3}>Ultimas publicaciones</Text>
            <FlatList data={posts}
                keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Post post={item} navigation={props.navigation} > </Post>} />
        </View>

    )
}

export default HomePage;
const styles = StyleSheet.create({
    h1: {
        textAlign: "center",
        fontFamily: 'Courier',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#e5a342',
        marginVertical: 10,
    },
    h3: {
        fontFamily: 'Times New Roman',
        fontSize: 18,
        fontStyle: 'italic',
        lineHeight: 26,
        color: '#E5A342',
        paddingLeft: 15
    },
    flatlist: {
        backgroundColor: "#64090E",
        width: "100%",
        flex: 1
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
    posts: {
        backgroundColor: "#F9D694"
    }
})