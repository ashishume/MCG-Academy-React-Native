import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
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
import HttpService from '../../API/HttpService';
const ForgotPassword = (props) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState('');
  const pincodeHandler = async () => {
    if (pin.length !== 6) {
      setError('Please enter a valid OTP');
      return false;
    } else {
      setError('');
      console.log(pin);
      try {
        const otp = await AsyncStorage.getItem('otpGeneration');
        if (otp == pin) {
          console.log('success');
          props.navigation.navigate('AddNewPassword', {email});
        } else {
          ToastAndroid.show('In correct OTP', ToastAndroid.LONG);
        }
      } catch (e) {
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
      }
    }
  };
  const sendOTPHandler = async () => {
    const randomOTP = parseInt(100000 + Math.random() * 900000);
    const body = {
      email,
      resetCode: randomOTP,
    };
    try {
      await HttpService.post('auth/forgot', body);
      setIsSent(true);
      await AsyncStorage.setItem('otpGeneration', randomOTP.toString());
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  };
  return (
    <ImageBackground
      source={require('../../assets/Login-Page-Screen.png')}
      style={styles.backgroundImage}>
      {isSent == true ? (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.subHeaderText}>
              Enter the 4 digit OTP to continue
            </Text>
          </View>

          <View style={{marginBottom: 10}}>
            <Text style={styles.label}>OTP</Text>
            <TextInput
              onChangeText={(data) => setPin(data)}
              style={styles.input}
              keyboardType={'number-pad'}
              placeholderTextColor="#000"
            />
            <Text style={styles.errorText}>{error}</Text>
          </View>

          <TouchableOpacity
            onPress={() => pincodeHandler()}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Enter OTP</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.subHeaderText}>
              Send OTP to the registered email address
            </Text>
            {/* <Text style={styles.label}>OTP</Text> */}
            <TextInput
              onChangeText={(data) => setEmail(data)}
              style={styles.input}
              keyboardType={'email-address'}
              placeholderTextColor="#000"
            />
          </View>

          <TouchableOpacity
            onPress={() => sendOTPHandler()}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

export default ForgotPassword;

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
