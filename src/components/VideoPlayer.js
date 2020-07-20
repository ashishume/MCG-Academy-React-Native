import React, {Fragment, Component} from 'react';
import YoutubePlayerUI from './Shared/YoutubePlayer';

class VideoPlayer extends Component {
  render() {
    return (
      <YoutubePlayerUI
        videoTitle="Cooking video"
        videoId="https://youtu.be/DYNwZPgtpTI"
      />
    );
  }
}

export default VideoPlayer;
