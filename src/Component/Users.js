import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

export default class Users extends Component {  
    render() {
        return (
            

        <Container>
          {/* <LinearGradient colors={['#0f0c29' ,'#302b63', '#24243e']} style={styles.linearGradient}> */}
            <Content style={{marginTop:20}}>
            <ListItem icon>
                <Left>
                  <Button success >
                    <Icon active name="create" />
                  </Button>
                </Left>
                  <Body>
                    <Text style={{color:'black'}}>Profile</Text>
                  </Body>
                <Right>
                  <Button transparent >
                      <Text style={{color:'black'}}>Edit</Text>
                  </Button>
                  <Icon style={{color:'black'}} active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button danger >
                    <Icon active name="person" />
                  </Button>
                </Left>
                <Body>
                  <Text style={{color:'black'}}>Rizky</Text>
                </Body>
                <Right>
                <Button transparent onPress={() => this.props.navigate('Login')} >
                    <Text style={{color:'#e62027'}}>Logout</Text>
                </Button>
                <Icon  style={{color:'#e62027'}} active name="arrow-forward" />
                  
                  
                </Right>
              </ListItem>
            </Content>
          {/* </LinearGradient> */}
        </Container>
          
        )    
}
}
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});