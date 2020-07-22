import React from 'react';
import {View, Text} from 'react-native';
import YoutubePlayer from 'react-native-yt-player';
const YoutubePlayerUI = ({videoId, videoTitle}) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = videoId.match(regExp);
  const video = match && match[7].length == 11 ? match[7] : false;
  const onFullScreen = (fullScreen) => {
    console.log('fullscreen ', fullScreen);
  };

  const TopBar = ({play, fullScreen}) => (
    <View
      style={{
        alignSelf: 'center',
        position: 'absolute',
        top: 0,
      }}>
      <Text style={{color: '#FFF'}}> {videoTitle}</Text>
    </View>
  );
  return (
    <View style={{paddingTop: 10}}>
      <YoutubePlayer
        loop
        topBar={TopBar}
        videoId={video}
        autoPlay
        onFullScreen={(e) => onFullScreen(e)}
        onStart={() => console.log('video started')}
        onEnd={() => console.log('video Ended')}
      />
    </View>
  );
};

export default YoutubePlayerUI;
