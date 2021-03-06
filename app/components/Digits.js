import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet,View } from 'react-native';
import AppButton from './AppButton';
import DigitBox from './DigitBox';
import ErrorLabel from './ErrorLabel';
import LinearGradient from 'react-native-linear-gradient';

const Digits = ({ setUserNumber, onSendNumber }) => {
    const nextRef = useRef();
    const numberOfDigits = [...Array(4).keys()];
    const [id, setId] = useState(-1);
    const [digits, setDigits] = useState([]);
    const [sameNumberError, setSameNumberError] = useState(false);
    const [startWithZeroError, setStartWithZeroError] = useState(false);
    const [emptyDigitError, setEmptyDigitError] = useState(false);

    const checkDigits = () => {
        const nums = Array(10).fill(0);
        for (let i = 0; i < digits.length; i++) {
            for (let j = 0; j < digits.length; j++) {
                if ((i !== j) && digits[i] === digits[j]) {
                    nums[digits[i]] ? nums[digits[i]]++ : nums[digits[i]] = 1;
                    break;
                }
            }
        }
        if (nums.every(item => item === 0)) setSameNumberError(false);
        else setSameNumberError(true);
        if (digits[0] && +digits[0] === 0) setStartWithZeroError(true);
        else setStartWithZeroError(false);
        if (digits.includes('') || digits.includes(undefined)) setEmptyDigitError(true);
        else setEmptyDigitError(false);
        setUserNumber(digits.map(d => +d));
    };

  
    const handleSend = () => {
        setDigits([]);
        onSendNumber();
        setId(-1);
    };

    useEffect(() => {
        checkDigits();
    }, [digits]);

    return (
        <View style={styles.container} >
            <View style={styles.divider} />
            <View style={styles.errorContainer} >
                {startWithZeroError && <ErrorLabel message="Cannot start with zero" />}
                {sameNumberError && <ErrorLabel message="Cannot includes same numbers" />}
                {emptyDigitError && <ErrorLabel message="Cannot be empty" />}
            </View>
            <LinearGradient colors={['#240046', '#3c096c', '#3c096c']} style={styles.digitContainer}>
                {
                    numberOfDigits.map(i =>
                        <DigitBox
                            key={String(i)}
                            id={i}
                            setId={setId}
                            digits={digits}
                            setDigits={setDigits}
                            reff={id + 1 === i ? nextRef : null}
                            nextRef={nextRef} />)
                }
            </LinearGradient>
            <AppButton
                onPress={() => handleSend()}
                color="#f00"
                title="Send"
                disabled={(digits.length < 4 || sameNumberError || startWithZeroError || emptyDigitError)}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
    },
    divider: {
        width: '95%',
        height: 1,
        backgroundColor: 'black',
    },
    digitContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#240046',
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom:5
    },
    errorContainer: {
        height:100,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:5
    }
});

export default Digits;