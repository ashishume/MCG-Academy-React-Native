import React, {Fragment, useEffect} from 'react';
import {Image, Dimensions, View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
const {height, width} = Dimensions.get('window');
import {fetchAllImages} from '../../store/actions/images';
import {Icon} from 'react-native-elements';
import {IconStyles} from '../Styles';
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
        {console.log(item)}
        <Image
          source={{uri: item.imageUrl}}
          style={{width: '100%', height: 200, resizeMode: 'cover'}}
        />
      </View>
    );
  };
  return (
    <View style={{marginVertical: 5}}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 10,
          flexDirection: 'row',
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            flex: 1,
          }}>
          Special offers
        </Text>
      </View>
      {/* <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        style={{
          paddingBottom: 10,
          marginHorizontal: 5,
        }}
        decelerationRate="fast"
        pagingEnabled>
        {props.images.map((value, i) => {
          return (
            <Fragment key={i}>
              <Image
                source={{uri: value.imageUrl}}
                style={{width: width, height: 200}}
              />
            </Fragment>
          );
        })}
      </ScrollView> */}
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
