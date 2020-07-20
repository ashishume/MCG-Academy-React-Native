import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import AllCourseCard from './AllCoursesCard';
import {fetchAllCourses} from '../../../store/actions/courses';
import {connect} from 'react-redux';
class AllCourses extends Component {
  componentDidMount() {
    this.props.fetchAllCourses();
    this.startHeaderHeight = 80;
    if (Platform.OS == 'android') {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, marginTop: 20, backgroundColor: '#fff'}}>
        <View style={{flex: 1}}>
          <ScrollView scrollEventThrottle={16}>
            <View style={{marginTop: 40}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  paddingHorizontal: 20,
                }}>
                Explore courses
              </Text>
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 10,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {this.props.courses.map((value, i) => {
                  return (
                    <AllCourseCard key={i} content={value} />
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses.courses,
  };
};
export default connect(
  mapStateToProps,
  {fetchAllCourses},
)(AllCourses);
