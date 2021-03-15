import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import COLORS from './colors'
import axios from 'axios'

export default function EmployeeScreen() {
  const [employee, setEmployee] = useState([])

  useEffect(() => {
    loadData()
  }, [employee])

  async function loadData() {
    try {
      const employeeList = await axios.get(
        'http://10.21.75.129:5000/employees/'
      )

      setEmployee(employeeList.data)
      //console.log(taskList.data)
    } catch (error) {
      console.log(error)
    }
  }

  const Card = ({ item }) => {
    return (
      <View style={styles.cardItem}>
        <View style={{ elevation: 10 }}>
          <Icon name="user" size={25} color={COLORS.secondary} />
        </View>

        <View
          style={{
            height: 50,
            marginLeft: 10,
            paddingVertical: 15,
            flex: 1,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {item.username}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            paddingTop: 20,
            color: COLORS.white,
          }}>
          Employee List
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 30 }}
        data={employee}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  cardItem: {
    backgroundColor: COLORS.white,
    height: 50,
    borderRadius: 15,
    elevation: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
})
