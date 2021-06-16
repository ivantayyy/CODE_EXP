import React, { useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default function TimeFormatter({ selectedDate, timeSelected }) {
  var hour = selectedDate.getHours();
  var min = selectedDate.getMinutes();
  var minBuffer = "";
  if (min < 10) minBuffer = "0";
  else minBuffer = "";
  var AMorPM = "";
  if (hour > 11) {
    AMorPM = "PM";
  } else AMorPM = "AM";

  if (timeSelected) {
    if (hour >= 8 && hour <= 20) {
      return (
        <Text style={{ fontSize: 16 }}>
          {hour % 12}:{minBuffer}
          {min}
          {AMorPM}
        </Text>
      );
    } else {
      return <Text>Please select a time between 8AM and 8PM</Text>;
    }
  } else {
    return <Text>Please select an appointment time</Text>;
  }
}
