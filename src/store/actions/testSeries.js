import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME} from '../../API/ApiPaths';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAllTestCategories = () => async (dispatch) => {
  const response = await HttpService.get(API_NAME.TEST_SERIES_CATEGORIES);
  dispatch({
    type: ActionType.TEST_SERIES_CATEGORY,
    payload: response.data,
  });
};

export const fetchAllExams = (categoryId) => async (dispatch) => {
  const response = await HttpService.get(
    `${API_NAME.TEST_SERIES_EXAMS}/${categoryId}`,
  );
  dispatch({
    type: ActionType.TEST_SERIES_EXAMS,
    payload: response.data,
  });
};

export const fetchAllQuestions = (examId) => async (dispatch) => {
  const response = await HttpService.get(
    `${API_NAME.TEST_SERIES_QUESTIONS}/${examId}`,
  );
  dispatch({
    type: ActionType.TEST_SERIES_QUESTIONS,
    payload: response.data,
  });
};

export const buyNewTestSeries = async (body) => {
  const response = await HttpService.post(API_NAME.BUY_NEW_TEST_SERIES, body);
  if (response.status === 200)
    ToastAndroid.show('Payment successful', ToastAndroid.SHORT);
};

export const fetchAllBoughtTests = () => async (dispatch) => {
  let userIdData;
  try {
    userIdData = await AsyncStorage.getItem('userId');
  } catch (e) {
    ToastAndroid.show('Something went Wrong', ToastAndroid.SHORT);
  }
  const response = await HttpService.get(
    API_NAME.GET_BOUGHT_TEST_SERIES + '/' + userIdData,
  );
  dispatch({
    type: ActionType.FETCH_MY_TEST_SERIES,
    payload: response.data,
  });
};
