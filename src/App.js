import React, {Fragment} from 'react';
import MainRouting from './Routes/MainRouting';
import LoaderComponent from './components/LoaderComponent';
import {StatusBar} from 'react-native';
const App = () => {
  return (
    <Fragment>
      <StatusBar backgroundColor="black" />
      <MainRouting />
      <LoaderComponent />
    </Fragment>
  );
};
export default App;
