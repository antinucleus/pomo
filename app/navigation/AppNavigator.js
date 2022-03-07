import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from '../screens/HomeScreen'
import GameScreen from '../screens/GameScreen'
const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='home' component={HomeScreen} />
            <Stack.Screen options={{ animation: 'fade' }} name='game' component={GameScreen} />
        </Stack.Navigator>
    )
}
export default AppNavigator