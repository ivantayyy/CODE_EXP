import React, { useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateConverter from "../components/DateConverter";
import TimeFormatter from "../components/TimeFormatter.js";

export default function BookAppointmentScreen() {
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + "-" + month + "-" + year; //format: dd-mm-yyyy;
  };
  console.log(getCurrentDate());
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
  };

  const showTimepicker = () => {
    showMode("time");
    setDisplay("spinner");
  };

  return (
    <View style={styles.container}>
      <DateConverter selectedDate={date}></DateConverter>
      <TimeFormatter selectedDate={date}></TimeFormatter>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />

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
