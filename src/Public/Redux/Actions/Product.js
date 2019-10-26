import axios from 'axios'
import {AsyncStorage} from 'react-native'
import { API_BASEURL } from 'react-native-dotenv'

export const getProduct = options => {
  return {
    type: 'GET_PRODUCT',
    payload: new Promise( async (resolve, reject) => {
        const {
            search = '',
            sort = '',
        } = options

        axios.get( `${API_BASEURL}/api/product?search=${search}&sort=${sort}`,{
        headers: {    
          Authorization: await AsyncStorage.getItem('KeyToken'),
        }
        })
            .then(result => resolve(result))
            .catch(error => reject(error))    
    }) 
  }
}