import React, { Component } from 'react';
import { Image } from 'react-native';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import Axios from 'axios'
import LinearGradient from 'react-native-linear-gradient';
import { getProduct } from '../Public/Redux/Actions/Product'
import { connect } from 'react-redux'
import Rupiah from 'rupiah-format'
import { API_BASEURL } from 'react-native-dotenv'
import { Container, List, ListItem, Content, Fab, CardItem, Item, Text, Button, Icon, Left, Body, Input, View, Right, Badge, Thumbnail, Card } from 'native-base';



class ManageProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
          active: false,
          product:[],
          search: '',
          sort: ''
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

      alertDelete = (id) => {
        Alert.alert(
          'Delete',
          'Are You Sure ?',
          [
            {
              text: 'Cancel',
              onPress: () => this.getAll(),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.deleteProduct(id)},
          ],
          {cancelable: false},
        );
      }

      deleteProduct = async (id) => {
            await Axios.delete( `${API_BASEURL}/api/product/` + id)
                .then(result => {
                  console.log(id)
                    this.getAll()
                })
                .catch(error => {
                    console.log(error)
                });
    }
    

  render() {
    return (
       
    <Container style={styles.container}>
      {/* <LinearGradient colors={['#0f0c29' ,'#302b63', '#24243e']} style={styles.linearGradient}> */}
        <ScrollView>
        <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: 'green' }}
                position="topRight"
                onPress={() => this.props.navigate('Add')}>
                    <Icon name="md-add" />
                
                
            </Fab>
            <Content style={styles.content}>
            <Item>
              <Icon style={{color:'black'}} name="ios-search" />
                <Input style={{color:'black'}} placeholderTextColor="black" placeholder="Search" />
            </Item>
            

              {
                  this.props.data.productList.map((val, key) => {
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
                               <Text note numberOfLines={1} style={{color:'black'}}>{Rupiah.convert(val.price)}</Text>
                               </Body>
                               <Right>
                               <Button  onPress={() => this.props.navigate('Update')} >
                                 <Text><Icon style={{color:'black'}} name='md-create'/></Text>
                               </Button>
                             </Right>
                             <Right>
                             <Button danger onPress={() => this.alertDelete(val.id)}>
                                 <Text><Icon style={{color:'black'}} name='trash'/></Text>
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
        </ScrollView>
      {/* </LinearGradient> */}
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
        width:'80%',
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
        height: 250, 
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

  export default connect (mapStateToProps) (ManageProduct)
