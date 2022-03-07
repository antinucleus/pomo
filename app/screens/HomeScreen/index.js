import React from 'react';
import Screen from '../../components/Screen';
import { StyleSheet } from 'react-native';
import AppButton from '../../components/AppButton';

const HomeScreen = ({ navigation }) => {
    return (
        <Screen style={styles.homeContainer} >
            <AppButton
                title="Go"
                color="#F0F"
                onPress={() => navigation.navigate('game', { isTimerActivated: false })}
            />
            <AppButton
                title="Are You Speedy"
                color="#F0F"
                onPress={() => navigation.navigate('game', { isTimerActivated: true })}
            />
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