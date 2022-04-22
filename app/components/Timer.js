import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Animated,{useSharedValue,useAnimatedStyle,withTiming,withRepeat, withSpring} from 'react-native-reanimated';
const timerColors = ['#0F0', '#FF0', '#F00'];

const Timer = ({ remainingTime, setRemainingTime, timeStamp, style }) => {
    const OUTERBAR_WIDTH = 300;
    const INNERBAR_PERCENTAGE = OUTERBAR_WIDTH / timeStamp;
    const barSections = timeStamp / timerColors.length;
    const [barColor, setBarColor] = useState(timerColors[0]);

    const innerBarWidth = useSharedValue(timeStamp * INNERBAR_PERCENTAGE);
    const innerBarAnimatedStyle = useAnimatedStyle(()=>{
        return{
            width:withSpring(innerBarWidth.value,{
                damping:20
            })
        };
    });

    const timerHeight = useSharedValue(10);
    const timerHeightAnimatedStyle = useAnimatedStyle(()=>{
        return {
            height:withRepeat(withTiming(timerHeight.value,{duration:400}),3,true)
        };
    });

    useEffect(() => {
        if (remainingTime === timeStamp) {
            setBarColor(timerColors[0]);
            timerHeight.value=10;
            innerBarWidth.value= timeStamp * INNERBAR_PERCENTAGE;
        }

        const intervalId = setInterval(() => {
            remainingTime > 0 && updateRemainingTime(remainingTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [remainingTime]);

    function changeBarColor() {
        if (remainingTime <= barSections) {
            setBarColor(timerColors[2]);
            timerHeight.value=30;
        }
        if (remainingTime > barSections && remainingTime <= barSections * 2) {
            setBarColor(timerColors[1]);
        }
    }
    function updateRemainingTime(remainingTime) {
        changeBarColor();
        let currentRemainingTime = remainingTime;
        currentRemainingTime--;
        setRemainingTime(currentRemainingTime);
        innerBarWidth.value = currentRemainingTime*INNERBAR_PERCENTAGE;
    }


    return (
        <View style={{ ...style }} >
            <View style={styles.timerContainer} >
                <Icon name='clock' size={30} color="#FFF" />
                <Animated.View style={[styles.timerBarOuter,timerHeightAnimatedStyle, { width: OUTERBAR_WIDTH }]} >
                    <Animated.View style={[styles.timeBarInner, innerBarAnimatedStyle,timerHeightAnimatedStyle,{backgroundColor: barColor }]} />
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    timerBarOuter: {
        backgroundColor: '#DDD',
        borderRadius: 10,
        marginLeft: 10
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeBarInner: {
        height: 10,
        borderRadius: 10
    }
});

export default Timer;