import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import DatePicker from 'react-native-datepicker'
import COLORS from './colors'
import ButtonAdd from './Button'
import axios from 'axios'

export default function NewTaskScreen() {
  const [worker, setWorker] = useState([])
  const [employeeName, setEmployeeName] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [durationText, setDurationText] = useState(0)
  const [dateText, setDateText] = useState('')

  useEffect(() => {
    loadEmployee()
  }, [worker])

  async function loadEmployee() {
    try {
      const employees = await axios.get('http://10.21.75.129:5000/employees/')
      if (employees.data.length > 0) {
        setWorker(employees.data.map((empl) => empl.username))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addNewTask = () => {
    const employeeDetails = {
      username: employeeName,
      description: descriptionText,
      duration: Number(durationText),
      date: new Date(dateText).toDateString(),
    }

    console.log(employeeDetails)

    axios
      .post('http://10.21.75.129:5000/tasks/add', employeeDetails)
      .then((res) => console.log(res.data))
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.header}>
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
            keyboardType="numbers-and-punctuation"
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
        <ButtonAdd title="Create New Task" onPress={addNewTask} />
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
