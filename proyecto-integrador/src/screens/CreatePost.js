import { View, Text, TextInput } from "react-native-web";
import { db, auth } from "../firebase/config"
import { useState } from "react";
import { Pressable } from "react-native";

function CreatePost() {

    const [descripcion, setDescripcion] = useState("");

    function onSubmit() {
        db.collection("posts").add({
            owner: auth.currentUser.email,
            descripcionPost: descripcion,
            createdAt: Date.now(),
            likes:[]
        })
            .then()
            .catch(e => console.log(e))

    }

    return (
        <View>
            <Text> Crear post</Text>
            <TextInput placeholder="Escribí tu post" value={descripcion} onChangeText={(text)=> setDescripcion(text)}/>
            <Pressable onPress={onSubmit}>
                <Text>Publicar</Text>
            </Pressable>
        </View>
    )
}

export default CreatePost;