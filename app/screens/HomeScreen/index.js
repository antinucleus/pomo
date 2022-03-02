import React from 'react';
import Screen from '../../components/Screen';
import { StyleSheet } from 'react-native';
import AppButton from '../../components/AppButton';
const HomeScreen = () => {
    return (
        <Screen style={styles.homeContainer} >
            <AppButton color="#F0F" title="Start" />
            <AppButton color="#F3F" title="History" />
            <AppButton color="#F6F" title="How to play" />
        </Screen>
    );
};
const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
})

export default HomeScreen;