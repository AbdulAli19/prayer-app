import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class CreateAccount extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Create Account Screen</Text>
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
