import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BookAppointmentScreen from "./BookAppointmentScreen";

function Appointments({ navigation }) {}
const appointmentStack = createStackNavigator();

export default function AppointmentScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Upcoming Appointments</Text>
      <Button
        onPress={() => navigation.push("Book Appointments")}
        title="Book Appointment"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightpink",
  },
});
