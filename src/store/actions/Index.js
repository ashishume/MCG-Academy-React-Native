import * as ActionType from './ActionTypes';
import HttpService from '../../API/HttpService';
import {API_NAME, API_KEY} from '../../API/ApiPaths';

export const fetchPosts = () => async dispatch => {
  const response = await HttpService.get(
    `${API_NAME.FETCH_POSTS}?key=${API_KEY}`,
  );

  dispatch({
    type: ActionType.FETCH_POSTS,
    payload: response.data.items,
  });
};
export const fetchContent = postId => async dispatch => {
  const response = await HttpService.get(
    `${API_NAME.FETCH_POSTS}/${postId}?key=${API_KEY}`,
  );

  dispatch({
    type: ActionType.FETCH_POST,
    payload: response.data,
  });
};
