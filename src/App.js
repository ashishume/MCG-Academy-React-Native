import React, {Fragment, useEffect} from 'react';
import MainRouting from './Routes/MainRouting';
import LoaderComponent from './components/LoaderComponent';
import {StatusBar} from 'react-native';
import {
  GenerateTokenForNotifications,
  LoadBackgroundAppNotifications,
  LoadInAppNotifications,
} from './store/actions/fcmService';

const App = () => {
  useEffect(() => {
    GenerateTokenForNotifications();
    LoadBackgroundAppNotifications();
    return LoadInAppNotifications();
  });

  return (
    <Fragment>
      <StatusBar backgroundColor="black" />
      <MainRouting />
      <LoaderComponent />
    </Fragment>
  );
};
export default App;