import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME} from '../../API/ApiPaths';

export const fetchAllImages = () => async (dispatch) => {
  const response = await HttpService.get(API_NAME.IMAGES);

  dispatch({
    type: ActionType.FETCH_ALL_IMAGES,
    payload: response.data,
  });
};
