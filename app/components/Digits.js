import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DigitBox from './DigitBox';
import ErrorLabel from './ErrorLabel';
const Digits = () => {
    const nextRef = useRef();
    const numberOfDigits = [...Array(4).keys()]
    const [id, setId] = useState(0)
    const [digits, setDigits] = useState([])
    const [sameNumberError, setSameNumberError] = useState(false)
    const [startWithZeroError, setStartWithZeroError] = useState(false)
    const [emptyDigitError, setEmptyDigitError] = useState(false)

    const checkDigits = () => {
        const nums = Array(10).fill(0)
        for (let i = 0; i < digits.length; i++) {
            for (let j = 0; j < digits.length; j++) {
                if ((i !== j) && digits[i] === digits[j]) {
                    nums[digits[i]] ? nums[digits[i]]++ : nums[digits[i]] = 1
                    break
                }
            }
        }
        if (nums.every(item => item === 0)) setSameNumberError(false)
        else setSameNumberError(true)
        if (digits[0] && +digits[0] === 0) setStartWithZeroError(true)
        else setStartWithZeroError(false)
        if (digits.includes("")) setEmptyDigitError(true)
        else setEmptyDigitError(false)
    }
    useEffect(() => {
        checkDigits()
    }, [digits])

    return (
        <View  >
            <View style={styles.digitContainer} >
                {
                    numberOfDigits.map(i =>
                        <DigitBox
                            key={String(i)}
                            id={i}
                            setId={setId}
                            digits={digits}
                            setDigits={setDigits}
                            reff={id + 1 === i ? nextRef : null}
                            nextRef={nextRef}
                        />)
                }
            </View>
            <View style={styles.errorContainer} >
                {startWithZeroError && <ErrorLabel message="Cannot start with zero" />}
                {sameNumberError && <ErrorLabel message="Cannot includes same numbers" />}
                {emptyDigitError && <ErrorLabel message="Cannot be empty" />}
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    digitContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 10,
        backgroundColor: "lightblue",
        paddingVertical: 10
    },
    errorContainer: {
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Digits;
