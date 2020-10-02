import React, {useEffect} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import TopHeader from '../../Shared/Header';
import CourseCardListItem from './CourseCardListItem';
import {connect} from 'react-redux';
import {fetchMyCourses, fetchCourseById} from '../../../store/actions/courses';

const MyCourses = (props) => {
  useEffect(() => {
    const fetchCourseData = () => {
      props.fetchMyCourses();
    };
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchCourseData();
    });
    return unsubscribe;
  }, [props.navigation]);

  const courseEventHandler = (value) => {
    props.fetchCourseById(value._id, props);
  };

  const renderData = () => {
    return props.courses.map((value, i) => {
      return (
        <CourseCardListItem
          isExpired={true}
          key={i}
          onClickCourseItem={() => courseEventHandler(value.course)}
          contentData={value.course}
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
    oneCourse: state.courses.oneCourse,
    courses: state.courses.myCourses,
  };
};
export default connect(mapStateToProps, {fetchMyCourses, fetchCourseById})(
  MyCourses,
);
