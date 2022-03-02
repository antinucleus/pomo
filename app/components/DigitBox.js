import React, { useEffect, useState } from 'react';
import { TextInput, StyleSheet } from "react-native"
const DigitBox = ({ id, setId, digits, setDigits, reff, nextRef }) => {
  const [value, setValue] = useState("")
  const handleValueChange = (e) => {
    let regexDigit = /^[0-9]+$/
    if (e === '' || regexDigit.test(e)) {
      const newValues = digits
      newValues[id] = e
      setDigits([...newValues])
      setValue(e)
      nextRef?.current?.focus()
    }
  }
  useEffect(() => {
    digits.length === 0 && setValue("")
    if (id === 0 && digits.length === 0) nextRef?.current?.focus()
  }, [digits])
  return (
    <TextInput
      ref={reff}
      returnKeyType='done'
      selectTextOnFocus
      maxLength={1}
      keyboardType='numeric'
      style={styles.textInput}
      value={value}
      onFocus={() => setId(id)}
      onChangeText={handleValueChange}
    />
  )
};
const styles = StyleSheet.create({
  textInput: {
    borderColor: "orange",
    backgroundColor: "white",
    borderWidth: 2,
    textAlign: "center",
    width: 50,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 10,
  }
})

export default DigitBox;
