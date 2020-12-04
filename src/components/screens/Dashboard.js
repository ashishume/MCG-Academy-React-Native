import React, {useEffect, useState} from 'react';
import Explore from './Explore/Explore';
import AllCourses from './AllCourses/AllCourses';
import TopHeader from '../Shared/Header';
import {View, PermissionsAndroid, Platform} from 'react-native';
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
      await GetAllPermissions();
    };

    requestPermission();

    return unsubscribe;
  }, [props.navigation]);

  const GetAllPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const userResponse = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        return userResponse;
      }
    } catch (err) {
      Warning(err);
    }
    return null;
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
