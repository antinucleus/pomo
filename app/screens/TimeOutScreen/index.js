import React from 'react'
import Screen from '../../components/Screen'
import { View, Text, StyleSheet } from "react-native"
const TimeOutScreen = () => {
    return (
        <Screen>
            <View style={styles.outerView}>
                <View style={styles.innerView}>
                    <Text>TimeOut!!!</Text>
                </View>
            </View>
        </Screen>
    )
}
const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    innerView: {
        margin: 20,
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});
export default TimeOutScreen