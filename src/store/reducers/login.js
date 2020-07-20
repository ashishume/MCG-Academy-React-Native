import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  login: {},
  // loginStatus: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    // case ActionTypes.LOGIN_STATUS:
    //   return {
    //     ...state,
    //     loginStatus: action.payload,
    //   };
    default:
      return state;
  }
};

export default loginReducer;
