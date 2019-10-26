import React, { Component } from 'react';
import Chart from '../Component/Chart';
import CardHistory from '../Component/CardHistory';
import {StyleSheet, ScrollView, Dimensions, ToastAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Row, Content, Card, CardItem, Text, Footer, H2, Left, Body, Right, View, Col} from 'native-base';
import Rupiah from 'rupiah-format'
import { API_BASEURL } from 'react-native-dotenv'
import Axios from 'axios'
import {LineChart} from "react-native-chart-kit";


export default class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dailyIncome: [],
      weeklyIncome:[],
      weekly:[],
      thisWeek:[],
      data:[]
    }
  }

  async  componentDidMount(){
    await this.getDailyIncome()
    await this.getWeeklyIncome()
  }

  getDailyIncome = async () => {
    await Axios.get(  `${API_BASEURL}/api/history/dailyincome`)
     .then(result => {
         this.setState({dailyIncome: result.data.data})
     })
     .catch(err => {
         console.log(err)
     })
     
 }

 getWeeklyIncome = async () => {
  await Axios.get( `${API_BASEURL}/api/history/weeklyIncome`)
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
    <>
        <Container style={{margin:20}}>
          {/* <LinearGradient colors={['#0f0c29' ,'#302b63', '#24243e']} style={styles.linearGradient}> */}
          <ScrollView>
            <View>
            <Row>
              <Col >
                <Card > 
                  <CardItem style={styles.card1} >
                  <View style={{flexDirection:'column'}}>
                    <Body>
                      <Text>Today's Income</Text>
                    </Body>
                    <Body>
                      <Text>Rp. 12.000,00</Text>
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
                      <Text>5</Text>
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
                      <Text>Rp. 130.000,00</Text>
                    </Body>

                    </View>
                  </CardItem>
                </Card>
              </Col>
              
            </Row>  
          </View>
          <View>
      <H2 style={{color:'white'}}>Revenue</H2>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100000,
                Math.random() * 100000,
                Math.random() * 100000,
                Math.random() * 100000,
                Math.random() * 100000,
                Math.random() * 100000
              ]
            },
            {
              data: [
                Math.random() * 100000,
                Math.random() * 100000,
                Math.random() * 100000,
                Math.random() * 100000,
                Math.random() * 100000,
                Math.random() * 100000
              ]
            },
            
          ]
        }}
        width={Dimensions.get("window").width} 
        height={220}
        yAxisLabel={"Rp."}
        chartConfig="{chartConfig}"
        onDataPointClick={({datasets}) => ToastAndroid.showWithGravity (
          datasets,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        />
    </View>
            
          </ScrollView>
        {/* </LinearGradient> */}
          
        
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
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    content: {
      margin:30,
      width:'70%',
      backgroundColor:'red'
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
    image: {
        height: 350, 
        flex: 1
    }
  });