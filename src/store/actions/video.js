import * as ActionType from './ActionTypes';
import {API_NAME} from '../../API/ApiPaths';
import HttpService from '../../API/HttpService';
export const activateVideo = (video) => async (dispatch) => {
  dispatch({
    type: ActionType.TOGGLE_VIDEO,
    payload: video,
  });
};
export const deActivateVideo = (video) => async (dispatch) => {
  dispatch({
    type: ActionType.TOGGLE_VIDEO,
    payload: video,
  });
};
export const fetchFreeVideos = () => async (dispatch) => {
  const response = await HttpService.get(API_NAME.VIDEOS);

  dispatch({
    type: ActionType.FETCH_FREE_VIDEOS,
    payload: response.data,
  });
};
