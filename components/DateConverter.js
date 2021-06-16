import React, { useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateConverter({ selectedDate, dateSelected }) {
  var month = selectedDate.getUTCMonth();
  var day = selectedDate.getUTCDate();
  var year = selectedDate.getUTCFullYear();

  var stringMonth = monthConverter(month);
  if (dateSelected) {
    return (
      <Text style={{ fontSize: 16 }}>
        {day} {stringMonth} {year}
      </Text>
    );
  } else {
    return <Text>Please select an appointment date</Text>;
  }
}

function monthConverter(mm) {
  var month = "";
  switch (mm) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }
  return month;
}
