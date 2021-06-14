import React from 'react' ;
import {Text ,View, StyleSheet , ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class Register extends React.Component {

state={
name:'',
email:'',
number:'',
password:'',
confirmpassword: '',
username:'',
dateOfbirth:'',

};

submit=()=>{
const { dateOfbirth, username , country, password, confirmpassword, number, email,name} = this.state
if(dateOfbirth =='' || username=='' || password=='' , confirmpassword=='', email=='' || name== '' ){
  alert("all fields are required")
}
else{
  alert( 'you are welcome')
}
};
render() {
    return (

      <ImageBackground source={{ uri: 'https://media.istockphoto.com/vectors/abstract-geometric-medical-cross-shape-medicine-and-science-concept-vector-id940993008?b=1&k=6&m=940993008&s=612x612&w=0&h=MlO85d9Coxm475xnHufahHqgIRfU1H6dvEe5QeOx2HQ='  }} style={{flex:1 , justifyContent:'center' }}>
      
      <View style={styles.container}>
        <Text style={styles.title}>HealthFirst</Text>
        <Text style={{ fontSize: 30 }}>Register Now</Text>

        <TextInput
        onChangeText ={username=>this.setState({username})}
          placeholder="Name"
          style={{
            backgroundColor: 'white',
            padding: 10,
            width: '70%',
            marginTop: 10,
            fontSize: 18,
          }}
        />
         <TextInput
        onChangeText ={username=>this.setState({username})}
          placeholder="Email"
          style={{
            backgroundColor: 'white',
            padding: 10,
            width: '70%',
            marginTop: 10,
            fontSize: 18,
          }}
        />
         <TextInput
        onChangeText ={username=>this.setState({username})}
          placeholder="Phone Number"
          style={{
            backgroundColor: 'white',
            padding: 10,
            width: '70%',
            marginTop: 10,
            fontSize: 18,
          }}
        />
         <TextInput
        onChangeText ={username=>this.setState({username})}
          placeholder="Date of birth: dd/mm/yyyy "
          style={{
            backgroundColor: 'white',
            padding: 10,
            width: '70%',
            marginTop: 10,
            fontSize: 18,
          }}
        />

        <TextInput
        onChangeText={password=>this.setState({password})}
          placeholder="Password"
          secureTextEntry={true}
          style={{
            backgroundColor: 'white',
            padding: 10,
            width: '70%',
            marginTop: 10,
            fontSize: 18,
          }}
        />

        <TextInput
        onChangeText={password=>this.setState({password})}
          placeholder=" Confirm Password"
          secureTextEntry={true}
          style={{
            backgroundColor: 'white',
            padding: 10,
            width: '70%',
            marginTop: 10,
            fontSize: 18,
          }}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.submit}
          style={{ width: '100%' }}>
          <View
            style={{
              backgroundColor: 'grey',
              padding: 14,
              marginTop: 10,
              width: '50%',
              marginLeft: '5%',
            alignSelf:'center'
            }}>
            <Text style={{ textAlign: 'center', color: 'black', fontSize: 18 }}>
            REGISTER
            </Text>
          </View>
        </TouchableOpacity>
         <Text style={{ textAlign: 'center', color: 'red', fontSize: 18 }}>
           Already a user ?  </Text> 
               <Text style={{color:'red'}}>Login here
            </Text>
      </View>
      
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
