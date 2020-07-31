import React, {useEffect, useState, Component} from 'react';
import {View, Text} from 'react-native';
import YoutubePlayer from 'react-native-yt-player';
// import Player from './Player';
class YoutubePlayerUI extends Component {
  state = {
    id: '',
  };
  componentDidMount() {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = this.props.videoId.match(regExp);
    let video = match && match[7].length == 11 ? match[7] : false;
    this.setState({id: video});
  }

  TopBar = ({play, fullScreen}) => (
    <View
      style={{
        alignSelf: 'center',
        position: 'absolute',
        top: 5,
      }}>
      <Text style={{color: '#FFF', fontSize: 17}}>{this.props.videoTitle}</Text>
    </View>
  );
  render() {
    return (
      <View style={{paddingTop: 0}}>
        {this.state.id ? (
          <YoutubePlayer
            loop
            topBar={this.TopBar}
            videoId={this.state.id}
            // autoPlay
            // onFullScreen={(e) => console.log(e)}
            // onStart={() => console.log('video started')}
            // onEnd={() => console.log('video Ended')}
          />
        ) : null}
      </View>
    );
  }
}

export default YoutubePlayerUI;
