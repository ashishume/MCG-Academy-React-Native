import * as ActionTypes from '../actions/ActionTypes';

const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_LOADER:
      return action.payload;
    case ActionTypes.HIDE_LOADER:
      return action.payload;
    default:
      return state;
  }
};

export default loaderReducer;
