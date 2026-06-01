import React from "react"
import {View, Text, Pressable, StyleSheet} from 'react-native';
import { auth } from "../firebase/config";

function Profile(props) {
    function Logout() {
        props.navigation.navigate('Login')
        auth.signOut()
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
             <Pressable
             onPress={ ()=> Logout()}>
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
    fontSize: 25,
  },
  texto: {
    fontSize: 18,
  },
});