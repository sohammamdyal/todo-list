import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

const info = () => {
    const params = useLocalSearchParams();
  return (
    <View style={{flex:1,backgroundColor:"white",padding:10}}>
     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
     <Ionicons name="arrow-back" size={24} color="black" />
     <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
     </View>
     <View style={{marginTop:5}}>
        <Text style={{fontSize:15,fontWeight:"500"}}>Category - {params?.category}</Text>
     </View>
     <Text style={{marginTop:20,fontSize:17,fontWeight:"600"}}>{params?.title}</Text>
     <View style={{marginTop:15}} />
     <Pressable style={{flexDirection:"row",alignItems:"center",gap:5,marginTop:40}}>
     <Entypo name="plus" size={24} color="#7C89E8" />
        <Text style={{color:"#7C89E8",fontSize:16,fontWeight:"500"
        }}>Add a subtask</Text>
     </Pressable>
     <View style={{marginTop:15}}> 
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"
        }}>
            <View style={{flexDirection:"row",alignItems:"center",gap:7}}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text>Due Date</Text>
            </View>
            <Pressable style={{backgroundColor:"#F0F0F0",padding:7,borderRadius:6}}>
                <Text>{params?.dueDate}</Text>
            </Pressable>
        </View>
     </View>

     <View style={{marginTop:15}}> 
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"
        }}>
            <View style={{flexDirection:"row",alignItems:"center",gap:7}}>
            <Ionicons name="time-sharp" size={24} color="gray" />
            <Text>Time and Remainder</Text>
            </View>
            <Pressable style={{backgroundColor:"#F0F0F0",padding:7,borderRadius:6}}>
                <Text>No</Text>
            </Pressable>
        </View>
     </View>

     <View style={{marginTop:15}}> 
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"
        }}>
            <View style={{flexDirection:"row",alignItems:"center",gap:7}}>
            <Feather name="repeat" size={24} color="black" />
            <Text>Repeat Tasks</Text>
            </View>
            <Pressable style={{backgroundColor:"#F0F0F0",padding:7,borderRadius:6}}>
                <Text>No</Text>
            </Pressable>
        </View>
     </View>

     <View style={{marginTop:15}}> 
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"
        }}>
            <View style={{flexDirection:"row",alignItems:"center",gap:7}}>
            <SimpleLineIcons name="note" size={24} color="black" />
            <Text>Notes</Text>
            </View>
            <Pressable style={{backgroundColor:"#F0F0F0",padding:7,borderRadius:6}}>
                <Text>Not Added</Text>
            </Pressable>
        </View>
     </View>
    </View>
  )
}

export default info

const styles = StyleSheet.create({})