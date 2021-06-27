import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  StyleSheet,
  Text,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import HttpService from '../../../API/HttpService';
import {signupUser} from '../../../store/actions/auth';
const EmailVerification = (props) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const sendEmailOTP = async () => {
      const randomOTP = parseInt(100000 + Math.random() * 900000);
      const body = {
        email: props.route.params.email,
        verifyCode: randomOTP,
      };
      try {
        console.log('meil sent');
        await HttpService.post('email/verify', body);
        await AsyncStorage.setItem('emailVerifyCode', randomOTP.toString());
      } catch (e) {
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
      }
    };

    sendEmailOTP();
  }, []);

  const verifyCodeHandler = async () => {
    if (pin.length !== 6) {
      setError('Please enter a valid code');
      return false;
    } else {
      setError('');
      try {
        const otp = await AsyncStorage.getItem('emailVerifyCode');
        if (otp == pin) {
          await props.signupUser(props.route.params, props);
        } else {
          ToastAndroid.show('In correct verification code', ToastAndroid.LONG);
        }
      } catch (e) {
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/Login-Page-Screen.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Verify your email</Text>
        <View style={styles.headerContainer}>
          <Text style={styles.subHeaderText}>
            Enter the verification code to continue
          </Text>
        </View>

        <View style={{marginBottom: 10}}>
          <TextInput
            onChangeText={(data) => setPin(data)}
            style={styles.input}
            keyboardType={'number-pad'}
            placeholderTextColor="#000"
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>

        <TouchableOpacity
          onPress={() => verifyCodeHandler()}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default connect('', {
  signupUser,
})(EmailVerification);

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
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 15,
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
    color: '#000',
  },
});
