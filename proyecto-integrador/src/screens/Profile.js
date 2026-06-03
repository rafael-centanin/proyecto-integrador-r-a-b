import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { auth, db } from "../firebase/config";

function Profile(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function Logout() {
    auth.signOut();
    props.navigation.navigate('Login');
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user == "") {
        return;
      }
      db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
        let user = [];
        docs.forEach(doc => {
          user.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setUser(user);
    console.log(user)

        setLoading(false);
      });
    });

  }, [])



  //  db.collection('users').where('owner', '==', auth.currentUser.user).onSnapshot(docs => {
  //     let user = [];
  //     docs.forEach(doc => {
  //       posts.push({
  //         id: doc.id,
  //         data: doc.data()
  //       });
  //     });
  //     setUser(user); 
  //     setLoading(false);
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {loading === true ? <Text>cargando...</Text> : <Text> {user[0].data.User}</Text>}
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