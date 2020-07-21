import React, {Component, Fragment} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import TopHeader from '../../Shared/Header';
import CourseCard from '../../Shared/CourseCardListItem';
import {connect} from 'react-redux';
import {fetchMyCourses, fetchMyCourseIds} from '../../../store/actions/courses';
import AsyncStorage from '@react-native-community/async-storage';

class MyCourses extends Component {
  async componentDidMount() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await this.props.fetchMyCourseIds(userId);
      console.log(userId);
      const body = {
        courses: this.props.myCoursesIds,
      };
      await this.props.fetchMyCourses(body);
    } catch (e) {
      console.log(e);
    }
  }

  renderData = () => {
    return this.props.courses.map((value, i) => {
      return <CourseCard key={i} content={value} />;
    });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <TopHeader name="My Courses" />
        <SafeAreaView
          style={{flex: 1, backgroundColor: '#fff', paddingBottom: 10}}>
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
