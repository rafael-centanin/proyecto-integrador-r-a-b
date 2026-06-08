import React from 'react';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
function Post(props) {
    return (
        <View style={styles.postContainer}>
            <Text style={styles.email}>{props.post.data.owner}</Text>
            <Text style={styles.descripcion}>{props.post.data.descripcionPost}</Text>
            {/* <Pressable onPress={darLike}>
                <Text>Like</Text>
            </Pressable> */}
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