import React, { Component } from 'react';
import {
  AsyncStorage,
  Button,
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

import colors from '../styles/colors';
import InputField from '../components/InputField';
import Loader from '../components/Loader';
import Notification from '../components/Notification';
import transparentHeaderStyle from '../styles/navigation';
import NavBarButton from '../components/NavBarButton';

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <NavBarButton
        text="Forgot Password"
        location="right"
        color={colors.white}
        handleButtonPress={() => navigation.navigate('ForgotPassword')}
      />
    ),
    headerLeft: (
      <NavBarButton
        handleButtonPress={() => navigation.goBack()}
        location="left"
        icon={<Icon name="angle-left" color={colors.white} size={30} />}
      />
    ),
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: colors.white
  });

  state = {
    formValid: true,
    validEmail: false,
    validPassword: false,
    emailAddress: '',
    password: '',
    loadingVisible: false
  };

  // TODO: actually sign in, i.e., create a real user token, handle errors, etc
  signIn = () => {
    this.setState({ loadingVisible: true });

    setTimeout(() => {
      const { emailAddress, password } = this.state;
      console.log(`email: ${emailAddress}, pw: ${password}`);
      if (emailAddress.toLowerCase() === 'aliabdul5@gmail.com') {
        this.setState({ formValid: true, loadingVisible: false });
        AsyncStorage.setItem('userToken', 'abc').then(() =>
          this.props.navigation.navigate('App')
        );
      } else {
        this.setState({ formValid: false, loadingVisible: false });
      }
    }, 2000);
  };

  handleCloseNotification = () => {
    this.setState({ formValid: true });
  };

  toggleNextButtonState = () =>
    !(this.state.validEmail && this.state.validPassword);

  handleEmailChange = email => {
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validEmail } = this.state;
    this.setState({ emailAddress: email });

    if (!validEmail) {
      if (emailCheckRegex.test(email)) this.setState({ validEmail: true });
    } else if (!emailCheckRegex.test(email))
      this.setState({ validEmail: false });
  };

  // TODO: determine what a valid password means to us,
  // greater than 4 chars is pretty arbitrary
  // note: our valid password check here should match whatever
  // we check in the sign up flow
  handlePasswordChange = password => {
    const { validPassword } = this.state;

    this.setState({ password });

    if (!validPassword) {
      if (password.length > 4) this.setState({ validPassword: true });
    } else if (password <= 4) this.setState({ validPassword: false });
  };

  render() {
    const { formValid, loadingVisible, validEmail, validPassword } = this.state;
    const showNotification = !formValid;
    const background = formValid ? colors.green01 : colors.darkOrange;
    const notificationMarginTop = showNotification ? 10 : 0;
    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: background }, styles.wrapper]}
        behavior="padding"
      >
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.loginHeader}>Log In</Text>
            <InputField
              labelText="EMAIL ADDRESS"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handleEmailChange}
              showCheckmark={validEmail}
              autoFocus
            />
            <InputField
              labelText="PASSWORD"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="password"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handlePasswordChange}
              showCheckmark={validPassword}
            />
          </ScrollView>
          <Button
            title="Log In"
            onPress={this.signIn}
            disabled={this.toggleNextButtonState()}
          />
        </View>
        <Loader modalVisible={loadingVisible} animationType="fade" />
        <View
          style={[
            styles.notificationWrapper,
            { marginTop: notificationMarginTop }
          ]}
        >
          <Notification
            showNotification={showNotification}
            handleCloseNotification={this.handleCloseNotification}
            type="Error"
            firstLine="Those credentials don't look right."
            secondLine="Please try again."
          />
        </View>
      </KeyboardAvoidingView>
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
    display: 'flex',
    flex: 1
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
    padding: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1
  },
  loginHeader: {
    fontSize: headingTextSize,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40
  },
  notificationWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});
