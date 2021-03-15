import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import COLORS from './colors'
import axios from 'axios'

export default function TaskScreen({ navigation }) {
  const [task, setTask] = useState([])

  useEffect(() => {
    loadData()
  }, [task])

  async function loadData() {
    try {
      const taskList = await axios.get('http://10.21.75.129:5000/tasks/')

      setTask(taskList.data)
      //console.log(taskList.data)
    } catch (error) {
      console.log(error)
    }
  }

  const Card = ({ item }) => {
    return (
      <TouchableHighlight
        activeOpacity={0.7}
        underlayColor={COLORS.white}
        onPress={() => navigation.navigate('EditScreen', item)}>
        <View style={styles.cardItem}>
          <View style={{ top: -35, elevation: 10 }}>
            <Icon name="user-circle" size={40} color={COLORS.secondary} />
          </View>

          <View
            style={{
              height: 150,
              marginLeft: 10,
              paddingVertical: 20,
              flex: 1,
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {item.username}
            </Text>
            <View>
              <Text style={{ color: COLORS.primary }}>Task:</Text>
              <Text style={{ fontSize: 16, color: COLORS.grey }}>
                {item.description}
              </Text>
            </View>
          </View>

          <View style={{ marginRight: 20 }}>
            <View style={{ marginBottom: 5 }}>
              <Text style={{ color: COLORS.primary }}>Duration</Text>
              <Text style={{ fontSize: 15 }}>{item.duration} hrs</Text>
            </View>
            <View>
              <Text style={{ color: COLORS.primary }}>Submission</Text>
              <Text style={{ fontSize: 15 }}>{item.date.substring(0, 10)}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
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
          Available Tasks
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 30 }}
        data={task.tasks}
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
    height: 150,
    borderRadius: 15,
    elevation: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
})
