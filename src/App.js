import React, { Fragment} from 'react';
import MainRouting from './Routes/MainRouting';
import LoaderComponent from './components/LoaderComponent';
// import VideoPlayer from './components/VideoPlayer';
// import VideoPlayer from './components/VideoPlayer';

const App = () => {
  return (
    <Fragment>
      <LoaderComponent />
      <MainRouting />
      {/* <VideoPlayer /> */}
    </Fragment>
  );
};
export default App;
