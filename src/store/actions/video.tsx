import * as ActionType from './ActionTypes';
import {API_NAME} from '../../API/ApiPaths';
import HttpService from '../../API/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const activateVideo = (video: any) => async (dispatch: any) => {
  dispatch({
    type: ActionType.TOGGLE_VIDEO,
    payload: video,
  });
};
export const deActivateVideo = (video: any) => async (dispatch: any) => {
  dispatch({
    type: ActionType.DESTROY_VIDEO,
    payload: video,
  });
};
export const fetchFreeVideos = () => async (dispatch: any) => {
  const categoryId = await AsyncStorage.getItem('categoryId');
  const response = await HttpService.get(API_NAME.VIDEOS + '/' + categoryId);
  dispatch({
    type: ActionType.FETCH_FREE_VIDEOS,
    payload: response.data,
  });
};
