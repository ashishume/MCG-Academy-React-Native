import React from 'react';
import {View, Text} from 'react-native';
import CommentSection from '../Comments';

const VideoPage = (props) => {
  return (
    <View>
      <CommentSection videoData={props.route.params} />
    </View>
  );
};

export default VideoPage;
