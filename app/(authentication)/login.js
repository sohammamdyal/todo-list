import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from "axios";
import topBg from './../../assets/regis1.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

import botBg from './../../assets/regis2.png';

const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    router.replace("/(tabs)/home")
                }
            } catch (error) {
                console.log(error)
            }
        }
        checkLoginStatus();
    }, [])
    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        };

        axios.post("http://192.168.160.56:3000/login", user).then((response) => {
            const token = response.data.token;
            AsyncStorage.setItem("authToken", token);
            router.replace("/(tabs)/home")
        })
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View >
            <Image style={{ width: 500, height: 150}} source={topBg} />
                <Text style={{ fontSize: 20, fontWeight: "600", color: "#2196F3" }}>TODO-LIST TRACKER</Text>
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>Log on to your account</Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center", gap: 5,
                        backgroundColor: "#FFFFFF",
                        elevation:15,
                        paddingVertical: 5,
                        borderRadius: 50,
                        marginTop: 30
                    }}>
                        <MaterialIcons style={{ marginLeft: 15 }} name="email" size={24} color="gray" />
                        <TextInput value={email} onChangeText={(text) => setEmail(text)} style={{
                            color: "gray",
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
                            name="lock1" size={24} color="gray" />
                        <TextInput value={password}
                            secureTextEntry={true} onChangeText={(text) => setPassword(text)} style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: password ? 17 : 17
                            }} placeholder='enter your password' />
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 12, alignItems: "center", justifyContent: "space-between" }}>
                        <Text>Keep me logged in</Text>
                        <Text style={{ color: "#007FFF", fontWeight: "500" }}>Forgot password?</Text>
                    </View>
                    <View style={{ marginTop: 60 }}>
                        <Pressable onPress={() => handleLogin()} style={{ width: 200, backgroundColor: "#E24759", padding: 15, borderRadius: 6, marginLeft: "auto", marginRight: "auto" }}>
                            <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 16 }}>Login</Text>
                        </Pressable>

                        <Pressable onPress={() => router.replace("/register")} style={{ marginTop: 15 }}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: "gray" }}>Don't have an acount? SignUp</Text>
                        </Pressable>
                    </View>

                    <Image style={{ width: 200, height: 269, marginLeft:-50}} source={botBg} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default login

const styles = StyleSheet.create({})