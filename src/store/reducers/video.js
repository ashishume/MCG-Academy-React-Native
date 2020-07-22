import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  videoBody: '',
};

const visibleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_VIDEO:
      return {
        ...state,
        videoBody: action.payload,
      };

    default:
      return state;
  }
};

export default visibleReducer;
