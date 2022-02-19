import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import ExploreCoursesCard from './ExploreCoursesCard';
import {fetchAllCourses} from '../../../store/actions/courses';
import {connect} from 'react-redux';
import Styles from '../../Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

class ExploreCourses extends Component {
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.props.fetchAllCourses();
    });
  }

  onRouteToCourseDetailsHandler = (value) => {
    this.props.navigation.navigate('CourseDetails', value);
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={styles.titleText}>Explore courses</Text>
          <View style={{marginTop: 0}}>
            <View style={styles.scrollContainer}>
              {this.props.courses.map((value, i) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={() => this.onRouteToCourseDetailsHandler(value)}>
                    <ExploreCoursesCard key={i} content={value} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 0, backgroundColor: '#fff'},
  titleText: {
    ...Styles.fontFamily,
    fontSize: 25,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
const mapStateToProps = (state) => {
  return {
    courses: state.courses.courses,
  };
};
export default connect(mapStateToProps, {fetchAllCourses})(ExploreCourses);
