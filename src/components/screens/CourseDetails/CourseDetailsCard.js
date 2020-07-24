import React, {Fragment, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CourseDetailsListItem from './CourseDetailsListItems';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {connect} from 'react-redux';
import {fetchMyCourseIds} from '../../../store/actions/courses';
import AsyncStorage from '@react-native-community/async-storage';
import {ToastAndroid} from 'react-native';
const {height, width} = Dimensions.get('window');
const BuyCourseCard = (props) => {
  const videoClickEventHandler = (e) => {
    const body = {
      introVideoUrl: e.url,
      courseTitle: e.title,
    };
    props.activateVideo(body);
  };

  const [Bought, setBought] = useState(false);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        await props.fetchMyCourseIds(userId);
        await checkCourseBuyStatus(props.courseIds);
      } catch (e) {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      }
    };
    fetchMyCourses();
  }, []);

  const checkCourseBuyStatus = (data) => {
    data.map((value) => {
      if (value == props.content._id) setBought(true);
    });
  };

  const courseEventHandler = () => {
    // const body = {
    //   introVideoUrl: '',
    //   courseTitle: '',
    // };
    // props.deActivateVideo(body);
    props.navigation.navigate('CourseContent', props.content);
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <View>
          <Text style={styles.courseTitle}>{props.content.courseTitle}</Text>
          <Text style={styles.author}>{props.content.author}</Text>
        </View>
        <View style={styles.courseTypeContainer}>
          <Text style={styles.courseType}>{props.content.courseType}</Text>
        </View>
        <View>
          <Text style={styles.price}>₹{props.content.price}</Text>
        </View>

        {Bought === false ? (
          <View style={styles.buyNowContainer}>
            <TouchableOpacity style={styles.buyNowButton}>
              <Text style={styles.buyNowButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.goToCourseContainer}>
            <TouchableOpacity
              onPress={() => courseEventHandler()}
              style={styles.buyNowButton}>
              <Text style={styles.buyNowButtonText}>Go to course</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{marginTop: 20}}>
          <Text style={styles.subHeading}>Course Details</Text>
          <Text style={{fontSize: 15}}>
            Time limit: {props.content.timeLimit}
          </Text>
          <Text style={{fontSize: 15}}>
            Course type: {props.content.category}
          </Text>
          <Text style={styles.subHeading}>Course Description</Text>
          <Text style={styles.courseDescription}>
            {props.content.courseDescription}
          </Text>
        </View>
        <View>
          <CourseDetailsListItem
            videoClickEventHandler={(e) => videoClickEventHandler(e)}
            data={props.content.content}
          />
        </View>
      </View>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    courseIds: state.courses.myCourseIds,
  };
};
export default connect(mapStateToProps, {
  activateVideo,
  fetchMyCourseIds,
  deActivateVideo,
})(BuyCourseCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageContainer: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 100,
  },
  courseTitle: {
    textAlign: 'center',
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  author: {textAlign: 'center', fontSize: 15, fontWeight: 'normal'},
  courseTypeContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseType: {
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#ff8282',
    width: 150,
    fontSize: 17,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  price: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  buyNowContainer: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#db306c',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    shadowOpacity: 1,
    shadowOffset: {
      height: 10,
    },
    elevation: 5,
    shadowRadius: 5,
  },
  goToCourseContainer: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#35c464',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    shadowOpacity: 1,
    shadowOffset: {
      height: 10,
    },
    elevation: 5,
    shadowRadius: 5,
  },
  buyNowButton: {width: width - 70, height: 40, justifyContent: 'center'},
  buyNowButtonText: {color: '#fff', fontSize: 20, alignSelf: 'center'},
  subHeading: {fontSize: 25, marginTop: 10, fontWeight: 'bold'},
  courseDescription: {
    fontSize: 15,
    marginTop: 10,
    fontSize: 17,
    textAlign: 'justify',
  },
});
