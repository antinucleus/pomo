import React from 'react';
import Screen from '../../components/Screen';
import Digits from '../../components/Digits';
import { View } from 'react-native';
const HomeScreen = () => {
    return (
        <Screen>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Digits />
            </View>
        </Screen>
    );
};

export default HomeScreen;
