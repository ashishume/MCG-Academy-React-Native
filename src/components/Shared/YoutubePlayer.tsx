import React, {useEffect, useState, Component} from 'react';
import {View, Text, Dimensions, SafeAreaView} from 'react-native';
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
    <SafeAreaView>
      <YoutubePlayer
        height={220}
        initialPlayerParams={{
          modestbranding: false,
          controls: true,
          rel: false,
        }}
        // forceAndroidAutoplay={true}
        // width={width}
        // onFullScreenChange={e => e}
        // webViewStyle={{
        //   padding: 0,
        //   margin: 0,
        //   backfaceVisibility: 'hidden',
        // }}
        webViewProps={{
          userAgent:
            'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
        }}
        videoId={id}
      />
    </SafeAreaView>
  ) : null;
};

export default YoutubePlayerUI;
