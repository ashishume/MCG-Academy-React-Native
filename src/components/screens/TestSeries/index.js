import React, {useEffect, useState, Fragment} from 'react';
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
  fetchAllBoughtTests,
} from '../../../store/actions/testSeries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExamListTemplate from './examListTemplate';
import Styles, {IconStyles} from '../../Styles';
import {Icon} from 'react-native-elements';

const TestSeries = (props) => {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await props.fetchAllTestCategories();
      await props.fetchAllBoughtTests();
      await fetchCategoryData();
    };
    fetchData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      const data = await AsyncStorage.getItem('testCategorySelected');
      const newData = JSON.parse(data);
      if (newData !== null) {
        await props.fetchAllExams(newData._id);
        await setSelectedCategory(newData.name);
      }
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const renderPreferenceItems = async (e) => {
    try {
      await props.fetchAllExams(e._id);
      const categoryData = JSON.stringify(e);
      await AsyncStorage.setItem('testCategorySelected', categoryData);
      await setVisible(false);
      await setSelectedCategory(e.name);
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const routeToDescription = (name, desc) => {
    props.navigation.navigate('Exam description', {name, desc, onlyView: true});
  };
  const continueToTest = (data) => {
    props.navigation.navigate('Exam description', {onlyView: false, data});
  };
  const makeTestSeriesPayment = (id, price, timeLimit, name, isPaid) => {
    const obj = {
      _id: id,
      price,
      timeLimit: timeLimit,
      courseTitle: name,
      isTestSeries: true,
      isPaid,
    };
    props.navigation.navigate('Payment', obj);
  };

  return (
    <Fragment>
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: '#fff',
          shadowOpacity: 1,
          shadowOffset: {
            height: 10,
          },
          elevation: 5,
          shadowRadius: 5,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 5}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Test Series</Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            paddingRight: 5,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              props.navigation.navigate('My tests', {myTests: props.myTests})
            }>
            <Icon
              name="briefcase-outline"
              size={18}
              raised
              reverse
              type={IconStyles.iconType}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 5,
          marginTop: 10,
          backgroundColor: '#fff',
          height: '100%',
        }}>
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
        {selectedCategory ? (
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
        ) : (
          <Text style={{fontSize: 20, textAlign: 'center', marginTop: 10}}>
            Select a category
          </Text>
        )}

        {visible ? (
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.02)',
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
        <View style={{paddingBottom: 200}}>
          <FlatList
            data={props.testExams}
            ListEmptyComponent={
              <Text style={{textAlign: 'center', marginTop: 10}}>
                No tests available
              </Text>
            }
            renderItem={({item, index}) => {
              return (
                <ExamListTemplate
                  boughtTestData={props.myTests}
                  makeTestSeriesPayment={(id, price, timeLimit, name, isPaid) =>
                    makeTestSeriesPayment(id, price, timeLimit, name, isPaid)
                  }
                  routeToDescription={(name, desc) =>
                    routeToDescription(name, desc)
                  }
                  continueToTest={(data) => continueToTest(data)}
                  data={item}
                />
              );
            }}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
      </View>
    </Fragment>
  );
};
const mapStateToProps = ({testSeries}) => {
  const {testCategories, testExams, testQuestions, myTests} = testSeries;
  return {
    testCategories,
    testExams,
    testQuestions,
    myTests,
  };
};

export default connect(mapStateToProps, {
  fetchAllTestCategories,
  fetchAllExams,
  fetchAllBoughtTests,
})(TestSeries);
