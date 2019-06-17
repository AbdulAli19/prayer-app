import React, { Component } from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

import colors from '../styles/colors';
import transparentHeaderStyle from '../styles/navigation';
import NavBarButton from '../components/NavBarButton';
import RoundedButton from '../components/RoundedButton';

const placeholderImg = require('../img/placeholder.png');

export default class LoggedOut extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <NavBarButton
        handleButtonPress={() => navigation.navigate('LogIn')}
        location="right"
        color={colors.white}
        text="Log In"
      />
    ),
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: colors.white
  });

  // TODO: authenticate user and log them in to the app using firebase's facebook auth
  onFacebookPress = () => {
    alert('Facebook button pressed');
  };

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <Image source={placeholderImg} style={styles.logo} />
          <Text style={styles.welcomeText}>Welcome to SalahMate.</Text>
          <RoundedButton
            text="Continue with Facebook"
            textColor={colors.green01}
            background={colors.white}
            icon={
              <Icon
                name="facebook"
                size={20}
                style={styles.facebookButtonIcon}
              />
            }
            handleOnPress={this.onFacebookPress}
          />
          <RoundedButton
            text="Create Account"
            textColor={colors.white}
            handleOnPress={() =>
              this.props.navigation.navigate('CreateAccount')
            }
          />
        </View>
      </ScrollView>
    );
  }
}

// import iPhoneSize from '../../helpers/utils';

let headingTextSize = 30;
// if (iPhoneSize() === 'small') {
//   headingTextSize = 26;
// }

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.green01
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginBottom: 40
  },
  welcomeText: {
    fontSize: headingTextSize,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40
  },
  facebookButtonIcon: {
    color: colors.green01,
    position: 'relative',
    left: 20,
    zIndex: 8
  }
});
