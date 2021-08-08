import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  testCategories: [],
  testExams: [],
  testQuestions: [],
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
    default:
      return state;
  }
};

export default testSeriesReducer;
