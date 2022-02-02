import React, { useState } from 'react';
import { TextInput, StyleSheet } from "react-native"
const DigitBox = ({ id, setId, reff, onChangeText }) => {
  const [value, setValue] = useState("")

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
      onChangeText={(e) => onChangeText(e, setValue)}
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
