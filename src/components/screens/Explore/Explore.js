import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import LatestCourseItem from './LatestCourseItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {fetchAllCourses} from '../../../store/actions/courses';
import Styles from '../../Styles';
const {height, width} = Dimensions.get('window');

class Explore extends Component {
  componentDidMount() {
    this.props.fetchAllCourses();

    this.startHeaderHeight = 80;
    if (Platform.OS == 'android') {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  onRouteToCourseDetailsHandler = (value) => {
    this.props.navigation.navigate('CourseDetails', value);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView scrollEventThrottle={20}>
          <View style={styles.insideContainer}>
            <Text style={styles.latestCourseTitle}>Featured courses</Text>
            <View style={styles.scrollViewContainer}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {this.props.courses.map((value, i) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={i}
                      onPress={() => this.onRouteToCourseDetailsHandler(value)}>
                      <LatestCourseItem content={value} />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', paddingBottom: 0},
  insideContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  latestCourseTitle: {
    fontSize: 24,
    ...Styles.fontFamily,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  scrollViewContainer: {height: 300, width: parseInt(width), marginTop: 20},
});
const mapStateToProps = (state) => {
  return {
    courses: state.courses.courses,
  };
};
export default connect(mapStateToProps, {fetchAllCourses})(Explore);
