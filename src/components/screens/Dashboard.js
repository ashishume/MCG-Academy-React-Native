import React, {useEffect, useState} from 'react';
import Explore from './Explore/Explore';
import AllCourses from './AllCourses/AllCourses';
import TopHeader from '../Shared/Header';
import {View, ToastAndroid, PermissionsAndroid} from 'react-native';
import {connect} from 'react-redux';
import DashboardSlideshow from './DashboardSlideshow';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchMyCourses} from '../../store/actions/courses';
import {fetchUserData} from '../../store/actions/auth';

const Dashboard = (props) => {
  const onClickHandler = () => {
    props.navigation.navigate('Profile');
  };

  useEffect(() => {
    const fetchMyCourseData = () => {
      props.fetchMyCourses();
    };
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchMyCourseData();
    });

    const requestPermission = async () => {
      await requestCameraPermission();
      await requestWriteStoragePermission();
      await requestReadStoragePermission();
    };

    requestPermission();

    return unsubscribe;
  }, [props.navigation]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Profile picture camera permission',
          message:
            'App needs access to your camera ' +
            'so you can take awesome profile pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestReadStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'We need gallery access to upload profile',
          message:
            'App needs access to your gallery' +
            'so you can take awesome profile pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestWriteStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'We need gallery access to upload profile',
          message:
            'App needs access to your gallery' +
            'so you can take awesome profile pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onSearchHandler = () => {
    props.navigation.navigate('Search');
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <TopHeader
          {...props}
          onSearchHandler={() => onSearchHandler()}
          IconName="ios-person"
          onIconClick={() => onClickHandler()}
        />
        <ScrollView>
          <DashboardSlideshow {...props} />
          <Explore {...props} />
          <AllCourses {...props} />
        </ScrollView>
      </View>
    </View>
  );
};
export default connect('', {fetchMyCourses, fetchUserData})(Dashboard);
