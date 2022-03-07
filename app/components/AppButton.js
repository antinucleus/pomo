import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
const AppButton = ({ color, title, onPress, disabled }) => {
    return (
        <TouchableOpacity disabled={disabled} style={styles.buttonContainer} onPress={onPress}  >
            <View style={[styles.startButton, { backgroundColor: disabled ? '#000' : color }]} >
                <Text style={styles.startButtonText} >{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 15,
    },
    startButton: {
        padding: 10,
        borderRadius: 10,
        width: "100%"
    },
    startButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    }
})
export default AppButton