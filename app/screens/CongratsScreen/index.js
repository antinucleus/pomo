import React,{useEffect} from 'react';
import Screen from '../../components/Screen';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {useSharedValue,useAnimatedStyle,withSpring,} from 'react-native-reanimated';
import AppButton from '../../components/AppButton';
const CongratsScreen = ({ navigation,totalTrials,sound}) => {

    const totalTrialsTextPosition = useSharedValue(200);
    const totalTrialsTextAnimatedStyle = useAnimatedStyle(()=>{
        return {
            transform:[{
                translateX:withSpring(totalTrialsTextPosition.value,{damping:5})
            }]
        };
    });
    const congratTextSize = useSharedValue(1);
    const congratTextAnimatedStyle = useAnimatedStyle(()=>{
        return {
            fontSize:withSpring(congratTextSize.value,{damping:7})
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
            congratTextSize.value=25;
        }, 200);
        setTimeout(()=>{
            totalTrialsTextPosition.value=0;
            restartButtonSize.value=50;
        },400);
    },[]);

    return (
        <Screen>
            <View  style={styles.outerView}>
                <LinearGradient colors={['#edf2fb', '#e2eafc', '#d7e3fc']} style={styles.innerView}>
                    <Animated.Text style={[styles.congrat,congratTextAnimatedStyle]} >
           Congratulations
                    </Animated.Text>
                    <Text></Text>
                    <Animated.Text style={[totalTrialsTextAnimatedStyle,styles.winNumber]} >
            You won in {totalTrials} tries
                    </Animated.Text>
                    <Text></Text>
                    <Animated.View style={[restartButtonAnimatedStyle]} >
                        <AppButton icon="refresh-cw" iconProps={{size:30,color:'#000'}} onPress={handleGoHome}/>
                    </Animated.View>
                </LinearGradient>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    congrat:{
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
    winNumber:{
        fontSize:16
    }
});

export default CongratsScreen;