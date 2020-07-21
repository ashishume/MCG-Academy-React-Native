import React, {Fragment} from 'react';
import {View, Image, Dimensions, Text} from 'react-native';
import YoutubePlayer from 'react-native-yt-player';
import YoutubePlayerUI from '../../Shared/YoutubePlayer';
const BuyCourseCard = ({content}) => {
  return (
    <View>
      <YoutubePlayerUI videoId="https://youtu.be/Svf1lEUUCzU" />
    </View>
  );
};

export default BuyCourseCard;
