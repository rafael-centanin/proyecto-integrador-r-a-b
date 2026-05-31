import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/HomePage";
import Profile from "../screens/Profile";
import CreatePost from "../screens/CreatePost";
// import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
function HomeMenu() {
    return (
        <Tab.Navigator  screenOptions={{
    headerShown: false,
  }}>
            <Tab.Screen name="Home" component={Home}
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
            <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <Octicons name="person-fill" size={24} color="black" />}} />
        </Tab.Navigator>
    )
}
export default HomeMenu;