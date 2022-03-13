import React,{useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ResultText from './ResultText';
import Animated,{useSharedValue,useAnimatedStyle,withSpring,withTiming,withRepeat} from 'react-native-reanimated';

const Prediction = ({ prediction }) => {
  const { number, pluses, minuses } = prediction;

  const predictionPosition = useSharedValue(-50);
  const predictionAnimatedStyle = useAnimatedStyle(()=>{
    return {
      transform:[{
        translateY:withSpring(predictionPosition.value)
      }]
    };
  });

  useEffect(()=>{
    predictionPosition.value=0;
  },[]);
  return (
    <Animated.View style={[styles.predictionContainer,predictionAnimatedStyle]} >
      <View style={styles.numberContainer} >
        {number.map(n =>
          <View style={styles.digitShape} key={String(n)} >
            <Text style={styles.digitText} >{n}</Text>
          </View>)}
      </View>
      <View style={styles.resultContainer} >
        {pluses !== 0 && <ResultText sign="+" result={pluses} />}
        {minuses !== 0 && <ResultText sign="-" result={minuses} />}
        {pluses === 0 && minuses === 0 && <ResultText result={0} />}
      </View>
    </Animated.View >
  );
};
const styles = StyleSheet.create({
  digitShape: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#19F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2
  },
  digitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  numberContainer: {
    flexDirection: 'row',
    marginRight: 10
  },
  predictionContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderRadius: 35,
    width: 70,
    borderColor: '#19F',
    height: 35
  }
});

export default Prediction;
