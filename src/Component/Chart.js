import React, { Component } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import {StyleSheet, ScrollView, Dimensions, ToastAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, Container, Toast, H2 } from 'native-base';
import Axios from 'axios'
import { API_BASEURL } from 'react-native-dotenv'

export default class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
        weeklyIncome:[],
        weekly:[],
        thisWeek:[],
        data:[]
    }
}
  async componentDidMount(){
    // await this.getWeeklyIncome()
  }

  getWeeklyIncome = async () => {
    await Axios.get( `${API_BASEURL}/api/history/weeklyIncome`)
    .then(result => {
        this.setState({
          weeklyIncome: result.data.data,
          weekly: result.data.week,
        })
        this.state.weekly.thisWeek.map(item =>{
              
          weekly_new.push(item.TOTAL)
        })
        this.state.weekly.lastWeek.map(item =>{
          labels.push(item.DAY)
          weekly_last.push(item.TOTAL)
        })
    })
    .catch(err => {
        console.log(err)
    })
  }


  render() {
    return (
  <>
  <Container>
  <LinearGradient colors={['#1f4037' ,'#99f2c8']} style={styles.linearGradient}>
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
    </LinearGradient>
  </Container> 
 </>
    )
  }
}

const styles = StyleSheet.create({

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  }
})

 

  