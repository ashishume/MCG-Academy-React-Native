import React, {Component, Fragment} from 'react';
import CourseContentCard from './CourseContentCard';
import {Text} from 'react-native';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CourseDetails from '../CourseDetails/CourseDetails';
import Description from './Description';

class CourseContent extends Component {
  componentDidMount() {
    const {introVideoUrl, courseTitle} = this.props.route.params;
    const body = {
      introVideoUrl,
      courseTitle,
    };
    this.props.activateVideo(body);
  }
  componentWillUnmount() {
    const body = {
      introVideoUrl: '',
      courseTitle: '',
    };
    this.props.deActivateVideo(body);
  }

  render() {
    const Tab = createMaterialTopTabNavigator();

    const CourseContentCardComponent = () => (
      <CourseContentCard content={this.props.route.params} {...this.props} />
    );
    const DescriptionComponent = () => (
      <Description content={this.props.route.params} {...this.props} />
    );

    return (
      <Tab.Navigator lazy={true}>
        <Tab.Screen name="Videos" component={CourseContentCardComponent} />
        <Tab.Screen name="Descrition" component={DescriptionComponent} />
      </Tab.Navigator>
    );
  }
}

export default connect('', {activateVideo, deActivateVideo})(CourseContent);
