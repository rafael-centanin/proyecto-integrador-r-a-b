import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { auth, db } from "../firebase/config";
import Post from "../Components/Post";

function Profile(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState("")
  let email = auth.currentUser.email

  function Logout() {
    auth.signOut();
    props.navigation.navigate('Login');
  }

useEffect(() => {
  auth.onAuthStateChanged(userauth => {
    if (!userauth) {
      return;
    }

    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
      let userData = [];
      docs.forEach(doc => {
        userData.push({
          id: doc.id,
          data: doc.data()
        });
      });
      setUser(userData);
      console.log(userData);
    });

    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
      let userPost = [];
      docs.forEach(doc => {
        userPost.push({
          id: doc.id,
          data: doc.data()
        });
      });
      setPosts(userPost);
      console.log(userPost);
      setLoading(false);
    });

  });
}, []);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        {loading === true ? <Text>cargando...</Text> : user && user.length > 0 ? <><Text>{user[0].data.User} {user[0].data.owner}</Text>
          <FlatList data={posts} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Post post={item}> </Post>} /></> : <Text>Sin datos</Text>}
        <Pressable style={styles.Boton} onPress={() => Logout()}>
          <Text style={styles.texto}>Desloguearse</Text>
        </Pressable>
      </View>
    );
  }

export default Profile;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000000',
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
    texto: {
      fontSize: 18,
      color: "#fff",
    },
  });