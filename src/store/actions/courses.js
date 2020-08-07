import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME} from '../../API/ApiPaths';
import AsyncStorage from '@react-native-community/async-storage';
import {ToastAndroid} from 'react-native';

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
export const fetchMyCourses = () => async (dispatch) => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const response = await HttpService.get(API_NAME.MY_COURSES + '/' + userId);

    dispatch({
      type: ActionType.GET_MY_COURSES,
      payload: response.data,
    });
  } catch (e) {
    ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  }
};

//only must by used in my Courses
export const fetchCourseById = (courseId, props) => async (dispatch) => {
  const response = await HttpService.get(
    `${API_NAME.MY_COURSE_IDS}/${courseId}`,
  );

  dispatch({
    type: ActionType.GET_COURSE_BY_ID,
    payload: response.data,
  });

  if (response.status == 200) {
    props.navigation.navigate('CourseContent', response.data);
  }
};
