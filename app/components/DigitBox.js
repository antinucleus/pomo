import React, { useState } from 'react';
import { TextInput, StyleSheet } from "react-native"
const DigitBox = ({ id, setId, reff, nextRef }) => {
  const [value, setValue] = useState("")
  const handleValueChange = (e) => {
    id === 1 ? setValue(e.replace(/[^1-9]/g, '')) : setValue(e.replace(/[^0-9]/g, ''))
    nextRef?.current?.focus()
  }
  return (
    <TextInput
      ref={reff}
      returnKeyType='next'
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
    borderColor: "red",
    borderWidth: 1,
    textAlign: "center",
    width: 50,
    height: 50,
    marginHorizontal: 10
  }
})

export default DigitBox;
