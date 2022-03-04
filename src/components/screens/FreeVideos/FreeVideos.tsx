import React, {useEffect} from 'react';
import {View, SafeAreaView, FlatList, Text} from 'react-native';
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
    props.navigation.navigate('videos', {videoId: value?._id});
  };

  return (
    <View style={{flex: 1}}>
      <TopHeader name="Free Videos" />
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#fff', paddingBottom: 5}}>
        <FlatList
          ListEmptyComponent={<Text>No videos available</Text>}
          keyExtractor={(item, i) => i.toString()}
          renderItem={(item) => {
            return (
              <FreeVideosCard
                onClickVideoItem={() => videoEventHandler(item.item)}
                content={item.item}
              />
            );
          }}
          data={props.videos}
        />
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
