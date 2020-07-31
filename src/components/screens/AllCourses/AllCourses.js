import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import AllCourseCard from './AllCoursesCard';
import {fetchAllCourses} from '../../../store/actions/courses';
import {connect} from 'react-redux';
import Styles from '../../Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

class AllCourses extends Component {
  componentDidMount() {
    this.props.fetchAllCourses();
  }

  onRouteToCourseDetailsHandler = (value) => {
    this.props.navigation.navigate('CourseDetails', value);
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={styles.titleText}>Explore courses</Text>
          <ScrollView scrollEventThrottle={16}>
            <View style={{marginTop: 0}}>
              <View style={styles.scrollContainer}>
                {this.props.courses.map((value, i) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={i}
                      onPress={() => this.onRouteToCourseDetailsHandler(value)}>
                      <AllCourseCard key={i} content={value} />
                    </TouchableOpacity>
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
const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 0, backgroundColor: '#fff'},
  titleText: {
    ...Styles.fontFamily,
    fontSize: 20,
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
export default connect(mapStateToProps, {fetchAllCourses})(AllCourses);
