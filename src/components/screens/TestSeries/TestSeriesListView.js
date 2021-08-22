import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {fetchAllExams} from '../../../store/actions/testSeries';
import TestSeriesListTemplate from './TestSeriesListTemplate';
const TestSeriesListView = (props) => {
  const {testSeriesId} = props.route.params;

  useEffect(() => {
    props.fetchAllExams(testSeriesId);
  }, []);

  return (
    <View
      style={{
        margin: 10,
      }}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>
        {props?.testExams?.length} tests
      </Text>
      <FlatList
        data={props.testExams}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({item}) => {
          return <TestSeriesListTemplate isView={true} item={item} />;
        }}
      />
    </View>
  );
};

const mapStateToProps = ({testSeries}) => {
  const {testExams} = testSeries;
  return {testExams};
};

export default connect(mapStateToProps, {
  fetchAllExams,
})(TestSeriesListView);
