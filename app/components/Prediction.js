import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Prediction = ({ prediction }) => {
    const { number, pluses, minuses } = prediction;
    return (
        <View style={styles.predictionContainer} >
            <View style={styles.numberContainer} >
                {number.map(n =>
                    <View style={styles.digitShape} key={String(n)} >
                        <Text style={styles.digitText} >{n}</Text>
                    </View>)}
            </View>
            <View style={styles.resultContainer} >
                {pluses !== 0 && <Text> + {pluses}</Text>}
                {minuses !== 0 && < Text> - {minuses}</Text>}
                {pluses === 0 && minuses === 0 && <Text> 0</Text>}
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    digitShape: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#19F",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 2
    },
    digitText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 18
    },
    numberContainer: {
        flexDirection: "row"
    },
    predictionContainer: {
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    },
    resultContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 35,
        width: 70,
        marginLeft: 20,
        height: 35
    }
})

export default Prediction
