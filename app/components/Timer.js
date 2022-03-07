import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Feather"

const timerColors = ["#0F0", "#FF0", "#F00"]

const Timer = ({ remainingTime, setRemainingTime, timeStamp, style }) => {
    const OUTERBAR_WIDTH = 300
    const INNERBAR_PERCENTAGE = OUTERBAR_WIDTH / timeStamp
    const barSections = timeStamp / timerColors.length
    const innerBarWidth = remainingTime * INNERBAR_PERCENTAGE
    const [barColor, setBarColor] = useState(timerColors[0])

    useEffect(() => {
        if (remainingTime === timeStamp) setBarColor(timerColors[0])
        const intervalId = setInterval(() => {
            remainingTime > 0 && updateRemainingTime(remainingTime)
        }, 1000);
        return () => clearInterval(intervalId)
    }, [remainingTime])

    function changeBarColor() {
        if (remainingTime <= barSections) setBarColor(timerColors[2])
        if (remainingTime > barSections && remainingTime <= barSections * 2) setBarColor(timerColors[1])
    }
    function updateRemainingTime(remainingTime) {
        changeBarColor()
        let currentRemainingTime = remainingTime
        currentRemainingTime--;
        setRemainingTime(currentRemainingTime)
    };


    return (
        <View style={{ ...style }} >
            <View style={styles.timerContainer} >
                <Icon name='clock' size={30} color="#FFF" />
                <View style={[styles.timerBarOuter, { width: OUTERBAR_WIDTH }]} >
                    <View style={[styles.timeBarInner, { width: innerBarWidth, backgroundColor: barColor }]} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    timerBarOuter: {
        backgroundColor: "#DDD",
        height: 10,
        borderRadius: 10,
        marginLeft: 10
    },
    timerContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    timeBarInner: {
        height: 10,
        borderRadius: 10
    }
})

export default Timer