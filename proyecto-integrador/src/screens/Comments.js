
import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { db,auth } from '../firebase/config';
import Post from '../Components/Post';
function Comments(){
    const[coment, setComent]= useState()

    return(
        <View>
            <Text>Hola Benja</Text>
        </View>
    )
}
export default Comments;