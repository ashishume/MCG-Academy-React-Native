import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {deActivateVideo} from '../../../store/actions/video';
import CommentSection from '../Comments';

const VideoSolutionTestSeries = (props) => {
  useEffect(() => {
    return () => {
      const body = {
        introVideoUrl: '',
        courseTitle: '',
      };
      props.deActivateVideo(body);
    };
  }, []);
  return (
    <View>
      <CommentSection videoData={props.route.params} />
    </View>
  );
};

export default connect('', {deActivateVideo})(VideoSolutionTestSeries);
