import React from "react"
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { auth } from "../firebase/config";

function Profile(props) {
  function Logout() {
    props.navigation.navigate('Login')
    auth.signOut()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Pressable style={styles.Boton}
        onPress={() => Logout()}>
        <Text style={styles.texto}> Desloguearse </Text>
      </Pressable>
    </View>
  )
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