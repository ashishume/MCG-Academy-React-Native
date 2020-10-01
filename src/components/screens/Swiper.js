import React from 'react';
import {StyleSheet, View, Dimensions, Image, ToastAndroid} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
// import { IconStyles } from '../Styles';
const {height, width} = Dimensions.get('window');

const slides = [
  {
    key: 1,
    image: require('../../assets/Intro-Screen-1.png'),
  },
  {
    key: 2,
    image: require('../../assets/Intro-Screen-2.png'),
  },
  {
    key: 3,
    image: require('../../assets/Intro-Screen-3.png'),
    backgroundColor: '#febe29',
  },
];

const renderItem = ({item}) => {
  return (
    <View key={item.key}>
      <Image
        source={item.image}
        style={{resizeMode: 'cover', height: height, width: width}}
      />
    </View>
  );
};

const onDone = async (props) => {
  try {
    await AsyncStorage.setItem('isIntroShown', 'true');
    const email = await AsyncStorage.getItem('email');
    if (email != null) {
      props.navigation.navigate('Dashboard');
    } else {
      props.navigation.navigate('Login');
    }
  } catch (e) {
    ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
  }
};
const renderNextButton = () => {
  return (
    <View style={styles.buttonCircle}>
      <Icon name="ios-arrow-forward" raised type="ionicon" color="#000" />
    </View>
  );
};
const renderDoneButton = () => {
  return (
    <View style={styles.buttonCircle}>
      <Icon name="checkmark" raised type="ionicon" color="#000" />
    </View>
  );
};
const Swiper = (props) => {
  return (
    <AppIntroSlider
      dotStyle={{backgroundColor: 'gray'}}
      activeDotStyle={{backgroundColor:'#000'}}
      keyExtractor={(item) => item.key.toString()}
      renderItem={renderItem}
      data={slides}
      renderDoneButton={renderDoneButton}
      showDoneButton
      onDone={() => onDone(props)}
      renderNextButton={renderNextButton}
    />
  );
};

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Swiper;
