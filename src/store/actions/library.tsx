import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME} from '../../API/ApiPaths';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAllLibrary = () => async (dispatch: any) => {
  const categoryId = await AsyncStorage.getItem('categoryId');
  const response = await HttpService.get(API_NAME.LIBRARY + '/' + categoryId);
  dispatch({
    type: ActionType.FETCH_ALL_LIBRARY,
    payload: response.data,
  });
};
