import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';

//REDUCERS
import loginReducer from './reducers/login';
import loaderReducer from './reducers/loader';
import courseReducer from './reducers/courses';
import visibleReducer from './reducers/video';
import libraryReducer from './reducers/library';
import categoryReducer from './reducers/category';

const rootReducer = combineReducers({
  login: loginReducer,
  loader: loaderReducer,
  courses: courseReducer,
  visible: visibleReducer,
  library: libraryReducer,
  category: categoryReducer,
});

const middleWares = [thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, applyMiddleware(...middleWares));


// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(...middleWares)),
// );

const configureStore = () => {
  return store;
};

export default configureStore;
