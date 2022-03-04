import React, {useEffect} from 'react';
import FeaturedCourses from './FeaturedCourses/FeaturedCourses';
import ExploreCourses from './ExploreCourses/ExploreCourses';
import TopHeader from '../Shared/Header';
import {View, PermissionsAndroid, ToastAndroid, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import DashboardSlideshow from './DashboardSlideshow';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchAllTestCategories} from '../../store/actions/testSeries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDidMount from '../Utils/didMount';

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const didMount = useDidMount(true);

  const onClickHandler = () => {
    props.navigation.navigate('Profile');
  };

  useEffect(() => {
    if (didMount) {
      const fetchTestSeriesCategories = async () => {
        try {
          const data = await AsyncStorage.getItem('testCategorySelected');
          if (data == null) {
            dispatch(fetchAllTestCategories());
          }
        } catch (e) {
          ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        }
      };

      props.navigation.addListener('focus', () => {
        fetchTestSeriesCategories();
      });

      const GetAllPermissions = async () => {
        try {
          if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.CAMERA,
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]);
          }
        } catch (err) {
          // Warning(err);
        }
        return null;
      };

      GetAllPermissions();
    }

    return () => {};
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
          <DashboardSlideshow {...props} />
          <FeaturedCourses {...props} />
          <ExploreCourses {...props} />
        </ScrollView>
      </View>
    </View>
  );
};
export default Dashboard;
