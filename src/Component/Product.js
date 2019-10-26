import React, { Component } from 'react';
import { Image } from 'react-native';
import {StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import Axios from 'axios'
import LinearGradient from 'react-native-linear-gradient';
import { getProduct } from '../Public/Redux/Actions/Product'
import { connect } from 'react-redux'
import { API_BASEURL } from 'react-native-dotenv'
import { Container, Header, Content, FabButton, CardItem, Item, Text, Button, Icon, Left, Body, Input, View, Fab, Badge, Toast, Grid, Col } from 'native-base';
import Rupiah from 'rupiah-format'


class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
          active: false,
          product:[],
          search: '',
          sort: '',
          cart:[]
        };
      }
     async componentDidMount(){
        await  this.getAll()
        
      }

      getAll = async () => {
        const result =  await this.props.dispatch(getProduct({
          
          search: this.state.search,
          sort: this.state.sort,
        }))
      }
      
      async addCart(data) {
        const { id, name, price, image, count } = { ...data }
        let cart = { id, name, price, image, count, qty: 1}
        const exists = this.state.cart.find(({ id }) => id === data.id)
        if (exists) {
          ToastAndroid.show('This Product is already in the cart', ToastAndroid.SHORT)
        } else if(count < 1){
          ToastAndroid.show('This Product is empty', ToastAndroid.SHORT)
        }
        else {
          data.qty = 1
          const carts = [...this.state.cart, cart]
          await this.setState({
            cart : carts
          })
          console.log(this.state.cart)
        }
        
        // await this.renderTotalCart()
      }

  render() {
    return (
       
    <Container style={styles.container}>
        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ zIndex: 9999, backgroundColor: '#5067FF' }}
            position="bottomRight"
            children={1}
            onPress={() => this.props.navigate('Cart', 
            {cart: this.state.cart}
            )}>
                <Icon name="cart">
                </Icon>
                
          </Fab>
        <ScrollView>
            <Content style={styles.content}>
            <Item>
              <Icon name="ios-search" />
                <Input placeholderTextColor="black" placeholder="Search"   />
            </Item>
            <View style={{flex:1, flexWrap:'wrap', flexDirection:'row'}}>
            {
                this.props.data.productList.map((val, key) => {
                  return (
                    <View style={styles.card}>
                            <CardItem cardBody>
                                <Image source={{uri: API_BASEURL + '/' + val.image}} style={styles.image} />
                            </CardItem>
                            <CardItem style={styles.carditem}>
                            <Left>
                              <Body>
                                <Text>{val.name}</Text>
                                <Text >{Rupiah.convert(val.price)}</Text>
                              </Body>
                            </Left>
                            </CardItem>
                            <CardItem style={styles.carditem}>
                              <Button rounded primary onPress={() => this.addCart(val) }>
                                  <Text>Add to Cart</Text>
                              </Button>
                            </CardItem>
                        </View>
                      )
                  })
              }
            </View>
            </Content>
        </ScrollView>
    </Container>
        
      
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.productList
  }
}

const styles = StyleSheet.create({
    card: {
        width:'50%',
        marginTop:20,
        // flexDirection:'row',
        // flex:1
        // backgroundColor:'red'
    },
    carditem : {
      justifyContent:'center',
    },
    content: {
        marginLeft:60,
        marginTop:60,
        width:'70%',
        // backgroundColor:'red'
    },
    image: {
        height: 200, 
        flex: 1,
        // backgroundColor:'blue'
        
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
  });

  export default connect (mapStateToProps) (Product)
