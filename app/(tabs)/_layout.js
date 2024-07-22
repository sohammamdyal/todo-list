import {Tabs} from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

export default function Layout(){
    return (
        <Tabs>
            <Tabs.Screen name="home" 
             options={{
                tabBarLabel:"home", 
                tabBarLabelStyle:{color: "#E24759"},
                headerShown:false,
                tabBarIcon:({focused}) =>
                    focused? (
                        <LottieView style={{flex:1, width:150 ,height:150}} source={require('./../../assets/home.json')} autoPlay loop />
                    ) : (
                        <LottieView style={{flex:1, width:150 ,height:150}} source={require('./../../assets/home.json')} autoPlay loop />
                    )
                }} />

                {/* 2 */}
                <Tabs.Screen name="calender"
             options={{
                tabBarLabel:"calender", 
            
                tabBarLabelStyle:{color: "#E24759"},
                headerShown:false,
                tabBarIcon:({focused}) =>
                    focused? (
                        <LottieView style={{flex:1, width:150 ,height:150}} source={require('./../../assets/calender.json')} autoPlay loop />
                    ) : (
                        <LottieView style={{flex:1, width:150 ,height:150}} source={require('./../../assets/calender.json')} autoPlay loop />
                    )
                }} />

                {/* 3 */}
                <Tabs.Screen name="profile"
             options={{
                tabBarLabel:"profile", 
                tabBarLabelStyle:{color: "#E24759"},
                headerShown:false,
                tabBarIcon:({focused}) =>
                    focused? (
                        <LottieView style={{flex:1, width:150 ,height:150}} source={require('./../../assets/profile.json')} autoPlay loop />
                    ) : (
                        <LottieView style={{flex:1, width:150 ,height:150}} source={require('./../../assets/profile.json')} autoPlay loop />
                    )
                }} />
        </Tabs>
    )
}