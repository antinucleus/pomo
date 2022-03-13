import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultText = ({ result, sign }) => {
  return (
    <View style={styles.outer} >
      {sign && <Text style={styles.sign}> {sign} </Text>}
      <Text style={styles.resultText}>{result}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  resultText: {
    color: '#fff',
  },
  sign: {
    color: '#fff',
    // fontSize: 20
  }
});

export default ResultText;