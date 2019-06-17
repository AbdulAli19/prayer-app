import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Forgot Password'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Forgot Password Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
