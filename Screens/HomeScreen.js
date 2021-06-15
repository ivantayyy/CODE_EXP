import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import appointmentScreen from "./AppointmentScreen.js";
import mainHomeScreen from "./MainHomeScreen.js";
import { createStackNavigator } from "@react-navigation/stack";
import Appointments from "./AppointmentScreen.js";
import BookAppointmentScreen from "./BookAppointmentScreen.js";

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
  </appointmentStack.Navigator>
);
const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={mainHomeScreen} />
      <Tab.Screen name="Appointments" component={appointmentStackScreen} />
    </Tab.Navigator>
  );
}
