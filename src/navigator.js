import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import AuthLoadingScreen from '../src/screens/AuthLoading';
import CreateAccountScreen from '../src/screens/CreateAccount';
import ForgotPasswordScreen from '../src/screens/ForgotPassword';
import HomeScreen from '../src/screens/Home';
import LoggedOutScreen from '../src/screens/LoggedOut';
import LoginScreen from '../src/screens/LogIn';

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({
  LoggedOut: LoggedOutScreen,
  LogIn: LoginScreen,
  CreateAccount: CreateAccountScreen,
  ForgotPassword: ForgotPasswordScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
