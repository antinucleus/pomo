import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Modal, Platform } from 'react-native'
import Screen from '../../components/Screen'
import CongratsScreen from '../CongratsScreen'
import TimeOutScreen from "../TimeOutScreen"
import AppButton from '../../components/AppButton'
import Digits from '../../components/Digits'
import Prediction from '../../components/Prediction'
import Timer from '../../components/Timer'
import { CreateInputBase, RandomNumberCreator, delay } from "../../utils/"

const randomNumberCreator = new RandomNumberCreator(4)

const GameScreen = ({ route, navigation }) => {
    const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height'
    const { isTimerActivated } = route?.params
    const refFlatList = useRef()
    const timeStamp = 30
    const [remainingTime, setRemainingTime] = useState(timeStamp)
    const [userNumber, setUserNumber] = useState([])
    const [randomNumber, setRandomNumber] = useState([])
    const [userInputs, setUserInputs] = useState([])
    const [isWin, setIsWin] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [timeout, setTimeout] = useState(false)

    const resetAllValues = () => {
        randomNumberCreator.createdNumber = []
        setRemainingTime(timeStamp)
        setUserNumber([])
        setRandomNumber([])
        setUserInputs([])
        setIsWin(false)
        setTimeout(false)
    }
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
        console.log("CreatedNumber: ", randomNumberCreator.createdNumber)
        return () => {
            resetAllValues()
        }
    }, [])

    useEffect(() => {
        if (isTimerActivated && remainingTime === 0) setTimeout(true)
    }, [remainingTime])

    useEffect(() => {
        delay(200).then(() =>
            userInputs.length > 0 && refFlatList?.current?.scrollToIndex({ index: userInputs.length - 1 }))
    }, [userInputs])

    useEffect(() => {
        if (isWin || timeout) setShowModal(true)
    }, [isWin, timeout])

    return (
        <Screen style={styles.outer} >
            <Modal visible={showModal} onRequestClose={() => setShowModal(false)} transparent animationType='slide' >
                {isWin && <CongratsScreen totalTrials={userInputs.length} />}
                {timeout && <TimeOutScreen />}
            </Modal>
            <View style={styles.exitButton} >
                <AppButton icon="x-circle" iconProps={{ size: 30, color: "#FFF" }} onPress={() => navigation.goBack()} />
            </View>
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
                    renderItem={({ item }) => <Prediction prediction={item} />}
                    onScrollToIndexFailed={() => delay(200).then(() =>
                        userInputs.length > 0 && refFlatList?.current?.scrollToIndex({ index: userInputs.length - 1 }))}
                />
            </View>
            <View style={styles.divider} />
            <View style={styles.hintButton} >
                <AppButton icon="search" iconProps={{ size: 30, color: "#F0F" }} />
            </View>
            <KeyboardAvoidingView behavior={keyboardBehavior} style={styles.digitsContainer} >
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