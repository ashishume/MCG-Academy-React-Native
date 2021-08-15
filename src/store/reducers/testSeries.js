import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  testCategories: [],
  testExams: [],
  testQuestions: [],
  myTests: [],
  leaderboard: [],
};

const testSeriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TEST_SERIES_CATEGORY:
      return {
        ...state,
        testCategories: action.payload,
      };
    case ActionTypes.TEST_SERIES_EXAMS:
      return {
        ...state,
        testExams: action.payload,
      };
    case ActionTypes.TEST_SERIES_QUESTIONS:
      return {
        ...state,
        testQuestions: action.payload,
      };
    case ActionTypes.FETCH_MY_TEST_SERIES:
      return {
        ...state,
        myTests: action.payload,
      };
    case ActionTypes.LEADERBOARD_DATA:
      return {
        ...state,
        leaderboard: action.payload,
      };
    default:
      return state;
  }
};

export default testSeriesReducer;
