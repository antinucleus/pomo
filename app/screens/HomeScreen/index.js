import React,{useEffect,useState} from 'react';
import Screen from '../../components/Screen';
import { StyleSheet,View } from 'react-native';
import AppButton from '../../components/AppButton';
import Animated,{useSharedValue,useAnimatedStyle,withTiming,withSpring} from 'react-native-reanimated';

const HomeScreen = ({ navigation ,route}) => {
  const [soundOn,setSoundOn]= useState(true);
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

  const handleSoundStatusChange = ()=>setSoundOn(!soundOn);

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
        <View style={styles.soundButton} >
          <AppButton onPress={handleSoundStatusChange} icon={soundOn ? 'volume-2':'volume-x'} iconProps={{size:30,color:'#fff'}} />
        </View>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
          <Animated.View style={[styles.goButton,goButtonAnimatedStyle]} >
            <AppButton
              title="Go"
              color="#F0F"
              onPress={() => {
                navigation.navigate('game', { 
                  isTimerActivated: false,
                  soundOn
                });
              }}
            />
          </Animated.View>
          <Animated.View style={areYouSpeedyButtonAnimatedStyle}  >
            <AppButton
              title="Are You Speedy"
              color="#F0F"
              onPress={() => {
                navigation.navigate('game', {
                  isTimerActivated: true,
                  soundOn
                });
              }}
            />
          </Animated.View>
        </View>
      </Animated.View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  homeContainer: {
    flex:1,
    alignItems: 'center',
  },
  goButton:{
    marginBottom:10
  },
  soundButton:{
    alignItems:'flex-end',
    width:'100%',
    paddingRight:10,
    paddingTop:10
  }
});

export default HomeScreen;