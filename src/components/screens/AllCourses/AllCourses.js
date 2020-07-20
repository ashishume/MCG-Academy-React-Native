import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import AllCourseCard from './AllCoursesCard';
import {fetchAllCourses} from '../../../store/actions/courses';
import {connect} from 'react-redux';
class AllCourses extends Component {
  componentDidMount() {
    this.props.fetchAllCourses();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={styles.titleText}>Explore courses</Text>
          <ScrollView scrollEventThrottle={16}>
            <View style={{marginTop: 0}}>
              <View style={styles.scrollContainer}>
                {this.props.courses.map((value, i) => {
                  return <AllCourseCard key={i} content={value} />;
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 20, backgroundColor: '#fff'},
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingBottom: 10,
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
export default connect(mapStateToProps, {fetchAllCourses})(AllCourses);
