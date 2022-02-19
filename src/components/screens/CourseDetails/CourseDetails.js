import React, {useEffect, useState} from 'react';
import CourseDetailsCard from './CourseDetailsCard';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import useDidMount from '../../Utils/didMount';
import HttpService from '../../../API/HttpService';
import {API_NAME} from '../../../API/ApiPaths';
const CourseDetails = (props) => {
  const dispatch = useDispatch();
  const didMount = useDidMount(true);
  const courseId = props?.route?.params?.courseId;

  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (didMount) {
      (async () => {
        const response = await HttpService.get(
          `${API_NAME.MY_COURSE_IDS}/${courseId}`,
        );
        const {introVideoUrl, courseTitle} = response.data;
        const body = {
          introVideoUrl,
          courseTitle,
        };
        dispatch(activateVideo(body));
        await setCourseData(response.data);
      })();
    }
    return () => {
      const body = {
        introVideoUrl: '',
        courseTitle: '',
      };
      dispatch(deActivateVideo(body));
    };
  }, []);

  return (
    <ScrollView>
      {Object.keys(courseData)?.length ? (
        <CourseDetailsCard {...props} content={courseData} />
      ) : null}
    </ScrollView>
  );
};

export default CourseDetails;
