import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchAllExams,
  fetchAllTestCategories,
} from '../../../store/actions/testSeries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExamListTemplate from './examListTemplate';
import Styles from '../../Styles';
const TestSeries = (props) => {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    props.fetchAllTestCategories();
    fetchCategoryData();
  }, []);

  const renderPreferenceItems = async (e) => {
    try {
      props.fetchAllExams(e._id);
      const categoryData = JSON.stringify(e);
      await AsyncStorage.setItem('testCategorySelected', categoryData);
      setVisible(false);
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const data = await AsyncStorage.getItem('testCategorySelected');
      const newData = JSON.parse(data);
      setSelectedCategory(newData.name);
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  const routeToDescription = (name, desc) => {
    props.navigation.navigate('Exam description', {name, desc});
  };
  const makeTestSeriesPayment = (id, price, timeLimit, name) => {
    const obj = {
      _id: id,
      price,
      timeLimit: timeLimit,
      courseTitle: name,
      isTestSeries: true,
    };
    props.navigation.navigate('Payment', obj);
  };

  return (
    <View style={{marginHorizontal: 5, marginVertical: 20}}>
      <Text
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => setVisible(!visible)}>
        Select category
      </Text>
      <Text
        style={{
          ...Styles.fontFamily,
          width: '100%',
          textAlign: 'center',
          marginVertical: 5,
          fontSize: 17,
          fontWeight: '700',
        }}>
        Selected category: {selectedCategory}
      </Text>
      {visible ? (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.06)',
            position: 'relative',
          }}>
          {props.testCategories.map((value) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={value._id}
                onPress={() => renderPreferenceItems(value)}>
                <Text
                  style={{
                    margin: 6,
                    borderBottomColor: 'rgba(0,0,0,0.4)',
                    borderBottomWidth: 1,
                    paddingVertical: 5,
                  }}>
                  {value.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
      <View style={{paddingBottom: 130}}>
        <FlatList
          data={props.testExams}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 10}}>
              No tests available
            </Text>
          }
          // const {_id, price, timeLimit, courseTitle, isTestSeries} = props.route.params;

          renderItem={({item, index}) => {
            return (
              <ExamListTemplate
                makeTestSeriesPayment={(
                  id,
                  price,
                  timeLimit,
                  name,
                ) =>
                  makeTestSeriesPayment(id, price, timeLimit, name)
                }
                routeToDescription={(name, desc) =>
                  routeToDescription(name, desc)
                }
                data={item}
              />
            );
          }}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </View>
  );
};
const mapStateToProps = ({testSeries}) => {
  const {testCategories, testExams, testQuestions} = testSeries;
  return {
    testCategories,
    testExams,
    testQuestions,
  };
};

export default connect(mapStateToProps, {
  fetchAllTestCategories,
  fetchAllExams,
})(TestSeries);
