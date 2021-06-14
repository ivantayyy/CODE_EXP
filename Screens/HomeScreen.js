import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import appointmentScreen from "./AppointmentScreen.js";
import mainHomeScreen from "./MainHomeScreen.js";

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
      <Tab.Screen name="Appointments" component={appointmentScreen} />
    </Tab.Navigator>
  );
}
