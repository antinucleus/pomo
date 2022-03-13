import React ,{useEffect}from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated,{useSharedValue,useAnimatedStyle,withSpring} from 'react-native-reanimated';

const ErrorLabel = ({ message }) => {

  const errorMesagePosition = useSharedValue(-50);
  const errorMessageAnimatedStyle = useAnimatedStyle(()=>{
    return {
      transform:[{
        translateX:withSpring(errorMesagePosition.value,{
          damping:2
        })
      }]
    };
  });

  useEffect(()=>{
    setTimeout(() => {
      errorMesagePosition.value=0;
    }, 10);
  },[]);

  return (
    <Animated.View style={[styles.errorContainer,errorMessageAnimatedStyle]} >
      <Text style={styles.text} >{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  errorContainer:{
    marginVertical:3,
    backgroundColor:'#FFF',
    padding:3,
    borderTopRightRadius:10,
    borderBottomLeftRadius:10,
    borderRightColor:'red',
    borderLeftColor:'red',
    borderRightWidth:2,
    borderLeftWidth:2,
  },
  text: {
    color: 'red'
  }
});

export default ErrorLabel;
