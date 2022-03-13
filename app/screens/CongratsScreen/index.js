import React from 'react';
import Screen from '../../components/Screen';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const CongratsScreen = ({ totalTrials }) => {
  return (
    <Screen>
      <View style={styles.outerView}>
        <View style={styles.innerView}>
          <Text>Congratulations</Text>
          <Text>You won in {totalTrials} tries</Text>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView: {
    margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default CongratsScreen;