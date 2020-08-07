import React, {useEffect, useState, Component} from 'react';
import {View, Text} from 'react-native';
import YoutubePlayer from 'react-native-yt-player';
const YoutubePlayerUI = (props) => {
  const [id, setId] = useState('');
  useEffect(() => {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = props.videoId.match(regExp);
    let video = match && match[7].length == 11 ? match[7] : false;
    setId(video);
  });

  const TopBar = ({play, fullScreen}) => (
    <View
      style={{
        alignSelf: 'center',
        position: 'absolute',
        top: 5,
      }}>
      <Text style={{color: '#FFF', fontSize: 17}}>{props.videoTitle}</Text>
    </View>
  );
  return (
    <View style={{paddingTop: 0}}>
      {id ? (
        <YoutubePlayer
          loop
          topBar={TopBar}
          videoId={id}
          // autoPlay
          // onFullScreen={(e) => console.log(e)}
          // onStart={() => console.log('video started')}
          // onEnd={() => console.log('video Ended')}
        />
      ) : null}
    </View>
  );
};

export default YoutubePlayerUI;
