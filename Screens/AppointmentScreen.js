import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import BookAppointmentScreen from "./BookAppointmentScreen";
import firebase from "../database/firebaseDB";
require("firebase/auth");

const db = firebase.firestore();
const auth = firebase.auth();

const appointmentStack = createStackNavigator();

export default function AppointmentScreen({ navigation }) {
  const [appointments, setAppointments] = useState(null);
  var dataBuffer = [];
  const UID = auth.currentUser.uid;
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(UID)
      .onSnapshot((doc) => {
        console.log(doc.data());

        dataBuffer = doc.data()["Appointments"];
        console.log(dataBuffer);
        var out = dataBuffer.map(function (element) {
          return (
            "Date: " + element.slice(0, 16) + " Time: " + element.slice(16, 21)
          );
        });
        setAppointments(out);
        console.log(appointments);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{item}</Text>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        style={{ width: "90%" }}
        //keyExtractor={(item) => item.id.toString()}
      />
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
  title: {
    marginTop: 60,
    backgroundColor: "#2aa34a",
    padding: 10,
    borderRadius: 15,
  },
});
