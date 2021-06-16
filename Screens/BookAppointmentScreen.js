import React, { useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateConverter from "../components/DateConverter";
import TimeFormatter from "../components/TimeFormatter.js";
import firebase from "../database/firebaseDB";

const db = firebase.firestore();
const auth = firebase.auth();

export default function BookAppointmentScreen() {
  const [timeSelected, setTimeSelected] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState("default");
  console.log(date);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    setDisplay("calendar");
    setDateSelected(true);
  };

  const showTimepicker = () => {
    showMode("time");
    setDisplay("spinner");
    setTimeSelected(true);
  };

  function bookAppointment() {
    var UID = auth.currentUser.uid;
    console.log(UID);
    var selDate = <DateConverter selectedDate={date}></DateConverter>;
    var selTime = <TimeFormatter selectedDate={date}></TimeFormatter>;
    var appointment =
      "Date: " + JSON.stringify(selDate) + " Time: " + JSON.stringify(selTime);

    console.log(timeSelected + " " + dateSelected);
    if (timeSelected && dateSelected) {
      db.doc("users/" + UID).update({
        Appointments: firebase.firestore.FieldValue.arrayUnion(date),
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text>
        <DateConverter selectedDate={date}></DateConverter>
      </Text>
      <Text>
        <TimeFormatter selectedDate={date}></TimeFormatter>
      </Text>
      <Button onPress={showDatepicker} title="Choose Appointment Date" />
      <Button onPress={showTimepicker} title="Choose Appointment Time" />
      <Button onPress={bookAppointment} title="Book Appointment" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display={display}
          onChange={onChange}
          minuteInterval={15}
        />
      )}
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
