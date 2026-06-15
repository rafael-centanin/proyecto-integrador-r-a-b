import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../screens/HomePage";
import Comments from "../screens/Comments";

const Stack = createNativeStackNavigator();

function StackMenu(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
            <Stack.Screen name="Comments" component={Comments} options={{ title: "ir al home", headerStyle: { backgroundColor: '#64090E' }, headerTintColor: "#F9D694" }} />

        </Stack.Navigator>
    )
}
export default StackMenu;