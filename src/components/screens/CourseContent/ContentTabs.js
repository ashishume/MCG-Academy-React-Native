import React, {useEffect} from 'react';
import CourseContentCard from './CourseContentCard';
import {activateVideo, deActivateVideo} from '../../../store/actions/video';
import {useDispatch} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Description from './Description';
import useDidMount from '../../Utils/didMount';

const ContentTabs = (props) => {
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

  const Tab = createMaterialTopTabNavigator();

  const CourseContentCardComponent = () => {
    return <CourseContentCard content={props.route.params} {...props} />;
  };
  const DescriptionComponent = () => {
    return <Description content={props.route.params} {...props} />;
  };

  return (
    <Tab.Navigator lazy={true}>
      <Tab.Screen name="Videos" component={CourseContentCardComponent} />
      <Tab.Screen name="Description" component={DescriptionComponent} />
    </Tab.Navigator>
  );
};

export default ContentTabs;
