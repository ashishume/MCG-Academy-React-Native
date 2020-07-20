import React, {Component, Fragment} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import TopHeader from '../../Shared/Header';
import CourseCard from '../../Shared/CourseCardListItem';
import data from '../../../assets/data.json';
import {connect} from 'react-redux';
import {fetchMyCourses} from '../../../store/actions/courses';

class MyCourses extends Component {
  async componentDidMount() {
    const body = {
      courses: this.props.myCoursesIds,
    };
    await this.props.fetchMyCourses(body);
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
export default connect(mapStateToProps, {fetchMyCourses})(MyCourses);
