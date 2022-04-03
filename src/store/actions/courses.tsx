import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME} from '../../API/ApiPaths';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';

export const fetchAllCourses =
  (categoryId: string) => async (dispatch: any) => {
    const response = await HttpService.get(API_NAME.COURSES + '/' + categoryId);
    dispatch({
      type: ActionType.GET_ALL_COURSES,
      payload: response.data,
    });
  };

export const fetchFeaturedCourses = () => async (dispatch: any) => {
  const response = await HttpService.get(API_NAME.FEATURED);
  dispatch({
    type: ActionType.GET_FEATURED_COURSE,
    payload: response.data,
  });
};
export const buyNewCourse = (courseId: string) => async (dispatch: any) => {
  const user = await AsyncStorage.getItem('userId');
  const body = {
    userId: user,
    courseId: courseId,
  };
  const response = await HttpService.put(API_NAME.BUY_NEW_COURSES, body);
  dispatch({
    type: ActionType.BUY_NEW_COURSE,
    payload: response.data,
  });
};
export const fetchMyCourses = () => async (dispatch: any) => {
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
export const fetchCourseById =
  (courseId: string, props: any) => async (dispatch: any) => {
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
