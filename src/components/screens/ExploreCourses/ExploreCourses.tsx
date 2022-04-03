import React, {useEffect, useState, Fragment} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import ExploreCoursesCard from './ExploreCoursesCard';
import {fetchAllCourses} from '../../../store/actions/courses';
import {useDispatch, useSelector} from 'react-redux';
import Styles from '../../Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StateInterface} from '../../../Shared/Interfaces/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryFilter from '../../Shared/Filter';

const ExploreCourses = ({navigation, categories}: any) => {
  const courses = useSelector((state: StateInterface) => state.courses.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const fetchedCategoryId = await AsyncStorage.getItem('categoryId');
      const categoryId = !!fetchedCategoryId
        ? fetchedCategoryId
        : categories[0]._id;
      await dispatch(fetchAllCourses(categoryId));
    })();
  }, [categories]);

  const onRouteToCourseDetailsHandler = (value: any) => {
    navigation.navigate('course', {
      courseId: value?._id,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        {/* <Text style={styles.titleText}>Explore courses</Text> */}
        <CategoryFilter />
        <View style={{marginTop: 0}}>
          <View style={styles.scrollContainer}>
            {courses.map((value, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={i}
                  onPress={() => onRouteToCourseDetailsHandler(value)}>
                  <ExploreCoursesCard key={i} content={value} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 0, backgroundColor: '#fff'},
  titleText: {
    ...Styles.fontFamily,
    fontSize: 25,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default ExploreCourses;
