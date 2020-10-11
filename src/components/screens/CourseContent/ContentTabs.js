import React, {Component, Fragment} from 'react';
import CourseContentCard from './CourseContentCard';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Description from './Description';

class ContentTabs extends Component {
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

    const CourseContentCardComponent = () => {
      return (
        <CourseContentCard content={this.props.route.params} {...this.props} />
      );
    };
    const DescriptionComponent = () => {
      return <Description content={this.props.route.params} {...this.props} />;
    };

    return (
      <Tab.Navigator lazy={true}>
        <Tab.Screen name="Videos" component={CourseContentCardComponent} />
        <Tab.Screen name="Description" component={DescriptionComponent} />
      </Tab.Navigator>
    );
  }
}

export default connect('', {activateVideo, deActivateVideo})(ContentTabs);
