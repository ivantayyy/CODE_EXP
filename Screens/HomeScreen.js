import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from "react-native";
import appointmentScreen from "./AppointmentScreen.js";
import mainHomeScreen from "./MainHomeScreen.js";
import { createStackNavigator } from "@react-navigation/stack";
import Appointments from "./AppointmentScreen.js";
import BookAppointmentScreen from "./BookAppointmentScreen.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import MoreInfo from "./MoreInfo.js";



const appointmentStack = createStackNavigator();
const appointmentStackScreen = () => (
  <appointmentStack.Navigator headerMode="none">
    <appointmentStack.Screen
      name="Appointments"
      component={Appointments}
      headerLeft={null}
    />
    <appointmentStack.Screen
      name="Book Appointments"
      component={BookAppointmentScreen}
    />
    <appointmentStack.Screen
      name="More Information"
      component={MoreInfo}
    />
  </appointmentStack.Navigator>
);
const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        showIcon : true
      }}
    >
      <Tab.Screen 
      name="Home" 
      component={mainHomeScreen} 
      options={{
        tabBarLabel : 'Home', 
        tabBarIcon : ({ color }) => (
          <MaterialCommunityIcons name='home' color={color} size={30}/>)}} 
      />
      <Tab.Screen 
      name="Appointments" 
      component={appointmentStackScreen}
      options={{
        tabBarLabel : 'Appointments',
        tabBarIcon : ({ color }) => (
          <MaterialCommunityIcons name='calendar' color={color} size={30} />
        )
      }} />
      
    </Tab.Navigator>
  );
}
