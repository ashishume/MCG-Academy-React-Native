import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  courses: [],
  myCourses: [],
  myCourseIds: [],
  oneCourse: '',
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case ActionTypes.GET_MY_COURSES:
      return {
        ...state,
        myCourses: action.payload,
      };
    case ActionTypes.GET_COURSE_BY_ID:
      return {
        ...state,
        oneCourse: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;
