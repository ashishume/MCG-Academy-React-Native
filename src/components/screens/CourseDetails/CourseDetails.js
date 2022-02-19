import React, {useEffect} from 'react';
import CourseDetailsCard from './CourseDetailsCard';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import useDidMount from '../../Utils/didMount';

const CourseDetails = (props) => {
  const dispatch = useDispatch();
  const didMount = useDidMount(true);

  useEffect(() => {
    if (didMount) {
      const {introVideoUrl, courseTitle} = props.route.params;
      const body = {
        introVideoUrl,
        courseTitle,
      };
      dispatch(activateVideo(body));
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
      <CourseDetailsCard {...props} content={props.route.params} />
    </ScrollView>
  );
};

export default CourseDetails;
