import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {fetchAllExams} from '../../../store/actions/testSeries';
import ExamsListTemplate from './Templates/ExamsListTemplate';

const ExamsListView = (props) => {
  const {
    testSeriesId,
    continueToInstruction = false,
    testSeriesData = {},
  } = props.route.params;
  const [isTestSeriesBought, setIsTestSeriesBought] = useState(false);
  const [boughtTestSeries, setBoughtTestSeries] = useState({});
  useEffect(() => {
    props.fetchAllExams(testSeriesId);
    const setTestSeriesData = props.myTestSeries.filter(
      (value) => value.test._id === testSeriesId,
    );

    setBoughtTestSeries(setTestSeriesData[0]);
    setIsTestSeriesBought(setTestSeriesData.length ? true : false);
  }, []);

  return (
    <View
      style={{
        margin: 10,
      }}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>
        {props?.testExams?.length} tests
      </Text>
      {isTestSeriesBought ? (
        <Text style={{fontSize: 15, textAlign: 'center'}}>
          Valid till {new Date(boughtTestSeries?.expiryDate).toDateString()}
        </Text>
      ) : null}

      <FlatList
        data={props.testExams}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({item}) => {
          return (
            <ExamsListTemplate
              testSeriesData={testSeriesData}
              isTestSeriesBought={isTestSeriesBought}
              continueToInstruction={continueToInstruction}
              {...props}
              item={item}
            />
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = ({testSeries}) => {
  const {testExams, myTestSeries} = testSeries;
  return {testExams, myTestSeries};
};

export default connect(mapStateToProps, {
  fetchAllExams,
})(ExamsListView);
