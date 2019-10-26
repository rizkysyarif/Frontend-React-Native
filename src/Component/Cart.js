import React, { Component } from 'react';
import { Container, Header, Content, View, Item, H2, List, Text, Button, Right, Icon, ListItem, Body, Left, Thumbnail, Card } from 'native-base';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { API_BASEURL } from 'react-native-dotenv'

export default class Cart extends Component {
  constructor(props){
    super(props)
    this.state= {
      cart:this.props.navigation.getParam('cart')
    }
  }

  async addqty(data) {
    let cart = this.state.cart[data]
    let product = this.props.data.productList.find(product => product.id == cart.id)
    if(cart.qty < product.count){
      cart.qty += 1
    cart.price += product.price
    await this.setState({
      carts:[cart]
    })
    }
    // await this.renderTotalCart()
  }

  async reduceqty(data) {
    let cart = this.state.cart[data]
    let allcart = this.state.cart
    let product = this.props.data.productList.find(product => product.id == cart.id)
    if(cart.qty > 1) {
      cart.qty -= 1
      cart.price -= product.price
      await this.setState({
        carts:[cart]
      })
      
    } else {
      allcart.splice(data, 1)
      await this.setState({
        cart: allcart
      })
    }
    await this.renderTotalCart()
  }

  render() {
    return (
      <Container>
           <Header >
               <H2 style={{color:'white'}}>Cart</H2>  
               <Right>
                    <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon name='home' />
                    </Button>
               </Right>
            </Header>
            {/* <LinearGradient colors={['#0f0c29' ,'#302b63', '#24243e']} style={styles.linearGradient}> */}
            <Content style={styles.content}>
              {
                  this.state.cart.map((val, key) => {
                       return (
                        <View>
                          <Card>
                          <List>
                         
                         <ListItem thumbnail>
                          <Left>
                            <Thumbnail square  source={{uri: API_BASEURL + '/' + val.image}}  />
                          </Left>
                          <Body>
                            <Text style={{color:'black'}}>{val.name}</Text>
                            <Text  note numberOfLines={1} style={{color:'black'}}>{val.price}</Text>
                          </Body>
                          <Right>
                            <Button  >
                              <Text><Icon style={{color:'black'}} name='md-add'/></Text>
                            </Button>
                          </Right>
                          <Right>
                            
                              <Text style={{color:'black'}}>{val.qty}</Text>
                            
                          </Right>
                          <Right>
                            <Button danger>
                              <Text><Icon style={{color:'black'}} name='remove'/></Text>
                            </Button>
                          </Right>
                          </ListItem>
                         </List>
                          </Card>
                        </View>
                        
                      )
                  })
              }
          
            </Content>
            {/* </LinearGradient> */}
            
      
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
      marginLeft:60,
      marginTop:60,
      width:'70%',
      // backgroundColor:'red'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
})