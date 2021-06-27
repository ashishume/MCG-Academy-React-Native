import * as ActionType from './ActionTypes';
import {API_NAME} from '../../API/ApiPaths';
import HttpService from '../../API/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const activateVideo = (video) => async (dispatch) => {
  dispatch({
    type: ActionType.TOGGLE_VIDEO,
    payload: video,
  });
};
export const deActivateVideo = (video) => async (dispatch) => {
  dispatch({
    type: ActionType.DESTROY_VIDEO,
    payload: video,
  });
};
export const fetchFreeVideos = () => async (dispatch) => {
  const data = await AsyncStorage.getItem('category');
  const body = {
    category: JSON.parse(data),
  };

  const response = await HttpService.post(API_NAME.VIDEOS, body);
  dispatch({
    type: ActionType.FETCH_FREE_VIDEOS,
    payload: response.data,
  });
};
