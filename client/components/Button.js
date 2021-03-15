import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import COLORS from './colors'

export default function ButtonAdd({ title, onPress = () => {} }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.buttonStyle}>
        <Text style={styles.titles}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
})
