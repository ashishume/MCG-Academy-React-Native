import React, {Fragment, useEffect} from 'react';
import {Image, Dimensions, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
const {height, width} = Dimensions.get('window');
import {fetchAllImages} from '../../store/actions/images';
import {Icon} from 'react-native-elements';
import {IconStyles} from '../Styles';
const DashboardSlideshow = (props) => {
  useEffect(() => {
    props.fetchAllImages();
  }, []);

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
        <Icon
          type={IconStyles.iconType}
          color="#000"
          name="arrow-forward"
          style={{paddingTop: 5}}
        />
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        style={{paddingBottom: 10}}
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
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    images: state.images.images,
  };
};
export default connect(mapStateToProps, {fetchAllImages})(DashboardSlideshow);
