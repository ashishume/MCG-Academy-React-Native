import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, RefreshControl, ScrollView} from 'react-native';
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
          expiryDateData={value.expiryDate}
        />
      );
    });
  };
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.fetchMyCourses();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{flex: 1}}>
      <TopHeader name="My Courses" />
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#fff', paddingBottom: 5}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{flex: 1}}>
          {renderData()}
        </ScrollView>
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
