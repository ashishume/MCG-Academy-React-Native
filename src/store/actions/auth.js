import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME} from '../../API/ApiPaths';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const signupUser = (values, props) => async (dispatch) => {
  try {
    const response = await HttpService.post(API_NAME.SIGNUP, values);
    dispatch({
      type: ActionType.SIGNUP,
      payload: response.data,
    });
    if (response.status === 200) {
      setLoginStatus(response.data);
      props.navigation.navigate('InitialSetup');
    }
  } catch (err) {
    ToastAndroid.show('Signup failed', ToastAndroid.LONG);
  }
};
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
    ToastAndroid.show('Login Failed', ToastAndroid.LONG);
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
    ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
  }
};
export const fetchUserData = (props) => async (dispatch) => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const response = await HttpService.get(API_NAME.USER_DATA + '/' + userId);
    dispatch({
      type: ActionType.GET_USER_DATA,
      payload: response.data,
    });
    if (response.status == 200) {
      await AsyncStorage.setItem('name', response.data.name);
      await AsyncStorage.setItem('phone', response.data.phone);
      await AsyncStorage.setItem(
        'category',
        JSON.stringify(response.data.category),
      );
      props.navigation.navigate('Dashboard');
    }
  } catch (err) {
    ToastAndroid.show('Something went Wrong', ToastAndroid.LONG);
  }
};
export const updateUserData = (body) => async (dispatch) => {
  try {
    const response = await HttpService.put(API_NAME.UPDATE_USER, body);
    dispatch({
      type: ActionType.UPDATE_USER_DATA,
      payload: response.data,
    });
  } catch (err) {
    ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
  }
};
export const updatePassword = (body, props) => async (dispatch) => {
  try {
    const response = await HttpService.post(API_NAME.CHANGE_PASSWORD, body);
    dispatch({
      type: ActionType.CHANGE_PASSWORD,
      payload: response.data,
    });

    if (response.status == 200) {
      props.navigation.navigate('Dashboard');
    }
  } catch (err) {
    ToastAndroid.show('Password change failed', ToastAndroid.LONG);
  }
};
