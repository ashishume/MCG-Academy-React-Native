import React, {Component, Fragment} from 'react';
import {Text, View, SafeAreaView, ScrollView,ToastAndroid} from 'react-native';
import TopHeader from '../../Shared/Header';
import CourseCardListItem from './CourseCardListItem';
import {connect} from 'react-redux';
import {fetchMyCourses, fetchMyCourseIds} from '../../../store/actions/courses';
import AsyncStorage from '@react-native-community/async-storage';

class MyCourses extends Component {
  async componentDidMount() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await this.props.fetchMyCourseIds(userId);
      if (this.props.myCoursesIds.length) {
        const body = {
          courses: this.props.myCoursesIds,
        };
        await this.props.fetchMyCourses(body);
      }
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  }
  courseEventHandler = (value) => {
    this.props.navigation.navigate('CourseContent', value);
  };

  renderData = () => {
    return this.props.courses.map((value, i) => {
      return (
        <CourseCardListItem
          key={i}
          onClickCourseItem={() => this.courseEventHandler(value)}
          content={value}
        />
      );
    });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <TopHeader name="My Courses" />
        <SafeAreaView
          style={{flex: 1, backgroundColor: '#fff', paddingBottom: 5}}>
          <ScrollView style={{flex: 1}}>{this.renderData()}</ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myCoursesIds: state.courses.myCourseIds,
    courses: state.courses.myCourses,
  };
};
export default connect(mapStateToProps, {fetchMyCourseIds, fetchMyCourses})(
  MyCourses,
);
