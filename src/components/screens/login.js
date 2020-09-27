import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  StyleSheet,
  Text,
  ToastAndroid,
  Alert,
  BackHandler,
} from 'react-native';

import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import LoginValidation from '../Utils/LoginValidation';
import {connect} from 'react-redux';
import {login} from '../../store/actions/auth';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: '',
  };

  async componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.backAction);

    const email = await AsyncStorage.getItem('email');
    if (email != null) this.props.navigation.navigate('Dashboard');
  }

  // backAction = () => {
  //   Alert.alert('Hold on!', 'Are you sure you want to exit?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {text: 'YES', onPress: () => BackHandler.exitApp()},
  //   ]);
  //   return true;
  // };

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }
  loginHandler = () => {
    const body = {
      email: this.state.email,
      password: this.state.password,
    };
    const validate = LoginValidation(body);
    if (validate.email || validate.password) {
      this.setState({errors: validate});
      return false;
    } else {
      this.props.login(body, this.props);
    }
  };
  routeForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  render() {
    return (
      <ImageBackground
        source={require('../../assets/login.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Welcome back</Text>
            <Text style={styles.subHeaderText}>
              Enter your details to signin to your account
            </Text>
          </View>

          <View style={{marginBottom: 10}}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              onChangeText={(email) => this.setState({email})}
              style={styles.input}
              autoCompleteType="email"
              keyboardType={'email-address'}
              placeholderTextColor="#fff"
            />
            <Text style={styles.errorText}>{this.state.errors.email}</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              onChangeText={(password) => this.setState({password})}
              style={styles.input}
              secureTextEntry={true}
              placeholderTextColor="#fff"
            />
            <Text style={styles.errorText}>{this.state.errors.password}</Text>
          </View>

          <TouchableOpacity
            onPress={() => this.loginHandler()}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={{color: '#fff', textAlign: 'center'}}>
                Don't have an account? |
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.routeForgotPassword()}>
              <Text
                style={{color: '#fff', textAlign: 'center', paddingLeft: 5}}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.login.login.status) ownProps.navigation.navigate('Swiper');
  return {
    loginState: state.login.login,
  };
};
export default connect(mapStateToProps, {login})(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
  },
  headerContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 15,
    color: '#fff',
  },
  label: {
    color: '#fff',
    marginBottom: -10,
  },
  input: {
    color: 'white',
    borderBottomWidth: 1,
    fontSize: 15,
    paddingLeft: 0,
    borderBottomColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#fff',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 15,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  errorText: {
    color: 'white',
  },
});
