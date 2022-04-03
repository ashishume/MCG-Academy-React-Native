import React from 'react';
import {View, Text} from 'react-native';
import YoutubePlayerUI from '../../Shared/YoutubePlayer';
import CommentSection from '../Comments';

export interface Video {
  isLocked: Boolean;
  title: String;
  url: String;
  urlType: String;
  _id: String;
}

const VideoPage = ({route}: any) => {
  const {params} = route;
  return (
    <View>
      <YoutubePlayerUI videoId={params.url} />
      <CommentSection videoData={params} />
    </View>
  );
};

export default VideoPage;
