import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import loginScreen from "./Screens/LoginScreen.js";
import registerScreen from "./Screens/RegisterScreen.js";
import homeScreen from "./Screens/HomeScreen.js";

//function loginScreen(){

//<TouchableOpacity onPress>to home</TouchableOpacity>

//}

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="LoginScreen"
      component={loginScreen}
      options={{ title: "Login" }}
    />
    <AuthStack.Screen
      name="RegisterScreen"
      component={registerScreen}
      options={{ title: "Register Account" }}
    />
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen
      name="Auth"
      component={AuthStackScreen}
      options={{
        animationEnabled: false,
      }}
    />
    <RootStack.Screen
      name="Home"
      component={homeScreen}
      options={{
        animationEnabled: false,
      }}
    />
  </RootStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <RootStackScreen></RootStackScreen>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
