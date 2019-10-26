import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label,Text, Right, Button, Icon, H2, Picker, Toast, } from 'native-base';
import Axios from 'axios';
import {ToastAndroid} from 'react-native'
import { API_BASEURL } from 'react-native-dotenv'
import ImagePicker from 'react-native-image-picker'

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      categories:[],
      name:'',
      description: '',
      image:'',
      category:'',
      price: '',
      count: '',

    };
  }
  onValueChange2(value) {
    this.setState({
      category: value
    });
  }

  
  UploadImage = () => {
    const options = {
      noData: true,
    }

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({image: response})
      }
    })
  }


  componentDidMount= async () => {
   await this.getCategory()
  }
  
  getCategory = async () => {
    await Axios.get(`${API_BASEURL}/api/category`)
    .then(result => {
      this.setState({categories: result.data.data})
    })
    .catch(err=>{
      console.log(err)
    })
  }

  addProduct = () => {
    let data = new FormData()
    data.append('name', this.state.name),
    data.append('description', this.state.description),
    data.append('image', this.state.image)
    data.append('category', this.state.category),
    data.append('price', this.state.price),
    data.append('count', this.state.count),

    Axios.post(`${API_BASEURL}/api/product`,data)
    .then(response => {
      ToastAndroid.show('Add Product Success!', ToastAndroid.SHORT)
      this.props.navigation.replace('Home')
    })
    .catch(error => {
      console.log(error)
      ToastAndroid.show('Failed to Add Product', ToastAndroid.SHORT)
    })
  }

  
  render() {
    return (
      <Container>
       <Header >
            <H2 style={{color:'white'}}>Edit Product</H2>  
            <Right>
                <Button rounded transparent onPress={() => this.props.navigation.navigate('Home')}>
                    <Icon name='home' />
                </Button>
            </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label style={{color:'#7c7e82', fontSize:18}}>Product Name</Label>
              <Input 
              onChangeText={text => this.setState({name: text})}
              value={this.state.name} 
               />
            </Item>
            <Item stackedLabel>
              <Label style={{color:'#7c7e82', fontSize:18}}>Description</Label>
              <Input 
              onChangeText={text => this.setState({description: text})}
              value={this.state.description}
              />
              
            </Item>
            <Item stackedLabel>
              <Label style={{color:'#7c7e82', fontSize:18}}>Image</Label>
              <Input 
              onChangeText={text => this.setState({image: text})}
              value={this.state.image}
              />
              
            </Item>
            <Label style={{marginLeft:10, color:'#7c7e82'}} > Category </Label>
            <Item picker style={{marginLeft:10}}>
              <Picker
                note
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
               {
                 this.state.categories.map((val, key) => (
                  <Picker.Item key={key} label={val.name_category} value={val.id} />
                 )  
                 )
               }
              </Picker>
            </Item>
            <Item stackedLabel>
              <Label style={{color:'#7c7e82', fontSize:18}}>Price</Label>
              <Input 
               onChangeText={text => this.setState({price: text})}
               value={this.state.price}
              />
            </Item>
            <Item stackedLabel last>
              <Label style={{color:'#7c7e82', fontSize:18}}>Count</Label>
              <Input 
               onChangeText={text => this.setState({count: text})}
               value={this.state.count}
              />
            </Item>
            <Button 
                rounded 
                primary style={{
                width: '50%',
                alignSelf: "center",
                margin: 20,
                justifyContent:'center'
                 }} 
                onPress={() => this.UploadImage()
                }
                >
                <Text>Upload Image</Text>
            </Button>
            <Button 
                rounded 
                success style={{
                width: '50%',
                alignSelf: "center",
                margin: 20,
                justifyContent:'center'
                 }} 
                onPress={() => this.addProduct()}
                >
                <Text>Update</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}