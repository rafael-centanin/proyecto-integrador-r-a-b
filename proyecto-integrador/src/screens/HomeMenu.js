import { View, Text, Pressable, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
function HomeMenu(){

    return(
        <View>
            <Text style= {styles.h1}>Home</Text>
        </View>
    )
}

export default HomeMenu
const styles = StyleSheet.create({
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        marginVertical: 10,
    },})