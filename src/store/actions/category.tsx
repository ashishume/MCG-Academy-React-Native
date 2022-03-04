import * as ActionType from './ActionTypes';
import {API_NAME} from '../../API/ApiPaths';
import HttpService from '../../API/HttpService';

export const fetchAllCategories = () => async (dispatch) => {

  const response = await HttpService.get(API_NAME.CATEGORY);
  dispatch({
    type: ActionType.GET_ALL_CATEGORY,
    payload: response.data,
  });
};
