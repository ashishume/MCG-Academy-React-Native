import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME, API_KEY} from '../../API/ApiPaths';

export const fetchAllCourses = () => async dispatch => {
  const response = await HttpService.get(API_NAME.COURSES);

  dispatch({
    type: ActionType.GET_ALL_COURSES,
    payload: response.data,
  });
};
