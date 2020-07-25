import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  login: {},
  userData: {},
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case ActionTypes.GET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
