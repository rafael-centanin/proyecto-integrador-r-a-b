import { View, Text } from "react-native-web";
import { db, auth } from "../firebase/config"
import { useState } from "react";

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
        </View>
    )
}

export default CreatePost;