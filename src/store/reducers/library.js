import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  library: [],
};

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_LIBRARY:
      return {
        ...state,
        library: action.payload,
      };

    default:
      return state;
  }
};

export default libraryReducer;
