import React, {useEffect} from 'react';
import Explore from './Explore/Explore';
import AllCourses from './AllCourses/AllCourses';
import TopHeader from '../Shared/Header';
import {View, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import DashboardSlideshow from './DashboardSlideshow';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchMyCourses} from '../../store/actions/courses';
const Dashboard = (props) => {
  const onClickHandler = () => {
    props.navigation.navigate('Profile');
  };

  useEffect(() => {
    const fetchMyCourseData = () => {
      props.fetchMyCourses();
    };

    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchMyCourseData();
    });

    return unsubscribe;
  }, [props.navigation]);
  const onSearchHandler = () => {
    props.navigation.navigate('Search');
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <TopHeader
          {...props}
          onSearchHandler={() => onSearchHandler()}
          IconName="ios-person"
          onIconClick={() => onClickHandler()}
        />
        <ScrollView>
          <Explore {...props} />
          <DashboardSlideshow {...props} />
          <AllCourses {...props} />
        </ScrollView>
      </View>
    </View>
  );
};

export default connect('', {fetchMyCourses})(Dashboard);
