import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  images: [],
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
