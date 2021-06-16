import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import firebase from "../database/firebaseDB";
require("firebase/auth");

const db = firebase.firestore();
const auth = firebase.auth();

export default function RegisterScreen() {
  const [userDetails, setUserDetails] = useState(null);
  const Navigation = useNavigation();

  const UID = auth.currentUser.uid;
  console.log(UID);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(UID)
      .onSnapshot((doc) => {
        console.log(doc.data());
        setUserDetails(doc.data());
      });

    return () => {
      unsubscribe();
    };
  }, []);

  function signout() {
    auth.signOut().then(() => {
      console.log("user signed out");
    });
    Navigation.navigate("Auth");
  }

  console.log(userDetails);
  if (userDetails != null) {
    return (
      <View style={styles.container}>
        <Text> name: {userDetails["Name"]}</Text>
        <Button onPress={signout} title="signout"></Button>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
});
