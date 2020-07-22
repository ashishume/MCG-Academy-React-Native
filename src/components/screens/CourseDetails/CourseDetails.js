import React, {Component, Fragment} from 'react';
import CourseDetailsCard from './CourseDetailsCard';
import {Text} from 'react-native';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

class CourseDetails extends Component {
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
    return (
      <ScrollView>
        <CourseDetailsCard content={this.props.route.params} />
      </ScrollView>
    );
  }
}

export default connect('', {activateVideo, deActivateVideo})(CourseDetails);
