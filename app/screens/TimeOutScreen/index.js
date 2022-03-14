import React,{useEffect} from 'react';
import Screen from '../../components/Screen';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {useSharedValue,useAnimatedStyle,withSpring,} from 'react-native-reanimated';
import AppButton from '../../components/AppButton';
const TimeOutScreen = ({ navigation,sound }) => {

  const timeoutTextSize = useSharedValue(1);
  const timeoutTextAnimatedStyle = useAnimatedStyle(()=>{
    return {
      fontSize:withSpring(timeoutTextSize.value,{damping:7})
    };
  });

  const restartButtonSize = useSharedValue(0);
  const restartButtonAnimatedStyle = useAnimatedStyle(()=>{
    return{
      width:withSpring(restartButtonSize.value)
    };
  });

  const handleGoHome = () => {
    navigation.navigate('home');
    sound.stop();
  };

  useEffect(()=>{
    setTimeout(() => {
      timeoutTextSize.value=25;
    }, 200);
    setTimeout(()=>{
      restartButtonSize.value=50;
    },400);
  },[]);

  return (
    <Screen>
      <View  style={styles.outerView}>
        <LinearGradient colors={['#edf2fb', '#e2eafc', '#d7e3fc']} style={styles.innerView}>
          <Animated.Text style={[styles.timeout,timeoutTextAnimatedStyle]} >
           Time Out !
          </Animated.Text>
          <Text></Text>
          <Animated.View style={[restartButtonAnimatedStyle]} >
            <AppButton icon="refresh-cw" iconProps={{size:30,color:'#000'}} onPress={handleGoHome} />
          </Animated.View>
        </LinearGradient>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  timeout:{
    fontStyle:'italic',
    fontWeight:'bold',
    color:'#000'
  },
  outerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default TimeOutScreen;