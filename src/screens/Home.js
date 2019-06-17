import React, { Component } from 'react';
import { AsyncStorage, Button, Text, View, StyleSheet } from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button title="Sign out" onPress={this._signOutAsync} />
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
