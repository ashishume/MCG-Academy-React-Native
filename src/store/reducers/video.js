import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  videoBody: '',
  freeVideos: [],
};

const visibleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_VIDEO:
      return {
        ...state,
        videoBody: action.payload,
      };
    case ActionTypes.DESTROY_VIDEO:
      return {
        ...state,
        videoBody: action.payload,
      };
    case ActionTypes.FETCH_FREE_VIDEOS:
      return {
        ...state,
        freeVideos: action.payload,
      };

    default:
      return state;
  }
};

export default visibleReducer;
