import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TaskScreen from './TaskScreen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from './colors'
import NewTaskScreen from './NewTaskScreen'
import EmployeeScreen from './EmployeeScreen'

const Tab = createBottomTabNavigator()

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 60,
          borderTopWidth: 1,
          elevation: 10,
        },
        showLabel: false,
        activeTintColor: COLORS.primary,
      }}>
      <Tab.Screen
        name="Tasks"
        component={TaskScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
        }}
      />

      <Tab.Screen
        name="NewTask"
        component={NewTaskScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="add-task" color={color} size={28} />
          ),
        }}
      />

      <Tab.Screen
        name="Employee"
        component={EmployeeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="people" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
