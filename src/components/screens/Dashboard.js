import React, {useEffect} from 'react';
import Explore from './Explore/Explore';
import AllCourses from './AllCourses/AllCourses';
import TopHeader from '../Shared/Header';
import {View, ToastAndroid} from 'react-native';
import {fetchMyCourseIds} from '../../store/actions/courses';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

const Dashboard = (props) => {
  const onClickHandler = () => {
    props.navigation.navigate('Profile');
  };

  useEffect(() => {
    const fetchMyCourseData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        await props.fetchMyCourseIds(userId);
      } catch (e) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    };

    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchMyCourseData();
    });

    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <TopHeader
          {...props}
          IconName="ios-person"
          onIconClick={() => onClickHandler()}
        />
        <Explore {...props} />
        <AllCourses {...props} />
      </View>
    </View>
  );
};

export default connect('', {fetchMyCourseIds})(Dashboard);
