import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Fontisto } from '@expo/vector-icons';
import topBg from './../../assets/regis1.png';
import botBg from './../../assets/regis2.png';
import axios  from "axios";





const register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password
        }

         axios.post("http://192.168.160.56:3000/register", user).then((response) => {
            console.log(response);
            Alert.alert("Registration successfull", "You have been registered successfully");
            setName("");
            setEmail("");
            setPassword("");
            
        }).catch((error) => {
            Alert.alert("Registration Failed", "an error occured during registration");
            console.log("error", error);
        });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View >
                <Image style={{ width: 500, height: 150}} source={topBg} />
                <Text style={{ fontSize: 20, fontWeight: "600", color: "#E24759", textAlign:"center" }}>TODO-LIST TRACKER</Text>
                
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
                        Register to your account</Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center", gap: 5,
                        backgroundColor: "#FFFFFF",
                        paddingVertical: 5,
                        elevation:15,
                        borderRadius: 50,
                        marginTop: 30
                    }}>
                        <Fontisto style={{ marginLeft: 15 }} name="person" size={24} color="black" />
                        <TextInput value={name}
                            onChangeText={(text) => setName(text)} style={{
                                color: "#000",
                                marginVertical: 10,
                                
                                width: 300,
                                fontSize: email ? 17 : 17
                            }} placeholder='enter your Name' />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center", gap: 5,
                        backgroundColor: "#FFFFFF",
                        paddingVertical: 5,
                        elevation:15,
                        borderRadius: 50,
                        marginTop: 30
                    }}>
                        <MaterialIcons style={{ marginLeft: 15 }} name="email" size={24} color="black" />
                        <TextInput value={email} onChangeText={(text) => setEmail(text)} style={{
                            color: "#000",
                            marginVertical: 10,
                            width: 300,
                            fontSize: email ? 17 : 17
                        }} placeholder='enter your email' />
                    </View>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center", gap: 5,
                        backgroundColor: "#FFFFFF",
                        paddingVertical: 5,
                        elevation:15,
                        borderRadius: 50,
                        marginTop: 30
                    }}>
                        <AntDesign style={{ marginLeft: 15 }}
                            name="lock1" size={24} color="black" />
                        <TextInput value={password}
                            secureTextEntry={true} onChangeText={(text) => setPassword(text)} style={{
                                color: "#000",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 17 : 17
                            }} placeholder='enter your password' />
                    </View>


                    <View style={{ marginTop: 60 }}>
                        <Pressable onPress={()=>handleRegister()} style={{ width: 200, backgroundColor: "#E24759", padding: 15, borderRadius: 50, marginLeft: "auto", marginRight: "auto" }}>
                            <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 18 }}>Register</Text>
                        </Pressable>

                        <Pressable onPress={() => router.replace("/login")} style={{ marginTop: 15 }}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: "gray" }}>Already have a account? Sign Up</Text>
                        </Pressable>
                    </View>
                    

                    <Image style={{ width: 200, height: 269, marginLeft:-50}} source={botBg} />

                    

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default register

const styles = StyleSheet.create({})