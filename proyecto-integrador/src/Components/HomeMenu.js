import React from "react";
import { View, Text, Pressable, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/HomePage";
import Profile from "../screens/Profile";
import CreatePost from "../screens/CreatePost";
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Comments from "../screens/Comments";
import StackMenu from "./Stackmenu";

const Tab = createBottomTabNavigator();
function HomeMenu() {
    return (
        <Tab.Navigator style={styles.contenedor} screenOptions={{
            headerShown: false,
            tabBarStyle: { //Aca es para editar el color de la barra de abajo, un poco de css no hace mal a nadie
                backgroundColor: "#64090E",
                borderTopWidth: 0, //Aca es para que se borre la linea de abajo, perdon pero me molestaba
                elevation: 0
            },
            tabBarActiveTintColor: "#F5C842", //Aca es para que los textos de abajo se vean de otro color 
            tabBarInactiveTintColor: "#D4A0A0"
        }}>
            <Tab.Screen name="Home" component={StackMenu}
                options={{
                    tabBarIcon: () => (
                        <Octicons name="home-fill" size={24} color="black" />
                    )
                }} />
            <Tab.Screen name="CreatePost" component={CreatePost}
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons name="add-circle" size={24} color="black" />
                    )
                }} />
            <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <Octicons name="person-fill" size={24} color="black" /> }} />
        </Tab.Navigator>
    )
}
export default HomeMenu;
const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: "#64090E"
    }
})