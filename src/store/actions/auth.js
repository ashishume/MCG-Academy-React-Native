import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME} from '../../API/ApiPaths';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const login = (values, props) => async (dispatch) => {
  try {
    const response = await HttpService.post(API_NAME.LOGIN, values);
    dispatch({
      type: ActionType.LOGIN,
      payload: response.data,
    });
    if (response.status === 200) {
      setLoginStatus(response.data);
      props.navigation.navigate('InitialSetup');
    }
  } catch (err) {
    ToastAndroid.show('Login Failed', ToastAndroid.SHORT);
  }
};
const setLoginStatus = async (value) => {
  try {
    await AsyncStorage.setItem('email', value.email);
    await AsyncStorage.setItem('name', value.name);
    await AsyncStorage.setItem('userType', value.userType.toString());
    await AsyncStorage.setItem('userId', value.userId);
    await AsyncStorage.setItem('phone', value.phone);
    await AsyncStorage.setItem('category', JSON.stringify(value.category));
  } catch (e) {
    ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  }
};
export const fetchUserData = () => async (dispatch) => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const response = await HttpService.get(API_NAME.USER_DATA + '/' + userId);
    dispatch({
      type: ActionType.GET_USER_DATA,
      payload: response.data,
    });
  } catch (err) {
    ToastAndroid.show('Login Failed', ToastAndroid.SHORT);
  }
};
