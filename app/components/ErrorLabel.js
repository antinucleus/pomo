import React from 'react';
import { Text, StyleSheet } from "react-native"
const ErrorLabel = ({ message }) => {
    return <Text style={styles.text} >{message}</Text>
};

const styles = StyleSheet.create({
    text: {
        color: "red"
    }
})

export default ErrorLabel;
