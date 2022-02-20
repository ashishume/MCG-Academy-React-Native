import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Share,
  ToastAndroid,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CourseDetailsListItem from './CourseDetailsListItems';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from '../../../API/HttpService';
import {API_NAME} from '../../../API/ApiPaths';
import {Icon} from 'react-native-elements';
import {IconStyles} from '../../Styles';
const {height, width} = Dimensions.get('window');
const BuyCourseCard = (props) => {
  const dispatch = useDispatch();

  const videoClickEventHandler = (e) => {
    const body = {
      introVideoUrl: e.url,
      courseTitle: e.title,
    };
    dispatch(activateVideo(body));
    props.navigation.navigate('VideoPage', e);
  };

  const [Bought, setBought] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const response = await HttpService.get(
          API_NAME.MY_COURSES + '/' + userId,
        );
        if (response?.data?.length) {
          const isBought = response?.data?.some(
            (item) => item?.course._id == props.content._id,
          );
          setBought(isBought);
        }
      } catch (e) {
        ToastAndroid.show('your not logged in', ToastAndroid.SHORT);
      }
    })();

    return () => {};
  }, [props.content._id]);

  const courseEventHandler = () => {
    props.navigation.navigate('CourseContent', props.content);
  };
  const buyNewCourseHandler = (e) => {
    const body = {
      introVideoUrl: e.url,
      courseTitle: e.title,
    };
    dispatch(deActivateVideo(body));
    props.navigation.navigate('Payment', {
      ...props.content,
      ...{isTestSeries: false},
    });
  };

  const onShare = async (courseName, courseLink) => {
    try {
      const result = await Share.share({
        message: `Hey checkout this awesome course in MCG Academy | ${courseName} | course: https://www.mcgacademy.in/course/${courseLink} | You can download the MCG Academy app from ${'https://play.google.com/store/apps/details?id=com.mcgeducation'}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {!Bought ? (
            <View style={styles.buyNowContainer}>
              <TouchableOpacity
                onPress={() => buyNewCourseHandler(props.content)}
                style={styles.buyNowButton}>
                <Text style={styles.buyNowButtonText}>
                  {props.content.price === 0 ? 'Enroll Free' : 'Buy Now'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.goToCourseContainer}>
              <TouchableOpacity
                onPress={() => courseEventHandler()}
                style={styles.buyNowButton}>
                <Text style={styles.buyNowButtonText}>Open course</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.shareContainer}>
            <TouchableOpacity
              style={styles.buyNowButton}
              onPress={() =>
                onShare(props.content.courseTitle, props.content._id)
              }>
              <Text style={styles.shareNowButtonText}>Share</Text>
              <Icon
                name="share-social"
                size={25}
                color="#000"
                type={IconStyles.iconType}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={styles.subHeading}>Course Details</Text>
          <Text style={{fontSize: 15}}>
            Time limit: {props.content.timeLimit} days
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
export default BuyCourseCard;

const commonButtonContainerStyles = {
  alignSelf: 'center',
  marginTop: 10,
  backgroundColor: '#c20202',
  paddingVertical: 10,
  borderRadius: 10,
  shadowOpacity: 1,
  shadowOffset: {
    height: 10,
  },
  elevation: 5,
  shadowRadius: 5,
  width: '100%',
};

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
    ...commonButtonContainerStyles,
    width: '48%',
  },
  shareContainer: {
    ...commonButtonContainerStyles,
    backgroundColor: '#fff',
    color: '#000',
    width: '48%',
  },
  goToCourseContainer: {
    ...commonButtonContainerStyles,
    backgroundColor: '#25a866',
    width: '48%',
  },
  buyNowButton: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyNowButtonText: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'center',
  },
  shareNowButtonText: {
    color: '#000',
    fontSize: 20,
    alignSelf: 'center',
    marginRight: 10,
  },
  subHeading: {fontSize: 25, marginTop: 10, fontWeight: 'bold'},
  courseDescription: {
    fontSize: 15,
    marginTop: 10,
    fontSize: 17,
    textAlign: 'justify',
  },
});
