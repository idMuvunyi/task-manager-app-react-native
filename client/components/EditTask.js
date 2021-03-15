import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import DatePicker from 'react-native-datepicker'
import COLORS from './colors'
import ButtonAdd from './Button'
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function EditTask({ navigation, route }) {
  const task = route.params
  console.log(task)
  const [worker, setWorker] = useState([])
  const [employeeName, setEmployeeName] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [durationText, setDurationText] = useState(0)
  const [dateText, setDateText] = useState('')

  useEffect(() => {
    loadEmployee()
  })

  async function loadEmployee() {
    try {
      const employees = await axios.get('http://10.21.75.129:5000/employees/')
      if (employees.data.length > 0) {
        setWorker(employees.data.map((empl) => empl.username))
        setEmployeeName(task.username)
        setDescriptionText(task.description)
        setDurationText(task.duration.toString())
        setDateText(new Date(task.date))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = () => {
    const employeeDetails = {
      username: employeeName,
      description: descriptionText,
      duration: Number(durationText),
      date: new Date(dateText).toDateString(),
    }

    console.log(employeeDetails)

    axios
      .post(
        'http://10.21.75.129:5000/tasks/update/' + task._id,
        employeeDetails
      )
      .then((res) => console.log(res.data))
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={28}
          color={COLORS.white}
          style={{ paddingTop: 20 }}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: COLORS.white,
            paddingTop: 20,
          }}>
          New Task
        </Text>
      </View>
      <View style={{ height: 200, marginTop: 30, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 15, margin: 10, color: COLORS.primary }}>
          Employee
        </Text>
        <View style={styles.textWrapper}>
          <View>
            <Picker
              selectedValue={employeeName}
              onValueChange={(itemValue, itemIndex) =>
                setEmployeeName(itemValue)
              }
              mode="dropdown">
              {worker.map((workers) => {
                return (
                  <Picker.Item key={workers} label={workers} value={workers} />
                )
              })}
            </Picker>
          </View>
        </View>

        <Text style={{ fontSize: 15, margin: 10, color: COLORS.primary }}>
          Description
        </Text>
        <View style={styles.textWrapper}>
          <TextInput
            placeholder="Type here..."
            multiline={true}
            style={{ flex: 1, marginLeft: 10, fontSize: 16 }}
            value={descriptionText}
            onChangeText={setDescriptionText}
          />
        </View>

        <Text style={{ fontSize: 15, margin: 10, color: COLORS.primary }}>
          Duration
        </Text>
        <View style={styles.textWrapper}>
          <TextInput
            placeholder="Type here..."
            keyboardType="numeric"
            style={{ flex: 1, marginLeft: 10, fontSize: 16 }}
            value={durationText}
            onChangeText={setDurationText}
          />
        </View>

        <Text style={{ fontSize: 15, margin: 10, color: COLORS.primary }}>
          Submission Date
        </Text>
        <View style={styles.textWrapper}>
          <DatePicker
            textColor={COLORS.primary}
            mode="date"
            style={{ flex: 1, marginLeft: 10, fontSize: 16 }}
            date={dateText}
            placeholder="Select date"
            format="YYYY-MM-DD"
            onDateChange={setDateText}
          />
        </View>
        <ButtonAdd title="Edit Task" onPress={updateTask} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  textWrapper: {
    height: 50,
    backgroundColor: COLORS.textColor,
    borderRadius: 15,
  },
})
