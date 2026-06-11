import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, StyleSheet, FlatList } from 'react-native';
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
      <View style={styles.header}>
        <Image style={styles.image}
          source={require('../../assets/android-chrome-512x512.png')}
          resizeMode='cover' />
        <Text style={styles.h1}>Lumíere Rouge</Text>
      </View>
      <Text style={styles.h1}>Profile</Text>
      {loading === true ? <Text>cargando...</Text> : user && user.length > 0 ? <><Text style={styles.h3}> Username: {user[0].data.User} </Text> <Text style={styles.h3}> Email: {user[0].data.owner}</Text>
        <Pressable style={styles.Boton} onPress={() => Logout()}>
          <Text style={styles.texto}>Desloguearse</Text>
        </Pressable>
        <FlatList data={posts} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Post post={item}> </Post>} /></> : <Text>Sin datos</Text>}

    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#64090E",
    width: "100%",
    flex: 1,
    alignItems: 'center'
  }, h1: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 1,
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
  texto: {
    fontSize: 18,
    color: "#64090E",
    fontFamily: 'Georgia',
  },
});