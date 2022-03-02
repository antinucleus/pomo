import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native'
import AppButton from '../../components/AppButton'
import Digits from '../../components/Digits'
import Prediction from '../../components/Prediction'
import Screen from '../../components/Screen'
import Timer from '../../components/Timer'
import { CreateInputBase, RandomNumberCreator, delay } from "../../utils/"
const randomNumberCreator = new RandomNumberCreator(4)
const GameScreen = ({ isTimerActivated }) => {
    const refFlatList = useRef()
    const timeStamp = 30
    const [remainingTime, setRemainingTime] = useState(timeStamp)
    const [userNumber, setUserNumber] = useState([])
    const [randomNumber, setRandomNumber] = useState([])
    const [userInputs, setUserInputs] = useState([])
    const [isWin, setIsWin] = useState(false)
    const [timeout, setTimeout] = useState(false)



    const calculatePlusandMinus = () => {
        if (isTimerActivated) {
            setRemainingTime(timeStamp)
        }
        let pluses = 0, minuses = 0;
        const currentUserInputs = [...userInputs]
        for (const user of userNumber) {
            if (randomNumber.includes(user))
                (randomNumber.indexOf(user) === userNumber.indexOf(user)) ? pluses++ : minuses++
        }
        const input = new CreateInputBase(pluses, minuses, userNumber)
        currentUserInputs.push(input)
        setUserInputs(currentUserInputs)
        if (pluses === 4) setIsWin(true)
    }


    useEffect(() => {
        randomNumberCreator.createNumber()
        setRandomNumber(randomNumberCreator.createdNumber)
    }, [])

    useEffect(() => {
        if (isTimerActivated && remainingTime === 0) setTimeout(true)
    }, [remainingTime])

    useEffect(() => {
        delay(200).then(() =>
            userInputs.length > 0 && refFlatList?.current?.scrollToIndex({ index: userInputs.length - 1 }))
    }, [userInputs])

    return (
        <Screen style={styles.outer} >
            <View style={styles.exitButton} >
                <AppButton color="#777" title="exit" />
            </View>
            {isWin && <View style={styles.winView} ><Text>Congratulations!!! {userInputs.length} </Text></View>}
            {isTimerActivated &&
                <Timer
                    style={styles.timeContainer}
                    timeStamp={timeStamp}
                    remainingTime={remainingTime}
                    setRemainingTime={setRemainingTime}
                />}
            <View style={styles.predictionContainer} >
                <FlatList
                    ref={refFlatList}
                    inverted
                    data={userInputs}
                    keyExtractor={item => userInputs.indexOf(item)}
                    renderItem={({ item }) => <Prediction prediction={item} />} />
            </View>
            <View style={styles.divider} />
            <View style={styles.hintButton} >
                <AppButton color="#0AA" title="Hint" />
            </View>
            <KeyboardAvoidingView behavior='padding' style={styles.digitsContainer} >
                <Digits onSendNumber={calculatePlusandMinus} setUserNumber={setUserNumber} />
            </KeyboardAvoidingView>

        </Screen >
    )
}

const styles = StyleSheet.create({
    digitsContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center"
    },
    divider: {
        width: "95%",
        height: 1,
        backgroundColor: "black",
        marginVertical: 10
    },
    exitButton: {
        alignItems: "flex-end",
        width: "100%",
        paddingRight: 10
    },
    hintButton: {
        width: "100%",
        alignItems: "flex-start"
    },
    predictionContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        padding: 5,
    },
    timeContainer: {
        marginVertical: 5,
        padding: 5,
    },
    outer: {
        alignItems: "center",
        backgroundColor: "#FA7",
    },
    winView: {
        backgroundColor: "lightgreen",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default GameScreen