import React, {Fragment, useEffect} from 'react';
import {
  View,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IconStyles} from '../Styles';

const SplashScreen = (props) => {
  useEffect(() => {
    setTimeout(() => {
      loginStatusHandler(props);
    }, 700);
  }, []);

  const loginStatusHandler = async (props) => {
    try {
      let email = await AsyncStorage.getItem('email');
      let introValue = await AsyncStorage.getItem('isIntroShown');
      if (introValue == null) {
        props.navigation.navigate('Swiper');
      } else if (email == null) {
        props.navigation.navigate('Login');
      } else {
        props.navigation.navigate('Dashboard');
      }
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  return (
    <Fragment>
      <ImageBackground
        style={{flex: 1, resizeMode: 'cover'}}
        source={require('../../assets/Splash-Screen.png')}>
        {/* <View style={{marginTop: '50%'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            Welcome to MCG Academy
          </Text>
        </View> */}
        {/* <ActivityIndicator
          size={'large'}
          color={IconStyles.iconColor}
          style={{flex: 1}}
        /> */}
      </ImageBackground>
    </Fragment>
  );
};

export default SplashScreen;
