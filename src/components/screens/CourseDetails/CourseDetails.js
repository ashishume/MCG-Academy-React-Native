import React, {Component} from 'react';
import CourseDetailsCard from './CourseDetailsCard';

class CourseDetails extends Component {
  render() {
    return <CourseDetailsCard content={this.props.route.params} />;
  }
}

export default CourseDetails;
