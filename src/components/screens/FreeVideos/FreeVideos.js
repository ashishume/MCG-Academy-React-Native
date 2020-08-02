import React, {useEffect} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import TopHeader from '../../Shared/Header';
import {connect} from 'react-redux';
import {fetchFreeVideos} from '../../../store/actions/video';
import FreeVideosCard from './FreeVideosCard';

const FreeVideos = (props) => {
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      props.fetchFreeVideos();
    });
    return unsubscribe;
  }, [props.navigation]);
  const videoEventHandler = (value) => {
    this.props.navigation.navigate('FreeVideoContent', value);
  };

  return (
    <View style={{flex: 1}}>
      <TopHeader name="Free Videos" />
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#fff', paddingBottom: 5}}>
        <ScrollView style={{flex: 1}}>
          {props.videos.map((value, i) => {
            return (
              <FreeVideosCard
                key={i}
                onClickVideoItem={() => videoEventHandler(value)}
                content={value}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    videos: state.visible.freeVideos,
  };
};
export default connect(mapStateToProps, {fetchFreeVideos})(FreeVideos);
