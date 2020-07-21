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

  pressHandler = (value) => {
    console.log(value);
  };
  // author: "Akash Sharma"
  // category: "SSC"
  // content: (3) [{…}, {…}, {…}]
  // courseDescription: "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to"
  // courseImage: "https://cdn.mos.cms.futurecdn.net/BVb3Wzn9orDR8mwVnhrSyd-650-80.jpg"
  // courseTitle: "React course with hooks"
  // courseType: "Recorded"
  // createdAt: "2020-07-18T13:07:17.920Z"
  // isDeleted: false
  // otherUrl: "www.telegram.com"
  // price: 200
  // timeLimit: "2 weeks"
  // __v: 0
  // _id: "5f12f4058dc7521c9

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
                      onPress={() => this.pressHandler(value)}>
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
