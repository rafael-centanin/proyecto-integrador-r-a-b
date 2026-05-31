import React from "react"
import {View, Text, Pressable, StyleSheet} from 'react-native';

function Profile(props) {
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
             <Pressable
             onPress={ ()=> props.navigation.navigate('Login')}>
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
    fontSize: 24,
  },
  texto: {
    fontSize: 18,
  },
});