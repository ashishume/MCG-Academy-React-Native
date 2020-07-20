import React, {Component, Fragment} from 'react';
import Explore from './Explore/Explore';
import AllCourses from './AllCourses/AllCourses';
import Header from '../Shared/Header';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {fetchMyCourseIds} from '../../store/actions/courses';
class Dashboard extends Component {
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    this.props.fetchMyCourseIds(userId);
  }
  render() {
    return (
      <Fragment>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Header {...this.props} />
          <Explore />
          <AllCourses />
        </View>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myCoursesIds: state.courses.myCourseIds,
  };
};

export default connect(mapStateToProps, {fetchMyCourseIds})(Dashboard);
