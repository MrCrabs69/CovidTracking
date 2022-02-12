import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Header } from 'react-native-elements';
import axios from 'axios';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      cases: '',
    };
  }
  getInfo = async () => {
    var url = 'https://api.opencovid.ca/';
    return axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        this.setState({
          cases: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidMount = () => {
    this.getInfo();
    // console.log(this.state.cases);
  };
  render() {
    console.log(this.state);
    if (this.state.cases === '') {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header
            backgroundColor={'#ea4141'}
            centerComponent={{
              text: 'Covid Tracking',
              style: { color: 'white', fontSize: 25,fontWeight:"bold" },
            }}
          />
          <View style={{ flex: 1, borderWidth: 1, alignItems: 'center' }}>
            <Image
              style={styles.image}
              source={require('../assets/coronaIcon.png')}
            />
            <View style={styles.textContainer}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginTop: 30,
                  color: '#ea4141',
                }}>
                Province: {this.state.cases.summary[0].province}
              </Text>
              <Text style={{ fontSize: 18, color: '#ea4141' }}>
                Active Cases: {this.state.cases.summary[0].active_cases}
              </Text>
              <Text style={{ fontSize: 18, color: '#ea4141' }}>
                Cumulative Cases: {this.state.cases.summary[0].cumulative_cases}
              </Text>
              <Text style={{ fontSize: 18, color: '#ea4141' }}>
                Cumulative Deaths:
                {this.state.cases.summary[0].cumulative_deaths}
              </Text>
              <Text style={{ fontSize: 18, color: '#ea4141' }}>
                Cumulative Recovered:
                {this.state.cases.summary[0].cumulative_recovered}
              </Text>
              <Text style={{ fontSize: 18, color: '#ea4141' }}>
                Cumulative Testing:
                {this.state.cases.summary[0].cumulative_testing}
              </Text>
              <Text style={{ fontSize: 18, color: '#ea4141' }}>
                Version: {this.state.cases.version}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: '550',
    color: '#00c7ff',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 30,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
