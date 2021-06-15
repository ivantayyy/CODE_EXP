import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "../database/firebaseDB";

const db = firebase.firestore();
const auth = firebase.auth();

export default function RegisterScreen() {
  const [userDetails, setUserDetails] = useState(null);
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

  {
    /*db.collection("users")
    .doc(UID)
    .get()
    .then((documentSnapshot) => {
      //console.log(documentSnapshot.data());
      setUserDetails(documentSnapshot.data());
    });*/
  }

  console.log(userDetails);
  return (
    <View style={styles.container}>
      <Text> name: </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
});
