import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";
import firebase from "../database/firebaseDB";
import { createStackNavigator } from "@react-navigation/stack";
import BookAppointmentScreen from "./BookAppointmentScreen";
require("firebase/auth");

const db = firebase.firestore();
const auth = firebase.auth();

const appointmentStack = createStackNavigator();

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Schedule: React.FC = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [appointments, setAppointments] = useState(null);
  const [items2, setItems2] = useState({});
  const [sortedData, setSortedData] = useState(null);
  var dataBuffer = [];
  const UID = auth.currentUser.uid;

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(UID)
      .onSnapshot((doc) => {
        console.log(doc.data());

        dataBuffer = doc.data()["Appointments"];
        if (dataBuffer != null) {
          const sortedData = dataBuffer.sort(
            (a, b) => a.timeStamp - b.timeStamp
          );

          var out = sortedData.map(function (element) {
            return {
              id: element.id,
              date:
                "Date: " +
                element.date.slice(0, 16) +
                " Time: " +
                element.date.slice(16, 21),
            };
          });
          setAppointments(out);
          console.log(appointments);

          var out2 = sortedData.map(function (element) {
            return {
              date: Date.parse(element.date),
            };
          });
          console.log("out2 " + JSON.stringify(out2));
        }

        var out3 = out2.map(function (element) {
          var date = new Date(element.date);
          console.log(
            "Date: " +
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear() +
              " " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds()
          );
          return {
            date:
              date.getFullYear() +
              "-" +
              "0" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate(),
            time: date.getHours() + ":" + date.getMinutes(),
          };
        });
        console.log("out3 " + JSON.stringify(out3));
        setItems2(out3);
        {
          /*for (var i = 0; i < out3.length; i++) {
          //console.log("items " + JSON.stringify(items));
          console.log("arr " + JSON.stringify(out3[i]));
          //items[out3[i].date];
          if (items2[out3[i].date] == null) {
            items2[out3[i].date] = [];
          }
          items2[out3[i].date].push({
            name: "Doctor Appointment @ " + out3[i].time,
            height: Math.max(50, Math.floor(Math.random() * 150)),
          });
        }*/
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    //setItems({});
    //loadItems();
    console.log("useeffect");
  }, [items2]);

  const reloadAgenda = () => {
    setItems({});
  };

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -2; i < 7; i++) {
        var time =
          day.timestamp + i * 24 * 60 * 60 * 1000 + 30 * 24 * 60 * 60 * 1000;
        //const time = new Date().getTime;
        console.log("time " + day.timestamp);
        const strTime = timeToString(time);
        //console.log("items2 " + JSON.stringify(items2));
        if (!items[strTime]) {
          items[strTime] = [];

          for (let j = 0; j < items2.length; j++) {
            console.log(
              "items2.date " + items2[j].date + " strTime " + strTime
            );
            if (items2[j].date == strTime)
              items[strTime].push({
                name:
                  "Doctor Appointment @ " +
                  items2[j].time +
                  " https://zoom.us/" +
                  Math.floor(Math.random() * 999999999999),
                height: Math.max(50, Math.floor(Math.random() * 150)),
              });
          }
        }
      }

      {
        /*for (var j = 0; j < items2.length; j++) {
        //console.log("items " + JSON.stringify(items));
        console.log("arr " + JSON.stringify(items2));
        //items[out3[i].date];
        if (items[items2.date] == null) {
          items[items2.date] = [];
        }
        items[items2.date].push({
          name: "Doctor Appointment @ " + items2.time,
          height: Math.max(50, Math.floor(Math.random() * 150)),
        });
      }
    */
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
      console.log("working items " + JSON.stringify(items));
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          marginTop: 60,
          padding: 10,
          borderRadius: 15,
          fontWeight: "bold",
          color: "green",
          fontSize: 24,
        }}
      >
        Upcoming Appointments
      </Text>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        //selected={"2021-06-17"}
        selected={new Date()}
        renderItem={renderItem}
        onRefresh={() => {
          //setItems({});
        }}
      />
      <TouchableOpacity
        style={{
          margin: 10,
          padding: 10,
          paddingHorizontal: 100,
          backgroundColor: "steelblue",
          borderRadius: 20,
        }}
        onPress={() => navigation.push("Book Appointments")}
      >
        <Text style={{ color: "white" }}>Book New Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Schedule;
