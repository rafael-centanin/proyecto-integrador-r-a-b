import { View, Text, Pressable, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
function HomePage(){

    return(
        <View>

            <Text style= {styles.h1}>Home</Text>

        </View>
        
    )
}

export default HomePage;
const styles = StyleSheet.create({
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        marginVertical: 10,
    },})