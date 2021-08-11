import React, {Fragment, useEffect} from 'react';
import {ScrollView, TouchableOpacity, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {fetchAllQuestions} from '../../../store/actions/testSeries';
const ExamInstruction = (props) => {
  const {name, desc, onlyView} = props.route.params;
  const routeToExamScreen = () => {
    props.navigation.navigate('ExamScreen', {
      examData: props.route.params?.data,
      questions: props.testQuestions,
    });
  };

  useEffect(() => {
    if (!onlyView) {
      props.navigation.setOptions({
        title: 'Instructions',
      });
      const fetchData = async () => {
        await props.fetchAllQuestions(props.route.params?.data._id);
      };
      fetchData();
    }
  }, []);

  return (
    <View>
      {!onlyView ? (
        <ScrollView style={{margin: 20}}>
          <Text style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>
            {props.route.params?.data.name}
          </Text>
          <Text
            style={{
              textAlign: 'left',
              marginHorizontal: 10,
              fontSize: 15,
              marginVertical: 10,
            }}>
            {props.route.params?.data.instructions}
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => routeToExamScreen()}
            style={{
              backgroundColor: 'green',
              height: 40,
              justifyContent: 'center',
              borderRadius: 20,
              width: '100%',
            }}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Start test</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Fragment>
          <Text style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>
            {name}
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              marginHorizontal: 10,
              fontSize: 15,
              marginTop: 10,
            }}>
            {desc}
          </Text>
        </Fragment>
      )}
    </View>
  );
};
const mapStateToProps = ({testSeries}) => {
  const {testQuestions} = testSeries;
  return {
    testQuestions,
  };
};

export default connect(mapStateToProps, {fetchAllQuestions})(ExamInstruction);
