import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import DigitBox from './DigitBox';
const Digits = () => {
    const nextRef = useRef();
    const [id, setId] = useState(1)
    return (
        <View style={styles.digitContainer} >
            {
                [1, 2, 3, 4].map(i =>
                    <DigitBox
                        key={String(i)}
                        id={i}
                        setId={setId}
                        nextRef={nextRef}
                        reff={id + 1 === i ? nextRef : null}
                    />)
            }
        </View>
    )
};
const styles = StyleSheet.create({
    digitContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Digits;
