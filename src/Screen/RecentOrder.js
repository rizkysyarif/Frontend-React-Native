import React, { Component } from 'react';
import { Container, H3, Content, Body, Card, Text, CardItem, View } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import Axios from 'axios'
import Rupiah from 'rupiah-format'
import { API_BASEURL } from 'react-native-dotenv'
import FormatDate from 'moment'

export default class RecentOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order:[],
        }
    }
    componentDidMount(){
        this.getOrder()
    }

    getOrder = async () => {
        await Axios.get( `${API_BASEURL}/api/order`)
        .then(result => {
          this.setState({order: result.data.data}) 
        })
        .catch(err =>{
          console.log(err)
        }) 
        
      }

  render() {
    return (
      <Container>
          {/* <LinearGradient colors={['#0f0c29' ,'#302b63', '#24243e']} style={styles.linearGradient}> */}
        <Content style={{padding:20, margin:20}}>
            <H3 style={{color:'black'}}>Recent Order</H3>
            {
                this.state.order.map((val, key) => {
                    
                      return(
                            <Card>
    
                                <CardItem bordered>
                                <Body>
                                    <View style={{flexDirection:'row'}}>
                                        <Text> Invoice </Text>
                                        <Text> : </Text>
                                        <Text> {val.no_recipient} </Text>
                                    </View>
                                    
                                    <View style={{flexDirection:'row'}}>
                                        <Text> Date </Text>
                                        <Text> : </Text>
                                        <Text> {FormatDate(val.create_date).format("MMM Do YY")} </Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text> Order </Text>
                                        <Text> : </Text>
                                        <Text> {val.name} </Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text> Quantity </Text>
                                        <Text> : </Text>
                                        <Text> {val.quantity} </Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text> Price </Text>
                                        <Text> : </Text>
                                        <Text> {Rupiah.convert(val.price_order)} </Text>
                                    </View>
                                </Body>
                                </CardItem>
    
                            </Card>
                    
                        )
                })
            } 
        </Content>
        {/* </LinearGradient>  */}
      </Container>
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

  });