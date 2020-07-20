import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import React, {Fragment} from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import 'react-native-gesture-handler';

const store = configureStore();
const AppIndex = () => (
  <Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </Fragment>
);

AppRegistry.registerComponent(appName, () => AppIndex);
