import React, {useEffect} from 'react';
import {View, SafeAreaView, ScrollView, ToastAndroid} from 'react-native';
import TopHeader from '../../Shared/Header';
import CourseCardListItem from './CourseCardListItem';
import {connect} from 'react-redux';
import {fetchMyCourses, fetchMyCourseIds} from '../../../store/actions/courses';
import AsyncStorage from '@react-native-community/async-storage';

const MyCourses = (props) => {
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        await props.fetchMyCourseIds(userId);
        if (props.myCoursesIds) {
          const body = {
            courses: props.myCoursesIds,
          };
          await props.fetchMyCourses(body);
        }
      } catch (e) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    };
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchCourseData();
    });
    return unsubscribe;
  }, [props.navigation]);

  const courseEventHandler = (value) => {
    props.navigation.navigate('CourseContent', value);
  };

  const renderData = () => {
    return props.courses.map((value, i) => {
      return (
        <CourseCardListItem
          key={i}
          onClickCourseItem={() => courseEventHandler(value)}
          content={value}
        />
      );
    });
  };
  return (
    <View style={{flex: 1}}>
      <TopHeader name="My Courses" />
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#fff', paddingBottom: 5}}>
        <ScrollView style={{flex: 1}}>{renderData()}</ScrollView>
      </SafeAreaView>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    myCoursesIds: state.courses.myCourseIds,
    courses: state.courses.myCourses,
  };
};
export default connect(mapStateToProps, {fetchMyCourseIds, fetchMyCourses})(
  MyCourses,
);
