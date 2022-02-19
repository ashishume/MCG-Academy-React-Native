import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import ExploreCoursesCard from './ExploreCoursesCard';
import {fetchAllCourses} from '../../../store/actions/courses';
import {useDispatch, useSelector} from 'react-redux';
import Styles from '../../Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ExploreCourses = ({navigation}) => {
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(fetchAllCourses());
    });
  }, []);

  const onRouteToCourseDetailsHandler = (value) => {
    navigation.navigate('CourseDetails', value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.titleText}>Explore courses</Text>
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
