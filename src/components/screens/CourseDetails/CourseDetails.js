import React, {useEffect, useState} from 'react';
import CourseDetailsCard from './CourseDetailsCard';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import useDidMount from '../../Utils/didMount';
import HttpService from '../../../API/HttpService';
import {API_NAME} from '../../../API/ApiPaths';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';
const CourseDetails = (props) => {
  const dispatch = useDispatch();
  const didMount = useDidMount(true);
  const courseId = props?.route?.params?.courseId;

  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (didMount) {
      (async () => {
        try {
          const user = await AsyncStorage.getItem('userId');
          if (!user) {
            //not logged in (when opened via deep linking)
            props.navigation.navigate('Login');
            setCourseData({});
          } else {
            fetchCourseDetails();
          }
        } catch (e) {
          setCourseData({});
          ToastAndroid.show('Please login', ToastAndroid.LONG);
          props.navigation.navigate('Login');
        }
      })();
    }
    return () => {
      const body = {
        introVideoUrl: '',
        courseTitle: '',
      };
      dispatch(deActivateVideo(body));
    };
  }, [courseId]);

  const fetchCourseDetails = async () => {
    const response = await HttpService.get(
      `${API_NAME.MY_COURSE_IDS}/${courseId}`,
    );
    await setCourseData(response.data);
    const {introVideoUrl, courseTitle} = response.data;
    const body = {
      introVideoUrl,
      courseTitle,
    };
    dispatch(activateVideo(body));
  };

  return (
    <ScrollView>
      {Object.keys(courseData)?.length ? (
        <CourseDetailsCard {...props} content={courseData} />
      ) : null}
    </ScrollView>
  );
};

export default CourseDetails;
