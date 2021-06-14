import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View>
      <Text> login</Text>
      {/*button to navigate to registerscreen*/}
      <TouchableOpacity onPress={() => navigation.push("RegisterScreen")}>
        <Text>register</Text>
      </TouchableOpacity>
      {/*button to navigate to homescreen*/}
      <TouchableOpacity
        onPress={() => navigation.navigate("Home", { screen: "HomeScreen" })}
      >
        <Text>home</Text>
      </TouchableOpacity>
    </View>
  );
}
