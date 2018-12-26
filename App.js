import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDWeOESHjelEC0nmHYLEfZhttV47x4gX00",
    authDomain: "salah-mate.firebaseapp.com",
    databaseURL: "https://salah-mate.firebaseio.com",
    projectId: "salah-mate",
    storageBucket: "salah-mate.appspot.com",
    messagingSenderId: "969035350246"
}

firebase.initializeApp(firebaseConfig);

 import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'
  export default class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = ({
        email: '',
        password: ''
      })
    }

    //User auth status if mounted
    componentDidMount(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user !=null) {
          console.log(user)
        }
      })
    }


    signUpUser = (email,password) =>{
      try {
        if(this.state.password.length<6){
          alert("Please enter at least 6 characters")
        }
        firebase.auth().createUserWithEmailAndPassword(email,password)

      } catch (error) {
        console.log(error.toString())
      }

    }

    loginUser = (email,password) =>{
      try {
        firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
          console.log(user)
        })
      } catch (error) {
        console.log(error.toString())
      }
    }

    async loginWithFacebook(){
      const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync
      ('278614532847510', { permissions: ['public_profile'] })

      if (type == 'success'){
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) =>{
          console.log(error)
        })
      }
    }

  render() {
    return (
      <Container styles={styles.container}>
        <Form>
          <Item floatingLabel style = {{marginTop: 250}}>
            <Label>Email </Label>
            <Input
            autoCorrect={false}
            autoCapitilization="none"
            onChangeText={(email) => this.setState({email})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password </Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}

            />

          </Item>
          <Button style = {{marginTop: 10, marginHorizontal:10}}
          full 
          rounded 
          success
          onPress = {() => this.loginUser(this.state.email,this.state.password)}
          > 
          <Text style = {{color:"white"}}>Login</Text>
          </Button>
          <Button style = {{marginTop: 10, marginHorizontal:10}}
          full 
          rounded 
          primary
          onPress = {()=> this.signUpUser(this.state.email,this.state.password)}

          > 
          <Text style = {{color:"white"}}>Sign Up</Text>
          </Button>
          <Button style = {{marginTop: 10, marginHorizontal:10}}
          full 
          rounded 
          primary
          onPress = {() => this.loginWithFacebook()}
          > 
          <Text style = {{color:"white"}}>Login With Facebook</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    padding:10
  },
});
