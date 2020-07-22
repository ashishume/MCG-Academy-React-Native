import * as ActionType from './ActionTypes';

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
