import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import Validation from "../components/Validation"

   

export default function LoginScreen({ navigation, Component }) {
  return (

    <View style = {styles.Container}>
      <Text style={styles.welcomeword}><strong>Welcome to HealthFirst</strong></Text>

    <Validation />
    

      <Image style={styles.image}
            source={require(
                '../images/logo.jpg'
      )}
          />
            <TextInput style = {styles.input}
               placeholder = "Email"
               placeholderTextColor = "#bababa"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               placeholder = "Password"
               placeholderTextColor = "#bababa"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
            <Text style={styles.registration}> "Don't have a account? Register"</Text>
            <TouchableOpacity style={styles.registerpush} onPress={() => navigation.push("RegisterScreen")}>
        {"here"}
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  welcomeword: {
    fontSize:24,
    color: 'blue',
    justifyContent: 'center',
    paddingLeft: 30,
    marginTop:50
  },
     image: {
     marginBottom:100,
     marginLeft:60,
    height: 50,
    width: 200,
   },
   registration:{
     alignContent: 'center',
     marginLeft: 60
   },
   registerpush: {
     fontSize:16,
     fontFamily:'calibri',
     marginLeft:150,
     textDecorationLine: 'underline'
     
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft:125
   },
   submitButton: {
      backgroundColor: '#000000',
      padding: 10,
      margin: 15,
      marginLeft: 125,
      marginRight:130,
      height: 40,
      
   },
   submitButtonText:{
      color: 'white'
   }
})