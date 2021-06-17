import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as AddCalendarEvent from "react-native-add-calendar-event";
import moment from "moment";

const EVENT_TITLE = "Lunch";
const TIME_NOW_IN_UTC = moment.utc();

const utcDateToString = (momentInUTC) => {
  let s = moment.utc(momentInUTC).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  return s;
};

const addToCalendar = (title, startDateUTC) => {
  const eventConfig = {
    title,
    startDate: utcDateToString(startDateUTC),
    endDate: utcDateToString(moment.utc(startDateUTC).add(1, "hours")),
    notes: "tasty!",
    navigationBarIOS: {
      tintColor: "orange",
      backgroundColor: "green",
      titleColor: "blue",
    },
  };

  console.log(eventConfig);
  AddCalendarEvent.presentEventCreatingDialog(eventConfig).then((eventInfo) => {
    alert("eventInfo -> " + JSON.stringify(eventInfo));
  });
  //.catch((error) => {
  // handle error such as when user rejected permissions
  //alert("Error -> " + error);
  //});
};

const App = () => {
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          Example to Add Event in Google Calendar from React Native App
        </Text>
        <Text style={styles.heading}>
          Event title: {EVENT_TITLE}
          {"\n"}
          Event Date Time: {moment.utc(TIME_NOW_IN_UTC).local().format("lll")}
        </Text>
        <TouchableOpacity
          style={[styles.buttonStyle, { minWidth: "100%" }]}
          onPress={() => {
            addToCalendar(EVENT_TITLE, TIME_NOW_IN_UTC);
          }}
        >
          <Text style={styles.buttonTextStyle}>Add Event to Calendar</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputStyle}
          placeholder="enter event id"
          onChangeText={(text) => setText(text)}
          value={text}
        />
      </View>
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#307ecc",
    padding: 16,
  },
  heading: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#f5821f",
    margin: 15,
  },
  buttonTextStyle: {
    color: "white",
    textAlign: "center",
  },
  buttonHalfStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    flex: 1,
  },
  titleStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
  inputStyle: {
    height: 40,
    minWidth: "100%",
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    backgroundColor: "#ffe6e6",
  },
});
