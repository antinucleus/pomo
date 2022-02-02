import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DigitBox from './DigitBox';
const Digits = () => {
    const nextRef = useRef();
    const [id, setId] = useState(0)
    const [digits, setDigits] = useState([])
    const [sameNumberError, setSameNumberError] = useState(false)
    const [startWithZeroError, setStartWithZeroError] = useState(false)

    const handleValueChange = (e, setValue) => {
        let regexDigit = /^[0-9]+$/
        if (e === '' || regexDigit.test(e)) {
            // Cannot includes same number
            if (!digits.includes(e)) {
                setSameNumberError(false)
                const newValues = digits
                newValues[id] = e
                setDigits([...newValues])
                setValue(e)
                nextRef?.current?.focus()
            }
            else {
                setSameNumberError(true)
            }
            // First digits cannot be zero
            if (id === 0 && +e === 0) setStartWithZeroError(true)
            if (id === 0 && +e !== 0) setStartWithZeroError(false)
        }
    }
    useEffect(() => {
        console.log("digits::", digits)
    }, [digits])
    useEffect(() => {
        console.log("sameNumberError::", sameNumberError)
        console.log("startWithZeroError::", startWithZeroError)
    }, [sameNumberError, startWithZeroError])
    return (
        <View>

            <View style={styles.digitContainer} >
                {
                    [0, 1, 2, 3].map(i =>
                        <DigitBox
                            key={String(i)}
                            id={i}
                            setId={setId}
                            reff={id + 1 === i ? nextRef : null}
                            onChangeText={handleValueChange}
                        />)
                }
            </View>
            {startWithZeroError && <Text style={{ color: "red" }} >Cannot start with zero</Text>}
            {sameNumberError && <Text style={{ color: "red" }} >Cannot includes same numbers</Text>}
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
    }
})

export default Digits;
