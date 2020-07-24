import React, {Component, Fragment} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import TopHeader from '../../Shared/Header';
import {connect} from 'react-redux';
import {fetchFreeVideos} from '../../../store/actions/video';
import CourseCardListItem from '../MyCourses/CourseCardListItem';
import FreeVideosCard from './FreeVideosCard';

class FreeVideos extends Component {
  componentDidMount() {
    this.props.fetchFreeVideos();
  }
  videoEventHandler = (value) => {
    this.props.navigation.navigate('FreeVideoContent', value);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <TopHeader name="Free Videos" />
        <SafeAreaView
          style={{flex: 1, backgroundColor: '#fff', paddingBottom: 5}}>
          <ScrollView style={{flex: 1}}>
            {this.props.videos.map((value, i) => {
              return (
                <FreeVideosCard
                  key={i}
                  onClickVideoItem={() => this.videoEventHandler(value)}
                  content={value}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    videos: state.visible.freeVideos,
  };
};
export default connect(mapStateToProps, {fetchFreeVideos})(FreeVideos);
