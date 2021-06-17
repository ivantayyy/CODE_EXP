import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "../database/firebaseDB";
import { debug } from "react-native-reanimated";
require("firebase/auth");

const auth = firebase.auth();
const db = firebase.firestore();

export default class Register extends React.Component {
  state = {
    name: "",
    email: "",
    number: "",
    password: "",
    confirmpassword: "",
    username: "",
    dateOfbirth: "",
  };

  submit = () => {
    const {
      dateOfbirth,
      height,
      weight,
      age,
      password,
      confirmpassword,
      number,
      email,
      name,
    } = this.state;
    console.log(this.state);
    if (
      (dateOfbirth == "" || password == "",
      confirmpassword == "",
      email == "" || name == "")
    ) {
      alert("all fields are required");
    } else {
      auth.createUserWithEmailAndPassword(email, password).then(() => {
        this.setState({ userID: auth.currentUser.uid });
        console.log(auth.currentUser.uid);
      });
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ userID: user.uid });
          var uid = user.uid;
          console.log(uid);

          firebase.firestore().collection("users").doc(user.uid).set({
            ID: user.uid,
            Name: name,
            DateOfBirth: dateOfbirth,
            Email: email,
            Number: number,
            Age: age,
            Height: height,
            Weight: weight,
            Appointments: [],
          });
          this.props.navigation.navigate("Home", { screen: "HomeScreen" });
        }
      });
    }
  };
  render() {
    return (
      <ImageBackground
        source={{
          uri: "https://media.istockphoto.com/vectors/abstract-geometric-medical-cross-shape-medicine-and-science-concept-vector-id940993008?b=1&k=6&m=940993008&s=612x612&w=0&h=MlO85d9Coxm475xnHufahHqgIRfU1H6dvEe5QeOx2HQ=",
        }}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>HealthFirst</Text>
          <Text style={{ fontSize: 30 }}>Register Now</Text>

          <TextInput
            onChangeText={(Name) => this.setState({ name: Name })}
            placeholder="Name"
            style={{
              backgroundColor: "white",
              padding: 10,
              width: "70%",
              marginTop: 10,
              fontSize: 18,
            }}
          />
          <TextInput
            onChangeText={(Email) => this.setState({ email: Email.trim() })}
            placeholder="Email"
            style={{
              backgroundColor: "white",
              padding: 10,
              width: "70%",
              marginTop: 10,
              fontSize: 18,
            }}
          />
          <TextInput
            onChangeText={(Number) => this.setState({ number: Number })}
            placeholder="Phone Number"
            style={{
              backgroundColor: "white",
              padding: 10,
              width: "70%",
              marginTop: 10,
              fontSize: 18,
            }}
          />
          <TextInput
            onChangeText={(DateOfBirth) =>
              this.setState({ dateOfbirth: DateOfBirth })
            }
            placeholder="Date of birth: dd/mm/yyyy "
            style={{
              backgroundColor: "white",
              padding: 10,
              width: "70%",
              marginTop: 10,
              fontSize: 18,
            }}
          />
          <TextInput
            onChangeText={(Age) => this.setState({ age: Age })}
            placeholder="Age"
            style={{
              backgroundColor: "white",
              padding: 10,
              width: "70%",
              marginTop: 10,
              fontSize: 18,
            }}
          />
          <TextInput
            onChangeText={(Height) => this.setState({ height: Height })}
            placeholder="Height "
            style={{
              backgroundColor: "white",
              padding: 10,
              width: "70%",
              marginTop: 10,
              fontSize: 18,
            }}
          />
          <TextInput
            onChangeText={(Weight) => this.setState({ weight: Weight })}
            placeholder="Weight"
            style={{
              backgroundColor: "white",
              padding: 10,
              width: "70%",
              marginTop: 10,
              fontSize: 18,
            }}
          />

          <TextInput
            onChangeText={(Password) => this.setState({ password: Password })}
            placeholder="Password"
            secureTextEntry={true}
            style={{
              backgroundColor: "white",
              padding: 10,
              width: "70%",
              marginTop: 10,
              fontSize: 18,
            }}
          />

          <TextInput
            onChangeText={(ConfirmPassword) =>
              this.setState({ confirmpassword: ConfirmPassword })
            }
            placeholder=" Confirm Password"
            secureTextEntry={true}
            style={{
              backgroundColor: "white",
              padding: 10,
              width: "70%",
              marginTop: 10,
              fontSize: 18,
            }}
          />

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.submit}
            style={{ width: "100%" }}
          >
            <View
              style={{
                backgroundColor: "grey",
                padding: 14,
                marginTop: 10,
                width: "50%",
                marginLeft: "5%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{ textAlign: "center", color: "black", fontSize: 18 }}
              >
                REGISTER
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={{ textAlign: "center", color: "red", fontSize: 18 }}>
            Already a user ?{" "}
          </Text>
          <Text style={{ color: "red" }}>Login here</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
