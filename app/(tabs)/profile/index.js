import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import stubg from './../../../assets/gundam.png';
import LottieView from 'lottie-react-native';
import { LineChart } from 'react-native-chart-kit';


const index = () => {
  const [completedTasks,setCompletedTasks] = useState(0);
  const [pendingTasks,setPendingTasks] = useState(0);

  const fetchTasksData = async () => {
    try{
      const response = await axios.get("http://192.168.160.56:3000/todos/count");
      const { totalCompletedTodos,totalPendingTodos} = response.data;
      setCompletedTasks(totalCompletedTodos);
      setPendingTasks(totalPendingTodos);
    }catch(error){
      console.log("error",error);
    }
  }
  useEffect(() => {
    fetchTasksData();
  },[]);
  console.log("comp",completedTasks);
  console.log("pending",pendingTasks);
  return (
    <View style={{padding:10,flex:1,backgroundColor:"white"}}>
     <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
    <Image style={{width:60,height:60,borderRadius:30}}
    source={stubg} />

    <View>
      <Text style={{fontSize:16,fontWeight:"600"}}>Keep plans for 15 days</Text>
      <Text style={{fontSize:15,color:"gray",marginTop:4}}>Select Categories</Text>
    </View>
     </View>
     <View style={{marginVertical:12}}> 
    <Text>Tasks Overview</Text>
    <View style={{flexDirection:"row",alignItems:"center",gap:6,marginVertical:8}}>
      <View style={{backgroundColor:"#89CFF0",padding:10,borderRadius:30,flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text style={{textAlign:"center",fontSize:16,fontWeight:"bold"}}>{completedTasks}</Text>
        <Text style={{marginTop:4}}>Completed Tasks</Text>
      </View>
      <View style={{backgroundColor:"#89CFF0",padding:10,borderRadius:30,flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text style={{textAlign:"center",fontSize:16,fontWeight:"bold"}}>{pendingTasks}</Text>
        <Text style={{marginTop:4}}>Pending Tasks</Text>
      </View>
    </View>
     </View>

     <LineChart data={{
      labels:["Pending Tasks", "Completed Tasks"],
      datasets: [
        {
          data: [pendingTasks, completedTasks],
        },
      ],
     }}
     width={Dimensions.get("window").width - 20}
     height={220}
     yAxisInterval={2}
     chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom:"#E24759",
      backgroundGradientTo:"#ffa726",
      decimalPlaces:2,
      color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r:"6",
        strokeWidth: "2",
        stroke: "#E24759",
      },
     }}
     bezier
     style={{
      borderRadius:16,
     }}
     
     />

     <View style={{backgroundColor:"#89CFF0",padding:10,borderRadius:30,marginTop:15}}>
      <Text style={{textAlign:"center",color:"white"}}>Tasks for the next seven days</Text>
     </View>
     <View style={{justifyContent:"center",alignItems:"center",marginTop:20}}>
     <LottieView style={{ width:250 ,height:250,marginTop:50}} source={require('./../../../assets/task.json')} autoPlay loop />
     </View>
    </View>
  );
};

export default index

const styles = StyleSheet.create({})