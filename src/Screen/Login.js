import React, { Component } from 'react';
import {StyleSheet, ToastAndroid, AsyncStorage} from 'react-native';
import { Container, View, Content, Form, Item, Input, Label, Button, Text, Card, H2, Toast } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Axios from 'axios'
import { API_BASEURL } from 'react-native-dotenv'


export default class Login extends Component {
  constructor(props) {
    super()
    this.state = {
      email:'',
      password:'',
      buttonDisable:false,
      message:''

    }
  }

  login = async () => {
    this.setState({ buttonDisable:true })

    let url=  `${API_BASEURL}/api/user/login`
    let payload = {
      email:this.state.email,
      password:this.state.password,     
    }
   await Axios.post(url, payload)
    .then (res =>{
      let success = res.data.success
      if(success === 200) {
        AsyncStorage.setItem('KeyToken', `Bearer ${res.data.token}`)
        
        ToastAndroid.show('Success', ToastAndroid.SHORT)
        this.props.navigation.replace('Home')
      } else{
        ToastAndroid.show('Login Failed', ToastAndroid.SHORT)
       
      }
    })
    .catch(error => {
      console.log(error)
      this.setState({
        buttonDisable:false,
        message:'Login Failed'
      })
    })
  }

  

  render() {
    return (
      
      <Container>
        <LinearGradient colors={['#0F2027' ,'#203A43', '#2C5364']} style={styles.linearGradient}>
          <View style={{flex:1, justifyContent: 'center'}}>
            <View>
              <H2 style={{color:'white', alignSelf:'center'}}>Login</H2>
                <Form>
                  <Item floatingLabel>
                    <Label style={{color:'white'}}>Email</Label>
                    <Input style={{color:'white'}} name='email' onChangeText={ text => this.setState({email: text})} value={this.state.email} />
                  </Item>
                  <Item floatingLabel>
                    <Label style={{color:'white'}}>Password</Label>
                    <Input style={{color:'white'}} secureTextEntry name='password' onChangeText={ text => this.setState({password: text})} value={this.state.password}   />
                  </Item>
                  <Button primary style={styles.button} onPress={() => this.login()}><Text> Login </Text></Button>
                </Form>
            </View>
          </View>
        </LinearGradient>    
      </Container>       
    );
  }
}
const styles = StyleSheet.create({
    button: {
        width: '50%',
        alignSelf: "center",
        margin: 20,
        justifyContent:'center'
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
  });