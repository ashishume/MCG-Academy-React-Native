import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  courses: [],
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;
