import { Pressable, StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import homebg from './../../../assets/productivity.png';

import { ModalTitle, ModalContent, BottomModal, SlideAnimation } from 'react-native-modals';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

const index = () => {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const today = moment().format("MMM Do");
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState("");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const suggestions = [
    {
      id: "0",
      todo: "Drink Water, keep healthy",
    },
    {
      id: "1",
      todo: "Go Excercising",
    },
    {
      id: "2",
      todo: "Go to bed early",
    },
    {
      id: "3",
      todo: "Take pill reminder",
    },
    {
      id: "4",
      todo: "Go Shopping",
    },
    {
      id: "5",
      todo: "Finish assignments",
    },
  ];
  const addTodo = async () => {
    try {
      const todoData = {
        title: todo,
        category: category,
      }

      axios.post("http://192.168.160.56:3000/todos/6672f00801f0ddddf89c2e40", todoData).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log("error", error)
      });

      await getUserTodos();
      setModalVisible(false);
      setTodo("");
    } catch (error) {
      console.log("error", error)
    }
  };
  useEffect(() => {
    getUserTodos();
  }, [marked,isModalVisible]);
  const getUserTodos = async () => {
    try {
      const response = await axios.get("http://192.168.160.56:3000/users/6672f00801f0ddddf89c2e40/todos");

      console.log(response.data.todos);
      setTodos(response.data.todos);

      const fetchedTodos = response.data.todos || [];
      const pending = fetchedTodos.filter((todo) => todo.status !== "completed");

      const completed = fetchedTodos.filter((todo) => todo.status == "completed");

      setPendingTodos(pending);
      setCompletedTodos(completed);

    } catch (error) {
      console.log("error", error)
    }
  };

  const markTodoAsCompleted = async (todoId) => {
    try {
      setMarked(true);
      const response = await axios.patch(`http://192.168.160.56.56:3000/todos/${todoId}/complete`);
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("completed", completedTodos);
  console.log("pending", pendingTodos);
  return (
    <>
      <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Pressable style={{
          backgroundColor: "#F66778",
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Text style={{ color: "white", textAlign: "center" }}>All</Text>
        </Pressable>

        <Pressable style={{
          backgroundColor: "#F66778",
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Text style={{ color: "white", textAlign: "center" }}>Work</Text>
        </Pressable>

        <Pressable style={{
          backgroundColor: "#F66778",
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          marginRight: "auto"
        }}>
          <Text style={{ color: "white", textAlign: "center" }}>Personal</Text>
        </Pressable>

        <Pressable onPress={() => setModalVisible(!isModalVisible)}>
        <LottieView style={{ width:45 ,height:45}} source={require('./../../../assets/plus.json')} autoPlay loop />

        </Pressable>


      </View>

      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && <Text>Tasks to Do! {today}</Text>}
              

              {pendingTodos?.map((item,index) => (
                <Pressable
                onPress={()=> {
                  router?.push({
                    pathname: "/home/info",
                    params: {
                      id: item._id,
                      title: item?.title,
                      category: item?.category,
                      createdAt: item?.createdAt,
                      dueDate: item?.dueDate,
                    },
                  });
                }}
                 style={{backgroundColor:"#E0E0E0",padding:10,borderRadius:7,marginVertical:10}} key={index}>
                  <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
                  <Entypo onPress={()=> markTodoAsCompleted(item?._id)} name="circle" size={24} color="black" />
                  <Text style={{flex:1}}>{item?.title}</Text>
                  <Feather name="flag" size={20} color="black" />
                  </View>
                </Pressable>
              ))}


              {completedTodos?.length > 0 && (
                <View>
                  <View style={{justifyContent:"center",alignItems:"center",margin:10,}}>
                  <LottieView style={{flex:1, width:150 ,height:150}} source={require('./../../../assets/right.json')} autoPlay loop />
                    </View>

                    <View style={{flexDirection:"row",alignItems:"center",gap:5,marginVertical:10}}>
                      <Text>Completed Tasks</Text>
                      <MaterialIcons name="arrow-drop-down" size={24} color="black" />
                      </View>


                      {completedTodos?.map((item,index) => (
                <Pressable style={{backgroundColor:"#E0E0E0",padding:10,borderRadius:7,marginVertical:10}} key={index}>
                  <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
                  <FontAwesome name="circle" size={24} color="gray" />
                  <Text style={{flex:1, textDecorationLine:"line-through",color:"gray"}}>{item?.title}</Text>
                  <Feather name="flag" size={20} color="gray" />
                  </View>
                </Pressable>
              ))}
                </View>
              )}
              </View>
          ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 130, marginLeft: "auto", marginRight: "auto" }}>
              <Image
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                source={homebg}
              />

              <Text style={{ fontSize: 16, marginTop: 15, fontWeight: "600", textAlign: "center" }}>No Tasks for today! add a task</Text>
              <Pressable onPress={() => setModalVisible(!isModalVisible)} style={{ marginTop: 15 }}>
                <AntDesign name="pluscircle" size={38} color="#E24759" />
              </Pressable>
              
            </View>
          )
          }
        </View>
      </ScrollView>

      <BottomModal onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideForm: "bottom"
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}>
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View style={{
            marginVertical: 10, flexDirection: "row", alignItems: "center",
            gap: 10,
          }}>
            <TextInput value={todo} onChangeText={(text) => setTodo(text)}
              placeholder="Input a new Task here"
              style={{ padding: 10, borderColor: "#E0E0E0", borderWidth: 1, borderRadius: 5, flex: 1 }} />
            <Ionicons onPress={addTodo} name="send" size={24} color="#007FFF" />
          </View>


          <Text>Choose Category</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 10 }}>
            <Pressable
              onPress={() => setCategory("work")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25
              }}>
              <Text>Work</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("Personal")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25
              }}>
              <Text>Personal</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("Wishlist")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25
              }}>
              <Text>Wishlist</Text>
            </Pressable>
          </View>
          <Text>Some Suggestions</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flexWrap: "wrap", marginVertical: 10 }}>
            {suggestions?.map((item, index) => (
              <Pressable onPress={() => setTodo(item?.todo)} style={{ backgroundColor: "#F0F8FF", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 25 }} key={index}>
                <Text style={{ textAlign: "center" }}>{item?.todo}</Text>
              </Pressable>
            ))}
          </View>

        </ModalContent>
      </BottomModal>
    </>
  )
}

export default index

const styles = StyleSheet.create({})