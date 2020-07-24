import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME} from '../../API/ApiPaths';

export const fetchAllLibrary = () => async (dispatch) => {
  const response = await HttpService.get(API_NAME.LIBRARY);

  dispatch({
    type: ActionType.FETCH_ALL_LIBRARY,
    payload: response.data,
  });
  
};
