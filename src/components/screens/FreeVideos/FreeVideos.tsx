import React, {useEffect} from 'react';
import {View, SafeAreaView, FlatList, Text} from 'react-native';
import TopHeader from '../../Shared/Header';
import {connect, useDispatch} from 'react-redux';
import {fetchFreeVideos} from '../../../store/actions/video';
import FreeVideosCard from './FreeVideosCard';
import CategoryFilter from '../../Shared/Filter';

const FreeVideos = ({navigation, videos}: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchFreeVideos());
    });
    return unsubscribe;
  }, [navigation]);
  const videoEventHandler = (value: any) => {
    navigation.navigate('videos', {videoId: value?._id});
  };
  const changeFreeVideos = async () => {
    await dispatch(fetchFreeVideos());
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopHeader name="Free Videos" />
      <View style={{marginTop: 5}}>
        <CategoryFilter
          setNewCategory={(courseId: string) => changeFreeVideos()}
        />
      </View>
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#fff', paddingBottom: 5}}>
        <FlatList
          ListEmptyComponent={<Text>No videos available</Text>}
          keyExtractor={(item, i) => i.toString()}
          renderItem={item => {
            return (
              <FreeVideosCard
                onClickVideoItem={() => videoEventHandler(item.item)}
                content={item.item}
              />
            );
          }}
          data={videos}
        />
      </SafeAreaView>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    videos: state.visible.freeVideos,
  };
};
export default connect(mapStateToProps, {fetchFreeVideos})(FreeVideos);
