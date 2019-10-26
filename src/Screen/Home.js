import React, { Component } from 'react';
import Tab from '../Component/Header';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, FooterTab, Button, Icon, Text,Fab, Input, Item, Right, Badge } from 'native-base';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
          active: false,
          cart:[]
        };
      }
  render() {
    return (
    <>
        <Container>
            <Tab navigate={this.props.navigation.navigate} />
        </Container>
    </>
    );
  }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#969696'
    },
    text: {
        fontSize:30,
    },
  });