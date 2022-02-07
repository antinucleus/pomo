import React from 'react';
import Screen from '../../components/Screen';
import Digits from '../../components/Digits';
import { StyleSheet, View } from 'react-native';
const HomeScreen = () => {
    return (
        <Screen>
            <View style={styles.digitContainer} >
                <Digits />
            </View>
        </Screen>
    );
};
const styles = StyleSheet.create({
    digitContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#78c6a3",
    }
})

export default HomeScreen;
