import React from 'react';
import Screen from '../../components/Screen';
import { StyleSheet, Text } from 'react-native';
const HomeScreen = () => {
    return (
        <Screen styles={styles.homeContainer} >
            <Text>HomeScreen</Text>
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