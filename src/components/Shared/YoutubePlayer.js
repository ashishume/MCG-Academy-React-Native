import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import YoutubePlayer from 'react-native-yt-player';
const YoutubePlayerUI = ({videoId, videoTitle}) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = videoId.match(regExp);
  const video = match && match[7].length == 11 ? match[7] : false;
  const onFullScreen = (fullScreen) => {
    // console.log('fullscreen ', fullScreen);
  };

  // useEffect(() => {
  //   const showVideo = () => (

  //   );
  //   showVideo();
  // }, [videoId]);
  const TopBar = ({play, fullScreen}) => (
    <View
      style={{
        alignSelf: 'center',
        position: 'absolute',
        top: 5,
      }}>
      <Text style={{color: '#FFF', fontSize: 17}}> {videoTitle}</Text>
    </View>
  );
  return (
    <View style={{paddingTop: 0}}>
      {console.log(video)}

      <YoutubePlayer
        loop
        topBar={TopBar}
        videoId={video}
        // autoPlay
        onFullScreen={(e) => onFullScreen(e)}
        onStart={() => console.log('video started')}
        onEnd={() => console.log('video Ended')}
      />
    </View>
  );
};

export default YoutubePlayerUI;
