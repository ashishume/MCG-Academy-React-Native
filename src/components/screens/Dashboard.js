import React, {useEffect, useState} from 'react';
import FeaturedCourses from './FeaturedCourses/FeaturedCourses';
import AllCourses from './AllCourses/AllCourses';
import TopHeader from '../Shared/Header';
import {View, PermissionsAndroid, ToastAndroid, Platform} from 'react-native';
import {connect} from 'react-redux';
import DashboardSlideshow from './DashboardSlideshow';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchMyCourses} from '../../store/actions/courses';
import {fetchUserData} from '../../store/actions/auth';
import {fetchAllTestCategories} from '../../store/actions/testSeries';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = (props) => {
  const onClickHandler = () => {
    props.navigation.navigate('Profile');
  };

  useEffect(() => {
    const fetchMyCourseData = () => {
      props.fetchMyCourses();
    };

    const fetchTestSeriesCategories = async () => {
      try {
        const data = await AsyncStorage.getItem('testCategorySelected');
        if (data == null) {
          props.fetchAllTestCategories();
        }
      } catch (e) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    };

    props.navigation.addListener('focus', () => {
      fetchMyCourseData();
      fetchTestSeriesCategories();
    });

    const GetAllPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);
        }
      } catch (err) {
        // Warning(err);
      }
      return null;
    };

    GetAllPermissions();

    return () => {
      props.navigation.addListener('focus', () => {
        fetchMyCourseData();
      });
    };
  }, [props.navigation]);

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
          <FeaturedCourses {...props} />
          <AllCourses {...props} />
        </ScrollView>
      </View>
    </View>
  );
};
export default connect('', {
  fetchMyCourses,
  fetchAllTestCategories,
  fetchUserData,
})(Dashboard);
