import React, {useEffect, useState, Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
const {width} = Dimensions.get('window');
const YoutubePlayerUI = (props: {videoId: string}) => {
  const [id, setId] = useState('');
  useEffect(() => {
    let regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = props.videoId.match(regExp);
    let video = match && match[7].length == 11 ? match[7] : '';
    setId(video);
  }, [props.videoId]);

  return id ? (
    <YoutubePlayer
      height={300}
      width={width}
      webViewStyle={{
        padding: 0,
        margin: 0,
      }}
      videoId={id}
    />
  ) : null;
};

export default YoutubePlayerUI;
