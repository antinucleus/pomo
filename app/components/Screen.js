import React from 'react';
import { SafeAreaView, StyleSheet } from "react-native"
const Screen = ({ children, style }) => {
    return (
        <SafeAreaView style={[styles.screen, { ...style }]} >
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
})

export default Screen