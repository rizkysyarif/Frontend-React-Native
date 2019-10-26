import React, { Component } from 'react';
import { Image } from 'react-native';
import {StyleSheet, ScrollView} from 'react-native';
import { Container, Row, Content, Card, CardItem, Text, Footer, Icon, Left, Body, Right, View, Col } from 'native-base';
import Axios from 'axios'
import LinearGradient from 'react-native-linear-gradient';
import Rupiah from 'rupiah-format'
import { API_BASEURL } from 'react-native-dotenv'

export default class CardHistory extends Component {
    constructor(props) {
      super(props)
      this.state = {
        dailyIncome: [],
      }
    }

    async  componentDidMount(){
      await this.getDailyIncome()
      await this.getWeeklyIncome()
    }

    getDailyIncome = async () => {
      await Axios.get(`${API_BASEURL}/api/history/dailyincome`)
       .then(result => {
           this.setState({dailyIncome: result.data.data})
       })
       .catch(err => {
           console.log(err)
       })
       
   }

   getWeeklyIncome = async () => {
    await Axios.get(`${API_BASEURL}/api/history/weeklyIncome`)
     .then(result => {
         this.setState({
           weeklyIncome: result.data.data,
           weekly: result.data.week,
           weeklyAmount: result.data.week['thisWeek'][0]['AMOUNT']
         })
     })
     .catch(err => {
         console.log(err)
     })
 }

  render() {
    return (
      <Container style={{height: '100%', marginVertical: 25}}>
        <LinearGradient colors={['#1f4037' ,'#99f2c8']} style={styles.linearGradient}>
        <Row>
          <Col >
            <Card > 
              <CardItem style={styles.card1} >
              <View style={{flexDirection:'column'}}>
                <Body>
                  <Text>Today's Income</Text>
                </Body>
                <Body>
                  <Text>{Rupiah.convert(this.state.dailyIncome['today'])}</Text>
                </Body>
              </View>
                                   
                  
              </CardItem>
            </Card>
          </Col>
          <Col>
            <Card> 
              <CardItem style={styles.card2} >
                <View style={{flexDirection:'column'}}>
                <Body>
                  <Text>Orders</Text>
                </Body>
                <Body>
                  <Text> {this.state.weeklyAmount}</Text>
                </Body>

                </View>
                  
                                        
                  
              </CardItem>
            </Card>
          </Col>
          <Col>
            <Card> 
              <CardItem style={styles.card3} >
              <View style={{flexDirection:'column'}}>
                <Body>
                  <Text>Year's Income</Text>
                </Body>
                <Body>
                  <Text>{Rupiah.convert(this.state.dailyIncome['yesterday'])}</Text>
                </Body>

                </View>
              </CardItem>
            </Card>
          </Col>
          
        </Row>  
        </LinearGradient>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      marginLeft: 90,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  view: {
    marginTop:10,
    // backgroundColor:'blue'
  },
  text:{
    fontSize:30, margin:70
  },
  card1: {
      height:150,
      backgroundColor: "rgba(119, 223, 187, 0.9)",
  },
  card2: {
    width:'100%',
    height:150,
    backgroundColor: "rgba(207, 228, 47, 0.89)",
},
card3: {
  width:'100%',
  height:150,
  backgroundColor: "rgba(140, 188, 243, 0.89)",
},

  content: {
      margin:30,
      width:'80%',
      // backgroundColor: 'red'
      
  },
  image: {
      height: 350, 
      flex: 1
  }
});