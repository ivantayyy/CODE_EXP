import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, Platform } from "react";
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
  Button
} from "react-native";
import { List, Card, Paragraph, Title } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack'
import * as ImagePicker from 'expo-image-picker';
import firebase from "../database/firebaseDB";
require("firebase/auth");

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

    useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  
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
      <Image
    style={{  width: 100, height: 100, justifyContent: 'center',  alignItems: 'center', marginTop: 400, borderRadius: 200 / 2 }}
    source={{uri: 'https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Sami-Viitama%CC%88ki-.jpeg'}}
    />
        <Text style={{color: 'grey', fontSize: 20, fontWeight: 'bold'}}> 
        YOUR PARTICULARS:
      </Text>
    <Text style={{color: 'black', fontSize: 18}}> 
        Name:
      </Text>
    <Text style={{color: 'black', fontSize: 18}}> 
        Age:
      </Text>
    <Text style={{color: 'black', fontSize: 18}}> 
        Height:
      </Text>
    <Text style={{color: 'black', fontSize: 18}}> 
        Weight:
      </Text>
    <Text style={{color: 'black', fontSize: 18}}> 
        BMI: (underweight/normal/overweight)
      </Text>
    <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}> 
        Your next appointment:
      </Text>    
    <SafeAreaView>
      <ScrollView>
    <Card style={styles.card}>
          <Card.Content>
            <Title>HEALTH HACKS & TIPS</Title>
            <Paragraph>"The greatest wealth is health. - Virgil"</Paragraph>
          </Card.Content>
          <Card.Cover style={{marginTop: 20, height: 300, width: 300}} source={{ uri: 'https://i.pinimg.com/originals/12/ae/06/12ae0683b00b8219e80a008a5c9310ac.png' }} />
        </Card>
      </ScrollView>
    </SafeAreaView>
        <ActivityIndicator />
      </View>
    );
  }
}

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
   card: {
    marginTop: 140, 
    marginLeft: 15, 
    marginRight: 15,
  }
});
