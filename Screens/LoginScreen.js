import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import firebase from "../database/firebaseDB";
require("firebase/auth");

const auth = firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        console.log("Signed In");
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require("../assets/logo2.jpg")}
      />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email.trim())}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={login}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.registration}> "Don't have a account? Register"</Text>
      <TouchableOpacity
        style={styles.registerpush}
        onPress={() => navigation.push("RegisterScreen")}
      >
        <Text>here</Text>
      </TouchableOpacity>

      {/*<TouchableOpacity
        onPress={() => navigation.navigate("Home", { screen: "HomeScreen" })}
      >
        <Text>To Home Page Button</Text>
      </TouchableOpacity>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#64af95",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#64af95",
  },
  registerpush: {
    fontSize: 16,
    fontFamily: "calibri",
    marginLeft: 150,
    textDecorationLine: "underline",
  },
});
