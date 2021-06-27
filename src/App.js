import React, {Fragment} from 'react';
import MainRouting from './Routes/MainRouting';
import LoaderComponent from './components/LoaderComponent';
import {StatusBar} from 'react-native';
// import CommentSection from './components/screens/Comments';
const App = () => {
  return (
    <Fragment>
      <StatusBar backgroundColor="black" />
      <MainRouting />
      {/* <CommentSection /> */}
      <LoaderComponent />
    </Fragment>
  );
};
export default App;
