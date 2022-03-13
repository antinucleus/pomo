import React,{useEffect} from 'react';
import Screen from '../../components/Screen';
import { StyleSheet } from 'react-native';
import AppButton from '../../components/AppButton';
import Animated,{useSharedValue,useAnimatedStyle,withTiming,withRepeat,withSequence,withSpring} from 'react-native-reanimated';


const HomeScreen = ({ navigation }) => {

  const goButtonPosition = useSharedValue(-50);
  const areYouSpeedyButtonPosition = useSharedValue(100);
  const appBackgroundColor = useSharedValue('#FFF');

  const goButtonAnimatedStyle = useAnimatedStyle(()=>{
    return {
      transform:[{
        translateY:withSpring(goButtonPosition.value,{
          damping:5,
          stiffness:50
        })
      }]
    };
  });

  const areYouSpeedyButtonAnimatedStyle = useAnimatedStyle(()=>{
    return {
      transform:[{
        translateY:withSpring(areYouSpeedyButtonPosition.value,{
          damping:5,
          stiffness:50
        })
      }]
    };
  });

  const backgroundColorAnimatedStyle = useAnimatedStyle(()=>{
    return {
      backgroundColor:withTiming(appBackgroundColor.value,{
        duration:2500
      })
    };
  });

  useEffect(()=>{
    appBackgroundColor.value = '#000';
    setTimeout(() => {
      goButtonPosition.value=0;
      areYouSpeedyButtonPosition.value = 0;
    }, 50);
  },[]);

  return (
    <Screen >
      <Animated.View  style={[styles.homeContainer,backgroundColorAnimatedStyle]} >
        <Animated.View style={[styles.goButton,goButtonAnimatedStyle]} >
          <AppButton
            title="Go"
            color="#F0F"
            onPress={() => navigation.navigate('game', { isTimerActivated: false })}
          />
        </Animated.View>
        <Animated.View style={areYouSpeedyButtonAnimatedStyle}  >
          <AppButton
            title="Are You Speedy"
            color="#F0F"
            onPress={() => navigation.navigate('game', { isTimerActivated: true })}
          />
        </Animated.View>
      </Animated.View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  homeContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goButton:{
    marginBottom:10
  }
});

export default HomeScreen;