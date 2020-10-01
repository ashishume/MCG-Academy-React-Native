import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  StyleSheet,
  Text,
  ToastAndroid,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ForgotPassword = (props) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const pincodeHandler = async () => {
    if (pin.length !== 4) {
      setError('Please enter a valid OTP');
      return false;
    } else {
      setError('');
    //   console.log(pin);
      try {
        const otp = await AsyncStorage.getItem('otpGeneration');
        console.log(otp);
      } catch (e) {
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
      }
    }
  };
  const sendOTPHandler = async () => {
    const randomOTP = parseInt(1000 + Math.random() * 9000);
    setIsSent(true);
    try {
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
              placeholderTextColor="#fff"
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
              Send OTP to the registered phone No.
            </Text>
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
