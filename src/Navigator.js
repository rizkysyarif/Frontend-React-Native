import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from './Screen/Home'
import Login from './Screen/Login'
import ManageProduct from './Screen/ManageProduct'
import Cart from './Component/Cart'
import Add from './Component/Add'
import Update from './Component/Update'

const MainNavigator = createStackNavigator({
  Home,
  Login,
  ManageProduct,
  Cart,
  Add,
  Update
}, {
  headerMode: 'none',
  initialRouteName: 'Login'
},
{
  headerMode: 'none',
  initialRouteName: 'Home'
},
)

export default createAppContainer(MainNavigator)