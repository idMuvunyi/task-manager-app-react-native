import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TaskScreen from './components/TaskScreen'
import BottomNavigation from './components/BottomNavigation'
import EditTask from './components/EditTask'
import COLORS from './components/colors'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={BottomNavigation} />
        <Stack.Screen name="EditScreen" component={EditTask} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
