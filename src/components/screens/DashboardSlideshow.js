import React, {useEffect} from 'react';
import {Image, Dimensions, View} from 'react-native';
import {connect} from 'react-redux';
import {fetchAllImages} from '../../store/actions/images';
import Carousel from 'react-native-snap-carousel';

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

const DashboardSlideshow = (props) => {
  useEffect(() => {
    props.fetchAllImages();
  }, []);
  const _renderItem = ({item, index}) => {
    return (
      <View>
        <Image
          source={{uri: item.imageUrl}}
          style={{width: '100%', height: 200, resizeMode: 'cover'}}
        />
      </View>
    );
  };
  return (
    <View style={{marginVertical: 5, flex: 1}}>
      <Carousel
        data={props.images}
        renderItem={_renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    images: state.images.images,
  };
};
export default connect(mapStateToProps, {fetchAllImages})(DashboardSlideshow);
