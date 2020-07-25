import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  category: [],
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};

export default courseReducer;
