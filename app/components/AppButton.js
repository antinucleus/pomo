import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const AppButton = ({ color, title, onPress, disabled, icon, iconProps }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}  >
      <View style={[styles.buttonContainer, { backgroundColor: disabled ? '#000' : color }]} >
        {icon ?
          <Icon name={icon} {...iconProps} />
          :
          <Text style={styles.buttonText} >{title}</Text>
        }
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 5,
    borderRadius: 10,
    width: '100%'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
export default AppButton;