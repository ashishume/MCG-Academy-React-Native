import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {loginValidation} from '../Utils/LoginValidation';
import {connect, useDispatch} from 'react-redux';
import {login} from '../../store/actions/auth';

const Login = (props: any) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem('email');
      if (email !== null) props.navigation.navigate('Dashboard');
    })();
  }, []);

  const loginHandler = () => {
    const payload = {
      email,
      password,
    };
    const validate: {
      email: string;
      password: string;
    } = loginValidation(payload);

    if (validate.email?.length || validate.password?.length) {
      setErrors({email: validate.email, password: validate.password});
      return false;
    } else {
      dispatch(login(payload, props));
    }
  };
  // const routeForgotPassword = () => {
  //   navigation.navigate('ForgotPassword');
  // };

  return (
    <ImageBackground
      source={require('../../assets/Login-Page-Screen.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View
            style={{
              alignSelf: 'center',
            }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{width: 100, height: 100}}
            />
          </View>
          <Text style={styles.headerText}>Welcome to MCG Academy</Text>
          <Text style={styles.subHeaderText}>
            Enter your details to signin to your account
          </Text>
        </View>

        <View style={{marginBottom: 10}}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            onChangeText={email => setEmail(email)}
            style={styles.input}
            keyboardType={'email-address'}
            placeholderTextColor="#000"
          />
          <Text style={styles.errorText}>{errors.email}</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            onChangeText={password => setPassword(password)}
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor="#000"
          />
          <Text style={styles.errorText}>{errors.password}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => loginHandler()}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={{textAlign: 'center', paddingTop: 10}}>Or</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.navigation.navigate('Signup')}
          style={styles.registerButtonContainer}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        {/* <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={{color: '#000', textAlign: 'center'}}>
                Don't have an account? |
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.routeForgotPassword()}>
              <Text
                style={{color: '#000', textAlign: 'center', paddingLeft: 5}}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View> */}
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (state, ownProps) => {
  if (state.login.login.status) ownProps.navigation.navigate('Swiper');
  return {
    loginState: state.login.login,
  };
};
export default connect(mapStateToProps)(Login);

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
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#000',
  },
  label: {
    color: '#000',
    marginBottom: -10,
  },
  input: {
    color: '#000',
    borderBottomWidth: 1,
    fontSize: 15,
    paddingLeft: 0,
    borderBottomColor: '#000',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#c20202',
    padding: 15,
    shadowColor: '#000',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 15,
  },
  registerButtonContainer: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 15,
    shadowColor: '#000',
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  errorText: {
    color: 'red',
  },
});
