import React from 'react';
import {StyleSheet, View, Dimensions, Image, ToastAndroid} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
const {height, width} = Dimensions.get('window');

const slides = [
  {
    key: 1,
    image: require('../../assets/1.jpg'),
  },
  {
    key: 2,
    image: require('../../assets/2.jpg'),
  },
  {
    key: 3,
    image: require('../../assets/3.jpg'),
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
      <Icon name="arrow-forward" raised type="material" color="gray" />
    </View>
  );
};
const Swiper = (props) => {
  return (
    <AppIntroSlider
      showSkipButton
      keyExtractor={(item) => item.key.toString()}
      renderItem={renderItem}
      data={slides}
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
