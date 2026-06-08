import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import Post from '../Components/Post';

function HomePage() {
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


    return (
        <View style={styles.flatlist}> 

            <Text style={styles.h1}>Home</Text>
            <FlatList data={posts}
            keyExtractor={(item)=> item.id.toString()} renderItem={({item})=>  <Post post={item} />}/>

        </View>

    )
}

export default HomePage;
const styles = StyleSheet.create({
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        marginVertical: 10,
    },
    flatlist:{
        width: "100%",
        flex: 1
    }
})