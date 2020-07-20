import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  posts: [],
  content: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ActionTypes.FETCH_POST:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
