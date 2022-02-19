import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import LatestCourseItem from './LatestCourseItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFeaturedCourses} from '../../../store/actions/courses';
import Styles from '../../Styles';
const {height, width} = Dimensions.get('window');

const FeaturedCourses = ({navigation}) => {
  const featured = useSelector((state) => state.courses.featured);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(fetchFeaturedCourses());
    });
    let startHeaderHeight = 80;
    if (Platform.OS == 'android') {
      startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }, []);
  const onRouteToCourseDetailsHandler = (value) => {
    navigation.navigate('course', {
      courseId: value?._id,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEventThrottle={20}>
        <View style={styles.insideContainer}>
          <Text style={styles.latestCourseTitle}>Featured courses</Text>
          <View style={styles.scrollViewContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {featured.map((value, i) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={() => onRouteToCourseDetailsHandler(value)}>
                    <LatestCourseItem content={value} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', paddingBottom: 0},
  insideContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  latestCourseTitle: {
    fontSize: 25,
    ...Styles.fontFamily,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  scrollViewContainer: {height: 300, width: parseInt(width), marginTop: 20},
});

export default FeaturedCourses;
