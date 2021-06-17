import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { List, Card, Paragraph, Title } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import firebase from "../database/firebaseDB";
require("firebase/auth");

const db = firebase.firestore();
const auth = firebase.auth();

export default function MainHomeScreen() {
  const [userDetails, setUserDetails] = useState(null);
  const Navigation = useNavigation();
  const [imageURI, setImageURI] = useState(
    "https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Sami-Viitama%CC%88ki-.jpeg"
  );

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync().catch(
            (error) => {
              this.handleCatchError(error);
            }
          );
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result["uri"]);
    setImageURI(result["uri"]);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: 120,
              height: 120,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
              marginLeft: "30%",
              borderRadius: 200 / 2,
            }}
            source={{
              uri: imageURI,
            }}
          />
          <TouchableOpacity
            style={{ marginTop: 65, marginLeft: 60 }}
            onPress={signout}
          >
            <Text
              style={{
                fontSize: 14,
                backgroundColor: "lightseagreen",
                color: "white",
                borderRadius: 15,
                padding: 5,
              }}
            >
              SignOut
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            padding: 5,
            backgroundColor: "lightpink",
            margin: 10,
            borderRadius: 10,
          }}
          onPress={pickImage}
        >
          <Text>Change Profile Picture</Text>
        </TouchableOpacity>
        <ScrollView style={{ margin: 10 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "grey", fontSize: 20, fontWeight: "bold" }}>
              YOUR PARTICULARS:
            </Text>
            <Text style={{ color: "black", fontSize: 18 }}>
              Name: {userDetails["Name"]}
            </Text>
            <Text style={{ color: "black", fontSize: 18 }}>
              Age: {userDetails["Age"]}
            </Text>
            <Text style={{ color: "black", fontSize: 18 }}>
              Height: {userDetails["Height"]}
            </Text>
            <Text style={{ color: "black", fontSize: 18 }}>
              Weight: {userDetails["Weight"]}
            </Text>
            <Text style={{ color: "black", fontSize: 18 }}>
              BMI: {(userDetails["Weight"] / (userDetails["Height"] / 100)) ^ 2}
            </Text>
            <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
              Your next appointment:
            </Text>
          </View>

          <Card style={styles.card}>
            <Card.Content>
              <Title>HEALTH HACKS & TIPS</Title>
              <Paragraph>"The greatest wealth is health. - Virgil"</Paragraph>
            </Card.Content>
            <Card.Cover
              style={{ marginTop: 20, height: 300, width: 300 }}
              source={{
                uri: "https://i.pinimg.com/originals/12/ae/06/12ae0683b00b8219e80a008a5c9310ac.png",
              }}
            />
          </Card>
        </ScrollView>
      </View>
    );
  } else {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  card: {
    margin: 10,
  },
});
