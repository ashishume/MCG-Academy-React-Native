import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME} from '../../API/ApiPaths';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchAllCourses = () => async (dispatch) => {
  const category = await AsyncStorage.getItem('category');
  const body = {
    category: JSON.parse(category),
  };
  const response = await HttpService.post(API_NAME.COURSES, body);

  dispatch({
    type: ActionType.GET_ALL_COURSES,
    payload: response.data,
  });
};
export const fetchMyCourses = (courseIds) => async (dispatch) => {
  const response = await HttpService.post(API_NAME.MY_COURSES, courseIds);

  dispatch({
    type: ActionType.GET_MY_COURSES,
    payload: response.data,
  });
};
export const fetchMyCourseIds = (userId) => async (dispatch) => {
  const response = await HttpService.get(`${API_NAME.MY_COURSE_IDS}/${userId}`);

  dispatch({
    type: ActionType.GET_MY_COURSE_IDS,
    payload: response.data.courses,
  });
};
