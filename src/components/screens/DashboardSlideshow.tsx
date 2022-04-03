import React, {useEffect} from 'react';
import {Image, Dimensions, View, TouchableOpacity} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {fetchAllImages} from '../../store/actions/images';
import Carousel from 'react-native-snap-carousel';
import {StateInterface} from '../../Shared/Interfaces/reducer';

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

const DashboardSlideshow = ({navigation}) => {
  const images = useSelector((state: StateInterface) => state.images.images);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllImages());
  }, []);

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={e => {
          navigation.navigate('course', {
            courseId: item?.course,
          });
        }}>
        <Image
          source={{uri: item.imageUrl}}
          style={{width: '100%', height: 200, resizeMode: 'cover', zIndex: 1}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{marginVertical: 5, flex: 1}}>
      <Carousel
        data={images}
        renderItem={_renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    </View>
  );
};

export default DashboardSlideshow;
