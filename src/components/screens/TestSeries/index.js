import React, {useEffect, useState, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchTestSeries,
  fetchAllTestCategories,
  fetchAllBoughtTests,
} from '../../../store/actions/testSeries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardTitle from './Templates/DashboardTitle';
import ExamsTemplateCard from './Templates/ExamsTemplateCard';
import Styles, {IconStyles} from '../../Styles';
import {Icon} from 'react-native-elements';
import SearchTestSeries from './SearchTestSeries';

const TestSeries = (props) => {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await props.fetchAllTestCategories();
      await props.fetchAllBoughtTests();
      await fetchCategoryData();
    };
    props.navigation.addListener('focus', () => {
      fetchData();
    });
  }, [selectedCategory]);

  const fetchCategoryData = async () => {
    try {
      const data = await AsyncStorage.getItem('testCategorySelected');
      let newData;
      if (data === null) {
        const d = JSON.stringify(props.testCategories[0]);
        newData = props.testCategories[0];
        await AsyncStorage.setItem('testCategorySelected', d);
      } else {
        newData = JSON.parse(data);
      }
      await props.fetchTestSeries(newData._id);
      await setSelectedCategory(newData.name);
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const renderPreferenceItems = async (e) => {
    try {
      await props.fetchTestSeries(e._id);
      const categoryData = JSON.stringify(e);
      await AsyncStorage.setItem('testCategorySelected', categoryData);
      await setVisible(false);
      await setSelectedCategory(e.name);
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const continueToTest = (data) => {
    props.navigation.navigate('Exams List', {
      testSeriesId: data._id,
      continueToInstruction: true,
    });
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

  const routeToDescription = (data) => {
    props.navigation.navigate('Exams List', {
      testSeriesId: data._id,
    });
  };

  return (
    <Fragment>
      <View
        style={{
          width: '100%',
          height: 50,
          paddingTop: 3,
          backgroundColor: '#fff',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Search Test Series')}
          activeOpacity={0.9}
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.6)',
            marginHorizontal: 10,
            height: '90%',
          }}>
          <Text style={{fontSize: 18, color: 'rgba(0,0,0,0.4)'}}>
            Search...
          </Text>
        </TouchableOpacity>
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
              name="briefcase"
              size={18}
              reverse
              raised
              color="rgba(0,0,0,0.4)"
              type={IconStyles.iconType}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 5,
          backgroundColor: '#fff',
          height: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              ...Styles.fontFamily,
              textAlign: 'center',
              marginVertical: 5,
              fontSize: 17,
              paddingRight: 5,
              fontWeight: '700',
            }}
            onPress={() => setVisible(!visible)}>
            {selectedCategory}
          </Text>
          <Icon
            name="triangle"
            color={'rgba(0, 0, 0, 0.4)'}
            style={{transform: [{rotateX: '180deg'}]}}
            type={IconStyles.iconType}
            size={10}
          />
        </View>

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

        <DashboardTitle />

        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            dis
            data={props.testSeriesData}
            ListEmptyComponent={
              <Text style={{marginTop: 10}}>No tests available</Text>
            }
            renderItem={({item, index}) => {
              return (
                <ExamsTemplateCard
                  boughtTestData={props.myTests}
                  makeTestSeriesPayment={(id, price, timeLimit, name, isPaid) =>
                    makeTestSeriesPayment(id, price, timeLimit, name, isPaid)
                  }
                  routeToDescription={(data) => routeToDescription(data)}
                  continueToTest={(data) => continueToTest(data)}
                  data={item}
                />
              );
            }}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('All Tests Series')}
          activeOpacity={0.6}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'green', textAlign: 'center', fontSize: 20}}>
              View All Test Series
            </Text>
            <Icon
              containerStyle={{marginLeft: 5}}
              type={IconStyles.type}
              size={20}
              color="green"
              name="arrow-forward"
            />
          </View>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};
const mapStateToProps = ({testSeries}) => {
  const {testCategories, testExams, testQuestions, testSeriesData, myTests} =
    testSeries;
  return {
    testCategories,
    testExams,
    testQuestions,
    myTests,
    testSeriesData,
  };
};

export default connect(mapStateToProps, {
  fetchAllTestCategories,
  fetchAllBoughtTests,
  fetchTestSeries,
})(TestSeries);
