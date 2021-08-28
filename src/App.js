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


// const moveToVideoSolution = () => {
//   const body = {
//     introVideoUrl: testSeriesData.videoSolutionLink,
//     courseTitle: testSeriesData.name + '(video solution)',
//   };

//   props.activateVideo(body);
//   props.navigation.navigate('VideoSolutionTestSeries', testSeriesData); //NAVIGATE TO VIDEO AND COMMENTS PAGE
// };
// await props.navigation.setOptions({
//   headerRight: () =>
//     isTestSeriesBought ? (
//       <Icon
//         name="videocam"
//         size={20}
//         onPress={() => moveToVideoSolution()}
//         raised
//         containerStyle={{marginRight: 5}}
//         type={IconStyles.iconType}
//       />
//     ) : null,
// });