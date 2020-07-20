import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME, API_KEY} from '../../API/ApiPaths';

export const fetchAllCourses = () => async (dispatch) => {
  const response = await HttpService.get(API_NAME.COURSES);

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
