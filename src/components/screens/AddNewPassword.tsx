import AsyncStorage from '@react-native-async-storage/async-storage';
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
const AddNewPassword = (props) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const changeNewPasswordHandler = async () => {
    if (password.length < 6) {
      setError('Minimum length 6 digits');
      return false;
    }
    setError('');
    const body = {
      email: props.route.params.email,
      password,
    };

    try {
      await HttpService.put('auth/addNewPassword', body);
      await AsyncStorage.removeItem('otpGeneration');
      props.navigation.navigate('Login');
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  };
  return (
    <ImageBackground
      source={require('../../assets/Login-Page-Screen.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.subHeaderText}>Please enter new password</Text>
          <TextInput
            onChangeText={(data) => setPassword(data)}
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor="#000"
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>

        <TouchableOpacity
          onPress={() => changeNewPasswordHandler()}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default AddNewPassword;

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
