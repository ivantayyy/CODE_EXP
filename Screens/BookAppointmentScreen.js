import React, { useState, useEffect } from "react";
import { Button, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateConverter from "../components/DateConverter";
import TimeFormatter from "../components/TimeFormatter.js";
import firebase from "../database/firebaseDB";
import DropDownPicker from "react-native-dropdown-picker";
import { debug } from "react-native-reanimated";

const db = firebase.firestore();
const auth = firebase.auth();

export default function BookAppointmentScreen({ navigation }) {
  const [timeSelected, setTimeSelected] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState("default");
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { label: "Clementi", value: "Clementi" },
    { label: "Woodlands", value: "Woodlands" },
    { label: "Bedok", value: "Bedok" },
    { label: "Toa Payoh", value: "Toa Payoh" },
  ]);
  console.log(date);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    if (mode == "date") setDateSelected(true);
    else if (mode == "time") setTimeSelected(true);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    setDisplay("calendar");
  };

  const showTimepicker = () => {
    showMode("time");
    setDisplay("spinner");
  };

  var UID = auth.currentUser.uid;
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(UID)
      .onSnapshot((doc) => {
        if (doc.data()["Appointments"] != null) {
          var id = doc.data()["Appointments"].length;
          console.log("doc " + doc.data()["Appointments"].length);
          setCount(id);
          console.log("count " + count);
        }
      });
  });

  function bookAppointment() {
    console.log(UID);

    db.doc("users/" + UID).update({
      Appointments: firebase.firestore.FieldValue.arrayUnion({
        id: count,
        date: date.toString(),
        timeStamp: date,
      }),
    });
    //navigation.push("More Information", { date });
    navigation.pop();
  }

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 20 }}>
          Selected Appointment Time
        </Text>
        <DateConverter
          selectedDate={date}
          dateSelected={dateSelected}
        ></DateConverter>
        <TimeFormatter
          selectedDate={date}
          timeSelected={timeSelected}
        ></TimeFormatter>
      </View>

      <TouchableOpacity
        onPress={showDatepicker}
        style={styles.button}
        disabled={false}
      >
        <Text>Choose Appointment Date</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={showTimepicker}
        style={styles.button}
        disabled={false}
      >
        <Text>Choose Appointment Time</Text>
      </TouchableOpacity>

      <View style={{ minHeight: 200 }}>
        {/*<DropDownPicker
          style={styles.dropdown}
          placeholder={"Please select a clinic location"}
          open={open}
          value={location}
          items={items}
          setOpen={setOpen}
          setValue={setLocation}
          setItems={setItems}
        />*/}
      </View>

      <TouchableOpacity
        onPress={bookAppointment}
        style={
          !(timeSelected && dateSelected) ? styles.disableBtn : styles.submitBtn
        }
        disabled={!(timeSelected && dateSelected)}
      >
        <Text>Book Appointment</Text>
      </TouchableOpacity>
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
  text: {
    marginTop: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    backgroundColor: "lightblue",
  },
  submitBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginTop: 60,
    backgroundColor: "#2aa34a",
  },
  disableBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginTop: 60,
    backgroundColor: "#808080",
  },
  dropdown: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginLeft: 40,
    backgroundColor: "lightblue",
  },
});
