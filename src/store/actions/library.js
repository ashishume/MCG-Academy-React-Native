import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME} from '../../API/ApiPaths';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchAllLibrary = () => async (dispatch) => {
  const data = await AsyncStorage.getItem('category');
  const body = {
    category: JSON.parse(data),
  };
  const response = await HttpService.post(API_NAME.LIBRARY, body);

  dispatch({
    type: ActionType.FETCH_ALL_LIBRARY,
    payload: response.data,
  });
};
