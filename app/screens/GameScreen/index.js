import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Digits from '../../components/Digits'
import Prediction from '../../components/Prediction'
import Screen from '../../components/Screen'
import { CreateInputBase, RandomNumberCreator, delay } from "../../utils/"
const randomNumberCreator = new RandomNumberCreator(4)
const GameScreen = () => {
    const refFlatList = useRef()
    const [userNumber, setUserNumber] = useState([])
    const [randomNumber, setRandomNumber] = useState([])
    const [userInputs, setUserInputs] = useState([])
    const [isWin, setIsWin] = useState(false)

    const calculatePlusandMinus = () => {
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
        delay(200).then(() =>
            userInputs.length > 0 && refFlatList?.current?.scrollToIndex({ index: userInputs.length - 1 }))
    }, [userInputs])

    return (
        <Screen style={styles.outer} >
            {isWin && <View style={styles.winView} ><Text>Congratulations!!! {userInputs.length} </Text></View>}
            <View style={styles.gameContainer} >
                <FlatList
                    ref={refFlatList}
                    inverted
                    contentContainerStyle={{ alignItems: "center" }}
                    data={userInputs}
                    keyExtractor={item => userInputs.indexOf(item)}
                    renderItem={({ item }) => <Prediction prediction={item} />} />
            </View>
            <View style={styles.divider} />
            <View style={styles.digits} >
                <Digits onSendNumber={calculatePlusandMinus} setUserNumber={setUserNumber} />
            </View>
        </Screen >
    )
}

const styles = StyleSheet.create({
    digits: {
        flex: 1,
        marginVertical: 10
    },
    divider: {
        width: "95%",
        height: 1,
        backgroundColor: "black"
    },
    gameContainer: {
        flex: 1,
        width: "100%",
        padding: 2,
        height: "100%"
    },
    outer: {
        alignItems: "center",
        backgroundColor: "#FA7"
    },
    winView: {
        backgroundColor: "lightgreen",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default GameScreen